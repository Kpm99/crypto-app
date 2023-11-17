import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from './Loader'
import { server } from '../index'
import { Radio,Container, HStack, VStack,Image, Heading,Text, Button, RadioGroup } from '@chakra-ui/react'
import ErrorComponent from './ErrorComponent'
import CoinCard from './CoinCard'
const Coins = () => {
 const [coins,setCoins]=useState([])
 const [loading,setLoading]=useState(true)
 const [error,setError]=useState(false);
 const [page,setPage]=useState(1);
 const [currency,setCurrency]=useState("inr");
const changePage=(page)=>{
    setPage(page);
    setLoading(true);
}

const btns=new Array(132).fill(1)
 const currencySymbol=currency==="inr"?"₹":currency==="eur"?"€":"$";
    useEffect(()=>{
        const fetchCoins=async ()=>{
           try{ 
            const {data}=await axios.get(`${server}/coins/markets?vs_currency=${currency}`)
        
            console.log(data)

            setCoins(data)
            setLoading(false)
           }catch(error){
            setError(error);
            setLoading(false);
           }
        }
        fetchCoins()
    },[currency,page]);

    if(error){
        return <ErrorComponent message={"errror "}/>
    }
    console.log(currency)
    return (
        <Container maxW={'container.xl'} onChange={(e)=>setCurrency(e.target.value)} p={"8"}>
        {loading?<Loader/>:<>
        <RadioGroup value='currency'>
            <HStack>
                <Radio value="inr">₹ INR</Radio>
                <Radio value="usd">$ USD</Radio>
                <Radio value="eur">€ EUR</Radio>
            </HStack>
        </RadioGroup>
        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i)=>(
                <div>
                    <CoinCard key={i.id}
                    id={i.id}
                    name={i.name} 
                    img={i.image}
                    price={i.current_price}
                    rank={i.trust_score_rank} 
                    currencySymbol={currencySymbol}
                    />
                </div>
            ))}
        </HStack>
        
        <HStack w={"full"} overflow={"auto"} p="8">
            {btns.map((item,index)=>(
                <Button onClick={()=>changePage(index+1)} key={index}  bgColor={"blackAlpha.900"}
                color={"white"}>{index+1}</Button>
            ))}
        </HStack>
        
        </>}
        </Container>
  )
}





   

export default Coins
