import React from 'react'
import {Box,Heading,Button,Grid,GridItem,Input,Text,Flex,useDisclosure,Modal,ModalBody,ModalOverlay,ModalCloseButton,ModalContent,ModalHeader,Spinner} from '@chakra-ui/react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'



const Notes = () => {
  const [data,setData] =useState([])
  const [title,setTitle]= useState("")
  const [note,setNote]= useState("")
  const [category,setCategory]=useState("")
  const {isOpen,onOpen,onClose} = useDisclosure()
  const [isLoading,setIsLoading]=useState(false)


// ........................... All Notes Method here ........................

const getData=()=>{
  axios.get(`http://localhost:8000/api/v1/title`,{
    headers:{
      authorization:`Bearer ${localStorage.getItem("token")}`
    }
  })
  .then((res)=>{
    console.log(res,'res')
    setData(res.data.notes)
  })
}
useEffect(()=>{
 getData()
},[])


// ........................... Delete Method here ........................

const handleDelete=(noteID)=>{
  setIsLoading(true)
  axios.delete(`http://localhost:8000/api/v1/title/${noteID}`,{
    headers:{
      authorization:`Bearer ${localStorage.getItem("token")}`
    }
  })
  .then((res)=>{
    setIsLoading(false)
    getData()
    alert("Note Deleted Successfully")
  })
  .catch((err)=>{
    console.log(err)
    setIsLoading(false)
  })
}


// ........................... Edit Method here ........................

const handleEdit=(noteID)=>{
  const payload={
    title,
    note,
    category
  }
  setIsLoading(true)
  axios.patch(`http://localhost:8000/api/v1/title/update/${noteID}`,payload,{
    headers:{
      authorization:`Bearer ${localStorage.getItem("token")}`
    }
  })
  .then((res)=>{
    setIsLoading(false)
    getData()
    setTitle(" ")
    setNote(" ")
    setCategory(" ")
    alert("Note Edited Successfully")
  })
}

if(isLoading){
  return <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl'/>
}


  return (
    <>
    <Box>
      <Heading m='10'>All Notes Here</Heading>
      <Grid gridTemplateColumns={["repeat(1,1fr)","repeat(2,1fr)","repeat(2,1fr)","repeat(4,1fr)"]} gap='15px'>
      {
        data && data.length>0 && data.map((notes)=>{
          return( 
            <>
            <GridItem p={2} boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px' key={notes._id} >
              <Flex justifyContent='space-around'>
                <Text>{notes.NoteDate}</Text>
                <Text>{notes.NoteTime}pm</Text>
              </Flex>
              <Heading fontSize='20px' p={5}>{notes.title}</Heading>
              <Text>Category : {notes.category}</Text>
              <Text fontSize='20px'p={5}>Note : {notes.note}</Text>
              <Button m={2} onClick={()=>handleDelete(notes._id)}>Delete</Button>
              <Button onClick={onOpen}>Edit</Button>
            </GridItem>
<Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Update Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody mt='-8'>
                        <Flex direction="column" gap="10px" mt="50px">
                        <label>New Title</label>
                        <Input type="text" placeholder="New First Name" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                        <label>New Category</label>
                        <Input type="text" placeholder="New Last Name" value={category} onChange={(e)=>setCategory(e.target.value)}/>
                        <label>New Desc</label>
                        <Input type="text" placeholder="New Role" value={note} onChange={(e)=>setNote(e.target.value)}/>
                        <Button onClick={()=>handleEdit(notes._id)} mb="25px" color="white" bg="black" _hover={{bg:"grey"}} >Update</Button>
                        </Flex> 
                    </ModalBody>
                    </ModalContent>
                </Modal>
            </>
            
        )
        })
      }
      </Grid>
    </Box>
    </>
  )
}
export default Notes
