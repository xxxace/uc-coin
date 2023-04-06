import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { useState } from 'react'
import { BigNumber, utils } from 'ethers'
import styles from '@/styles/test.module.css';

const contract_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

export default function MintPledge() {

    // "details": "铸造并质押token(本合约必须先成为NFT合约miner)",
    // "params": {
    //   "cid": "nft cid",
    //   "pledgeDays": "质押天数",
    //   "tokenAddr": "合约地址",
    //   "tokenAmount": "数量",
    //   "tokenId": "tokenId"
    // }
    const [tokenAddr, setTokenAddr] = useState('');
    const [tokenId, setTokenId] = useState(0);
    const [tokenAmount, setTokenAmount] = useState(0);
    const [cid, setCid] = useState('');
    const [pledgeDays, setPledgeDays] = useState(0);

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
                    internalType: "uint256",
                    name: "tokenId",
                    type: "uint256"
                },
                {
                    internalType: "uint256",
                    name: "tokenAmount",
                    type: "uint256"
                },
                {
                    internalType: "string",
                    name: "cid",
                    type: "string"
                },
                {
                    internalType: "uint16",
                    name: "pledgeDays",
                    type: "uint16"
                }
            ],
            name: "mintPledge",
            outputs: [],
            stateMutability: "payable",
            type: "function"
        }] as const,
        functionName: 'mintPledge',
        args: [tokenAddr as `0x${string}`, BigNumber.from(tokenId), BigNumber.from(tokenAmount ? utils.parseEther(tokenAmount.toString()) : '0'), cid, pledgeDays],
    });

    const { data, isLoading, isSuccess, write } = useContractWrite(config);

    return (
        <div className={styles.borderedDiv} >
            <p>
                <span className={styles.boldText}>铸造并质押token(本合约必须先成为NFT合约miner)</span>。
            </p>
            <label htmlFor="cid">NFT CID:</label>
            <input
                type="text"
                id="cid"
                value={cid}
                onChange={(e) => setCid(e.target.value)}
            />

            <label htmlFor="tokenAddr">合约地址:</label>
            <input
                type="text"
                id="tokenAddr"
                value={tokenAddr}
                onChange={(e) => setTokenAddr(e.target.value)}
            />

            <label htmlFor="tokenAmount">数量:</label>
            <input
                type="number"
                id="tokenAmount"
                value={tokenAmount}
                onChange={(e) => setTokenAmount(parseInt(e.target.value, 10))}
            />

            <label htmlFor="tokenId">Token ID:</label>
            <input
                type="number"
                id="tokenId"
                value={tokenId}
                onChange={(e) => setTokenId(parseInt(e.target.value, 10))}
            />
            <button disabled={!write || isLoading} onClick={() => write && write()}>
                {isLoading ? 'Minting...' : 'MintPledge'}
            </button>
            {isSuccess && (
                <div>
                    Successfully minted your NFT!
                    <div>
                        <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                    </div>
                </div>
            )}
        </div>
    );
}