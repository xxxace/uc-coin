import { useState } from "react"
import { useContractRead } from "wagmi"
import styles from '@/styles/test.module.css';
import ResultDetail from "./ResultDetail";

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
    "name": "getPayToken",
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

export function getPayToken(tokenAddr: `0x${string}`, pledgeDays: number) {
    return useContractRead({
        address: contract_address,
        abi: wagmigotchiABI,
        functionName: 'getPayToken',
        args: [tokenAddr, pledgeDays]
    })
}

export default function GetPayToken() {
    const [tokenAddr, setTokenAddr] = useState('')
    const [pledgeDays, setPledgeDays] = useState(0)

    const { data, isLoading, isError } = getPayToken(tokenAddr as `0x${string}`, pledgeDays)

    return (
        <div className={styles.borderedDiv} >
            <p>
                <span className={styles.boldText}>返回支付token信息</span>。
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
                    <>
                        <p>合约方法返回值：</p>
                        <ResultDetail data={data} />
                    </>
                )}
            </div>}

        </div>
    );
}