import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import UploadModal from '../../../Components/UploadModal'
import { Stepper, Step, Button } from "@material-tailwind/react";

export default function Onboard() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const link=["/Onboarding","/Onboarding/2","Onboarding/3"]
  const navigate=useNavigate();
  const handleNext = () => {
    setActiveStep((cur) => cur + 1);
    console.log(activeStep)
    navigate(`${link[activeStep+1]}`)};
  const handlePrev = () => {setActiveStep((cur) => cur - 1);navigate(`${link[activeStep-1]}`)};
  return (
    <div className='w-screen py-36 h-screen bg-base-secondary grid gap-12 place-items-center'>
      <Stepper className='w-[30vw]'
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>1</Step>
        <Step onClick={() => setActiveStep(1)}>2</Step>
        <Step onClick={() => setActiveStep(2)}>3</Step>
      </Stepper>

      <Outlet />
      {!isLastStep&&<div className="flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>}
      <UploadModal />
    </div>
  )
}
