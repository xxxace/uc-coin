import { usePrepareContractWrite, useContractWrite, useAccount } from 'wagmi'
import { useState } from 'react'
import { BigNumber, utils } from 'ethers'
import styles from '@/styles/test.module.css';

const contract_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

export default function SetMintCfg() {

    // "aDropERC": "Token类型(0=>ERC20,1,ERC721,2,ERC1155)",
    // "aDropToken": "空投Token",
    // "aDropValue": "空投数量",
    // "adAsProfit": "是否将空投token作为质押收益Token",
    // "erc": "Token类型(0=>ERC20,1,ERC721,2,ERC1155)",
    // "nLevel": "点票级才有等级，level0-2三级",
    // "nType": "nft类型，普通，正常，点票",
    // "payERC": "Token类型(0=>ERC20,1,ERC721,2,ERC1155)",
    // "payToken": "支付铸造的token, 0表示ETH",
    // "payValue": "支付数量",
    // "pledgeDays": "质押周期",
    // "tokenAddr": "nft支付地址"


    const { address, isConnecting, isDisconnected } = useAccount()

    // const [tokenAddr, setTokenAddr] = useState('');
    const [nType, setNType] = useState(0);
    const [nLevel, setNLevel] = useState(0);
    const [payToken, setPayToken] = useState('');
    const [payValue, setPayValue] = useState(0);
    const [aDropToken, setADropToken] = useState('');
    const [aDropValue, setADropValue] = useState(0);

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
                    internalType: 'enum Store.TokenType',
                    name: 'nType',
                    type: 'uint8'
                },
                {
                    internalType: 'enum Store.TokenLevel',
                    name: 'nLevel',
                    type: 'uint8'
                },
                {
                    internalType: 'address',
                    name: 'payToken',
                    type: 'address'
                },
                {
                    internalType: 'uint256',
                    name: 'payValue',
                    type: 'uint256'
                },
                {
                    internalType: 'address',
                    name: 'aDropToken',
                    type: 'address'
                },
                {
                    internalType: 'uint256',
                    name: 'aDropValue',
                    type: 'uint256'
                }
            ],
            name: 'setMintCfg',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function'
        }] as const,
        functionName: 'setMintCfg',
        args: [address as `0x${string}`, nType, nLevel, payToken as `0x${string}`, BigNumber.from(payValue ? utils.parseEther(payValue.toString()) : '0'), aDropToken as `0x${string}`, BigNumber.from(aDropValue ? utils.parseEther(aDropValue.toString()) : '0')]

    })

    const { data, isLoading, isSuccess, write } = useContractWrite(config)


    return (
        <div className={styles.borderedDiv} >
            <p>
                <span className={styles.boldText}>配置铸造信息，参数看updateMintCfg方法</span>。
            </p>

            <label htmlFor="nType">nft类型，普通，正常，点票:</label>
            <input
                id="nType"
                type="number"
                value={nType}
                onChange={(e) => setNType(Number(e.target.value))}
            />

            <label htmlFor="nLevel">点票级才有等级，level0-2三级:</label>
            <input
                id="nLevel"
                type="number"
                value={nLevel}
                onChange={(e) => setNLevel(Number(e.target.value))}
            />

            <label htmlFor="payToken">支付铸造的token, 0表示ETH:</label>
            <input
                id="payToken"
                type="text"
                value={payToken}
                onChange={(e) => setPayToken(e.target.value)}
            />

            <label htmlFor="payValue">支付数量:</label>
            <input
                id="payValue"
                type="number"
                value={payValue}
                onChange={(e) => setPayValue(Number(e.target.value))}
            />

            <label htmlFor="aDropToken">空投Token:</label>
            <input
                id="aDropToken"
                type="text"
                value={aDropToken}
                onChange={(e) => setADropToken(e.target.value)}
            />

            <label htmlFor="aDropValue">空投数量:</label>
            <input
                id="aDropValue"
                type="number"
                value={aDropValue}
                onChange={(e) => setADropValue(Number(e.target.value))}
            />

            <button disabled={!write || isLoading} onClick={() => write && write()}>
                {isLoading ? 'Minting...' : 'SetMintCfg'}
            </button>
            {isSuccess && (
                <div>
                    Successfully SetMintCfg!
                    <div>
                        <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                    </div>
                </div>
            )}
        </div>
    )
}