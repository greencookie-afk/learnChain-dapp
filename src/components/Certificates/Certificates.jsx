import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../../context/WalletContext';
import NFTCertificate from '../NFTCertificate/NFTCertificate';
import './Certificates.css';

const Certificates = () => {
  const { account } = useWallet();
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching certificates from blockchain
    const fetchCertificates = async () => {
      setIsLoading(true);
      
      // Mock data - in a real app this would come from the blockchain
      const mockCertificates = [
        {
          id: "cert-001",
          courseTitle: "Blockchain Fundamentals",
          completionDate: "2023-03-28T14:20:00",
          issueDate: "2023-03-30T09:15:00",
          tokenId: "0x7c3...a1f2",
          imageUrl: "https://placehold.co/600x400/5e35b1/ffffff?text=Certificate",
        },
        {
          id: "cert-002",
          courseTitle: "Smart Contract Development",
          completionDate: "2023-02-15T11:45:00",
          issueDate: "2023-02-18T10:30:00",
          tokenId: "0x9d2...b4e3",
          imageUrl: "https://placehold.co/600x400/673ab7/ffffff?text=Certificate",
        }
      ];
      
      // Simulate network delay
      setTimeout(() => {
        setCertificates(mockCertificates);
        setIsLoading(false);
      }, 1000);
    };
    
    if (account) {
      fetchCertificates();
    } else {
      setIsLoading(false);
    }
  }, [account]);

  return (
    <div className="certificates-container">
      <div className="certificates-header">
        <h2 className="certificates-title">NFT Certificates</h2>
        <p className="certificates-description">
          Your course completion certificates are stored as NFTs on the blockchain, 
          providing verifiable proof of your achievements.
        </p>
      </div>
      
      {!account ? (
        <div className="no-wallet-container">
          <div className="no-wallet-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 14C16.5523 14 17 13.5523 17 13C17 12.4477 16.5523 12 16 12C15.4477 12 15 12.4477 15 13C15 13.5523 15.4477 14 16 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 7L12 2L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="no-wallet-message">Connect your wallet to view your NFT certificates</p>
        </div>
      ) : isLoading ? (
        <div className="certificates-loading">
          <div className="loading-spinner"></div>
          <p>Loading your certificates from the blockchain...</p>
        </div>
      ) : certificates.length > 0 ? (
        <div className="certificates-grid">
          {certificates.map((cert) => (
            <NFTCertificate
              key={cert.id}
              certificateId={cert.id}
              courseTitle={cert.courseTitle}
              completionDate={cert.completionDate}
              issueDate={cert.issueDate}
              tokenId={cert.tokenId}
              imageUrl={cert.imageUrl}
            />
          ))}
        </div>
      ) : (
        <div className="empty-certificates">
          <div className="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="empty-message">You haven't earned any certificates yet</p>
          <p className="empty-submessage">Complete courses to earn NFT certificates</p>
          <Link to="/explore" className="browse-courses-btn">
            Browse Courses
          </Link>
        </div>
      )}
    </div>
  );
};

export default Certificates; 