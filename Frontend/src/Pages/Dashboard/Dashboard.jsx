import React, { useEffect, useState } from 'react'
import { Avatar } from "@material-tailwind/react";
import { Bid, Post, PostCards } from '../../Components/Cards';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { RiArrowDropRightFill, RiArrowRightSLine } from 'react-icons/ri';
import { UnderlineTabs } from '@/Components/UnderlineTabs';
export default function Dashboard() {

  window.scrollTo(0,0)

  const [feedData, setFeedData] = useState([]);
  
  useEffect(() => {
    // Make GET request to localhost:3000/feed
    axios.get('/api/v1/home/get-feed')
      .then(response => {
        // Update state with response data
        console.log(response.data.data)
        setFeedData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching feed:', error);
      });
  }, []);

  return (
    <div className='min-h-screen h-full w-full grid justify-center items-start px-32'>
      <div className='grid grid-flow-col place-items-start gap-10'>
      <MyInfo />
      <div className='rounded-xl grid gap-6 col-span-1'>
        <Post/>
        <UnderlineTabs/>
        {/* {feedData && feedData.map((post, index) => (
            <div key={index} className='my-2 h-fit max-w-[42rem] grid grid-flow-col gap-2'>
              <PostCards post={post} />
              <div className='grid place-items-center px-1 bg-gray-5 rounded-xl cursor-pointer'>
              <RiArrowRightSLine className='scale-150' onClick={handleBid}/>
              </div>
            </div>
          ))} */}
        
      </div>
      <Trending/>
      </div>
    </div>
  )
}

function MyInfo(){
  return(
    <div className='h-fit bg-gray-5 p-5 grid place-items-center rounded-xl'>
      <Link to="/Profile"><Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" className='border-4 border-base-accent' size='xxl'/></Link>
      <div className='text-center'>
        <h1 className='font-semibold text-md py-2'>Mridul Tiwari</h1>
        <h1 className='font-semibold text-sm py-2 text-gray-6'>Unicorn: Bharat Pay | Accenture</h1>
      </div>
      <div className='py-6 border-t-2 text-xs'>
      <div className='grid grid-flow-col gap-32 '>
        <h1 className='text-gray-1'>Bids Made</h1>
        <h1 className='text-base-accent'>25</h1>
      </div>
      <div className='grid grid-flow-col gap-16'>
        <h1 className='text-gray-1'>Invested Companies</h1>
        <h1 className='text-base-accent'>25</h1>
      </div>
      </div>
      <div className='py-6 border-t-2 text-xs'>
        <h1 className='font-semibold pb-4'>Recent</h1>
      <div className='grid grid-flow-col gap-32 '>
        <h1 className='text-gray-1'>Bids Made</h1>
        <h1 className='text-base-accent'>25</h1>
      </div>
      <div className='grid grid-flow-col gap-16'>
        <h1 className='text-gray-1'>Invested Companies</h1>
        <h1 className='text-base-accent'>25</h1>
      </div>
      </div>
      <div className='py-6 border-t-2 text-xs'>
        <h1 className='font-semibold pb-4'>Groups</h1>
      <div className='grid grid-flow-col gap-32 '>
        <h1 className='text-gray-1'>Bids Made</h1>
        <h1 className='text-base-accent'>25</h1>
      </div>
      <div className='grid grid-flow-col gap-16'>
        <h1 className='text-gray-1'>Invested Companies</h1>
        <h1 className='text-base-accent'>25</h1>
      </div>
      </div>
    </div>
  )
}

function Trending(){
  return(
    <div className=' py-10 px-6 max-w-72 bg-gray-5 h-fit grid gap-2 rounded-xl'>
      <h1 className='font-semibold tracking-wider text-lg'>Trending</h1>
      <div className='flex flex-col gap-4 text-xs'>
        <p className='text-gray-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit,...</p>
        <p className='text-gray-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit,...</p>
        <p className='text-gray-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit,...</p>
        <p className='text-gray-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit,...</p>
        <p className='text-gray-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit,...</p>
       
      </div>
      <button className='bg-base-accent py-2 px-6 grid place-items-center text-gray-5 text-md'>Show More</button>
    </div>
  )
}