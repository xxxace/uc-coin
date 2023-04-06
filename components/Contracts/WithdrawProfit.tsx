import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { useState } from 'react'
import { BigNumber } from 'ethers'
import styles from '@/styles/test.module.css';

const contract_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

export default function WithdrawProfit() {

    // "details": "提取收益",
    // "params": {
    //   "pledgeToken": "被质押的token",
    //   "tokenId": "质押的tokenId,ERC20为0"
    // }
    const [pledgeToken, setPledgeToken] = useState('');
    const [tokenId, setTokenId] = useState(0);

    const { config } = usePrepareContractWrite({
        address: contract_address,
        abi: [{
            inputs: [
                {
                    internalType: "address",
                    name: "pledgeToken",
                    type: "address"
                },
                {
                    internalType: "uint256",
                    name: "tokenId",
                    type: "uint256"
                }
            ],
            name: "withdrawProfit",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
        }] as const,
        functionName: 'withdrawProfit',
        args: [pledgeToken as `0x${string}`, BigNumber.from(tokenId)]
    });

    const { data, isLoading, isSuccess, write } = useContractWrite(config);

    return (
        <div className={styles.borderedDiv} >
            <p>
                <span className={styles.boldText}>提取收益</span>。
            </p>
            <label htmlFor="pledgeToken">被质押的token:</label>
            <input
                type="text"
                id="pledgeToken"
                value={pledgeToken}
                onChange={(e) => setPledgeToken(e.target.value)}
            />

            <label htmlFor="tokenId">质押的tokenId, ERC20为0:</label>
            <input
                type="number"
                id="tokenId"
                value={tokenId}
                onChange={(e) => setTokenId(parseInt(e.target.value, 10))}
            />
            <button disabled={!write || isLoading} onClick={() => write && write()}>
                {isLoading ? 'withdrawProfit...' : 'withdrawProfit'}
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