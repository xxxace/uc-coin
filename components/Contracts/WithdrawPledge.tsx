import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { useState } from 'react'
import { BigNumber } from 'ethers'
import styles from '@/styles/test.module.css';

const contract_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

export default function WithdrawPledge() {
    const [plgToken, setPlgToken] = useState('');
    const [tokenId, setTokenId] = useState(0);

    const { config } = usePrepareContractWrite({
        address: contract_address,
        abi: [{
            inputs: [
                {
                    internalType: "address",
                    name: "plgToken",
                    type: "address"
                },
                {
                    internalType: "uint256",
                    name: "tokenId",
                    type: "uint256"
                }
            ],
            name: "withdrawPledge",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
        }] as const,
        functionName: 'withdrawPledge',
        args: [plgToken as `0x${string}`, BigNumber.from(tokenId)]
    });

    const { data, isLoading, isSuccess, write } = useContractWrite(config);

    return (
        <div className={styles.borderedDiv} >
            <p>
                <span className={styles.boldText}>WithdrawPledge</span>。
            </p>
            <label>
                PLG Token:
                <input type="text" value={plgToken} onChange={e => setPlgToken(e.target.value)} />
            </label>
            <label>
                Token ID:
                <input type="number" value={tokenId} onChange={e => setTokenId(Number(e.target.value))} />
            </label>
            <button disabled={!write || isLoading} onClick={() => write && write()}>
                {isLoading ? 'withdrawPledge...' : 'withdrawPledge'}
            </button>
            {isSuccess && (
                <div>
                    Successfully !
                    <div>
                        <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                    </div>
                </div>
            )}
        </div>
    );
}