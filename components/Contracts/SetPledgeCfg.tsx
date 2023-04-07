import { BigNumber, utils } from "ethers";
import { useState } from "react";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { SendTransactionResult } from '@wagmi/core/dist/index'
import { PledgeToken, ProfitToken, PayToken, PledgeReturn } from './type'
import { getPledgeCfg } from "./GetPledgeCfg";
import styles from '@/styles/test.module.css';

const contract_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x{string}`
const wagmigotchiABI = [{
    "inputs": [
        {
            "components": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "enum Store.ERCType",
                    "name": "ercType",
                    "type": "uint8"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "internalType": "struct Store.TokenX",
            "name": "pledgeToken",
            "type": "tuple"
        },
        {
            "components": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "enum Store.ERCType",
                    "name": "ercType",
                    "type": "uint8"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "internalType": "struct Store.TokenX",
            "name": "payToken",
            "type": "tuple"
        },
        {
            "components": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "enum Store.ERCType",
                    "name": "ercType",
                    "type": "uint8"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "internalType": "struct Store.TokenX",
            "name": "profitToken",
            "type": "tuple"
        },
        {
            "components": [
                {
                    "internalType": "enum Store.ProfitType",
                    "name": "profitType",
                    "type": "uint8"
                },
                {
                    "internalType": "bool",
                    "name": "isDayRelease",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "profit",
                    "type": "uint256"
                }
            ],
            "internalType": "struct Store.PledgeReturn",
            "name": "pledgeReturn",
            "type": "tuple"
        },
        {
            "internalType": "uint32",
            "name": "pledgeDays",
            "type": "uint32"
        }
    ],
    "name": "setPledgeCfg",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}] as const

export interface SetPledgeCfgProps {
    pledgeToken: PledgeToken;
    payToken: PayToken;
    profitToken: ProfitToken;
    pledgeReturn: PledgeReturn;
    pledgeDays: number
}

function parseEther(source, key) {
    let value = 0

    if (source) {
        value = source[key] || 0
    }

    return BigNumber.from(utils.parseEther(value.toString()))
}

export function setPledgeCfg({ pledgeToken, payToken, profitToken, pledgeReturn, pledgeDays }: SetPledgeCfgProps) {
    const { config } = usePrepareContractWrite({
        address: contract_address,
        abi: wagmigotchiABI,
        functionName: 'setPledgeCfg',
        args: [
            { ...pledgeToken, amount: parseEther(pledgeToken, 'amount') },
            { ...payToken, amount: parseEther(payToken, 'amount') },
            { ...profitToken, amount: parseEther(profitToken, 'amount') },
            pledgeReturn,
            pledgeDays
        ]
    })

    return useContractWrite(config)
}

export default function SetPledgeCfg() {
    const [pledgeToken, setPledgeToken] = useState<PledgeToken>({
        token: `0x` as `0x${string}`,
        tokenId: BigNumber.from(0),
        ercType: 0,
        amount: BigNumber.from(0)
    })
    const [payToken, setPayToken] = useState<PayToken>({
        token: `0x` as `0x${string}`,
        tokenId: BigNumber.from(0),
        ercType: 0,
        amount: BigNumber.from(0)
    })
    const [profitToken, setProfitToken] = useState<ProfitToken>({
        token: `0x` as `0x${string}`,
        tokenId: BigNumber.from(0),
        ercType: 0,
        amount: BigNumber.from(0)
    })
    const [pledgeReturn, setPledgeReturn] = useState<PledgeReturn>({
        profitType: 0,
        isDayRelease: false,
        profit: BigNumber.from(0)
    })
    const [pledgeDays, setPledgeDays] = useState(0)

    const { data, isLoading, isSuccess, isError, write, error } = setPledgeCfg({ pledgeToken, payToken, profitToken, pledgeReturn, pledgeDays })

    const setPledgeTokenByKey = (key, e) => {
        const value = e.target.value;
        setPledgeToken(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const setPayTokenByKey = (key, e) => {
        const value = e.target.value;
        setPayToken(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const setProfitTokenByKey = (key, e) => {
        const value = e.target.value;
        setProfitToken(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const setPledgeReturnByKey = (key, e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setPledgeReturn(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    return (
        <div className={styles.borderedDiv} >
            <p>
                <span className={styles.boldText}>配置质押Token(721), 支付token，收益token，收益类型，质押天数</span>。
            </p>
            <div>
                <h2 className="font-bold">Pledge Token：</h2>
                <label>
                    Token:
                    <input type="text" value={pledgeToken.token} onChange={e => setPledgeTokenByKey('token', e)} />
                </label>
                <label>
                    TokenId:
                    <input type="text" value={pledgeToken.tokenId as unknown as string} onChange={e => setPledgeToken({ ...pledgeToken, tokenId: BigNumber.from(e.target.value) })} />
                </label>
                <label>
                    ErcType:
                    <input type="text" value={pledgeToken.ercType} onChange={e => setPledgeTokenByKey('ercType', e)} />
                </label>
                <label>
                    Amount:
                    <input type="text" value={pledgeToken.amount as unknown as string} onChange={e => setPledgeToken({ ...pledgeToken, amount: BigNumber.from(e.target.value) })} />
                </label>
            </div>
            <div>
                <h2 className="font-bold">Pay Token：</h2>
                <label>
                    Token:
                    <input type="text" value={payToken.token} onChange={e => setPayTokenByKey('token', e)} />
                </label>
                <label>
                    TokenId:
                    <input type="text" value={payToken.tokenId as unknown as string} onChange={e => setPayToken({ ...payToken, tokenId: BigNumber.from(e.target.value) })} />
                </label>
                <label>
                    ErcType:
                    <input type="text" value={payToken.ercType} onChange={e => setPayTokenByKey('ercType', e)} />
                </label>
                <label>
                    Amount:
                    <input type="text" value={payToken.amount as unknown as string} onChange={e => setPayToken({ ...payToken, amount: BigNumber.from(e.target.value) })} />
                </label>
            </div>
            <div>
                <h2 className="font-bold">Profit Token：</h2>
                <label>
                    Token:
                    <input type="text" value={profitToken.token} onChange={e => setProfitTokenByKey('token', e)} />
                </label>
                <label>
                    TokenId:
                    <input type="text" value={profitToken.tokenId as unknown as string} onChange={e => setProfitToken({ ...profitToken, tokenId: BigNumber.from(e.target.value) })} />
                </label>
                <label>
                    ErcType:
                    <input type="text" value={profitToken.ercType} onChange={e => setProfitTokenByKey('ercType', e)} />
                </label>
                <label>
                    Amount:
                    <input type="text" value={profitToken.amount as unknown as string} onChange={e => setProfitToken({ ...profitToken, amount: BigNumber.from(e.target.value) })} />
                </label>
            </div>
            <div>
                <h2 className="font-bold">Pledge Return：</h2>
                <label>
                    ProfitType:
                    <input type="text" value={pledgeReturn.profitType} onChange={e => setPledgeReturnByKey('profitType', e)} />
                </label>
                <label>
                    IsDayRelease:
                    <input type="checkbox" checked={pledgeReturn.isDayRelease} onChange={e => setPledgeReturnByKey('isDayRelease', e)} />
                </label>
                <label>
                    Profit:
                    <input type="text" value={pledgeReturn.profit as unknown as string} onChange={e => setPledgeReturn({ ...pledgeReturn, profit: BigNumber.from(e.target.value) })} />
                </label>
            </div>
            <div>
                <label>
                    <span className="font-bold">Pledge Days:</span>
                    <input type="number" value={pledgeDays} onChange={e => setPledgeDays(Number(e.target.value))} />
                </label>
            </div>
            {
                <>
                    {/* <p>getPledgeCfg返回值：{JSON.stringify(pledgeCfg)}</p> */}
                    <button className="disabled:opacity-75 disabled:cursor-not-allowed" disabled={!write || isLoading} onClick={() => write && write()}>
                        {isLoading ? 'Writing...' : 'SetPledgeCfg'}
                    </button>
                    {isSuccess && (
                        <div>
                            Successfully SetPledgeCfg!
                            <div>
                                <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                            </div>
                        </div>
                    )}
                    {
                        isError && (
                            <div>
                                {JSON.stringify(error)}
                            </div>
                        )
                    }
                </>
            }
        </div>
    )
}