import { useWallet } from '../../context/WalletContext';
import './WalletConnect.css';

const WalletConnect = () => {
  const {
    account,
    lrnBalance,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet
  } = useWallet();

  return (
    <div className="wallet-connect-container">
      {error && <div className="wallet-error">{error}</div>}

      {account ? (
        <div className="wallet-connected">
          <span className="account-display" onClick={disconnectWallet} title="Click to disconnect wallet">
            <svg className="wallet-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M16 12C16 10.8954 16.8954 10 18 10H22V14H18C16.8954 14 16 13.1046 16 12Z" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="address">{account.slice(0, 6)}...{account.slice(-4)}</span>
            {lrnBalance && <span className="balance">{Number(lrnBalance).toFixed(2)} LRN</span>}
          </span>
        </div>
      ) : (
        <button
          className="connect-wallet-button"
          onClick={connectWallet}
          disabled={isConnecting}
        >
          <svg className="wallet-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M16 12C16 10.8954 16.8954 10 18 10H22V14H18C16.8954 14 16 13.1046 16 12Z" stroke="currentColor" strokeWidth="2" />
          </svg>
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
    </div>
  );
};

export default WalletConnect;