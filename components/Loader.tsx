import { Loader2 } from 'lucide-react'
import React from 'react'
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";

const Loader = () => {
  return (
    <div className="flex-center flex-col min-h-screen w-full">
        <Spinner color='white' size={32} animating />
        <p className='text-white my-5'>Loading...</p>
    </div>
  )
}

export default Loader