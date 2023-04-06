import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { useState } from 'react'
import { BigNumber, utils } from 'ethers'
import styles from '@/styles/test.module.css';

const contract_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

export default function SetPledgeReturn() {

    const [tokenAddr, setTokenAddr] = useState('');
    const [pledgeDays, setPledgeDays] = useState(0);
    const [pType, setPType] = useState(0);
    const [profit, setProfit] = useState(0);


    const { config } = usePrepareContractWrite({
        address: contract_address,
        abi: [{
            inputs: [
                {
                    internalType: "address",
                    name: "tokenAddr",
                    type: "address"
                },
                {
                    internalType: "uint16",
                    name: "pledgeDays",
                    type: "uint16"
                },
                {
                    internalType: "enum Store.ProfitType",
                    name: "pType",
                    type: "uint8"
                },
                {
                    internalType: "uint256",
                    name: "profit",
                    type: "uint256"
                }
            ],
            name: "setPledgeReturn",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
        }] as const,
        functionName: 'setPledgeReturn',
        args: [tokenAddr as `0x${string}`, pledgeDays, pType, BigNumber.from(profit ? utils.parseEther(profit.toString()) : '0')]
    })

    const { data, isLoading, isSuccess, write } = useContractWrite(config)

    return (
        <div className={styles.borderedDiv} >
            <p>
                <span className={styles.boldText}>返回指定token在指定质押期内的收益情况(仅管理员操作)</span>。
            </p>
            <label htmlFor="tokenAddr">Token Address:</label>
            <input
                id="tokenAddr"
                name="tokenAddr"
                type="text"
                value={tokenAddr}
                onChange={(e) => setTokenAddr(e.target.value)}
            />

            <label htmlFor="pledgeDays">Pledge Days:</label>
            <input
                id="pledgeDays"
                name="pledgeDays"
                type="number"
                value={pledgeDays}
                onChange={(e) => setPledgeDays(parseInt(e.target.value, 10))}
            />

            <label htmlFor="pType">P Type:</label>
            <input
                id="pType"
                name="pType"
                type="number"
                value={pType}
                onChange={(e) => setPType(parseInt(e.target.value, 10))}
            />

            <label htmlFor="profit">Profit:</label>
            <input
                id="profit"
                name="profit"
                type="number"
                value={profit}
                onChange={(e) => setProfit(parseInt(e.target.value, 10))}
            />
            <button disabled={!write || isLoading} onClick={() => write && write()}>
                {isLoading ? 'Minting...' : 'SetPledgeReturn'}
            </button>
            {isSuccess && (
                <div>
                    Successfully SetPledgeReturn!
                    <div>
                        <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                    </div>
                </div>
            )}
        </div>
    )
}