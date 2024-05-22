import React from 'react'

const GradientText = ({children ,className ,gradient}) => {

  return (
    <span className={`bg-overlay bg-gradient-to-r ${className} ${gradient ? gradient : ' from-green-500 to-yellow-500'}`}>{children}</span>
  )
}

export default GradientText