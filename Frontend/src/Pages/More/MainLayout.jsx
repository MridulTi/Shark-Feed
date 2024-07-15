import { Avatar } from '@material-tailwind/react'
import React, { Children, useEffect, useState } from 'react'
import { BiSolidBellRing, BiSolidHomeCircle, BiSolidMessageSquareDetail } from "react-icons/bi";
import { RiHome7Fill, RiUserFill } from "react-icons/ri";
import { Link, Outlet, useLocation } from 'react-router-dom'
import LogoutButton from '../../Components/Logout'
import { ProfileMenu } from '@/Components/ProfileMenu';
import UserSearch from '@/Components/UserSearch';
import { NotificationsMenu } from '@/Components/Notification';
import axios from 'axios';

export default function MainLayout() {
  const location = useLocation();
  const isDashboard = location.pathname === "/Dashboard";
  const isNotification = location.pathname === "/Notification";
  const isProfile = location.pathname === "/Profile";
  const isMessages = location.pathname === "/Messages";

  
  return (

    <>
      <nav className="z-50 w-screen flex py-1 justify-center place-items-center fixed top-0 px-24 bg-base-accent space-x-2">
      <div className='flex w-1/3 gap-10 items-center'>
      <Link to="/Dashboard"><div className='flex gap-4 place-items-center'>
        {/* <Avatar/> */}
        <h1 className='text-gray-5 font-semibold'>Shark Feed</h1>
      </div></Link>
      <div>
        <UserSearch/>
      </div>
      </div>
      <div className='flex gap-10 px-12 text-gray-5 place-items-center'>
      <Link to="/Dashboard">
        <div className={`grid place-items-center hover:text-gray-5 ${isDashboard?"text-gray-5 underline decoration-4 underline-offset-8":"text-gray-4"}`}>
          <RiHome7Fill className='text-3xl'/>
          <p className='text-xs tracking-wider'>Home</p>
        </div>
        </Link>
        <Link to="/Messages">
        <div className={`grid place-items-center ${isMessages?"text-gray-5 underline decoration-4 underline-offset-8":"text-gray-4"} hover:text-gray-5`}>
          <BiSolidMessageSquareDetail className='text-3xl'/>
          <p className='text-xs tracking-wider'>Messages</p>
        </div>
        </Link>
        <div className={`grid place-items-center ${isNotification?"text-gray-5 underline decoration-4 underline-offset-8":"text-gray-4"} hover:text-gray-5`}>
          <NotificationsMenu/>
          <p className='text-xs tracking-wider'>Notification</p>
        </div>
        <div className={`${isProfile?"text-gray-5 underline decoration-4":"text-gray-4"}`}>
          <ProfileMenu/>
        </div>
      </div>


        
      </nav>
      <div className='bg-base-secondary pt-20 overflow-x-hidden'>
        <Outlet />
      </div>

    </>


    // <div className='bg-base-tertiary text-gray-5 overflow-x-hidden'>
    //   <div className='absolute w-screen z-10'>
    //   {/* <Navbar/> */}
    //   <div className='fixed text-gray-5 bg-base-primary grid justify-center w-52 pt-6 h-screen'>
    //     <div className="text-center">
    //       <h1 className='flex gap-4 justify-start px-4 font-bold text-xl pb-16'> NormalEZ</h1>
    //       <ul className='grid gap-2 text-gray-3 text-md font-semibold'>
    //         <Link to="/admin" className={buttonVariants({ variant: "secondary", size: "sm", className: "flex w-52 text-gray-5 gap-4 hover:bg-base-accent hover:text-gray-10" })}><DockIcon/> ADMIN</Link>
    //         <Link to="/" className={buttonVariants({ variant: "secondary", size: "sm", className: "flex w-52 text-gray-5 gap-4 hover:bg-gray-5 hover:text-gray-10" })}><Upload/> Upload</Link>

    //         <Dialog className="">
    //           <DialogTrigger className="flex w-52 gap-4  px-10 py-2 rounded-lg hover:bg-base-accent hover:text-gray-10"><UploadIcon/> Upload</DialogTrigger>
    //           <DialogOverlay className="w-screen h-screen bg-gray-6 opacity-40 grid place-items-center">
    //             <DialogContent className=" p-5 rounded-2xl sm:max-w-[425px] bg-gray-5 text-gray-10">
    //               <DialogHeader>
    //                 <DialogTitle className="font-bold text-xl">Upload</DialogTitle>
    //               </DialogHeader>
    //               <div className="grid w-full max-w-sm items-center gap-1.5">
    //                 Upload

    //               </div>
    //             </DialogContent>
    //           </DialogOverlay>
    //         </Dialog>
    //         <LogoutButton/>
    //       </ul>
    //     </div>
    //   </div>
    //   </div>
    //   <div>
    //      <Outlet/>
    //   </div>
    //   <HoverCard className="">
    //     <HoverCardTrigger className="absolute z-20 right-5 top-5 flex cursor-pointer items-center gap-2 bg-gray-6 p-2 rounded-3xl">


    //     </HoverCardTrigger>
    //     <HoverCardContent className="z-20 mt-2 grid gap-2 text-center w-44 bg-gray-6 p-2">
    //       <h1 className="text-sm tracking-widest">{user.name}</h1>
    //       <h1 className="text-gray-1">AccountType: Sellers</h1>

    //     </HoverCardContent>
    //   </HoverCard>
    //   <div className='fixed z-10 right-5 top-5 p-1 rounded-full bg-gray-6 '>
    //   <Avatar className="aspect-square">
    //         <AvatarImage className="rounded-full" src={user.picture} />
    //         <AvatarFallback>CN</AvatarFallback>
    //       </Avatar>
    //   </div>

    // </div>
  )
}
