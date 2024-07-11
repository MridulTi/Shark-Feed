import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Dialog,
  DialogHeader,
  DialogBody,
  Button,
  DialogFooter,
  Input,
  Textarea,
  Avatar,
} from "@material-tailwind/react";
import axios from "axios";
import { PostCards } from "./Cards";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AlertMssg } from "./AlertMssg";

export const MessageDialog = ({ bidDetails,message, open,companyId, handleOpen }) => {
  const [bid,setbid]=useState({
      companyId:companyId,
      price:null,
      equityWant:null
    })

    const [mssg,setmssg]=useState(message)

  function handleBidsPost(){
    axios.post('api/v1/posts/post-Bids',bid)
    .then(res=>{
      setmssg(res.data.data.message)
    })
    .catch(err=>{
      console.error(err)
    })
  }
  function handleInputchange(e){
    const {name,value}=e.target
    setbid({
      ...bid,
      [name]:value
    })
    // console.log(Formdata)
  }
  return (
    <Dialog open={open} size="sm" handler={handleOpen}>
      <div className="flex items-center justify-between">
        <DialogHeader className="flex flex-col items-start">
          <h1 className="">Bids Details</h1>
          <h3 className="text-sm text-gray-1 font-extralight text-wrap w-72">Make your Bid and Look at Auction for the Equity</h3>
        </DialogHeader>

      </div>
      <DialogBody>
        <div className="grid gap-4 place-items-center">
          {
          bidDetails.map(post => {
            return (
              <Link to={`/:${post.owner[0].userName}`}><div className='flex cursor-pointer items-center gap-4'>
                <Avatar size='sm' src='https://docs.material-tailwind.com/img/face-2.jpg' />
                <div>
                  <div className='flex gap-4'>
                    <p className='text-sm font-semibold'>{post.owner[0].fullName}</p>
                    <p className='text-xs font-semibold text-gray-1'>@ {post.owner[0].userName}</p>

                  </div>
                  </div>
                  <div className="grid gap-2 px-6">
                  <p className='text-xs text-gray-6'>Price: {post.price}</p>
                  <p className='text-xs text-gray-9'>Equity: {post.equityWant}</p>
                  </div>  
                </div>
              </Link>
            )
          })
        }

        </div>
        
        
      </DialogBody>
      <div className="grid gap-4 px-10">
          <Input label="Price" name="price" onChange={(e)=>handleInputchange(e)}/>
          <Input label="Equity" name="equityWant" onChange={(e)=>handleInputchange(e)}/>
      </div>
      <DialogFooter className="space-x-2">
        
        <Button variant="text" color="gray" onClick={handleOpen}>
          cancel
        </Button>
        <Button variant="gradient" color="gray" onClick={()=>{
          handleOpen()
          handleBidsPost();
        }}>
          make Bid
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
export const UnderlineTabs = () => {
  const [activeTab, setActiveTab] = React.useState("get-feed");
  const [bidDetails, setBidDetails] = useState([])
  const [followingData, setFollowingData] = useState([])
  const [companyId, setCompanyId] = useState("")
  const [mssg,setMssg]=useState("")
  const data = [
    {
      label: "For You",
      value: "get-feed",
    },
    {
      label: "Following",
      value: "Following",

    },

  ];
  // MODAL OPEN
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => { setOpen(!open); }

  function handleBid(id) {
    axios.post('api/v1/posts/get-bid-details', { userId: id })
      .then(res => {
        setBidDetails([
          ...res.data.data,
          // {"id":id}
        ])
        setCompanyId(id)
      })
      .catch(err => {
        console.error(err)
      })
  }
  return (
    <>
      {/* <AlertMssg mssg={mssg}/> */}
      <MessageDialog bidDetails={bidDetails} message={mssg} companyId={companyId} open={open} handleOpen={handleOpen}/>

      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
          }}
        >
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => {
                setActiveTab(value)
                axios.get(`api/v1/home/${value}`)
                  .then(res => {
                    setFollowingData(res.data.data)
                    // console.log(res.data.data)
                  })
                  .catch(err => {
                    console.error(err)
                  })
              }}
              className={activeTab === value ? "text-gray-900" : ""}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {followingData.map((post, index) => {
            console.log(post)
            return (
              <div key={index} className='my-4 h-fit max-w-[40rem] grid grid-flow-col gap-2'>
                <PostCards post={post} />
                {/* {console.log(post.owner[0]._id)} */}
                <div className='grid place-items-center px-1 bg-gray-5 rounded-xl w-6 cursor-pointer'
                  onClick={() => {
                    handleOpen()
                    handleBid(post.owner[0]._id)
                  }}>
                  <RiArrowRightSLine className='scale-150' />
                </div>
              </div>
            )
          })}
        </TabsBody>
      </Tabs>
    </>

  );
}