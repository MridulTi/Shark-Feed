import { useModal } from '@/Context/ModalContext'
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Carousel, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Textarea, Typography } from '@material-tailwind/react'
import axios from 'axios'
import { Edit2, Edit2Icon, FileInput } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { RiAttachment2, RiEdit2Fill, RiHeart3Fill, RiHeart3Line } from 'react-icons/ri'
import { IoChatbubbleOutline } from "react-icons/io5";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { HiOutlineGif } from "react-icons/hi2";
import { Link } from 'react-router-dom'
import PostsModal from './PostsModal'

export const PostCards = ({ post }) => {
    const [open, setOpen] = React.useState(false);
 
    const handleOpen = () => setOpen(!open);
    const [commentArray,setCommentArray]=useState([])
    const [likedByCurrentUser,setLikedByUser]=useState(post.likedByCurrentUser)
    function openComment(id){
        console.log('h1')
        axios.post('api/v1/posts/get-comment',{postId:id})
        .then(res=>{
            setCommentArray(res.data.data)
            // console.log(res)
        })
        .catch(err=>{
            console.error(err)
        })
    }
    function getLike(id){
        axios.get('api/v1/posts/get-like')
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.error(err)
        })
    }
    function handleLike(id){
        axios.post('api/v1/posts/post-like',{postId:id})
        .then(res=>{
            setLikedByUser(res.data.data)
        })
        .catch(err=>{
            console.error(err)
        })
    }
    


    return (
        <div className='bg-gray-5 rounded-lg p-5 w-full h-fit'>
            <Link to={`/:${post.owner[0].userName}`}><div className='flex cursor-pointer gap-4'>
                <Avatar size='sm' src='https://docs.material-tailwind.com/img/face-2.jpg' />
                <div>
                    <div className='flex gap-2'>
                    <p className='text-md font-semibold'>{post.owner[0].fullName}</p>
                    <p className='text-sm font-semibold text-gray-1'>@ {post.owner[0].userName}</p>

                    </div>
                    <p className='text-xs text-gray-2'>2 hours before</p>
                </div>
            </div></Link>
            <div className='text-sm py-4'>
                <p>{post.caption}</p>
            </div>
            <Carousel className="rounded-xl w-full">
                {post.photo.map(url=>{
                    return(
                        <img
                        src={url}
                        className="h-96 w-full object-cover"
                    />
                    )
                })}
               
            </Carousel>
            <div className='flex gap-4 py-2 px-5'>
                <div onClick={()=>{
                    handleLike(post._id)
                    
                    }}>
                    {likedByCurrentUser?<RiHeart3Fill className='text-3xl text-semantics-2'/>:<RiHeart3Line className='text-3xl cursor-pointer'/>}
                </div>
            <IoChatbubbleOutline className='text-3xl' onClick={()=>{
                openComment(post._id);
                handleOpen()
            }}/>
            <PostsModal open={open} handleOpen={handleOpen} postData={post} commentArray={commentArray}/>
            </div>
        </div>
    )
}

export const CommentModal=({open,handleOpen,commentArray})=>{
    
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Your Attention is Required!
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-start gap-4">
         
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            close
          </Button>
          <Button variant="gradient" onClick={handleOpen}>
            Ok, Got it
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export const Edit = () => {
    const [open, setOpen] = React.useState(false);

    const [Formdata, setFormData] = useState({
        fullName: "",
        userName: "",
        email: "",
        category: "",
        companyName: "",
        password: ""
    })

    function handleSave(e) {
        e.preventDefault()
        axios.patch("/api/v1/users/update-Account-details", Formdata)
            .then((data) => {
                if (data.status == 200) {
                    setOpen(false)
                }
                console.log(data)
            })
    }
    function handleInputChange(e) {
        const { name, value } = e.target
        setFormData({
            ...Formdata,
            [name]: value
        })
        // console.log(Formdata)
    }

    const handleOpen = () => setOpen(!open);
    return (
        <div className='cursor-pointer'>
            <div onClick={handleOpen}>
                <RiEdit2Fill />
            </div>
            <Dialog open={open} handler={handleOpen} className='bg-transparent shadow-none'>
                <Card className="mx-auto w-full max-w-[32rem]">
                    <div className='bg-translucent flex justify-between'>
                        <Typography variant='h4'>Edit Profile</Typography>
                        <Button onClick={handleSave}>Save</Button>
                    </div>
                    <Input label='Name' name="fullName" onChange={(e) => handleInputChange(e)} />
                    <Textarea label='Bio' name="bio" onChange={(e) => handleInputChange(e)}></Textarea>
                    <Input label="Website" name="website" onChange={(e) => handleInputChange(e)} />
                    <Input type='date' label='Birth Date' name="birthDate" onChange={(e) => handleInputChange(e)} />
                </Card>
            </Dialog>
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
    const { handlePost, posting, sendImg } = useModal()
    const[formData,setFormData]=useState({
        content:""
    })

    // For Dialog
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    function handleInputChange(e) {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
        // console.log(Formdata)
    }
    return (
        <div className='bg-gray-5 min-w-[35rem] rounded-xl grid p-5 place-items-center'>
            <div className='flex gap-4 w-full'>
                <Avatar size='sm' src='https://docs.material-tailwind.com/img/face-2.jpg' />
                <div className='w-full'>
                    <button onClick={handleOpen} className='rounded-full w-full text-gray-10 font-semibold bg-gray-5 hover:bg-gray-4 text-left px-6 py-4 border text-sm'>Write a post, what are you up to these days?</button>
                    <div className='flex py-2 text-sm font-semibold place-items-center gap-4'>
                        <label className='p-4 rounded-xl hover:bg-gray-4 flex gap-2'>
                            <FileInput id="file-upload-helper-text" className='hidden' onChange={(e) => {
                                sendImg(e);
                            }} multiple />
                            <RiAttachment2 className='text-xl text-base-accent cursor-pointer' /> Media
                        </label>
                        <label className='p-4 rounded-xl hover:bg-gray-4 flex gap-2'>
                            <FileInput id="file-upload-helper-text" className='hidden' onChange={(e) => {
                                sendImg(e);
                            }} multiple />
                            <HiOutlineEmojiHappy className='text-xl text-base-accent cursor-pointer' /> Emoji
                        </label>
                        <label className='p-4 rounded-xl hover:bg-gray-4 flex gap-2'>
                            <FileInput id="file-upload-helper-text" className='hidden' onChange={(e) => {
                                sendImg(e);
                            }} multiple />
                            <HiOutlineGif className='text-xl text-base-accent cursor-pointer' /> GIF
                        </label>
                    </div>


                </div>
                <Dialog
                    size="sm"
                    open={open}
                    handler={handleOpen}
                    className="bg-transparent shadow-none"
                >
                    <Card className="mx-auto w-full">
                        <CardHeader className='flex gap-4 place-items-center shadow-none pt-4'>
                            <Avatar variant='circular' size="xl" src={"https://docs.material-tailwind.com/img/face-2.jpg"} alt="avatar" className='max-w-96  max-h-96 border-4 border-base-primary ' />
                            <div>
                                <h1 className='font-bold text-xl'>MRIDUL TIWARI</h1>
                                <h1 className='font-semibold text-sm'>SHARKS</h1>
                                <h1 className='italic tracking-wider'>Investor</h1>
                            </div>
                            
                        </CardHeader>
                        <CardBody className="flex flex-col gap-2">
                            <textarea className='h-[20rem] outline-0 text-lg ' placeholder='What do you want to talk about?' name='content' onChange={handleInputChange}/>
                            
                        </CardBody>
                        <CardFooter className="pt-0 w-full">
                        <div className='flex w-full py-2 text-sm font-semibold place-items-center gap-4'>
                        <label className='p-4 rounded-xl hover:bg-gray-4 flex gap-2'>
                            <FileInput id="file-upload-helper-text" className='hidden' onChange={(e) => {
                                sendImg(e);
                            }} multiple />
                            <RiAttachment2 className='text-xl text-base-accent cursor-pointer' /> Media
                        </label>
                        <label className='p-4 rounded-xl hover:bg-gray-4 flex gap-2'>
                            <FileInput id="file-upload-helper-text" className='hidden' onChange={(e) => {
                                sendImg(e);
                            }} multiple />
                            <HiOutlineEmojiHappy className='text-xl text-base-accent cursor-pointer' /> Emoji
                        </label>
                        <label className='p-4 rounded-xl hover:bg-gray-4 flex gap-2'>
                            <FileInput id="file-upload-helper-text" className='hidden' onChange={(e) => {
                                sendImg(e);
                            }} multiple />
                            <HiOutlineGif className='text-xl text-base-accent cursor-pointer' /> GIF
                        </label>
                    </div>
                            <button onClick={()=>{
                                handleOpen()
                                posting(formData)
                            }} fullWidth className='w-full bg-base-primary font-semibold text-xl text-gray-5 p-2 rounded-full'>
                                Post
                            </button>

                        </CardFooter>
                    </Card>
                </Dialog>
            </div>



        </div>
    )
}
