import { useContractRead } from 'wagmi'
import { useState } from 'react'
import styles from '@/styles/test.module.css';

const contract_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

export default function GetPledgeReturn() {
    const [tokenAddr, setTokenAddr] = useState('');
    const [pledgeDays, setPledgeDays] = useState(0);

    const { data, isError, isLoading } = useContractRead({
        address: contract_address,
        abi: [{
            inputs: [
                {
                    internalType: 'address',
                    name: 'tokenAddr',
                    type: 'address'
                },
                {
                    internalType: 'uint16',
                    name: 'pledgeDays',
                    type: 'uint16'
                }
            ],
            name: 'getPledgeReturn',
            outputs: [
                {
                    internalType: 'uint8',
                    name: '',
                    type: 'uint8'
                },
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        }],
        functionName: 'getPledgeReturn',
        args: [tokenAddr as `0x${string}`, pledgeDays],
    });

    return (
        <div className={styles.borderedDiv} >
            <p>
                <span className={styles.boldText}>返回指定token在指定质押期内的收益情况</span>。
            </p>
            <label>
                Token Address:
                <input type="text" value={tokenAddr} onChange={e => setTokenAddr(e.target.value)} />
            </label>
            <label>
                Pledge Days:
                <input type="number" value={pledgeDays} onChange={e => setPledgeDays(Number(e.target.value))} />
            </label>
            <button onClick={() => console.log(data)}>Get Pledge Return</button>
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