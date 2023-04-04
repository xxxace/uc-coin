import { useAccount } from 'wagmi'
import * as Contracts from '@/components/Contracts'

function Test() {
  const { isConnected } = useAccount()

  return (
    <>
      {/* <h1>wagmi + Next.js</h1> */}

      {!isConnected ? '未连接,请先连接钱包' : ''}
      {isConnected && (
        <>
          <Contracts.GetPledgeInfo />

          <Contracts.GetPledgeReqire />

          <Contracts.GetPledgeReturn />

          <Contracts.Mint />

          <Contracts.MintPledge />

          <Contracts.PledgeToken />

          <Contracts.SetMintCfg />

          <Contracts.SetPledgeReqire />

          <Contracts.SetPledgeReturn />

          <Contracts.UpdateMintCfg />

          <Contracts.WithdrawPledge />

          <Contracts.WithdrawProfit />
        </>
      )}
    </>
  )
}


export default Test