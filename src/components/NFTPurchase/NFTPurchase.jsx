import { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import './NFTPurchase.css';

const NFTPurchase = ({ courseId, courseTitle, price, onPurchaseComplete }) => {
  const { account, signer, connectWallet } = useWallet();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Function to handle course purchase
  const handlePurchase = async () => {
    if (!account) {
      connectWallet();
      return;
    }
    
    try {
      setIsProcessing(true);
      setErrorMessage('');
      
      // Simulate blockchain interaction
      console.log(`Purchasing course ${courseId}: ${courseTitle} for ${price} LRN`);
      
      // Here you would have the actual Web3 transaction code:
      // 1. Create contract instance
      // 2. Call purchase function with appropriate parameters
      // 3. Wait for transaction confirmation
      
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful purchase
      setIsProcessing(false);
      
      // Call the callback function
      if (onPurchaseComplete) {
        onPurchaseComplete(courseId);
      }
      
    } catch (error) {
      console.error('Purchase failed:', error);
      setErrorMessage('Transaction failed. Please try again.');
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="nft-purchase">
      <div className="purchase-details">
        <div className="price-container">
          <div className="eth-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L19 12L12 16L5 12L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 12L12 22L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="price-value">{price} LRN</span>
        </div>
        
        <div className="purchase-info">
          <p>This purchase will:</p>
          <ul>
            <li>Grant you lifetime access to the course</li>
            <li>Issue an NFT certificate upon completion</li>
            <li>Be recorded on the blockchain as proof of ownership</li>
          </ul>
        </div>
      </div>
      
      <button 
        className={`purchase-button ${isProcessing ? 'processing' : ''}`}
        onClick={handlePurchase}
        disabled={isProcessing}
      >
        {!account ? (
          <>
            <svg className="wallet-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 14C16.5523 14 17 13.5523 17 13C17 12.4477 16.5523 12 16 12C15.4477 12 15 12.4477 15 13C15 13.5523 15.4477 14 16 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 7L12 2L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Connect Wallet
          </>
        ) : isProcessing ? (
          <>
            <span className="spinner"></span>
            Processing...
          </>
        ) : (
          <>
            <svg className="purchase-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Purchase Course
          </>
        )}
      </button>
      
      {errorMessage && (
        <div className="error-message">
          <svg className="error-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {errorMessage}
        </div>
      )}
      
      <div className="network-info">
        <div className="network-name">
          <span>LearnChain Network</span>
        </div>
        <div className="gas-estimate">
          Est. Gas: ~0.003 LRN
        </div>
      </div>
    </div>
  );
};

export default NFTPurchase; 