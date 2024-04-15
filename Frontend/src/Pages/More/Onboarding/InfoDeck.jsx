import { Avatar ,Progress} from "@material-tailwind/react";
import axios from "axios";
import { userInfo } from "os";
import React, { useState } from 'react';
import { RiArrowDropLeftLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function InfoDeck(){
    
    return(
        <div className='grid gap-12 place-items-center w-screen h-full'>
            <ProfileDeck/>
        </div>
    )
}

 function ProfileDeck() {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    profileType: 'Individual',
    bio: '',
    currentInvestors: [],
    connections: [],
    numberOfInvestors: 0,
    stats: {}, // You can define your stats object here
    activity: [],
    products: []
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, e.g., send formData to server
    console.log(formData);
    axios.post(`http://localhost:3000/profile/update-profile/:mridultiwari2002@gmail.com`,formData).then((data)=>{
      if(data.status==201){
        console.log(data)
        // navigate("/Dashboard")
      }
    })
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  

  return (
    <div className="bg-white p-6 w-[30vw] rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
      <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" size="xl" className="p-2" />;
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold mb-2">Full Name</label>
          <input type="text" id="name" name="userId" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-400" />
        </div>
        <div className="mb-4">
          <label htmlFor="companyName" className="block font-semibold mb-2">Current Investorss</label>
          <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-400" />
        </div>
        <div className="mb-4">
          <label htmlFor="profileType" className="block font-semibold mb-2">Profile Type</label>
          <select id="profileType" name="profileType" value={formData.profileType} onChange={handleChange} className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-400">
            <option value="Individual">Individual</option>
            <option value="Company">Company</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="bio" className="block font-semibold mb-2">Bio</label>
          <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-400" />
        </div>
        <button type="submit" className='bg-base-accent py-2 px-6 grid place-items-center text-gray-5 text-xl'>Submit</button>
      </form>
    </div>
  );
}
