import { useAccount } from 'wagmi'
import * as Contracts from '@/components/Contracts'
import { useEffect, useState } from 'react'

function User() {
  const res = useAccount()
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    setIsConnected(res.isConnected)
  }, [res.isConnected])

  return (
    <div className='test min-h-[100px] py-4'>
      {/* <h1>wagmi + Next.js</h1> */}
      {!isConnected ? '未连接,请先连接钱包' : ''}
      {isConnected && (
        <>
          <Contracts.GetPledgeInfo />

          {/* <Contracts.GetPledgeReqire /> */}

          <Contracts.GetPledgeReturn />

          {/* <Contracts.Mint /> */}

          <Contracts.MintPledge />

          <Contracts.PledgeToken />

          {/* <Contracts.SetMintCfg /> */}

          {/* <Contracts.SetPledgeReqire /> */}

          {/* <Contracts.SetPledgeReturn /> */}

          {/* <Contracts.UpdateMintCfg /> */}

          <Contracts.WithdrawPledge />

          <Contracts.WithdrawProfit />

          <Contracts.FileUploader />
        </>
      )}
    </div>
  )
}


export default User