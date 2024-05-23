"use client";
import React, { useState } from 'react'
import CountUp from 'react-countup'
import ScrollTrigger from 'react-scroll-trigger';


const Odometer = ({value}) => {

    const [counterOn , setCounterOn] = useState(false)

  return (
    <ScrollTrigger onEnter={()=>setCounterOn(true)} onExit={()=>setCounterOn(false)}>
        {counterOn && <CountUp start={0} end={value} duration={2} delay={0.5} />}
    </ScrollTrigger>
  )
}

export default Odometer