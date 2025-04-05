import { createContext, useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if the wallet was previously connected
    const checkConnection = async () => {
      if (window.ethereum && window.ethereum.selectedAddress) {
        try {
          const ethersProvider = new ethers.BrowserProvider(window.ethereum);
          const address = window.ethereum.selectedAddress;
          const ethersSigner = await ethersProvider.getSigner();
          const ethBalance = await ethersProvider.getBalance(address);
          
          setProvider(ethersProvider);
          setSigner(ethersSigner);
          setAccount(address);
          setBalance(ethers.formatEther(ethBalance));
        } catch (err) {
          console.error("Error checking connection:", err);
          setError("Failed to connect to previously connected wallet");
        }
      }
    };
    
    checkConnection();

    // Listen for account changes
    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        // User disconnected wallet
        setAccount(null);
        setBalance(null);
        setSigner(null);
      } else {
        // Account changed
        setAccount(accounts[0]);
        if (provider) {
          updateBalance(accounts[0]);
        }
      }
    };

    // Listen for chain changes
    const handleChainChanged = () => {
      window.location.reload();
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const updateBalance = async (address) => {
    try {
      if (provider) {
        const ethBalance = await provider.getBalance(address);
        setBalance(ethers.formatEther(ethBalance));
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError("Please install MetaMask or another Ethereum wallet");
      return;
    }

    try {
      setIsConnecting(true);
      setError(null);
      
      const ethersProvider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length === 0) {
        throw new Error("No accounts found");
      }
      
      const ethersSigner = await ethersProvider.getSigner();
      const address = accounts[0];
      const ethBalance = await ethersProvider.getBalance(address);
      
      setProvider(ethersProvider);
      setSigner(ethersSigner);
      setAccount(address);
      setBalance(ethers.formatEther(ethBalance));
      setIsConnecting(false);
    } catch (err) {
      console.error("Error connecting wallet:", err);
      setError(err.message || "Failed to connect wallet");
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance(null);
    setSigner(null);
    setProvider(null);
  };

  return (
    <WalletContext.Provider 
      value={{ 
        account, 
        balance, 
        provider, 
        signer, 
        isConnecting, 
        error,
        connectWallet, 
        disconnectWallet,
        updateBalance 
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use wallet context
export const useWallet = () => useContext(WalletContext);