import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { useState } from 'react'
import styles from '@/styles/test.module.css';

const contract_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

export default function SetPledgeReqire() {

    // "pledgeTokenErc": "erc20/721/1155",
    // "plgToken": "质押token",
    // "profitToken": "收益Token",
    // "profitTokenErc": "erc20/721/1155"

    const [plgToken, setPlgToken] = useState('');
    const [pledgeTokenErc, setPledgeTokenErc] = useState(0);
    const [profitToken, setProfitToken] = useState('');
    const [profitTokenErc, setProfitTokenErc] = useState(0);

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
                    internalType: "enum Store.ERCType",
                    name: "pledgeTokenErc",
                    type: "uint8"
                },
                {
                    internalType: "address",
                    name: "profitToken",
                    type: "address"
                },
                {
                    internalType: "enum Store.ERCType",
                    name: "profitTokenErc",
                    type: "uint8"
                }
            ],
            name: "setPledgeReqire",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
        }] as const,
        functionName: 'setPledgeReqire',
        args: [plgToken as `0x${string}`, pledgeTokenErc, profitToken as `0x${string}`, profitTokenErc]
    })

    const { data, isLoading, isSuccess, write } = useContractWrite(config)


    return (
        <div className={styles.borderedDiv} >
            <p>
                <span className={styles.boldText}>设置质押信息</span>。
            </p>
            <label htmlFor="plgToken">质押token:</label>
            <input
                type="text"
                id="plgToken"
                value={plgToken}
                onChange={(e) => setPlgToken(e.target.value)}
            />

            <label htmlFor="pledgeTokenErc">Pledge Token ERC (erc20/721/1155):</label>
            <input
                type="number"
                id="pledgeTokenErc"
                value={pledgeTokenErc}
                onChange={(e) => setPledgeTokenErc(parseInt(e.target.value, 10))}
            />

            <label htmlFor="profitToken">收益Token:</label>
            <input
                type="text"
                id="profitToken"
                value={profitToken}
                onChange={(e) => setProfitToken(e.target.value)}
            />

            <label htmlFor="profitTokenErc">Profit Token ERC (erc20/721/1155):</label>
            <input
                type="number"
                id="profitTokenErc"
                value={profitTokenErc}
                onChange={(e) => setProfitTokenErc(parseInt(e.target.value, 10))}
            />

            <button disabled={!write || isLoading} onClick={() => write && write()}>
                {isLoading ? 'Minting...' : 'SetPledgeReqire'}
            </button>
            {isSuccess && (
                <div>
                    Successfully SetPledgeReqire!
                    <div>
                        <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                    </div>
                </div>
            )}

        </div>
    )

}
