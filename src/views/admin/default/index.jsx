import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
  Progress
} from "@chakra-ui/react";
import {abs} from 'math'
// Assets
// import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import MiniStatics2 from "components/card/MiniStatics2";

import IconBox from "components/icons/IconBox";
import React,{useEffect,useState} from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
// import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import axios from 'axios'

export default function UserReports() {
  // Chakra Color Mode
  let ftrans=[]
  let type=[]
  const [user,setUser]=useState([])
  const [trans,setTrans]=useState([])
  const [isLoading,setIsLoading]=useState(true)

  const [sales,setSales]=useState(0)
  const [exp,setExp]=useState(0)
  const [balance,setBalance]=useState(0)
  const [income,setIncome]=useState(0)
  
  useEffect(async()=>{
    // if (isStopped) {
    //   return;
    // }
    const email='nav@gmail.com'
    const response=await axios.post('http://localhost:8000/getUser',{email})
    const resTrans=await axios.post('http://localhost:8000/getTrans',{email})
    setUser(await response.data)
    setTrans(await resTrans.data)
    setIsLoading(false)
  },[])

  useEffect(async()=>{
    let s=0
    let e=0
    trans.map((tran)=>{
      if(tran.amount>0)
      {
        s+=tran.amount
      }
      else if(tran.amount<0){
        e+=abs(tran.amount)
      }
    })
    setSales(await s)
    setExp(await e)
  },[trans])

  // useEffect(async()=>{
  //   user.map((tran)=>{
      
  //   })
  //   setIncome(await user[0].netincome)
  //   setBalance(await user[0].netincome)
  // },[user])
  
  // console.log(data)
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>  
        {isLoading ? (
        <div><Progress size="xs" isIndeterminate /></div>
      ) : (<>
        <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
              }
            />
          }
          name='Earnings'
          value={user[0].netincome}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name='Spend this month'
          value={exp}
        />
        
        <MiniStatistics name='Sales' value={sales} />
        <MiniStatistics
        
          name='Your balance'
          value={user[0].netincome-exp+sales}
        />
        <MiniStatics2
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name='Total Transactions'
          value={trans.length}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalSpent exp={exp} trans={trans} salary={user[0].netincome}/>
        <WeeklyRevenue />
      </SimpleGrid>
      {
        trans.map((tran,index)=>{
          if(index<5){
            ftrans[index]=trans[trans.length-index-1]
            if(trans[trans.length-index-1].amount<0)
            {
              ftrans[index].type="DEBIT"
            }
            else{
              ftrans[index].type="CREDIT"
            }
          }
        })
      }
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <CheckTable columnsData={columnsDataCheck} tableData={ftrans} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid>
      </SimpleGrid>
      </>
      )}
    </Box>
  );
}
