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
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Edit } from '@/Components/Cards';



export default function ProfileOther() {
    
    const {username}=useParams()
    const[userData,setUserData]=useState({})

    useEffect(()=>{
        axios.get(`api/v1/users/c/${username}`)
            .then(res=>{
                setUserData(res.data.data)
            })
            .catch(err=>{
                console.error(err)
            })
    },[username])
    
    return (
        <>
            <div className=" grid grid-flow-col min-h-screen place-items-start px-52 mx-52 gap-6">
                <MainContent userData={userData}/>
                <Footer />
            </div>
        </>
    )
}

function MainContent({userData}) {
    function handleActivity(){
        axios.get("api/v1/users/profile")
            .then(res=>{
                console.log(res.data)
            })
            .catch(err=>{
                console.error(err)
            })
    }
    const [ActivityData, setActivityData] = React.useState();
    const [activeTab, setActiveTab] = React.useState("dashboard");
    const data = [
        {
            label: "Stats",
            value: "dashboard",
            icon: <RiBarChartFill/>,
            desc: <Stats/>,
        },
        {
            label: "Activity",
            value: "profile",
            icon: <PiSignpostFill/>,
            desc: <Activity onClick={handleActivity} ActivityData={ActivityData}/>,
        },
        {
            label: "Product",
            value: "settings",
            icon: <RiStoreFill/>,
            desc: <Product/>,
        },
    ];

    function handleSubscription(){
        axios.patch('api/v1/users/update-subscription',{_id:userData._id})
        .then(res=>{
            console.log(res.data)
            window.location.reload()
        })
        .catch(err=>{
            console.error(err)
        })
    }
    return (
        <div>
            <div className='flex gap-24 bg-white p-6 border-2 rounded-xl'>
                <div className=''>
                    <Avatar src={userData.avatar!=""?userData.avatar:"https://docs.material-tailwind.com/img/face-2.jpg"} size='xxl' alt="avatar" className='max-w-96  max-h-96 border-4 border-base-primary ' />
                </div>
                <div className='grid gap-2'>
                   <div className='grid gap-2'>
                   <div className='flex gap-4 items-center'>
                    <h1 className='font-semibold text-2xl'>{userData.fullName}</h1>
                   <Button className={`tracking-widest ${userData.isSubscribed?"bg-gray-5 border border-black text-gray-10":""}`} onClick={handleSubscription} >{userData.isSubscribed? "UnSubscribe":"Subscribe"}</Button>
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
            <div className=''>
                <div className=' text-center'>
                    <Tabs value={activeTab}>
                        <TabsHeader
                            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 px-64"
                            indicatorProps={{
                                className:
                                    "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                            }}
                        >
                            {data.map(({ label, value }) => (
                                <Tab
                                    key={value}
                                    value={value}
                                    onClick={() => setActiveTab(value)}
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
<div className=' grid grid-flow-col'>
            <StatsCard title={"Sum Investment"} value={"21,345,543,432"} />
            <StatsCard title={"Sum Investment"} value={"21,345,543,432"} />
            <StatsCard title={"Sum Investment"} value={"21,345,543,432"} />
            <StatsCard title={"Sum Investment"} value={"21,345,543,432"} />
            <StatsCard title={"Sum Investment"} value={"21,345,543,432"} />
        </div>
        <div className=' grid grid-flow-col'>
            <Charts />
            <Charts />
            <Charts />
        </div>
        </div>
        
    )
}
function Activity(){
    return(
        <div className='grid grid-cols-4 gap-6'>
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

function Footer() {
    return (
        <div className='p-4 bg-white border-2 rounded-lg h-fit'>
            <h1 className='text-2xl font-semibold'>Conections</h1>
            <ConnectionCard name={"prashant"} imgurl={"https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"} />
            <ConnectionCard name={"prashant"} imgurl={"https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"} />
            <ConnectionCard name={"prashant"} imgurl={"https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"} />
            <ConnectionCard name={"prashant"} imgurl={"https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"} />
            <ConnectionCard name={"prashant"} imgurl={"https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"} />



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

function ConnectionCard({ name, imgurl }) {
    return (
        <div className='grid grid-flow-col gap-4 p-2'>
            <Avatar src={imgurl}/>
            <div>
            <p className='font-semibold text-lg'>{name}</p>
            <p className='font-medium text-sm'>@username</p>
            </div>
            <button className='m-1 p-1 border-2 rounded-lg'>Connect</button>
        </div>
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
