import React, { useEffect, useState } from 'react'
import ConnectButton from '../../Components/ConnectWallet/ConnectButton'
import {useDispatch} from "react-redux"
import {  connectWallet } from '../../app/wallet.service';
import axios from "axios"
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,Select, Option ,Button,Input
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
  
export default function LandingPage() {
  const dispatch=useDispatch();

  // useEffect(()=>{
  //   dispatch(connectWallet())
  // },[])
  
  
  
  const data = [
    {
      label: "SignUp",
      value: "html",
      desc: <Signup/>
    },
    {
      label: "Login",
      value: "react",
      desc: <Login/>
    },
    
  ];
  return (
    <div  className='bg-base-secondary grid w-screen h-screen place-items-center'>
      {/* <ConnectButton/> */}
      <div className='w-72 p-5 bg-gray-5 rounded-2xl h-fit'>
      <Tabs value="html">
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
      </div>
    </div>
  )
}
function Signup(){
  const[Formdata,setFormData]=useState({
    name:"",
    email:"",
    password:"",
  })
  const navigate=useNavigate()

  function handleSignup(e){
    e.preventDefault()
    console.log(Formdata)
    axios.post("http://localhost:3000/api/signup",Formdata).then((data)=>{
      if(data.status==201){
        navigate("/Onboarding")
      }
      console.log(data)
    })
  }
  function handleInputchange(e){
    const {name,value}=e.target
    setFormData({
      ...Formdata,
      [name]:value
    })
    // console.log(Formdata)
  }
  return(
    <div className='grid gap-4'>
      <Input label="Username" name="name" onChange={(e)=>handleInputchange(e)} />
      <Input label="Email" name="email" onChange={(e)=>handleInputchange(e)}  />
      <Input label="Password" name="password" onChange={(e)=>handleInputchange(e)}  />
      {/* <Select label="Type" id="type" onChange={()=>setFormData(e.target.value)} >
        <Option>StartUp</Option>
        <Option>Investor</Option>
        <Option>Normal Public</Option>
      </Select> */}
      <Button variant="gradient" onClick={(e)=>handleSignup(e)}>Signup</Button>
    </div>
  )
}
function Login(){
  const[Formdata,setFormData]=useState({
    name:"",
    password:"",
  })
  const navigate=useNavigate()
  function handleLogin(e){
    e.preventDefault()
    axios.post("http://localhost:3000/api/login",Formdata).then((data)=>{
      if(data.status==200){
        navigate("/Dashboard")
      }
    })
    // console.log(Formdata)
  }
  function handleInputchange(e){
    const {name,value}=e.target
    setFormData({
      ...Formdata,
      [name]:value
    })
    console.log(Formdata)
  }
  return(
    <div className='grid gap-4'>
      <Input label="Email" name="email" onChange={(e)=>handleInputchange(e)}  />
      <Input label="Password" type='password' name="password" onChange={(e)=>handleInputchange(e)}  />
      <Button variant="gradient" onClick={(e)=>handleLogin(e)}>Login</Button>
    </div>
  )
}