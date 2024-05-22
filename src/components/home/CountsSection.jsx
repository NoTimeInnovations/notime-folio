import React from 'react'
import CountCard from './CountCard'


const CountsSection = () => {
  return (
    <div className='w-full bg-[#151b24] p-10 rounded-xl grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 mb-20 lg:mt-56 '>

        {/* sudentes number  */}
        <CountCard value={10} text={'Students'}/>

        {/* Batches number  */}
        <CountCard value={5} text={'Batches'}/>

        {/* Live Projects  */}
        <CountCard value={10} text={'Live Projects'}/>

        {/* OnGoing Projects  */}
        <CountCard value={5} text={'OnGoing Projects'}/>

    </div>
  )
}

export default CountsSection