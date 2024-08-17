import P2PCard from "@/components/p2p-card"
import React from 'react'

const P2PTransferPage = () => {
  return (
    <div className="w-full flex flex-col gap-4">
    <h1 className="text-primary text-xl font-semibold">
      P2P Transfer
    </h1>
    <div className="w-full flex items-center justify-center">
      <P2PCard />
    </div>
  </div>
  )
}

export default P2PTransferPage