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

export default function PostsModal({ open, handleOpen, postData, commentArray }) {
  console.log(postData)

  return (
    <>
      <Dialog size="lg" open={open} handler={handleOpen} className="w-full h-fit">
        <DialogBody className="grid grid-flow-col gap-0">
          <Carousel className="rounded-xl w-[45rem] h-[45rem]">
            {postData.photo.map(url => {
              return (
                <img
                  src={url}
                  className="h-full w-full object-cover"
                />
              )
            })}

          </Carousel>
          <div className="px-4 w-full ">
            <Link to={`/:${postData.owner[0].userName}`}><div className='flex cursor-pointer gap-4'>
              <Avatar size='sm' src='https://docs.material-tailwind.com/img/face-2.jpg' />
              <div className="w-full">
                <div className='flex gap-2'>
                  <p className='text-md font-semibold'>{postData.owner[0].fullName}</p>
                  <p className='text-sm font-semibold text-gray-1'>@ {postData.owner[0].userName}</p>

                </div>
                <p className='text-xs text-gray-2'>2 hours before</p>
              </div>
            </div></Link>
            <div className="divide divide-y-2">
              <div>
                <p>{postData.caption}</p>
                <p>{postData.tags}</p>
              </div>
              <div className="pt-4 grid gap-4">
                {commentArray.length > 0 && commentArray.map((comment) => {
                  return (
                    <div className="grid w-full">
                      <div className='flex gap-2 place-items-center'>
                        <Avatar size="sm" src={comment.commentUser[0].avatar} />
                        <p className='text-xs font-semibold'>{comment.commentUser[0].userName}</p>
                      </div>
                      <div className="px-12">
                          <p className="w-full text-pretty">{comment.description}</p>
                          <p className="text-xs font-bold">Reply</p>
                        </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

        </DialogBody>
      </Dialog>
    </>
  );
}