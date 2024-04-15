import { useModal } from '@/Context/ModalContext'
import { Avatar } from '@material-tailwind/react'
import { FileInput } from 'flowbite-react'
import React, { useState } from 'react'
import { RiAttachment2 } from 'react-icons/ri'
import { Link } from 'react-router-dom'

export const PostCards = ({post}) => {
    return (
        <div className='bg-gray-5 rounded-lg p-5 w-fit h-fit'>
            <Link to={`/:${post.username}`}><div className='flex cursor-pointer gap-4'>
                <Avatar size='sm' src='https://docs.material-tailwind.com/img/face-2.jpg' />
                <div>
                    <p className='text-md font-semibold'>@username</p>
                    <p className='text-xs text-gray-2'>2 hours before</p>
                </div>
            </div></Link>
            <div className='text-sm py-4'>
                <p>{post.post[0].caption}</p>
            </div>
            <div className='rounded-xl bg-gray-3 h-72 w-[30vw]' style={{
            }} />
        </div>
    )
}
export const Bid = (props) => {
    return (
        <div className='p-5 h-fit bg-gray-5 grid rounded-lg'>
            <h1 className='font-semibold text-xl pb-4'>Current Bids</h1>
            <div className=''>
                <div className='flex border-t-2 border-gray-3 py-5 gap-16'>
                    <Link to={`/:${props.username}`}><div className='flex gap-4'>
                        <Avatar size='sm' src='https://docs.material-tailwind.com/img/face-2.jpg' />
                        <div>
                            <p className='text-md font-semibold'>Full Name</p>
                            <p className='text-xs text-gray-2'>@username</p>
                        </div>
                    </div></Link>
                    <div className='flex gap-2'>
                        <div className=''><input className='border-4 border-gray-4 rounded-lg w-10' type="text" />%</div>
                        <div className=''><input className='border-4 border-gray-4 rounded-lg w-10' type="text" />%</div>
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
                        <div className=''><input className='border-4 border-gray-4 rounded-lg w-10' type="text" />%</div>
                        <div className=''><input className='border-4 border-gray-4 rounded-lg w-10' type="text" />%</div>
                    </div>

                </div>



            </div>
            <button className='bg-base-accent py-2 px-6 grid place-items-center text-gray-5 text-sm'>Make Your Bid</button>
        </div>
    )
}
export const Post = (props) => {
    const { handlePost, posting ,sendImg} = useModal()
    const [value, setValue] = useState('');
    const [height, setHeight] = useState('auto');
    const [imageSrcs,setImageSrcs]=useState([]);

    const handleChange = (event) => {
        handlePost(event)
        setHeight(event.target.scrollHeight + 'px');
    };
    const handleSubmit = () => {
        posting();
    }
    const minHeight = '3rem';
    return (
        <div className='bg-gray-5 rounded-xl grid p-5 place-items-end'>
            <div className='flex gap-4 w-full'>
                <Avatar size='sm' src='https://docs.material-tailwind.com/img/face-2.jpg' />
                <textarea
                    name="caption"
                    onChange={(e) => handleChange(e)}
                    placeholder="What's happening Today?"
                    style={{ height: value ? height : minHeight }}
                    className="resize-none border w-full outline-0 border-0 py-2 pr-2"
                />
            </div>
            <div className='flex aspect-square'>
            {imageSrcs.map((imageSrc, index) => (
                <img key={index} src={imageSrc} alt={`Uploaded Image ${index + 1}`} style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '5px' }} />
            ))}
            </div>
            <div className='flex place-items-center gap-4'>
                <label>
                <FileInput id="file-upload-helper-text" className='hidden' onChange={(e)=>{
                    sendImg(e);
                }} multiple />
                <RiAttachment2 className='text-xl text-base-accent cursor-pointer' />
                </label>
                <button onClick={handleSubmit} className='bg-base-accent rounded-full py-2 px-6 grid place-items-center text-gray-5 text-xs'>Post</button>
            </div>

        </div>
    )
}
