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
  const [Info,setMyInfo]=useState({})
  function getFeed(){
    axios.get('/api/v1/home/get-feed')
      .then(response => {
        console.log(response.data.data)
        setFeedData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching feed:', error);
      });
  }

  function currentInfo(){
    axios.get('/api/v1/users/current-user')
      .then(response => {
        console.log(response.data.data)
        setMyInfo(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching feed:', error);
      });
  }

  useEffect(() => {
    getFeed();
    currentInfo()
  }, []);

  return (
    <div className='min-h-screen h-full w-full grid justify-center items-start px-32'>
      <div className='grid grid-flow-col place-items-start gap-10'>
      <MyInfo info={Info}/>
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

function MyInfo({info}){
  return(
    <div className='h-fit bg-gray-5 p-5 grid place-items-center rounded-xl'>
      <Link to="/Profile" className='grid place-items-center'><Avatar src={info.avatar} alt="avatar" className='border-4 border-base-accent' size='xxl' />
        <div className='text-center'>
          <h1 className='font-semibold text-md hover:underline underline-offset-2'>{info.fullName}</h1>
          <h1 className='font-semibold text-gray-2 text-sm'>@ {info.userName}</h1>
          <h1 className='font-semibold text-sm py-2 text-base-primary'>{info.companyName}</h1>
        </div></Link>
      <div className='py-4 border-t-2 text-xs'>
        <div className='grid grid-flow-col gap-28 '>
          <h1 className='text-gray-1'>Bids Made</h1>
          <h1 className='text-base-accent font-extrabold'>{info.bidsMadeCount}</h1>
        </div>
        <div className='grid grid-flow-col gap-14'>
          <h1 className='text-gray-1'>Invested Companies</h1>
          <h1 className='text-base-accent font-extrabold'>{info.InvestedCompanyCount}</h1>
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