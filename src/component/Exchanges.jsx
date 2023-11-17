import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from './Loader'
import { server } from '../index'
import { Container, HStack, VStack,Image, Heading,Text } from '@chakra-ui/react'
import ErrorComponent from './ErrorComponent'
const Exchanges = () => {
 const [exhanges,setExchanges]=useState([])
 const [loading,setLoading]=useState(true)
 const [error,setError]=useState(false);
    useEffect(()=>{
        const fetchExchages=async ()=>{
           try{ 
            const {data}=await axios.get(`${server}/exchanges`)
        
            console.log(data)

            setExchanges(data)
            setLoading(false)
           }catch(error){
            setError(error);
            setLoading(false);
           }
        }
        fetchExchages()
    },[]);

    if(error){
        return <ErrorComponent message={"errror "}/>
    }
    return (
        <Container maxW={'container.xl'}>
        {loading?<Loader/>:<>
        
        <HStack wrap={"wrap"}>
            {exhanges.map((i)=>(
                <div>
                    <ExchageCard key={i.id}name={i.name} img={i.image}
                    rank={i.trust_score_rank} url={i.url}/>
                </div>
            ))}
        </HStack>
        
        
        
        </>}
        </Container>
  )
}

export default Exchanges


const ExchageCard=({name,img,rank,url})=>(
<a href={url} target='_blank'> 
<VStack w={"52"} shadow={"lg"} p={"8"} borderRadius={"lg"} 
m={"4"} css={{"&:hover":{
    transform:"scale(1.1)"
}}}
transition={"all 0.3s"}>
    <Image src={img} w={"10"} h={"10"} objectFit={"contain"}  />
    <Heading size={"md"} noOfLines={1}>
        {rank}
    </Heading>
    <Text noOfLines={1}>{name}</Text>

</VStack>
</a>
)
   
