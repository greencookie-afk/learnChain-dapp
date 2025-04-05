import { Button, Box, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletConnect = () => {
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
    } else {
      alert("Please install MetaMask");
    }
  };

  return (
    <Box>
      {account ? (
        <Text fontSize="sm" color="green.400">
          Connected: {account.slice(0, 6)}...{account.slice(-4)}
        </Text>
      ) : (
        <Button colorScheme="teal" onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}
    </Box>
  );
};

export default WalletConnect;
