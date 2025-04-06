import { createContext, useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import LRNTokenABI from '../contracts/abis/LRNToken.json';

export const WalletContext = createContext();

// LRN token contract address from environment variables
const LRN_TOKEN_ADDRESS = import.meta.env.VITE_LRN_TOKEN_ADDRESS;

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [lrnBalance, setLrnBalance] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [lrnToken, setLrnToken] = useState(null);
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

          // Set up LRN token contract
          const tokenContract = new ethers.Contract(
            LRN_TOKEN_ADDRESS,
            LRNTokenABI,
            ethersProvider
          );
          setLrnToken(tokenContract);

          // Get LRN token balance
          updateLrnBalance(address, tokenContract);
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
        setLrnBalance(null);
        setSigner(null);
      } else {
        // Account changed
        setAccount(accounts[0]);
        if (provider) {
          updateBalance(accounts[0]);
          if (lrnToken) {
            updateLrnBalance(accounts[0], lrnToken);
          }
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

  const updateLrnBalance = async (address, tokenContract) => {
    try {
      if (tokenContract) {
        // Get the actual token balance
        const rawBalance = await tokenContract.balanceOf(address);
        const decimals = await tokenContract.decimals();
        const formattedBalance = ethers.formatUnits(rawBalance, decimals);
        setLrnBalance(formattedBalance);
      }
    } catch (error) {
      console.error("Error fetching LRN balance:", error);
      // Fallback to mock data if there's an error
      setLrnBalance("0.0");
    }
  };

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

      // Set up LRN token contract
      const tokenContract = new ethers.Contract(
        LRN_TOKEN_ADDRESS,
        LRNTokenABI,
        ethersProvider
      );
      setLrnToken(tokenContract);

      setProvider(ethersProvider);
      setSigner(ethersSigner);
      setAccount(address);
      setBalance(ethers.formatEther(ethBalance));

      // Get LRN token balance
      updateLrnBalance(address, tokenContract);

      // Set authentication status in localStorage
      localStorage.setItem('isAuthenticated', 'true');

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
    setLrnBalance(null);
    setSigner(null);
    setProvider(null);
    setLrnToken(null);

    // Clear authentication status in localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
  };

  return (
    <WalletContext.Provider
      value={{
        account,
        balance,
        lrnBalance,
        provider,
        signer,
        lrnToken,
        isConnecting,
        error,
        connectWallet,
        disconnectWallet,
        updateBalance,
        updateLrnBalance
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use wallet context
export const useWallet = () => useContext(WalletContext);