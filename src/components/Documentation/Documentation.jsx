import React, { useState } from 'react';
import './Documentation.css';

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const handleSectionClick = (section) => {
    setActiveSection(section);
    // Scroll to the section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="documentation-container">
      <div className="documentation-sidebar">
        <h3 className="sidebar-title">Documentation</h3>
        <ul className="sidebar-nav">
          <li 
            className={activeSection === 'introduction' ? 'active' : ''}
            onClick={() => handleSectionClick('introduction')}
          >
            Introduction
          </li>
          <li 
            className={activeSection === 'getting-started' ? 'active' : ''}
            onClick={() => handleSectionClick('getting-started')}
          >
            Getting Started
          </li>
          <li 
            className={activeSection === 'students' ? 'active' : ''}
            onClick={() => handleSectionClick('students')}
          >
            For Students
          </li>
          <li 
            className={activeSection === 'educators' ? 'active' : ''}
            onClick={() => handleSectionClick('educators')}
          >
            For Educators
          </li>
          <li 
            className={activeSection === 'blockchain' ? 'active' : ''}
            onClick={() => handleSectionClick('blockchain')}
          >
            Blockchain Integration
          </li>
          <li 
            className={activeSection === 'certificates' ? 'active' : ''}
            onClick={() => handleSectionClick('certificates')}
          >
            NFT Certificates
          </li>
          <li 
            className={activeSection === 'faq' ? 'active' : ''}
            onClick={() => handleSectionClick('faq')}
          >
            FAQ
          </li>
        </ul>
      </div>
      
      <div className="documentation-content">
        <section id="introduction" className="doc-section">
          <h2>Introduction to LearnChain</h2>
          <p>
            LearnChain is a decentralized learning platform that leverages blockchain technology to create a transparent, 
            secure, and efficient educational ecosystem. Our platform connects educators directly with students, 
            eliminating intermediaries and reducing costs while ensuring content authenticity and ownership.
          </p>
          <p>
            By utilizing blockchain technology, LearnChain provides:
          </p>
          <ul>
            <li><strong>Decentralized Content Storage:</strong> Course materials are stored on a distributed network, ensuring censorship resistance and permanent availability.</li>
            <li><strong>Transparent Transactions:</strong> All payments between students and educators are recorded on the blockchain, providing complete transparency.</li>
            <li><strong>Verifiable Credentials:</strong> Certificates issued upon course completion are minted as NFTs, providing tamper-proof verification of achievements.</li>
            <li><strong>Direct Educator-Student Relationships:</strong> Without intermediaries, educators receive fair compensation for their content.</li>
          </ul>
        </section>
        
        <section id="getting-started" className="doc-section">
          <h2>Getting Started</h2>
          <h3>Setting Up Your Wallet</h3>
          <p>
            To use LearnChain, you'll need a Web3 wallet like MetaMask. Follow these steps to get started:
          </p>
          <ol>
            <li>Install <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer">MetaMask</a> or another compatible Ethereum wallet</li>
            <li>Create a new wallet or import an existing one</li>
            <li>Connect your wallet to LearnChain by clicking the "Connect Wallet" button in the navigation bar</li>
            <li>Ensure you have some ETH for transaction fees and LRN tokens for course purchases</li>
          </ol>
          
          <h3>Creating an Account</h3>
          <p>
            Once your wallet is connected, your Ethereum address serves as your identity on LearnChain. 
            You can enhance your profile by:
          </p>
          <ol>
            <li>Clicking on your address in the top-right corner</li>
            <li>Selecting "Edit Profile"</li>
            <li>Adding a username, profile picture, and bio</li>
          </ol>
        </section>
        
        <section id="students" className="doc-section">
          <h2>For Students</h2>
          <h3>Finding Courses</h3>
          <p>
            Browse our extensive catalog of blockchain and Web3 courses:
          </p>
          <ol>
            <li>Navigate to the "Explore" section</li>
            <li>Use filters to narrow down courses by category, difficulty level, or price</li>
            <li>Click on a course to view detailed information, curriculum, and reviews</li>
          </ol>
          
          <h3>Enrolling in Courses</h3>
          <p>
            To enroll in a course:
          </p>
          <ol>
            <li>Ensure your wallet is connected and has sufficient LRN tokens</li>
            <li>Click the "Enroll Now" button on the course page</li>
            <li>Confirm the transaction in your wallet</li>
            <li>Once confirmed, you'll have immediate access to the course content</li>
          </ol>
          
          <h3>Tracking Progress</h3>
          <p>
            Your learning progress is automatically tracked on the blockchain:
          </p>
          <ol>
            <li>View your enrolled courses in the "My Courses" section</li>
            <li>See your progress percentage for each course</li>
            <li>Continue where you left off with a single click</li>
          </ol>
        </section>
        
        <section id="educators" className="doc-section">
          <h2>For Educators</h2>
          <h3>Becoming an Educator</h3>
          <p>
            To start creating and selling courses on LearnChain:
          </p>
          <ol>
            <li>Connect your wallet</li>
            <li>Navigate to the "Educator" section</li>
            <li>Complete your educator profile with credentials and expertise</li>
            <li>Submit for verification (this helps maintain quality standards)</li>
          </ol>
          
          <h3>Creating Courses</h3>
          <p>
            Once verified as an educator, you can create courses:
          </p>
          <ol>
            <li>Click "Create New Course" in your educator dashboard</li>
            <li>Fill in course details (title, description, category, difficulty level)</li>
            <li>Upload course materials (videos, documents, quizzes)</li>
            <li>Set the price in LRN tokens</li>
            <li>Publish your course to make it available to students</li>
          </ol>
          
          <h3>Managing Earnings</h3>
          <p>
            Track and manage your earnings directly from your dashboard:
          </p>
          <ol>
            <li>View real-time enrollment statistics</li>
            <li>Monitor revenue for each course</li>
            <li>Withdraw earnings to your wallet at any time</li>
          </ol>
        </section>
        
        <section id="blockchain" className="doc-section">
          <h2>Blockchain Integration</h2>
          <h3>Smart Contracts</h3>
          <p>
            LearnChain utilizes several smart contracts to manage the platform:
          </p>
          <ul>
            <li><strong>CourseRegistry:</strong> Manages course listings, enrollments, and payments</li>
            <li><strong>LRNToken:</strong> The native utility token used for transactions on the platform</li>
            <li><strong>CertificateNFT:</strong> Issues and verifies course completion certificates as NFTs</li>
            <li><strong>ContentStorage:</strong> Manages access control to decentralized course content</li>
          </ul>
          
          <h3>Decentralized Storage</h3>
          <p>
            Course content is stored using a combination of technologies:
          </p>
          <ul>
            <li><strong>IPFS:</strong> For immutable, content-addressed storage of course materials</li>
            <li><strong>Arweave:</strong> For permanent storage of critical content</li>
            <li><strong>Encrypted Storage:</strong> For premium content with access control</li>
          </ul>
          
          <h3>Transaction Fees</h3>
          <p>
            LearnChain operates on the Polygon network to ensure low transaction fees and fast confirmations. 
            Most actions on the platform require minimal gas fees, making the platform accessible and affordable.
          </p>
        </section>
        
        <section id="certificates" className="doc-section">
          <h2>NFT Certificates</h2>
          <h3>Earning Certificates</h3>
          <p>
            Upon completing a course, you'll automatically receive an NFT certificate:
          </p>
          <ol>
            <li>Complete all required modules and pass the final assessment</li>
            <li>The platform will automatically mint an NFT certificate to your wallet</li>
            <li>View your certificates in the "Certificates" section or any NFT marketplace</li>
          </ol>
          
          <h3>Certificate Verification</h3>
          <p>
            LearnChain certificates can be easily verified by employers or institutions:
          </p>
          <ol>
            <li>Share your certificate link or NFT token ID</li>
            <li>The verifier can check the authenticity on the blockchain</li>
            <li>Certificate metadata includes course details, completion date, and issuer information</li>
          </ol>
          
          <h3>Showcasing Achievements</h3>
          <p>
            Your NFT certificates can be displayed on various platforms:
          </p>
          <ul>
            <li>Professional networking sites</li>
            <li>Personal portfolios</li>
            <li>NFT galleries</li>
            <li>Social media profiles</li>
          </ul>
        </section>
        
        <section id="faq" className="doc-section">
          <h2>Frequently Asked Questions</h2>
          
          <div className="faq-item">
            <h3>What is LRN token?</h3>
            <p>
              LRN is the native utility token of the LearnChain platform. It's used for course purchases, 
              educator payments, governance voting, and staking for additional benefits.
            </p>
          </div>
          
          <div className="faq-item">
            <h3>How do I get LRN tokens?</h3>
            <p>
              You can acquire LRN tokens through various methods:
            </p>
            <ul>
              <li>Purchase from supported exchanges</li>
              <li>Earn by completing certain courses or challenges</li>
              <li>Receive as rewards for contributing to the platform</li>
            </ul>
          </div>
          
          <div className="faq-item">
            <h3>What happens if I lose access to my wallet?</h3>
            <p>
              Since LearnChain is a decentralized platform, wallet recovery depends on your wallet provider's 
              recovery methods. Always backup your seed phrase and private keys securely. Course access and 
              certificates are tied to your wallet address.
            </p>
          </div>
          
          <div className="faq-item">
            <h3>Can I transfer my course access to another wallet?</h3>
            <p>
              Yes, course access NFTs can be transferred to another wallet. However, learning progress is 
              tied to the original wallet and cannot be transferred.
            </p>
          </div>
          
          <div className="faq-item">
            <h3>How are educator payments handled?</h3>
            <p>
              Educators receive payments directly to their wallet when a student enrolls in their course. 
              The platform takes a small percentage fee to maintain the ecosystem. All transactions are 
              transparent and verifiable on the blockchain.
            </p>
          </div>
          
          <div className="faq-item">
            <h3>Is my learning data private?</h3>
            <p>
              Yes, your detailed learning data is encrypted and only accessible to you. The blockchain only 
              records enrollment status and completion achievements, not your specific interactions or assessment responses.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
