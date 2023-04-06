import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { useState } from 'react'
import { BigNumber, utils } from 'ethers'
import styles from '@/styles/test.module.css';

const contract_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

export default function PledgeToken() {
    const [tokenAddr, setTokenAddr] = useState('');
    const [tokenId, setTokenId] = useState(0);
    const [tokenAmount, setTokenAmount] = useState(0);
    const [pledgeDays, setPledgeDays] = useState(0);

    const { config } = usePrepareContractWrite({
        address: contract_address,
        abi: [{
            inputs: [
                {
                    internalType: 'address',
                    name: 'tokenAddr',
                    type: 'address'
                },
                {
                    internalType: 'uint256',
                    name: 'tokenId',
                    type: 'uint256'
                },
                {
                    internalType: 'uint256',
                    name: 'tokenAmount',
                    type: 'uint256'
                },
                {
                    internalType: 'uint16',
                    name: 'pledgeDays',
                    type: 'uint16'
                }
            ],
            name: 'pledgeToken',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function'
        }] as const,
        functionName: 'pledgeToken',
        args: [tokenAddr as `0x${string}`, BigNumber.from(tokenId), BigNumber.from(tokenAmount ? utils.parseEther(tokenAmount.toString()) : '0'), pledgeDays]
    });

    const { data, isLoading, isSuccess, write } = useContractWrite(config);

    return (
        <div className={styles.borderedDiv} >
            <p>
                <span className={styles.boldText}>手动质押</span>。
            </p>
            <label htmlFor="pledgeDays">质押天数，支持7/30/90/180:</label>
            <input
                type="number"
                id="pledgeDays"
                value={pledgeDays}
                onChange={(e) => setPledgeDays(parseInt(e.target.value, 10))}
            />

            <label htmlFor="tokenAddr">质押Token地址:</label>
            <input
                type="text"
                id="tokenAddr"
                value={tokenAddr}
                onChange={(e) => setTokenAddr(e.target.value)}
            />

            <label htmlFor="tokenAmount">质押数量 721 为1:</label>
            <input
                type="number"
                id="tokenAmount"
                value={tokenAmount}
                onChange={(e) => setTokenAmount(parseInt(e.target.value, 10))}
            />

            <label htmlFor="tokenId">质押TokenId,ERC20 为0:</label>
            <input
                type="number"
                id="tokenId"
                value={tokenId}
                onChange={(e) => setTokenId(parseInt(e.target.value, 10))}
            />
            <button disabled={!write || isLoading} onClick={() => write && write()}>
                {isLoading ? 'PledgeToken...' : 'PledgeToken'}
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