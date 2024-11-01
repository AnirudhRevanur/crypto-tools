"use client"
import React from 'react'

function Flag() {

  const fetchData = async () => {
    await fetch("/qazsxdcfrtg")
  }
  return (
    <div className='flex flex-col w-screen h-screen items-center justify-center cursor-default'>
      <div onClick={fetchData}>Lookie here</div>
    </div>
  )
}

export default Flag
