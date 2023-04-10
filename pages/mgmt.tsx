import { useAccount } from 'wagmi'
import * as Contracts from '@/components/Contracts'

function Test() {
  const { isConnected } = useAccount()

  return (
    <div className='test min-h-[100px] py-4'>
      {/* <h1>wagmi + Next.js</h1> */}
      {!isConnected ? '未连接,请先连接钱包' : ''}
      {isConnected && (
        <>
          <Contracts.GetPayToken />

          <Contracts.GetPledgeCfg />

          <Contracts.GetPledgeToken />

          <Contracts.GetProfitToken />

          <Contracts.SetPledgeCfg />

          <Contracts.UpdatePledgeCfg/>
        </>
      )}
    </div>
  )
}


export default Test