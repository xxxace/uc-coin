import { useContractRead } from 'wagmi'
import * as mainAbi from '@/config/mainAbi'
import { useState } from 'react'
import styles from '@/styles/test.module.css';

const contract_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

export default function GetPledgeReqire() {
    const [plgToken, setPlgToken] = useState('');

    const { data, isError, isLoading } = useContractRead({
        address: contract_address,
        abi: mainAbi.getPledgeReqireAbi,
        functionName: 'getPledgeReqireAbi',
        args: [plgToken],
    });

    return (
        <div className={styles.borderedDiv} >
            <p>
                <span className={styles.boldText}>返回指定token在指定质押期内的收益情况</span>。
            </p>
            <label>
                Plg Token:
                <input type="text" value={plgToken} onChange={e => setPlgToken(e.target.value)} />
            </label>
            <button onClick={() => console.log(data)}>Get Pledge Reqire</button>
            {
                <div>
                    {isLoading ? (
                        <p>加载中...</p>
                    ) : isError ? (
                        <p>查询出错，请重试。</p>
                    ) : (
                        <p>合约方法返回值：{JSON.stringify(data)}</p>
                    )}
                </div>
            }

        </div>
    );
}