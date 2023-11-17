import { Container,Box ,Radio,RadioGroup,HStack,Stat,
    StatLabel,StatNumber,StatArrow,StatHelpText, 
    VStack,Text,Image, Badge,Progress,Button} from '@chakra-ui/react'

import Chart from './chart';
import React from 'react'
import{ useState,useEffect} from "react";
import Loader from './Loader';
import {useParams} from "react-router-dom"
import axios from 'axios';
import { server } from '../index'
const CoinDetails = () => {
    const params = useParams();
    const [coins,setCoins]=useState({})
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false);
    const [page,setPage]=useState(1);
    const [currency,setCurrency]=useState("inr");
    const [days,setDays]=useState("24h");
    const [chartArray,setChartArray]=useState("20");
    const currencySymbol=currency==="inr"?"₹":currency==="eur"?"€":"$";
    const switchChartStats=(key)=>{
        switch (key) {
            case "24h":
                setDays("24h");
                setLoading(true);
                break;
                case "7d":
                    setDays("7d");
                    setLoading(true);
                    break;
                case "14d":
                setDays("14d");
                setLoading(true);
                break;
                case "30d":
                setDays("28d");
                setLoading(true);
                break;
                case "60d":
                setDays("60d");
                setLoading(true);
                break;
                case "200d":
                setDays("200d");
                setLoading(true);
                break;
                case "1y":
                setDays("365d");
                setLoading(true);
                break;
            default:
                break;
        }
    }
    const btns=["24h","7d","14d","30d","60d","200d","1y"]
    useEffect(()=>{
        const fetchCoin=async ()=>{
           try{ 
            const {data}=await axios.get(`${server}/coins/${params.id}`)
            const {data:chartData}=await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
            
            
            setCoins(data)
            setLoading(false);
            setChartArray(chartData.prices)
           }catch(error){
            setError(true);
            setLoading(false);
           }
        }
        fetchCoin()
    },[params.id,currency,days]);
  return (
    <Container maxW={'container.xl'}>
        {loading?<Loader/>:
        <>
        <Box width="full" borderWidth={1}>
            <Chart currency={currencySymbol} arr={chartArray} days={days}/>
        </Box>

        <HStack p="4" wrap="wrap"> 
            {btns.map((i)=>(
                <Button key={i} onClick={()=>switchChartStats(i)}>
                    {i}
                </Button>
            ))}
        </HStack>
        <RadioGroup value='currency'>
            <HStack>
                <Radio value="inr">₹ INR</Radio>
                <Radio value="usd">$ USD</Radio>
                <Radio value="eur">€ EUR</Radio>
            </HStack>
        </RadioGroup>
        <VStack spacing={'4'} p={'16'} alignItems={'flex-start'}>

            <Text fontSize={"small"} alignSelf="center" opacity="0.7">
                Last updated on {Date().split("G")[0]}
            </Text>
            <Image src={coins.image.large} w={"16"} h={"16"} 
            objectFit="contain"/>
            <Stat>
                <StatLabel>{coins.name}</StatLabel>
                <StatNumber>{currencySymbol}{coins.market_data.current_price[currency]}</StatNumber>
            
            <StatHelpText>
                <StatArrow type={coins.market_data.price_change_percentage_24h>0?"increase":'decrease'}
                >{coins.market_data.price_change_percentage_24h}%</StatArrow>
            </StatHelpText>
            </Stat>

            <Badge fontSize={"2xl"} bgColor={"blackAlpha.900"} color={"white"}>
                {`#${coins.market_cap_rank}`}
            </Badge>

            <CustomBar high={`${currencySymbol}${coins.market_data.high_24h[currency]}`} low={`${currencySymbol}${coins.market_data.low_24h[currency]}`}/>

            <Box w={"full"} p={4} >
                <Item title={"Max Supply"} value={coins.market_data.max_supply}/>
                <Item title={"Circulating Supply"} value={coins.market_data.circulating_supply}/>
                <Item title={"Market Cap"} value={`${currencySymbol}${coins.market_data.market_cap[currency]}`}/>
                <Item title={"All Time Low"} value={`${currencySymbol}${coins.market_data.atl[currency]}`}/>
                <Item title={"All Time high"} value={`${currencySymbol}${coins.market_data.ath[currency]}`}/>

            </Box>
        </VStack>
        </>}
    </Container>
  )
}

const Item=({title,value})=>(
    <HStack justifyContent={"space-between"} w={"full"} my={4}>
        <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
        <Text >{value}</Text>
    </HStack>
)

const CustomBar=({high,low})=>(
    <VStack w={"full"}>
        <Progress value={50} colorScheme='teal' w={"full"} />

        <HStack justifyContent={"space-between"} w={"full"}>
        <Badge children={low} colorScheme='red'/>

        <Text fontSize={"sm"} > 24H range</Text>
        <Badge children={high} colorScheme='green'/>

        </HStack>
    </VStack>
)

export default CoinDetails
