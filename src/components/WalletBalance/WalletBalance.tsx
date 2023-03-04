import React from "react";
import {Box, Divider, Heading, Spinner, Text} from '@chakra-ui/react'

interface WalletBalanceProps {
  ethBalance: string;
  balanceLoading: boolean;
  network: string;
}
export function WalletBalance(props:WalletBalanceProps){
  const {ethBalance, balanceLoading, network} = props;
  return (
    <Box w="80%" maxW={"500px"} bgColor="blue.200" borderRadius={4} p={4}>
      <Box py={2} display={"flex"} dir="row" justifyContent={"space-between"} alignItems="center">
        <Heading size={"md"}>Wallet Balance</Heading>
        <Box display={"flex"} dir="row" alignItems={"center"}><Heading size={"sm"} pr={1}>Network:</Heading><Text>{network}</Text></Box>
      </Box>
      <Box pt={4} display={"flex"} dir="row" justifyContent={"space-between"} alignItems="center">
        <Text>ETH</Text>
        {balanceLoading && <Spinner size={'xs'} colorScheme="blackAlpha"/>}
        {!balanceLoading && <Text>{ethBalance}</Text>}
      </Box>
    </Box>
  )
}