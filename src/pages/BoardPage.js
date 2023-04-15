import React, { useEffect, useState } from 'react'
import Example from '../components/Layout';
import CanbanBoard from '../components/CanbanBoard';

const BoardPage = ({id,href}) => {
  const [data,seData]=useState(id)
  useEffect(()=>{
    seData(id)
  },[id])
  return (
  <Example>
    <CanbanBoard id={data} href={href}/>
  </Example>
  ) 
}

export default BoardPage