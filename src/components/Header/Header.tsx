import { Box, Button, Heading, Text } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { Web3Provider } from "@ethersproject/providers"

interface HeaderProps{
  provider: Web3Provider;
  walletAddress: string;
  setWalletAddress: (address: string) => void;
}

export function Header(props:HeaderProps) {
  const {provider, walletAddress, setWalletAddress} = props;


  const onConnectClick = useCallback(
    async () => {
      if(provider && provider.provider?.request){
        try{
          const accounts = await provider.provider.request({method:"eth_requestAccounts", params: []});
          setWalletAddress(accounts[0])
        } catch(err){
          console.log('User rejected connection')
        }
      }
    },
    [provider],
  )
  
  return (
    <Box p={4} display="flex" dir="row" justifyContent={"space-between"} alignItems="center" bgColor={"blackAlpha.100"}>
      <Heading color={"blue.500"}>Ethereum Dapp Demo</Heading>
      {!walletAddress && <Button colorScheme={"blue"} onClick={onConnectClick}>Connect</Button>}
      {walletAddress && <Box display={'flex'} dir='row' columnGap={2} alignItems="center"><Text>Connected: {walletAddress}</Text></Box>}
    </Box>
  )
}
