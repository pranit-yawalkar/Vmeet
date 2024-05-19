import { Loader2 } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className="flex-center min-h-screen w-full">
        <Loader2 width={50} height={50} />
    </div>
  )
}

export default Loader