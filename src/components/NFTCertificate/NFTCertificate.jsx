import { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import './NFTCertificate.css';

const NFTCertificate = ({ 
  certificateId,
  courseTitle,
  completionDate,
  studentName,
  issueDate,
  tokenId,
  imageUrl
}) => {
  const { account } = useWallet();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Format date from ISO to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Shorten wallet address for display
  const shortenAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className={`certificate-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="certificate-card-inner">
        {/* Front of certificate */}
        <div className="certificate-front">
          <div className="certificate-header">
            <h3 className="certificate-title">Course Completion Certificate</h3>
            <div className="certificate-badge">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          {imageUrl && <img src={imageUrl} alt="Certificate background" className="certificate-image" />}
          
          <div className="certificate-content">
            <p className="certificate-text">This certifies that</p>
            <h2 className="certificate-recipient">{studentName || shortenAddress(account)}</h2>
            <p className="certificate-text">has successfully completed</p>
            <h2 className="certificate-course">{courseTitle}</h2>
            <p className="certificate-date">on {formatDate(completionDate)}</p>
          </div>
          
          <div className="certificate-footer">
            <div className="certificate-token">
              NFT Token ID: {tokenId}
            </div>
            <div className="certificate-verification">
              <svg className="verified-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12L10.5 14.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Verified on Blockchain
            </div>
          </div>
          
          <div className="flip-prompt">
            Click to view details
          </div>
        </div>
        
        {/* Back of certificate with details */}
        <div className="certificate-back">
          <h3 className="details-title">Certificate Details</h3>
          
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Certificate ID:</span>
              <span className="detail-value">{certificateId}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Course:</span>
              <span className="detail-value">{courseTitle}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Completion Date:</span>
              <span className="detail-value">{formatDate(completionDate)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Issue Date:</span>
              <span className="detail-value">{formatDate(issueDate)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Recipient:</span>
              <span className="detail-value">{shortenAddress(account)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Token ID:</span>
              <span className="detail-value">{tokenId}</span>
            </div>
          </div>
          
          <div className="certificate-actions">
            <button className="action-button">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download
            </button>
            <button className="action-button">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Share
            </button>
            <button className="action-button">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 11V6H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 18L21 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              View on Explorer
            </button>
          </div>
          
          <div className="flip-prompt">
            Click to view certificate
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCertificate; 