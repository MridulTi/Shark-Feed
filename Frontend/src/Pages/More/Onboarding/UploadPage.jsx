import { Progress } from '@material-tailwind/react';
import React from 'react'
import { RiAddCircleFill, RiArrowDropLeftLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal, toggleModal } from '../../../app/cartSlice'; // Import your modal slice



export default function UploadPage() {
    return (
        <>
            <div className=" grid gap-4 place-items-center min-h-screen py-6 justify-center items-center">
                <Header />
                <MainContent />
                <Footer />
                <div className='py-4 grid grid-flow-col place-content-center gap-4 m-2'>
                    <Link to="/Onboarding"><button className='bg-gray-5 border border-gray-3 p-1 grid place-items-center aspect-square'><RiArrowDropLeftLine className='text-4xl' /></button></Link>
                    <Link to="/Dashboard"><button className='bg-base-accent py-2 px-6 grid place-items-center text-gray-5 text-xl'>Next</button></Link>
                </div>
                <Progress value={20} className='bg-gray-3 mb-12'/>
            </div>
        </>
    )
}

function Header() {
    // Header content here
    return (
        <div className='w-full grid pr-32'>
            <h1 className='font-semibold text-3xl'>Company Details</h1>
            <h1 className=' text-base-accent text-lg font-semibold'>Enter the following details about your company</h1>
            <input className='border-2 outline-0 border-gray-2 p-2 rounded-md' type="text" placeholder='Enter Company  Name' /><br />
            <input className='border-2 outline-0 border-gray-2 p-2 rounded-md' type="text" placeholder='Enter Company Type' />
        </div>
    )
}
import { useModal } from '../../../Context/ModalContext';
function MainContent() {
    
    const { openModal } = useModal();

    const handleOpenModal = () => {
        openModal();
    };
    return (
        <div className='w-full'>
            <h1 className='text-2xl font-semibold text-base-accent'>Upload</h1>
            <h2 className='text-lg font-semibold'>The Valid Company Registration Document</h2>
            <div className='grid grid-flow-col'>
                <div className=' grid place-items-center bg-gray-3 border-4 border-gray-4 active:border-base-primary active:bg-gray-7 aspect-square p-12 rounded-lg cursor-pointer' onClick={handleOpenModal}>
                    <RiAddCircleFill className='text-gray-1 active:text-base-accent text-6xl' />
                </div>
                <div className=' grid place-items-center bg-gray-3 border-4 border-gray-4 active:border-base-primary active:bg-gray-7 aspect-square p-12 rounded-lg cursor-pointer'>
                    <RiAddCircleFill className='text-gray-1 active:text-base-accent text-6xl' />
                </div>
                <div className=' grid place-items-center bg-gray-3 border-4 border-gray-4 active:border-base-primary active:bg-gray-7 aspect-square p-12 rounded-lg cursor-pointer'>
                    <RiAddCircleFill className='text-gray-1 active:text-base-accent text-6xl' />
                </div>
                <div className=' grid place-items-center bg-gray-3 border-4 border-gray-4 active:border-base-primary active:bg-gray-7 aspect-square p-12 rounded-lg cursor-pointer'>
                    <RiAddCircleFill className='text-gray-1 active:text-base-accent text-6xl' />
                </div>
                <div className=' grid place-items-center bg-gray-3 border-4 border-gray-4 active:border-base-primary active:bg-gray-7 aspect-square p-12 rounded-lg cursor-pointer'>
                    <RiAddCircleFill className='text-gray-1 active:text-base-accent text-6xl' />
                </div>
            </div>

        </div>
    )
}

function Footer() {
    // Footer content here
    return (
        <div className='grid grid-cols-2 w-full gap-24'>
            <div>
                <h1 className='text-2xl font-semibold text-base-accent'>Upload</h1>
                <h2 className='text-lg font-semibold'>The Valid Company Registration Document</h2>
                <div className='grid grid-flow-col'>
                    <div className=' grid place-items-center bg-gray-3 border-4 border-gray-4 active:border-base-primary active:bg-gray-7 aspect-square p-12 rounded-lg cursor-pointer'>
                        <RiAddCircleFill className='text-gray-1 active:text-base-accent text-6xl' />
                    </div>
                    <div className=' grid place-items-center bg-gray-3 border-4 border-gray-4 active:border-base-primary active:bg-gray-7 aspect-square p-12 rounded-lg cursor-pointer'>
                        <RiAddCircleFill className='text-gray-1 active:text-base-accent text-6xl' />
                    </div>
                </div>
            </div>
            <div className='py-6'>
                <h1 className='text-xl text-base-accent font-semibold'>Share Distribution</h1>
                <div className='grid grid-flow-col gap-2'>
                    <div className=''><input className='border-4 border-gray-4 w-10 outline-0 aspect-square' type="text" />%</div>
                    <div className=''><input className='border-4 border-gray-4 w-10 outline-0 aspect-square' type="text" />%</div>
                    <div className=''><input className='border-4 border-gray-4 w-10 outline-0 aspect-square' type="text" />%</div>
                    <div className=''><input className='border-4 border-gray-4 w-10 outline-0 aspect-square' type="text" />%</div>

                </div>
               
            </div>
        </div>

    )
}