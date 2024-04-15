import { Progress } from '@material-tailwind/react';
import React from 'react'
import { RiAddCircleFill, RiArrowDropLeftLine } from "react-icons/ri";
import { useModal } from '../../../Context/ModalContext';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { openModal, closeModal, toggleModal } from '../../../app/cartSlice'; // Import your modal slice



export default function UploadPage() {
    const { openModal,files,handleInfo } = useModal();

    return (
        <>
            <div className=" grid gap-4 place-items-center h-fit justify-center items-center bg-base-secondary">
                <div className='bg-gray-5 p-6 rounded-xl grid gap-12'>
                <Header />
                <MainContent />
                </div>
                {/* <Footer /> */}
            </div>
        </>
    )
}

function Header() {
    // Header content here
    const { openModal,files,handleInfo,handleCompData } = useModal();

    return (
        <div className='w-full grid pr-32'>
            <h1 className='font-semibold text-3xl'>Company Details</h1>
            <h1 className=' text-base-accent text-lg font-semibold'>Enter the following details about your company</h1>
            <input name="compName" className='border-2 outline-0 border-gray-2 p-2 rounded-md' type="text" placeholder='Enter Company  Name' onChange={(e)=>handleCompData(e)} /><br />
            <input name='compType' className='border-2 outline-0 border-gray-2 p-2 rounded-md' type="text" placeholder='Enter Company Type' onChange={(e)=>handleCompData(e)}  />
        </div>
    )
}
function MainContent() {
    
    const { openModal,files } = useModal();

    const handleOpenModal = () => {
        openModal();
    };
    return (
        <div className='w-full'>
            <h1 className='text-2xl font-semibold text-base-accent'>Upload</h1>
            <h2 className='text-lg font-semibold'>The Valid Company Registration Document</h2>
            <div className='grid grid-flow-col'>
                <div className='grid place-items-center bg-gray-3 border-4 border-gray-4 active:border-base-primary active:bg-gray-7 aspect-square w-52 rounded-lg cursor-pointer' onClick={handleOpenModal}>
                    <RiAddCircleFill className='text-gray-1 active:text-base-accent text-6xl' />
                </div>
                <div className=''>
                    {files&&files.map((data)=>{
                    return(
                        <p className='border-2 border-gray-4 p-2 rounded-xl'>{data.name}</p>
                    )
                })}
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