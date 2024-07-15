import React, { useEffect, useState } from 'react'
import { PiSignpostFill } from "react-icons/pi"
import { RiAddCircleFill, RiArrowDropLeftLine, RiStoreFill, RiBarChartFill, RiUser2Fill } from "react-icons/ri";
import { Button } from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";


import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import axios from 'axios';
import { Edit } from '@/Components/Cards';
import PostsModal from '@/Components/PostsModal';
import { Link } from 'react-router-dom';



export default function Profile() {

    const [ConnectionList,setConnectionInfo]=useState([])

    function fetchConnections(id){
        axios.post('api/v1/users/connections',{userId:id})
        .then(res=>{
            setConnectionInfo(res.data.data)
        })
        .catch(err=>{
            console.error(err)
        })
    }
    function fetchUserInfo(){
        axios.get('api/v1/users/current-user')
        .then(res=>{
            const { email,bio,website,subscribersCount,channelsSubscribedToCount,birthDate, fullName, userName, avatar, category, companyName } = res.data.data;
            setUserData({
            email,
            bio,website,birthDate,subscribersCount,
            channelsSubscribedToCount,
            fullName,
            userName,
            avatar,
            category,
            companyName
            });

        })
        .catch(err=>{
            console.error(err);
        })
    }

    const [userData,setUserData]=useState({
        email:"",
        bio:"",
        website:"",
        birthDate:"",
        subscribersCount:0,
        channelsSubscribedToCount:0,
        fullName:"",
        userName:"",
        avatar:"",
        category:"",
        companyName:"",

    })
    useEffect(()=>{
        fetchUserInfo();
        fetchConnections(undefined)
    },[])
    


    return (
        <>
            <div className=" grid grid-flow-col min-h-screen place-items-start px-52 mx-52 gap-6">
                <MainContent userData={userData}/>
                <Footer data={ConnectionList}/>
            </div>
        </>
    )
}

function AllBids({ ActivityData }) {
    const [bidDetail,setBidDetails]=useState({
        isAccepted:false
    })
    function removeBids(){
        axios.delete('api/v1/posts/clearBids')
            .then(res=>{
                ActivityData=false
                console.log(res.data.data)
            })
            .catch(err=>{
                console.error(err)
            })
    }
    function handleAccept(id){
        axios.post('api/v1/posts/accept-bids',{userId:id})
            .then(res=>{
                    setBidDetails(res.data.data)
                    console.log(bidDetail)
            })
            .catch(err=>{
                console.error(err)
            })
    }

    return (
        <div className="grid gap-6 place-items-center">
            {ActivityData &&
                ActivityData.map(post => {
                    
                    return (
                        <div className='flex cursor-pointer hover:bg-gray-5 p-4 rounded-xl items-center gap-6'>
                            <Link to={`/:${post.owner[0].userName}`}><Avatar size='sm' src='https://docs.material-tailwind.com/img/face-2.jpg' /></Link>
                            <Link to={`/:${post.owner[0].userName}`}>
                            <div>
                                <div className='text-left'>
                                    <p className='text-md font-semibold'>{post.owner[0].fullName}</p>
                                    <p className='text-sm font-semibold text-gray-1'>@ {post.owner[0].userName}</p>

                                </div>
                            </div>
                            </Link>

                            <div className='flex place-items-end pl-24'>
                                <div className="grid gap-0 px-12">
                                    <p className='text-sm text-gray-6'>Price: {post.price}</p>
                                    <p className='text-sm text-gray-9'>Equity: {post.equityWant}</p>
                                </div>
                                <Button size='md'
                                 className={`${bidDetail.isAccepted?"cursor-not-allowed opacity-25":"cursor-pointer"}`}
                                 style={{ backgroundColor: bidDetail.isAccepted ? 'white' : 'black', color: bidDetail.isAccepted ? 'black' : 'white' }}
                                  onClick={()=>handleAccept(post.owner[0]._id) }
                                >Accept</Button>
                            </div>
                            
                        </div>
                    )
                })
            }
            <div className='pt-4'>
                <Button onClick={removeBids} className='bg-transparent text-semantics-1 border border-semantics-1 hover:bg-semantics-1 hover:text-gray-5 text-sm font-bold' size='md'>Close Bid Auction</Button>
            </div>

        </div>
    )
}

function MainContent({userData}) {
    const [ActivityData, setActivityData] = React.useState();
    
    function handleBid(val){
        axios.post(`api/v1/${val}`)
            .then(res=>{
                setActivityData(res.data.data)
            })
            .catch(err=>{
                console.error(err)
            })
    }
    function handleActivity(val){
        axios.get(`api/v1/${val}`)
            .then(res=>{
                setActivityData(res.data.data)
            })
            .catch(err=>{
                console.error(err)
            })
    }
    const [activeTab, setActiveTab] = React.useState("users/history");
    const data = [
        {
            label: "Activity",
            value: "users/history",
            icon: <PiSignpostFill/>,
            desc: <Activity ActivityData={ActivityData}/>,
        },
        {
            label: "Product",
            value: "product",
            icon: <RiStoreFill/>,
            desc: <Product/>,
        },
        {
            label:"Bids",
            value:"posts/get-bid-details",
            desc:<AllBids ActivityData={ActivityData}/>
        }
    ];
    return (
        <div>
            <div className='flex w-[50rem] gap-24 bg-white p-6 border-2 rounded-xl'>
                <div className=''>
                    <Avatar src={userData.avatar!=""?userData.avatar:"https://docs.material-tailwind.com/img/face-2.jpg"} size='xxl' alt="avatar" className='max-w-96  max-h-96 border-4 border-base-primary ' />
                </div>
                <div className='grid gap-2'>
                   <div className='grid gap-2'>
                   <div className='flex gap-2 items-center'>
                    <h1 className='font-semibold text-2xl'>{userData.fullName}</h1>
                    <Edit/>
                   </div>

                    <h2 className='font-semibold text-md text-gray-1'>{userData.companyName}</h2>
                    {userData.bio &&<div className=' text-sm max-w-[52rem]'>{userData.bio}</div>}
                   </div>
                   {/* <div className='grid gap-2'>
                   <h1 className='text-xl font-semibold'>Current Invester</h1>
                    <div className='flex items-center -space-x-4'>
                    <Avatar
                                variant="circular"
                                alt="user 1"
                                className="border-2 border-base-accent hover:z-10 focus:z-10"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                            />
                            <Avatar
                                variant="circular"
                                alt="user 2"
                                className="border-2 border-base-accent hover:z-10 focus:z-10"
                                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                            />
                            <Avatar
                                variant="circular"
                                alt="user 3"
                                className="border-2 border-base-accent hover:z-10 focus:z-10"
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80"
                            />
                            <Avatar
                                variant="circular"
                                alt="user 4"
                                className="border-2 border-base-accent hover:z-10 focus:z-10"
                                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
                            />
                            <Avatar
                                variant="circular"
                                alt="user 5"
                                className="border-2 border-base-accent hover:z-10 focus:z-10"
                                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"
                            />
                    </div>
                   </div> */}
                   <div className='flex gap-4 justify-start'>
                    {/* Following */}
                    <div className='flex gap-2'>
                    <h1 className='font-extrabold'>{userData.subscribersCount}</h1>
                    <h1>Followers</h1>
                   </div>
                   {/* Followers */}
                   <div className='flex gap-2'>
                   <h1 className='font-extrabold'>{userData.channelsSubscribedToCount}</h1>
                    <h1>Following</h1>
                   </div>
                   </div>
                   
                    {/* <div className='flex gap-4 py-4'>
            <button className='bg-base-accent rounded-full py-2 px-6  text-gray-5 text-md flex place-items-center gap-4'><RiAddCircleFill className='text-2xl'/>Invest</button>
            <button className='bg-base-secondary border-2 border-base-accent hover:bg-base-accent hover:text-gray-5 rounded-full py-2 px-6 place-items-center text-gray-10 text-md flex gap-4'><RiUser2Fill className='text-2xl'/> Connect</button>
                    
                        
                    </div> */}
                </div>
            </div>
            <div className='w-[50rem]'>
                <Stats/>
                <div className=' text-center'>
                    <Tabs value={activeTab} className="">
                        <TabsHeader
                            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 gap-12 px-52"
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
                                        label=="Bids"?handleBid(value) :handleActivity(value)
                                    }
                                    }
                                    className={activeTab === value ? "text-gray-900" : ""}
                                >
                                    {label}
                                </Tab>
                            ))}
                        </TabsHeader>
                        <TabsBody>
                            {data.map(({ value, desc }) => (
                                <TabPanel key={value} value={value}>
                                    {desc}
                                </TabPanel>
                            ))}
                        </TabsBody>
                    </Tabs>
                </div>



            </div>
        </div>
    )


}
function Stats() {
    return (
        <div>
<div className=' grid grid-cols-4 place-items-center'>
            <StatsCard title={"Sum Investment"} value={"21,345,543,432"} />
            <StatsCard title={"Sum Investment"} value={"21,345,543,432"} />
            <StatsCard title={"Sum Investment"} value={"21,345,543,432"} />
            <StatsCard title={"Sum Investment"} value={"21,345,543,432"} />
            {/* <StatsCard title={"Sum Investment"} value={"21,345,543,432"} /> */}
        </div>
        <div className=' grid grid-flow-col'>
            <Charts />
            <Charts />
            <Charts />
        </div>
        </div>
        
    )
}
function Activity({ActivityData}){

    const [postData,setPostData]=useState([])

    function handleClickPost(id){
        axios.post('api/v1/posts/getPost',{postId:id})
        .then(res=>{
            setPostData(res.data.data)
            handleOpen()
            // console.log(res.data.data)
        })
        .catch(err=>{
            console.error(err)
        })
    }
    const [open, setOpen] = React.useState(false);
 
    const handleOpen = () => setOpen(!open);
    return(
        <div className='grid grid-cols-3 gap-6'>
            {open>0 &&<PostsModal open={open} handleOpen={handleOpen} postData={postData}/>}
            {ActivityData && ActivityData.map(posts=>{
                return(
                    <img onClick={()=>handleClickPost(posts._id)} src={posts.Thumbnail} className='hover:opacity-75 w-full cursor-pointer aspect-square bg-gray-3'/>
                )
            })
            }
        </div>
    )
}

function Product(){
    return(
        <div className='grid grid-cols-3 gap-6'>
            <div className='aspect-square w-52 bg-gray-3'/>
            <div className='aspect-square w-52 bg-gray-3'/>
            <div className='aspect-square w-52 bg-gray-3'/>
            <div className='aspect-square w-52 bg-gray-3'/>
            <div className='aspect-square w-52 bg-gray-3'/>
            <div className='aspect-square w-52 bg-gray-3'/>
            <div className='aspect-square w-52 bg-gray-3'/>
            <div className='aspect-square w-52 bg-gray-3'/>
            <div className='aspect-square w-52 bg-gray-3'/>
            <div className='aspect-square w-52 bg-gray-3'/>
            <div className='aspect-square w-52 bg-gray-3'/>
            <div className='aspect-square w-52 bg-gray-3'/>
            <div className='aspect-square w-52 bg-gray-3'/>
            <div className='aspect-square w-52 bg-gray-3'/>
            <div className='aspect-square w-52 bg-gray-3'/>
            <div className='aspect-square w-52 bg-gray-3'/>
            <div className='aspect-square w-52 bg-gray-3'/>


        </div>
    )
}

function Footer({data}) {
    return (
        <div className='p-4 bg-white border-2 rounded-lg h-fit'>
            <h1 className='text-md tracking-wider font-bold'>Other Similar Profiles</h1>
            {data.map(user=>{
                return(
                    <ConnectionCard userData={user}/>
                )
            })}



        </div>
    )
}

function StatsCard({ title, value }) {
    return (
        <Card className="w-30 m-2">
            <div className='m-2 test-xl'>{title}</div>
            <CardBody floated={false} className="h-70">
                {value}
            </CardBody>

        </Card>
    )
}

function ConnectionCard({ userData }) {
    return (
        <Link to={`/:${userData.userName}`}>
        <div className='grid grid-flow-col place-items-center gap-4 p-2'>
            <Avatar src={userData.avatar?userData:""} size='sm'/>
            <div>
            <p className='font-semibold text-sm'>{userData.fullName}</p>
            <p className='font-medium text-gray-1 text-xs'>@{userData.userName}</p>
            </div>
            <Button className='m-1 p-2 px-4 border-2 text-sm rounded-lg' size='sm'>Subscribe</Button>
        </div>
        </Link>
    )
}

function Charts() {
    return (
        <Card className="w-90 m-2">
            <div className='m-2 test-xl'>prasahnt</div>
            <CardBody floated={false} className="h-70">
                <img src="C:/Users/prashant/Pictures/Screenshots/chart" alt="profile-picture" />
            </CardBody>

        </Card>
    )
}
