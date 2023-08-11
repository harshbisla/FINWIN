import React, { useEffect, useState } from 'react';
import {
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Text,
  Thead,
  Tr,
  Button,
  useColorModeValue,
  Container,
  HStack,
  VStack
} from "@chakra-ui/react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Card from "components/card/Card";
import mutualFundsData from '../variables/mutualFundsData.json'


const Stocks = () => {
//   const apiKey = "demo";
//   const symbols = ["VFIAX", "VTSAX", "FZROX"]; // Add more symbols as needed // Replace with your symbols

  
//   const [dataRows, setDataRows] = useState([]);
  const [filter, setFilter] = useState("");

//   useEffect(() => {
//     async function fetchMutualFundData() {
//       const rows = [];

//       for (const symbol of symbols) {
//         const response = await fetch(`https://api.twelvedata.com/mutual_funds/world?symbol=${symbol}&apikey=${apiKey}`);
//         const data = await response.json();

//         if (data.mutual_fund && data.mutual_fund.summary) {
//           const mutualFundSummary = data.mutual_fund.summary;

//           const mutualFund = mutualFundSummary.symbol;
//           const price = mutualFundSummary.nav;
//           const volume = mutualFundSummary.net_assets;

//           const row = {
//             mutualFund,
//             price,
//             volume
//           };

//           rows.push(row);
//         }
//       }

//       setDataRows(rows);
//     }

//     fetchMutualFundData();
//   }, []);

  const fundTypeMappings = {
    "large-cap": "Large Blend",
    "mid-cap": "Medium Blend",
    "small-cap": "Small Blend",
  };
  const filteredDataRows = filter
    ? mutualFundsData.filter((row) =>
        row.mutual_fund.summary.fund_type === fundTypeMappings[filter]
      )
    : mutualFundsData;



//   const filteredDataRows = dataRows.filter((row) => {
//     if (filter === "large-cap") {
//       return true;
//     }
//     else if(filter === "mid-cap") {
//         return true;
//       }
//     else{
//         return true;
//     }
//     // Implement your filtering logic based on the market cap here
//     // Example: return row.marketCap === filter;
//   });


  return (
    <Container mt={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>Mutual Fund Data</Text>

      <Card p={6} mt={4} mb={4} width={400}>
        <HStack spacing={2} align="flex-end">
            <Button colorScheme="red" onClick={() => setFilter("large-cap")}>Large-cap</Button>
            <Button colorScheme="yellow" onClick={() => setFilter("mid-cap")}>Mid-cap</Button>
            <Button colorScheme="blue" onClick={() => setFilter("small-cap")}>Small-cap</Button>
        </HStack>
        </Card>
        <Card p={6} width={1200}>
        <Table variant="striped" colorScheme="teal" Flex = "100%"> 
          <Thead>
            <Tr>
              <Th>Mutual Fund</Th>
              <Th>Price</Th>
              <Th>turnover_rate</Th>
              <Th>Type</Th>
              <Th>Return</Th>
              <Th>Risk Rating</Th>
              {/* <Th>Invest</Th> */}
            </Tr>
          </Thead>
          <Tbody>
            {filteredDataRows.map((row, index) => (
              <Tr key={index}>
                <Td>{row.mutual_fund.summary.symbol}</Td>
                <Td>{row.mutual_fund.summary.nav}</Td>
                <Td>{row.mutual_fund.summary.turnover_rate}</Td>
                <Td>{row.mutual_fund.summary.fund_type}</Td>
                <Td>{row.mutual_fund.performance.annual_total_returns[1].share_class_return}</Td>
                <Td>{row.mutual_fund.ratings.risk_rating}</Td>
                <Td>
                  <Button colorScheme="green" size="sm" borderRadius="full">
                    Invest
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default Stocks;