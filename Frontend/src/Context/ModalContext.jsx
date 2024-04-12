import React, { createContext, useContext, useState } from 'react';

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
  const handleInfo=()=>{
    setInfo({...info,companyData:files})
    axios.post("http://localhost:3000/compDoc",info).then((data)=>{
      if(data.status==201){
        navigate("/Dashboard")
      }
      console.log(data)
    })
  }
  const handleCompData=(e)=>{
    const {name,value}=e.target
    setInfo({...info,[name]:value });
  }
  const [files, setFiles] = useState([]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
  }
  const handleFileChange = (e) => {
    // console.log(Array.from(e.target.files))
    const newFiles=Array.from(e.target.files)
    setFiles([...files, ...newFiles]);
  };

  console.log(info)
  const value = {
    isOpen,
    openModal,
    closeModal,
    files,
    handleFileChange,
    handleInfo,
    handleCompData
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};
