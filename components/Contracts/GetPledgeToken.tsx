import { useState } from "react"
import { useContractRead } from "wagmi"
import styles from '@/styles/test.module.css';

const contract_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`
const wagmigotchiABI = [{
    "inputs": [
        {
            "internalType": "address",
            "name": "tokenAddr",
            "type": "address"
        },
        {
            "internalType": "uint32",
            "name": "pledgeDays",
            "type": "uint32"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "name": "getPledgeToken",
    "outputs": [
        {
            "internalType": "struct Store.TokenX",
            "name": "",
            "type": "tuple",
            "components": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "enum Store.ERCType",
                    "name": "ercType",
                    "type": "uint8"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ]
        }
    ]
}] as const

export function getPledgeToken(tokenAddr: `0x${string}`, pledgeDays: number) {
    return useContractRead({
        address: contract_address,
        abi: wagmigotchiABI,
        functionName: 'getPledgeToken',
        args: [tokenAddr, pledgeDays]
    })
}

export default function GetPledgeToken() {
    const [tokenAddr, setTokenAddr] = useState('')
    const [pledgeDays, setPledgeDays] = useState(0)
    const { data, isError, isLoading } = getPledgeToken(tokenAddr as `0x${string}`, pledgeDays)

    return (
        <div className={styles.borderedDiv} >
            <p>
                <span className={styles.boldText}>返回质押token信息</span>。
            </p>
            <label>
                Token Address:
                <input type="text" value={tokenAddr} onChange={e => setTokenAddr(e.target.value)} />
            </label>
            <label>
                Pledge Days:
                <input type="number" value={pledgeDays} onChange={e => setPledgeDays(Number(e.target.value))} />
            </label>
            <button onClick={() => console.log(data)}>Get Pledge Token</button>
            {<div>
                {isLoading ? (
                    <p>加载中...</p>
                ) : isError ? (
                    <p>查询出错，请重试。</p>
                ) : (
                    <p>合约方法返回值：{JSON.stringify(data)}</p>
                )}
            </div>}

        </div>
    );
}