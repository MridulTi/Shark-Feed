import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
// Create the modal context
const ModalContext = createContext();

// Create a custom hook to use the modal context
export const useModal = () => useContext(ModalContext);

// Create the ModalProvider component
export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [info,setInfo]=useState({
    type:"",
    companyData:[],
    compName:"",
    compType:""
  })
  const [files, setFiles] = useState([]);
  const [Images, setImage] = useState([]);
  const [post,setPost]=useState({
    caption:"",
    Image:[],
    hashtage:[""],
    likes:0,
    Comments:[{Count:0,list:[]}]
  })
  const sendImg=(event)=>{
    // console.log(event.target.files[0].name)
    const newFiles=Array.from(event.target.files)
    setImage([...Images, ...newFiles]);
  }
  const handlePost=(event)=>{
    const {name,value}=event.target
    setPost({...post,[name]:value ,Image:Images});
  }
  console.log(Images)
  
  const posting=(formData)=>{
    axios.post("api/v1/posts/post",formData).then((data)=>{
      if(data.status==201 || data.status==200){
        console.log(data)
      }
    }).catch((err)=>console.log(err))
  }
  const handleInfo=()=>{
    setInfo({...info,companyData:files})
    axios.post("http://localhost:3000/compDoc",info).then((data)=>{
      if(data.status==201){
        navigate("/Dashboard")
      }
      // console.log(data)
    })
  }
  const handleCompData=(e)=>{
    const {name,value}=e.target
    setInfo({...info,[name]:value });
  }

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
  }
  const handleFileChange = (e) => {
    // console.log(Array.from(e.target.files))
    const newFiles=Array.from(e.target.files)
    setFiles([...files, ...newFiles]);
  };

  // console.log(info)
  const value = {
    isOpen,
    post,
    setPost,
    handlePost,
    openModal,
    closeModal,
    files,
    sendImg,
    handleFileChange,
    handleInfo,
    posting,
    handleCompData
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};
