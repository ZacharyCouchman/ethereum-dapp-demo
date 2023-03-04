import React, { useEffect, useState } from 'react';
import { Box, ChakraProvider, Link, Text } from '@chakra-ui/react'
import { Header } from './components/Header';
import detectEthereumProvider from '@metamask/detect-provider';
import { Web3Provider } from '@ethersproject/providers';
import { WalletBalance } from './components/WalletBalance';
import { formatEther } from 'ethers/lib/utils';
function App() {
  const [provider, setProvider] = useState<Web3Provider | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("")
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [network, setNetwork] = useState("");
  
  useEffect(() => {
    const getMetamaskProvider = async () => {
      const metamaskProvider = await detectEthereumProvider();
      if(metamaskProvider){
        metamaskProvider.on('disconnect', () => window.location.reload)
        setProvider(new Web3Provider(metamaskProvider))
      }
    }
    getMetamaskProvider();
  }, [])

  useEffect(() => {
    const getBalance = async() => {
      if(provider && walletAddress){
        setBalanceLoading(true);
        const network = await provider.getNetwork();
        setNetwork(network.name)
        const balance = await provider.getBalance(walletAddress);
        setBalance(formatEther(balance))
        setBalanceLoading(false);
      }
    }
    getBalance();
  }, [provider, walletAddress])
  
  return (
    <ChakraProvider>
      <Box w="100%">
        {provider && <Header provider={provider} walletAddress={walletAddress} setWalletAddress={setWalletAddress} />}
        {!provider && <Text>Please install the MetaMask browser extension from: <Link href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en'>Get Metamask</Link></Text>}
        <Box display={"flex"} dir="column" justifyContent={"center"} alignItems={"center"} p={4}>
          {walletAddress && <WalletBalance ethBalance={balance} balanceLoading={balanceLoading} network={network}/>}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
