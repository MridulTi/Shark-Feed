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
    fullName:"",
    userName:"",
    email:"",
    category:"",
    companyName:"",
    password:""
  })
  const navigate=useNavigate()

  function handleSignup(e){
    e.preventDefault()
    console.log(Formdata)
    axios.post("/api/v1/users/register",Formdata).then((data)=>{
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
      <Input label="FullName" required name="fullName" onChange={(e)=>handleInputchange(e)} />
      <Input label="Username" required name="userName" onChange={(e)=>handleInputchange(e)} />
      <Input label="Email" required name="email" onChange={(e)=>handleInputchange(e)}  />
      <Input label="Password" required name="password" onChange={(e)=>handleInputchange(e)}  />
      <Input label="Company Name" required name="companyName" onChange={(e)=>handleInputchange(e)}  />
      <Select label="Category" required id="type" name="category" onChange={(e)=>setFormData(e.target.value)} >
        <Option>StartUp</Option>
        <Option>Investor</Option>
      </Select>
      <Button variant="gradient" onClick={(e)=>handleSignup(e)}>Signup</Button>
    </div>
  )
}
function Login(){
  const[Formdata,setFormData]=useState({
    email:"",
    userName:"",
    password:"",
  })
  const navigate=useNavigate()
  function handleLogin(e){
    e.preventDefault()
    axios.post("api/v1/users/login",Formdata).then((data)=>{
      if(data.status==200){
        navigate("/Dashboard")
      }
    })
    // console.log(Formdata)
  }
  function handleInputchange(e,name=null){
    const {name:inputName,value}=e.target
    const fieldName=name||inputName
    setFormData({
      ...Formdata,
      [fieldName]:value
    })
    console.log(Formdata)
  }
  return(
    <div className='grid gap-4'>
      <Input label="Email or Username" required name="email" onChange={(e)=>{
        if(!e.target.value.includes('@')) handleInputchange(e,"userName");
        
        handleInputchange(e)}
        }  />
      <Input label="Password" type='password' name="password" onChange={(e)=>handleInputchange(e)}  />
      <Button variant="gradient" onClick={(e)=>handleLogin(e)}>Login</Button>
    </div>
  )
}