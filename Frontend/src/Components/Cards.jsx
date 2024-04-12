import { Avatar } from '@material-tailwind/react'
import React, { useState } from 'react'
import { RiAttachment2 } from 'react-icons/ri'

export const PostCards=()=> {
  return (
    <div className='bg-gray-5 rounded-lg p-5 w-fit h-fit'>
        <div className='flex gap-4'> 
            <Avatar size='sm' src='https://docs.material-tailwind.com/img/face-2.jpg' />
            <div>
                <p className='text-md font-semibold'>@username</p>
                <p className='text-xs text-gray-2'>2 hours before</p>
            </div>
        </div>
        <div className='text-sm py-4'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div className='rounded-xl bg-gray-3 h-72 w-[30vw]' style={{
        }}/>
    </div>
  )
}
export const Bid=()=>{
    return(
        <div className='p-5 h-fit bg-gray-5 grid rounded-lg'>
            <h1 className='font-semibold text-xl pb-4'>Current Bids</h1>
            <div className=''>
                <div className='flex border-t-2 border-gray-3 py-5 gap-16'>
                    <div className='flex gap-4'>
                        <Avatar size='sm' src='https://docs.material-tailwind.com/img/face-2.jpg' />
                        <div>
                        <p className='text-md font-semibold'>Full Name</p>
                        <p className='text-xs text-gray-2'>@username</p>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <div className=''><input className='border-4 border-gray-4 rounded-lg w-10' type="text"/>%</div>
                        <div className=''><input className='border-4 border-gray-4 rounded-lg w-10' type="text"/>%</div>
                    </div>

                </div>
                <div className='flex border-t-2 border-gray-3 py-5 gap-16'>
                    <div className='flex gap-4'>
                        <Avatar size='sm' src='https://docs.material-tailwind.com/img/face-2.jpg' />
                        <div>
                        <p className='text-md font-semibold'>Full Name</p>
                        <p className='text-xs text-gray-2'>@username</p>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <div className=''><input className='border-4 border-gray-4 rounded-lg w-10' type="text"/>%</div>
                        <div className=''><input className='border-4 border-gray-4 rounded-lg w-10' type="text"/>%</div>
                    </div>

                </div>
                
               
                
            </div>
            <button className='bg-base-accent py-2 px-6 grid place-items-center text-gray-5 text-sm'>Make Your Bid</button>
        </div>
    )
}
export const Post=()=>{
    const [value, setValue] = useState('');
    const [height, setHeight] = useState('auto');

    const handleChange = (event) => {
        setValue(event.target.value);
        setHeight(event.target.scrollHeight + 'px');
    };
    const minHeight = '3rem';
    return(
        <div className='bg-gray-5 rounded-xl grid p-5 place-items-end'>
            <div className='flex gap-4 w-full'>
            <Avatar size='sm' src='https://docs.material-tailwind.com/img/face-2.jpg' />
            <textarea
                value={value}
                onChange={handleChange}
                placeholder="What's happening Today?"
                style={{ height: value ? height : minHeight }}
                className="resize-none border w-full outline-0 border-0 py-2 pr-2"
            />
            </div>
            <div className='flex place-items-center gap-4'>
            <RiAttachment2 className='text-xl text-base-accent cursor-pointer'/>
            <button className='bg-base-accent rounded-full py-2 px-6 grid place-items-center text-gray-5 text-xs'>Post</button>
            </div>
            
        </div>
    )
}
