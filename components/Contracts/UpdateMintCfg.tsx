import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { useState } from 'react'
import { BigNumber, utils } from 'ethers'
import styles from '@/styles/test.module.css';

const contract_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

export default function UpdateMintCfg() {

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


    // 使用useState钩子来管理输入框的状态
    const [tokenAddr, setTokenAddr] = useState('');
    const [erc, setErc] = useState(0);
    const [nType, setNType] = useState(0);
    const [nLevel, setNLevel] = useState(0);
    const [pledgeDays, setPledgeDays] = useState(0);
    const [payToken, setPayToken] = useState('');
    const [payERC, setPayERC] = useState(0);
    const [payValue, setPayValue] = useState(0);
    const [aDropToken, setADropToken] = useState('');
    const [aDropERC, setADropERC] = useState(0);
    const [aDropValue, setADropValue] = useState(0);
    const [adAsProfit, setAdAsProfit] = useState(false);


    const { config } = usePrepareContractWrite({
        address: contract_address,
        abi: [
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'tokenAddr',
                        type: 'address'
                    },
                    {
                        internalType: 'enum Store.ERCType',
                        name: 'erc',
                        type: 'uint8'
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
                        internalType: 'uint16',
                        name: 'pledgeDays',
                        type: 'uint16'
                    },
                    {
                        internalType: 'address',
                        name: 'payToken',
                        type: 'address'
                    },
                    {
                        internalType: 'enum Store.ERCType',
                        name: 'payERC',
                        type: 'uint8'
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
                        internalType: 'enum Store.ERCType',
                        name: 'aDropERC',
                        type: 'uint8'
                    },
                    {
                        internalType: 'uint256',
                        name: 'aDropValue',
                        type: 'uint256'
                    },
                    {
                        internalType: 'bool',
                        name: 'adAsProfit',
                        type: 'bool'
                    }
                ],
                stateMutability: 'nonpayable',
                type: 'function',
                name: 'updateMintCfg',
                outputs: [],
            },
        ] as const,
        functionName: 'updateMintCfg',
        args: [tokenAddr as `0x${string}`, erc, nType, nLevel, pledgeDays, payToken as `0x${string}`, payERC, BigNumber.from(payValue ? utils.parseEther(payValue.toString()) : '0'), aDropToken as `0x${string}`, aDropERC, BigNumber.from(aDropValue ? utils.parseEther(aDropValue.toString()) : '0'), adAsProfit]
        // args: ['0x77294988Be744e15E4B2Efa0442B48B1624C7911', 1, 2, 1, 1, '0x4977f63b15984e8a98228Df7876a50080aca1143', 0, BigNumber.from(1), '0x1704b99a38f8381B7A1Cd2f93fc11346a28c8e8D', 0, BigNumber.from(2), false]
    })

    // console.log('config : ' + `0x${'0x77294988Be744e15E4B2Efa0442B48B1624C7911'}`);
    const { data, write } = useContractWrite(config)
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })
    return (
        <div className={styles.borderedDiv} >
            <p>
                <span className={styles.boldText}>配置铸造信息</span>。
            </p>
            <label htmlFor="tokenAddr">nft支付地址:</label>
            <input
                id="tokenAddr"
                type="text"
                value={tokenAddr}
                onChange={(e) => setTokenAddr(e.target.value)}
            />

            <label htmlFor="erc">Token类型(0={'>'}ERC20,1,ERC721,2,ERC1155):</label>
            <input
                id="erc"
                type="number"
                value={erc}
                onChange={(e) => setErc(Number(e.target.value))}
            />

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

            <label htmlFor="pledgeDays">质押周期:</label>
            <input
                id="pledgeDays"
                type="number"
                value={pledgeDays}
                onChange={(e) => setPledgeDays(Number(e.target.value))}
            />

            <label htmlFor="payToken">支付铸造的token, 0表示ETH:</label>
            <input
                id="payToken"
                type="text"
                value={payToken}
                onChange={(e) => setPayToken(e.target.value)}
            />

            <label htmlFor="payERC">Token类型(0={'>'}ERC20,1,ERC721,2,ERC1155):</label>
            <input
                id="payERC"
                type="number"
                value={payERC}
                onChange={(e) => setPayERC(Number(e.target.value))}
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

            <label htmlFor="aDropERC">Token类型(0={'>'}ERC20,1,ERC721,2,ERC1155):</label>
            <input
                id="aDropERC"
                type="number"
                value={aDropERC}
                onChange={(e) => setADropERC(Number(e.target.value))}
            />

            <label htmlFor="aDropValue">空投数量:</label>
            <input
                id="aDropValue"
                type="number"
                value={aDropValue}
                onChange={(e) => setADropValue(Number(e.target.value))}
            />

            <label htmlFor="adAsProfit">是否将空投token作为质押收益Token:</label>
            <input
                id="adAsProfit"
                type="checkbox"
                checked={adAsProfit}
                onChange={(e) => setAdAsProfit(e.target.checked)}
            />


            <div>
                {/* <button disabled={!write || isLoading} onClick={() => write && write()}> */}
                <button disabled={isLoading} onClick={() => write && write()}>
                    {isLoading ? 'Loading...' : 'UpdateMintCfg'}
                </button>
                {isSuccess && (
                    <div>
                        Successfully UpdateMintCfg!
                        <div>
                            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}