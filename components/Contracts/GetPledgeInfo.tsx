import { useContractRead, useAccount } from 'wagmi'
import { useState } from 'react'
import { BigNumber } from 'ethers'
import styles from '@/styles/test.module.css';

const contract_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

export default function GetPledgeInfo() {

    const { address, isConnecting, isDisconnected, connector } = useAccount()

    const [showResult, setShowResult] = useState(false);

    // 使用useState钩子来管理输入框的状态
    // const [acc, setAcc] = useState('')
    const [tokenAddr, setTokenAddr] = useState('')
    const [tokenId, setTokenId] = useState(0)


    const { data, isError, isLoading } = useContractRead({
        address: contract_address,
        abi: [{
            inputs: [
                {
                    internalType: "address",
                    name: "acc",
                    type: "address"
                },
                {
                    internalType: "address",
                    name: "tokenAddr",
                    type: "address"
                },
                {
                    internalType: "uint256",
                    name: "tokenId",
                    type: "uint256"
                }
            ],
            name: "getPledgeInfo",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256"
                },
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256"
                },
                {
                    internalType: "uint16",
                    name: "",
                    type: "uint16"
                },
                {
                    internalType: "address",
                    name: "",
                    type: "address"
                },
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256"
                },
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256"
                }
            ],
            stateMutability: "view",
            type: "function"
        }] as const,
        functionName: 'getPledgeInfo',
        args: [address as `0x${string}`, tokenAddr as `0x${string}`, BigNumber.from(tokenId)],
    })

    const handleButtonClick = async () => {
        setShowResult(true);
    };
    

    
    return (
        <div className={styles.borderedDiv}>
            <p>
                <span className={styles.boldText}>返回(质押数量，质押时间，周期，收益token,释放收益,剩余可提取收益)</span>。
            </p>
            {/* <label htmlFor="acc">用户地址</label>
        <input id="acc" name="acc" type="text" value={acc} onChange={(e) => setAcc(e.target.value)} /> */}
            用户地址:{address + ' '}
            <label htmlFor="tokenAddr">代币地址：</label>
            <input id="tokenAddr" name="tokenAddr" type="text" value={tokenAddr} onChange={(e) => setTokenAddr(e.target.value)} />
            <label htmlFor="tokenId">tokenId：</label>
            <input id="tokenId" name="tokenId" type="number" value={tokenId} onChange={(e) => setTokenId(Number(e.target.value))} />
            <div>
                <button onClick={handleButtonClick}>查询合约方法</button>
                {showResult && (
                    <div>
                        {isLoading ? (
                            <p>加载中...</p>
                        ) : isError ? (
                            <p>查询出错，请重试。</p>
                        ) : (
                            <>
                                <p>合约方法返回值：</p>
                                {data && (
                                    <>
                                        <p className="font-bold">质押收益(pledgeReturn):</p>
                                        <div>
                                            <p>质押数量:{data[0].toNumber()}</p>
                                            <p>质押时间:{new Date(data[1].toNumber() * 1000).toLocaleString()}</p>
                                            <p>周期:{data[2]}</p>
                                            <p>收益Toekn:{data[3]}</p>
                                            <p>释放收益:{data[4].toNumber()}</p>
                                            <p>剩余可提取收益:{data[5].toNumber()}</p>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>

        </div>
    );
}