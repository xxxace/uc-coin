import { useAccount } from 'wagmi'
import * as Contracts from '@/components/Contracts'

function Test() {
  const { isConnected } = useAccount()

  return (
    <div className='min-h-[100px] py-4'>
      {/* <h1>wagmi + Next.js</h1> */}
      {!isConnected ? '未连接,请先连接钱包' : ''}
      {isConnected && (
        <>
        <Contracts.SetPledgeCfg/>
          <Contracts.GetPledgeInfo />

          <Contracts.GetPledgeReqire />

          <Contracts.GetPledgeReturn />


          <Contracts.WithdrawPledge />

          <Contracts.WithdrawProfit />
        </>
      )}
    </div>
  )
}


export default Test