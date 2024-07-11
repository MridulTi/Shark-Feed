import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Carousel,
  Avatar,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
 
export default function PostsModal({open,handleOpen,postData}) {
 console.log(postData)
 
  return (
    <>
      <Dialog open={open} handler={handleOpen} className="w-32 h-fit">
        <DialogBody className="grid grid-flow-col gap-6">
        <Carousel className="rounded-xl w-full">
                {postData.photo.map(url=>{
                    return(
                        <img
                        src={url}
                        className="h-full w-full object-cover"
                    />
                    )
                })}
               
            </Carousel>
            <div className="px-4">
            <Link to={`/:${postData.owner[0].userName}`}><div className='flex cursor-pointer gap-4'>
                <Avatar size='sm' src='https://docs.material-tailwind.com/img/face-2.jpg' />
                <div>
                    <div className='flex gap-2'>
                    <p className='text-md font-semibold'>{postData.owner[0].fullName}</p>
                    <p className='text-sm font-semibold text-gray-1'>@ {postData.owner[0].userName}</p>

                    </div>
                    <p className='text-xs text-gray-2'>2 hours before</p>
                </div>
            </div></Link>
            <div>
                <p>{postData.caption}</p>
                <p>{postData.tags}</p>
            </div>
            </div>
        </DialogBody>
      </Dialog>
    </>
  );
}