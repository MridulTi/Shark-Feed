import { Progress } from '@material-tailwind/react';
import React, { useState } from 'react'
import { RiVipCrown2Fill, RiBuilding2Fill, RiUser2Fill, RiArrowDropLeftLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

export default function ChooseProfile() {
  return (
      <div className="grid place-items-center h-screen w-screen">
        <div >
          <Header />
          <Card />
          <Footer />
          <div className='pt-10'>
          <Progress value={10} className='bg-gray-3'/>
          </div>
        </div>
        
      </div>
  )
}

function Header() {
  // Header content here
  return (
    <div className='grid gap-4'>
      <div className='text-5xl font-semibold'><b><h1>Choose Your Profile Type</h1></b></div>
      <h2 className='text-xl font-semibold'>What do you want to login as?</h2>
    </div>
  )
}

function Card() {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (cardName) => {
    setActiveCard(cardName);
  };

  return (
    <div className='grid grid-flow-col gap-12 place-items-center m-4'>
      <div
        className={`grid place-items-center border-4 ${activeCard === 'invester' ? 'border-base-primary bg-gray-5' : 'bg-base-secondary border-gray-4'
          } aspect-square p-16 rounded-lg cursor-pointer`}
        onClick={() => handleCardClick('invester')}
      >
        <RiVipCrown2Fill className={`text-gray-2 text-6xl ${activeCard === "invester" ? "text-base-primary" : "text-gray-3"}`} />
        <h2 className='text-3xl'>Investor</h2>
      </div>
      <div
        className={`grid place-items-center  border-4  ${activeCard === 'company' ? 'border-base-primary bg-gray-5' : 'bg-base-secondary border-gray-4'
          } aspect-square p-16 rounded-lg cursor-pointer`}
        onClick={() => handleCardClick('company')}
      >
        <RiBuilding2Fill className={`text-gray-2 text-6xl ${activeCard === "company" ? "text-base-primary" : "text-gray-3"}`} />
        <h2 className='text-3xl'>Company</h2>
      </div>
      <div
        className={`grid place-items-center border-4 ${activeCard === 'people' ? 'border-base-primary bg-gray-5' : 'bg-base-secondary border-gray-4'
          } aspect-square p-16 rounded-lg cursor-pointer`}
        onClick={() => handleCardClick('people')}
      >
        <RiUser2Fill className={`text-gray-2 text-6xl ${activeCard === "people" ? "text-base-primary" : "text-gray-3"}`} />
        <h2 className='text-3xl'>People</h2>
      </div>
    </div>
  )
}

function Footer() {
  // Footer content here
  return (
    <div className=' grid grid-flow-col place-content-center gap-4 m-2'>
      <button className='bg-gray-5 border border-gray-3 p-1 grid place-items-center aspect-square'><RiArrowDropLeftLine className='text-4xl' /></button>
      <Link to="/Onboarding/2"><button className='bg-base-accent py-2 px-6 grid place-items-center text-gray-5 text-xl'>Next</button></Link>
    </div>
  )
}