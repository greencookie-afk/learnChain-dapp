import { ethers } from 'ethers';
import CourseRegistryABI from '../contracts/abis/CourseRegistry.json';
import CertificateNFTABI from '../contracts/abis/CertificateNFT.json';
import LRNTokenABI from '../contracts/abis/LRNToken.json';

// Contract addresses from environment variables
const CONTRACT_ADDRESSES = {
  courseRegistry: import.meta.env.VITE_COURSE_REGISTRY_ADDRESS,
  certificateNFT: import.meta.env.VITE_CERTIFICATE_NFT_ADDRESS,
  lrnToken: import.meta.env.VITE_LRN_TOKEN_ADDRESS
};

/**
 * Test connection to all contracts and verify they are working
 * @param {ethers.providers.Provider} provider - Provider to use for read-only operations
 * @returns {Object} - Test results for each contract
 */
export const testContractConnections = async (provider) => {
  const results = {
    success: false,
    contracts: {
      lrnToken: { success: false, error: null, data: null },
      courseRegistry: { success: false, error: null, data: null },
      certificateNFT: { success: false, error: null, data: null }
    }
  };

  try {
    // Test LRN Token
    const lrnToken = new ethers.Contract(
      CONTRACT_ADDRESSES.lrnToken,
      LRNTokenABI,
      provider
    );
    
    try {
      const name = await lrnToken.name();
      const symbol = await lrnToken.symbol();
      const totalSupply = await lrnToken.totalSupply();
      
      results.contracts.lrnToken.success = true;
      results.contracts.lrnToken.data = {
        name,
        symbol,
        totalSupply: ethers.formatEther(totalSupply)
      };
    } catch (error) {
      results.contracts.lrnToken.error = error.message;
    }
    
    // Test Course Registry
    const courseRegistry = new ethers.Contract(
      CONTRACT_ADDRESSES.courseRegistry,
      CourseRegistryABI,
      provider
    );
    
    try {
      // Try to call a view function on the course registry
      // This will vary depending on your contract implementation
      const courseCount = await courseRegistry.getCourseCount();
      
      results.contracts.courseRegistry.success = true;
      results.contracts.courseRegistry.data = {
        courseCount: courseCount.toString()
      };
    } catch (error) {
      results.contracts.courseRegistry.error = error.message;
    }
    
    // Test Certificate NFT
    const certificateNFT = new ethers.Contract(
      CONTRACT_ADDRESSES.certificateNFT,
      CertificateNFTABI,
      provider
    );
    
    try {
      // Try to call a view function on the certificate NFT contract
      const name = await certificateNFT.name();
      const symbol = await certificateNFT.symbol();
      
      results.contracts.certificateNFT.success = true;
      results.contracts.certificateNFT.data = {
        name,
        symbol
      };
    } catch (error) {
      results.contracts.certificateNFT.error = error.message;
    }
    
    // Overall success if all contracts tested successfully
    results.success = 
      results.contracts.lrnToken.success && 
      results.contracts.courseRegistry.success && 
      results.contracts.certificateNFT.success;
    
  } catch (error) {
    console.error('Error testing contract connections:', error);
  }
  
  return results;
};

export default testContractConnections; 