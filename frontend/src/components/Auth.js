import React, { useState } from "react";
import { login, register } from "../services/auth";
import { Box,Flex,Input,Button,FormLabel,Image,Text, Heading, color,InputGroup,InputRightElement, useToast,FormControl,FormErrorMessage, } from '@chakra-ui/react'
import { Link } from "react-router-dom";
import axios from "axios";


function Auth() {
  const [username,setUsername]=useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error,setError]= useState(false)


const handleSubmit = async (e) => {
    console.log('hit', email,password)
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post(`http://localhost:8000/api/v1/auth/login`, { email, password });
        if(response.status===200){
          localStorage.setItem("token", response.data.token);
          console.log(response)
          alert('User Login successfully')
          window.location.href = "/dashboard";
        }else{
          alert('Login Failed. Please try again.')
        }        
      } else {
        const response = await axios.post(`http://localhost:8000/api/v1/auth/register`, { username, email, password });
        console.log(response)
        if(response.status===200){
          alert('User created successfully')
          setEmail('')
          setPassword('')
          setUsername('')
        }else{
          alert('Regestration Failed. Please try again.')
          setEmail('')
          setPassword('')
          setUsername('')
        }
      }
    } catch (error) {
      alert("Authentication failed.");
    }
  };


return (
    <div>
      {
        isLogin ?
        <Box w={['80%','50%','50%','30%']} m='auto' boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px' p='5' mt='100px'>
        {/* <Box textAlign='center' fontWeight="bold" fontSize="22px">Admin </Box> */}
        <FormControl>
          <FormLabel>Email*</FormLabel>
          <Input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          {
            error?<FormErrorMessage>Email is required.</FormErrorMessage>:""
          }
          <FormLabel>Password*</FormLabel>
          <Input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <Button mt="15px" mb={5} _hover={{ bg: "rgb(65, 63, 63)" }} w="100%" color="white"  bg="black" onClick={handleSubmit}>Login</Button>
          <Button onClick={() => setIsLogin(!isLogin)} w='100%' _hover={{ bg: "rgb(65, 63, 63)",color:'white' }} m='auto'> Don't have an Account SignUp</Button>
        </FormControl>    
       </Box>      
        :
        <Box w={['80%','50%','50%','30%']} m='auto' boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px' p='5' mt='100px'>
        {/* <Box textAlign='center' fontWeight="bold" fontSize="22px">Admin </Box> */}
        <FormControl>
        <FormLabel>Username*</FormLabel>
        <Input type="text" placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
          <FormLabel>Email*</FormLabel>
          <Input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          {
            error?<FormErrorMessage>Email is required.</FormErrorMessage>:""
          }
          <FormLabel>Password*</FormLabel>
          <Input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <Button mt="15px" mb={5} _hover={{ bg: "rgb(65, 63, 63)" }} w="100%" color="white"  bg="black" onClick={handleSubmit}>Register</Button>
          <Button onClick={() => setIsLogin(!isLogin)} w='100%' _hover={{ bg: "rgb(65, 63, 63)",color:'white' }} m='auto'> Already have an account? Login</Button>
        </FormControl>    
       </Box>  
        
        
      //   <form onSubmit={handleSubmit}>
      // <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      //   <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      //   <input
      //     type="password"
      //     placeholder="Password"
      //     value={password}
      //     onChange={(e) => setPassword(e.target.value)}
      //   />
      //   <button type="submit">{isLogin ? "Login" : "Register"}</button>
      //   <button onClick={() => setIsLogin(!isLogin)}>
      //     {isLogin ? "Switch to Register" : "Switch to Login"}
      //   </button>
      // </form>
      }
      
    </div>
  );
}

export default Auth;
