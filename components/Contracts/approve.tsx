import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { useState } from 'react'
import styles from '@/styles/test.module.css';
import { BigNumber, utils } from "ethers";

const contract_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

const pay_contract_address = process.env.NEXT_PUBLIC_PAY_TOKEN as `0x${string}`

export default function Approve() {

    // "details": "铸造NFT(本合约必须先成为NFT合约miner)",
    // "params": {
    //   "cid": "nft cid",
    //   "tokenAddr": "合约地址",
    //   "tokenAmount": "数量",
    //   "tokenId": "tokenId"
    // }
    const [spender, setSpender] = useState('');
    const [tokenAmount, setTokenAmount] = useState(0);


    const { config } = usePrepareContractWrite({
        address: pay_contract_address, // 你的代币合约地址
        abi: [{
            constant: false,
            inputs: [
              {
                name: "spender",
                type: "address"
              },
              {
                name: "value",
                type: "uint256"
              }
            ],
            name: "approve",
            outputs: [
              {
                name: "",
                type: "bool"
              }
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
          }] as const, 
        functionName: 'approve',
        args: [spender as `0x${string}`, BigNumber.from(utils.parseEther(tokenAmount.toString()))], // 授权给某个地址X个代币
      });

    const { data, isLoading, isSuccess, write } = useContractWrite(config);

    return (
        <div className={styles.borderedDiv} >
            <p>
                <span className={styles.boldText}>授权</span>。
            </p>
            
            <button disabled={!write || isLoading} onClick={() => write && write()}>
                {isLoading ? 'Approve...' : 'Approve'}
            </button>
            {isSuccess && (
                <div>
                    Successfully!
                    <div>
                        <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                    </div>
                </div>
            )}
        </div>
    );
}