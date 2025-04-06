import { ethers } from 'ethers';
import CourseRegistryABI from '../contracts/abis/CourseRegistry.json';
import CertificateNFTABI from '../contracts/abis/CertificateNFT.json';
import LRNTokenABI from '../contracts/abis/LRNToken.json';
import { getIPFSUrl } from './ipfsService';

// Contract addresses - these would be the deployed contract addresses
// For development, these would be updated after deployment
const CONTRACT_ADDRESSES = {
  courseRegistry: import.meta.env.VITE_COURSE_REGISTRY_ADDRESS,
  certificateNFT: import.meta.env.VITE_CERTIFICATE_NFT_ADDRESS,
  lrnToken: import.meta.env.VITE_LRN_TOKEN_ADDRESS
};

/**
 * Initialize contract instances
 * @param {ethers.providers.Provider|ethers.Signer} providerOrSigner - Provider or signer to use
 * @returns {Object} - Object containing contract instances
 */
export const initContracts = async (providerOrSigner) => {
  try {
    // Create real contract instances with the deployed addresses
    const courseRegistry = new ethers.Contract(
      CONTRACT_ADDRESSES.courseRegistry,
      CourseRegistryABI,
      providerOrSigner
    );
    
    const certificateNFT = new ethers.Contract(
      CONTRACT_ADDRESSES.certificateNFT,
      CertificateNFTABI,
      providerOrSigner
    );
    
    const lrnToken = new ethers.Contract(
      CONTRACT_ADDRESSES.lrnToken,
      LRNTokenABI,
      providerOrSigner
    );
    
    return {
      courseRegistry,
      certificateNFT,
      lrnToken
    };
  } catch (error) {
    console.error('Error initializing contracts:', error);
    throw new Error('Failed to initialize contracts: ' + error.message);
  }
};

/**
 * Create a new course on the blockchain
 * @param {ethers.Signer} signer - Signer for the transaction
 * @param {Object} courseData - Course data including title, description, contentURI, and price
 * @returns {Promise<Object>} - Transaction receipt and course ID
 */
export const createCourse = async (signer, courseData) => {
  try {
    const { title, description, contentURI, price } = courseData;
    const contracts = initContracts(signer);

    if (!contracts) {
      throw new Error('Failed to initialize contracts');
    }

    // Convert price from LRN to wei (assuming 18 decimals)
    const priceInWei = ethers.parseEther(price.toString());

    // Call the createCourse function on the smart contract
    const tx = await contracts.courseRegistry.createCourse(
      title,
      description,
      contentURI,
      priceInWei
    );

    // Wait for transaction to be mined
    const receipt = await tx.wait();

    // Extract course ID from event logs
    const event = receipt.events.find(event => event.event === 'CourseCreated');
    const courseId = event.args.courseId.toString();

    return {
      receipt,
      courseId
    };
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

/**
 * Get course details from the blockchain
 * @param {ethers.providers.Provider} provider - Provider to use
 * @param {string|number} courseId - ID of the course
 * @returns {Promise<Object>} - Course details
 */
export const getCourseDetails = async (provider, courseId) => {
  try {
    const contracts = initContracts(provider);

    if (!contracts) {
      throw new Error('Failed to initialize contracts');
    }

    // Call the getCourse function on the smart contract
    const courseData = await contracts.courseRegistry.getCourse(courseId);

    // Format the course data
    const formattedCourse = {
      id: courseData.id.toString(),
      educator: courseData.educator,
      title: courseData.title,
      description: courseData.description,
      contentURI: courseData.contentURI,
      price: ethers.formatEther(courseData.price),
      createdAt: new Date(courseData.createdAt * 1000).toISOString(),
      updatedAt: new Date(courseData.updatedAt * 1000).toISOString(),
      isActive: courseData.isActive
    };

    return formattedCourse;
  } catch (error) {
    console.error('Error getting course details:', error);
    throw error;
  }
};

/**
 * Enroll in a course
 * @param {ethers.Signer} signer - Signer for the transaction
 * @param {string|number} courseId - ID of the course
 * @param {string} price - Price of the course in LRN
 * @returns {Promise<Object>} - Transaction receipt
 */
export const enrollInCourse = async (signer, courseId, price) => {
  try {
    const contracts = initContracts(signer);

    if (!contracts) {
      throw new Error('Failed to initialize contracts');
    }

    // Convert price from LRN to wei (assuming 18 decimals)
    const priceInWei = ethers.parseEther(price.toString());

    // First approve the CourseRegistry contract to spend LRN tokens
    const courseDetails = await contracts.courseRegistry.getCourse(courseId);
    const coursePriceInWei = courseDetails.price;

    // Approve the CourseRegistry to spend the tokens
    const approveTx = await contracts.lrnToken.approve(
      CONTRACT_ADDRESSES.courseRegistry,
      coursePriceInWei
    );

    await approveTx.wait();

    // Call the enrollInCourse function on the smart contract
    const tx = await contracts.courseRegistry.enrollInCourse(courseId);

    // Wait for transaction to be mined
    const receipt = await tx.wait();

    return {
      receipt,
      success: true
    };
  } catch (error) {
    console.error('Error enrolling in course:', error);
    throw error;
  }
};

/**
 * Mark a course as completed
 * @param {ethers.Signer} signer - Signer for the transaction
 * @param {string|number} courseId - ID of the course
 * @returns {Promise<Object>} - Transaction receipt
 */
export const completeCourse = async (signer, courseId) => {
  try {
    const contracts = initContracts(signer);

    if (!contracts) {
      throw new Error('Failed to initialize contracts');
    }

    // Call the completeCourse function on the smart contract
    const tx = await contracts.courseRegistry.completeCourse(courseId);

    // Wait for transaction to be mined
    const receipt = await tx.wait();

    return {
      receipt,
      success: true
    };
  } catch (error) {
    console.error('Error completing course:', error);
    throw error;
  }
};

/**
 * Issue a certificate for a completed course
 * @param {ethers.Signer} signer - Signer for the transaction (must be the educator)
 * @param {string|number} courseId - ID of the course
 * @param {string} courseTitle - Title of the course
 * @param {string} studentAddress - Address of the student
 * @param {string} metadataURI - IPFS URI for the certificate metadata
 * @returns {Promise<Object>} - Transaction receipt and token ID
 */
export const issueCertificate = async (
  signer,
  courseId,
  courseTitle,
  studentAddress,
  metadataURI
) => {
  try {
    const contracts = await initContracts(signer);

    if (!contracts) {
      throw new Error('Failed to initialize contracts');
    }

    // Check if certificate already exists
    const hasCert = await contracts.certificateNFT.hasCertificate(courseId, studentAddress);
    if (hasCert) {
      throw new Error('Certificate already issued for this course and student');
    }

    // Check if the sender is authorized
    const isAuthorized = await contracts.certificateNFT.authorizedEducators(signer.getAddress());
    if (!isAuthorized) {
      throw new Error('Not authorized to mint certificates');
    }

    // Mint the certificate NFT
    const mintTx = await contracts.certificateNFT.mintCertificate(
      studentAddress,
      courseId,
      courseTitle,
      metadataURI
    );

    // Wait for transaction to be mined
    const receipt = await mintTx.wait();

    // Extract token ID from event logs
    const event = receipt.events.find(event => event.event === 'CertificateMinted');
    const tokenId = event.args.tokenId.toString();

    return {
      receipt,
      tokenId
    };
  } catch (error) {
    console.error('Error issuing certificate:', error);
    throw error;
  }
};

/**
 * Get all courses created by an educator
 * @param {ethers.providers.Provider} provider - Provider to use
 * @param {string} educatorAddress - Address of the educator
 * @returns {Promise<Array>} - Array of course details
 */
export const getEducatorCourses = async (provider, educatorAddress) => {
  try {
    const contracts = initContracts(provider);

    if (!contracts) {
      throw new Error('Failed to initialize contracts');
    }

    // Get course IDs created by the educator
    const courseIds = await contracts.courseRegistry.getEducatorCourses(educatorAddress);

    // Get details for each course
    const coursesPromises = courseIds.map(id => getCourseDetails(provider, id));
    const courses = await Promise.all(coursesPromises);

    return courses;
  } catch (error) {
    console.error('Error getting educator courses:', error);
    throw error;
  }
};

/**
 * Get all courses a student is enrolled in
 * @param {ethers.providers.Provider} provider - Provider to use
 * @param {string} studentAddress - Address of the student
 * @returns {Promise<Array>} - Array of course details with enrollment info
 */
export const getStudentEnrollments = async (provider, studentAddress) => {
  try {
    const contracts = initContracts(provider);

    if (!contracts) {
      throw new Error('Failed to initialize contracts');
    }

    // Get course IDs the student is enrolled in
    const courseIds = await contracts.courseRegistry.getStudentEnrollments(studentAddress);

    // Get details for each course and enrollment
    const enrollmentsPromises = courseIds.map(async (id) => {
      const course = await getCourseDetails(provider, id);
      const enrollment = await contracts.courseRegistry.getEnrollment(id, studentAddress);

      return {
        ...course,
        enrolledAt: new Date(enrollment.enrolledAt * 1000).toISOString(),
        completedAt: enrollment.completedAt > 0
          ? new Date(enrollment.completedAt * 1000).toISOString()
          : null,
        isCompleted: enrollment.isCompleted,
        isCertificateIssued: enrollment.isCertificateIssued
      };
    });

    const enrollments = await Promise.all(enrollmentsPromises);

    return enrollments;
  } catch (error) {
    console.error('Error getting student enrollments:', error);
    throw error;
  }
};

/**
 * Get all certificates owned by a student
 * @param {ethers.providers.Provider} provider - Provider to use
 * @param {string} studentAddress - Address of the student
 * @returns {Promise<Array>} - Array of certificate details
 */
export const getStudentCertificates = async (provider, studentAddress) => {
  try {
    const contracts = initContracts(provider);

    if (!contracts) {
      throw new Error('Failed to initialize contracts');
    }

    // Get certificate token IDs owned by the student
    const tokenIds = await contracts.certificateNFT.getStudentCertificates(studentAddress);

    // Get details for each certificate
    const certificatesPromises = tokenIds.map(async (id) => {
      const metadata = await contracts.certificateNFT.getCertificateMetadata(id);
      const tokenURI = await contracts.certificateNFT.tokenURI(id);

      // In a real app, you would fetch the metadata from IPFS
      // For this example, we'll just use the token URI

      return {
        tokenId: id.toString(),
        courseId: metadata.courseId.toString(),
        courseTitle: metadata.courseTitle,
        student: metadata.student,
        issuer: metadata.issuer,
        issuedAt: new Date(metadata.issuedAt * 1000).toISOString(),
        tokenURI,
        imageUrl: getIPFSUrl(tokenURI) // This assumes the tokenURI is an IPFS URI
      };
    });

    const certificates = await Promise.all(certificatesPromises);

    return certificates;
  } catch (error) {
    console.error('Error getting student certificates:', error);
    throw error;
  }
};

export default {
  initContracts,
  createCourse,
  getCourseDetails,
  enrollInCourse,
  completeCourse,
  issueCertificate,
  getEducatorCourses,
  getStudentEnrollments,
  getStudentCertificates
};



