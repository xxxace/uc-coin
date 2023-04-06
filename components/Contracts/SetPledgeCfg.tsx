import { BigNumber } from "ethers";
import { useState } from "react";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { SendTransactionResult } from '@wagmi/core/dist/index'
import { PledgeToken, ProfitToken, PayToken, PledgeReturn } from './type'
import { getPledgeCfg } from "./GetPledgeCfg";
import styles from '@/styles/test.module.css';

const contract_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x{string}`
const wagmigotchiABI = [{
    "inputs": [
        {
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
            ],
            "internalType": "struct Store.TokenX",
            "name": "pledgeToken",
            "type": "tuple"
        },
        {
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
            ],
            "internalType": "struct Store.TokenX",
            "name": "payToken",
            "type": "tuple"
        },
        {
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
            ],
            "internalType": "struct Store.TokenX",
            "name": "profitToken",
            "type": "tuple"
        },
        {
            "components": [
                {
                    "internalType": "enum Store.ProfitType",
                    "name": "profitType",
                    "type": "uint8"
                },
                {
                    "internalType": "bool",
                    "name": "isDayRelease",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "profit",
                    "type": "uint256"
                }
            ],
            "internalType": "struct Store.PledgeReturn",
            "name": "pledgeReturn",
            "type": "tuple"
        },
        {
            "internalType": "uint32",
            "name": "pledgeDays",
            "type": "uint32"
        }
    ],
    "name": "setPledgeCfg",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}] as const

export interface SetPledgeCfgProps {
    pledgeToken: PledgeToken;
    payToken: PayToken;
    profitToken: ProfitToken;
    pledgeReturn: PledgeReturn;
    pledgeDays: number
}

export function setPledgeCfg({ pledgeToken, payToken, profitToken, pledgeReturn, pledgeDays }: SetPledgeCfgProps) {
    const { config } = usePrepareContractWrite({
        address: contract_address,
        abi: wagmigotchiABI,
        functionName: 'setPledgeCfg',
        args: [pledgeToken, payToken, profitToken, pledgeReturn, pledgeDays]
    })

    return useContractWrite(config)
}

export default function SetPledgeCfg() {
    const [tokenAddr, setTokenAddr] = useState('')
    const [pledgeDays, setPledgeDays] = useState(0)
    const [data, setData] = useState<SendTransactionResult | undefined>()
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [write, setWrite] = useState<(() => void) | undefined>()

    const { data: pledgeCfg, isLoading: pledgeCfgIsLoading, isError: pledgeCfgIsError } = getPledgeCfg(tokenAddr as `0x${string}`, pledgeDays)

    if (pledgeCfg) {
        const res = setPledgeCfg(pledgeCfg)
        setData(res.data)
        setIsLoading(res.isLoading)
        setIsSuccess(res.isSuccess)
        setWrite(res.write)
    }


    return (
        <div className={styles.borderedDiv} >
            <p>
                <span className={styles.boldText}>配置质押Token(721), 支付token，收益token，收益类型，质押天数</span>。
            </p>
            <label>
                Token Address:
                <input type="text" value={tokenAddr} onChange={e => setTokenAddr(e.target.value)} />
            </label>
            <label>
                Pledge Days:
                <input type="number" value={pledgeDays} onChange={e => setPledgeDays(Number(e.target.value))} />
            </label>

            {<div>
                {pledgeCfgIsLoading ? (
                    <p>加载PledgeCfg中...</p>
                ) : pledgeCfgIsError ? (
                    <p>查询PledgeCfg出错，请重试。</p>
                ) : (
                    <>
                        <p>getPledgeCfg返回值：{JSON.stringify(pledgeCfg)}</p>
                        <button disabled={!write || isLoading} onClick={() => write && write()}>
                            {isLoading ? 'Writing...' : 'SetPledgeCfg'}
                        </button>
                        {isSuccess && (
                            <div>
                                Successfully SetPledgeCfg!
                                <div>
                                    <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>}
        </div>
    )
}