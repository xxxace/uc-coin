import {
  usePrepareContractWrite,
  useContractWrite,
  useSigner,
  useContract,
  useProvider,
  useContractRead,
  useAccount,
  useWaitForTransaction,
} from 'wagmi'
import * as mainAbi from '@/config/mainAbi'
import { useState } from 'react'
import { BigNumber, utils } from 'ethers'
import styles from '@/styles/test.module.css';
import { ContractParams, TokenX, PledgeReturn, ERCType, ProfitType } from '../lib/types';

const contract_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`
console.log(contract_address)

export function GetPledgeInfo() {

  const { address, isConnecting, isDisconnected, connector } = useAccount()

  const [showResult, setShowResult] = useState(false);

  // 使用useState钩子来管理输入框的状态
  // const [acc, setAcc] = useState('')
  const [tokenAddr, setTokenAddr] = useState('')
  const [tokenId, setTokenId] = useState(0)


  const { data, isError, isLoading } = useContractRead({
    address: contract_address,
    abi: [{
      inputs: [
        {
          internalType: "address",
          name: "acc",
          type: "address"
        },
        {
          internalType: "address",
          name: "tokenAddr",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "getPledgeInfo",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        },
        {
          internalType: "uint16",
          name: "",
          type: "uint16"
        },
        {
          internalType: "address",
          name: "",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    }],
    functionName: 'getPledgeInfo',
    args: [address as `0x${string}`, tokenAddr as `0x${string}`, BigNumber.from(tokenId)],
  })

  const handleButtonClick = async () => {
    setShowResult(true);
  };


  return (
    <div className={styles.borderedDiv}>
      <p>
        <span className={styles.boldText}>返回指定token在指定质押期内的收益情况</span>。
      </p>
      {/* <label htmlFor="acc">用户地址</label>
      <input id="acc" name="acc" type="text" value={acc} onChange={(e) => setAcc(e.target.value)} /> */}
      用户地址:{address + ' '}
      <label htmlFor="tokenAddr">代币地址：</label>
      <input id="tokenAddr" name="tokenAddr" type="text" value={tokenAddr} onChange={(e) => setTokenAddr(e.target.value)} />
      <label htmlFor="tokenId">tokenId：</label>
      <input id="tokenId" name="tokenId" type="number" value={tokenId} onChange={(e) => setTokenId(Number(e.target.value))} />
      <div>
        <button onClick={handleButtonClick}>查询合约方法</button>
        {showResult && (
          <div>
            {isLoading ? (
              <p>加载中...</p>
            ) : isError ? (
              <p>查询出错，请重试。</p>
            ) : (
              <p>合约方法返回值：{JSON.stringify(data)}</p>
            )}
          </div>
        )}
      </div>

    </div>
  );
}


export function GetPledgeReturn() {
  const [tokenAddr, setTokenAddr] = useState('');
  const [pledgeDays, setPledgeDays] = useState(0);

  const { data, isError, isLoading } = useContractRead({
    address: contract_address,
    abi: [{
      inputs: [
        {
          internalType: 'address',
          name: 'tokenAddr',
          type: 'address'
        },
        {
          internalType: 'uint16',
          name: 'pledgeDays',
          type: 'uint16'
        }
      ],
      name: 'getPledgeReturn',
      outputs: [
        {
          internalType: 'uint8',
          name: '',
          type: 'uint8'
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    }],
    functionName: 'getPledgeReturn',
    args: [tokenAddr as `0x${string}`, pledgeDays],
  });

  return (
    <div className={styles.borderedDiv} >
      <p>
        <span className={styles.boldText}>返回指定token在指定质押期内的收益情况</span>。
      </p>
      <label>
        Token Address:
        <input type="text" value={tokenAddr} onChange={e => setTokenAddr(e.target.value)} />
      </label>
      <label>
        Pledge Days:
        <input type="number" value={pledgeDays} onChange={e => setPledgeDays(Number(e.target.value))} />
      </label>
      <button onClick={() => console.log(data)}>Get Pledge Return</button>
      {<div>
        {isLoading ? (
          <p>加载中...</p>
        ) : isError ? (
          <p>查询出错，请重试。</p>
        ) : (
          <p>合约方法返回值：{JSON.stringify(data)}</p>
        )}
      </div>}

    </div>
  );
}

export function GetPledgeReqire() {
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


export function SetPledgeCfg() {
  const [pledgeToken, setPledgeToken] = useState<TokenX>({
    token: "",
    tokenId: BigNumber.from(0),
    ercType: BigNumber.from(0),
    amount: BigNumber.from(0),
  });

  const [payToken, setPayToken] = useState<TokenX>({
    token: "",
    tokenId: BigNumber.from(0),
    ercType: BigNumber.from(0),
    amount: BigNumber.from(0),
  });

  const [profitToken, setProfitToken] = useState<TokenX>({
    token: "",
    tokenId: BigNumber.from(0),
    ercType: BigNumber.from(0),
    amount: BigNumber.from(0),
  });

  const [pledgeReturn, setPledgeReturn] = useState<PledgeReturn>({
    profitType: BigNumber.from(0),
    isDayRelease: false,
    profit: BigNumber.from(0),
  });

  const [pledgeDays, setPledgeDays] = useState<BigNumber>(BigNumber.from(0));



  const params: ContractParams = {
    pledgeToken: {
      token: pledgeToken.token,
      tokenId: pledgeToken.tokenId,
      ercType: pledgeToken.ercType,
      amount: utils.parseEther(pledgeToken ? pledgeToken.amount.toString() : '0'),
    },
    payToken: {
      token: payToken.token,
      tokenId: payToken.tokenId,
      ercType: payToken.ercType,
      amount: utils.parseEther(payToken ? payToken.amount.toString() : '0'),
    },
    profitToken: {
      token: profitToken.token,
      tokenId: profitToken.tokenId,
      ercType: profitToken.ercType,
      amount: utils.parseEther(profitToken ? profitToken.amount.toString() : '0'),
    },
    pledgeReturn: {
      profitType: pledgeReturn.profitType,
      isDayRelease: pledgeReturn.isDayRelease,
      profit: utils.parseEther(pledgeReturn ? pledgeReturn.profit.toString() : '0'),
    },
    pledgeDays: pledgeDays,
  };




  // const  pledgeToken:TokenX = {
  //   token: tokenAddress, // 示例地址，请替换为实际地址
  //   tokenId: BigNumber.from(tokenId ? tokenId : '0'), // 示例tokenId，请替换为实际值
  //   ercType: parseInt(ercType, 10), // 示例ERCType，请根据实际情况替换
  //   amount: BigNumber.from(tokenAmount ? utils.parseEther(tokenAmount.toString()) : '0') // 示例数量，请替换为实际值，这里是1个单位，因为ethers.js使用wei单位
  // };




  const { config } = usePrepareContractWrite({
    address: contract_address,
    abi: [{
      inputs: [
        {
          internalType: "struct Store.TokenX",
          name: "pledgeToken",
          type: "tuple",
          components: [
            {
              internalType: "address",
              name: "token",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256"
            },
            {
              internalType: "enum Store.ERCType",
              name: "ercType",
              type: "uint8"
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256"
            }
          ]
        },
        {
          internalType: "struct Store.TokenX",
          name: "payToken",
          type: "tuple",
          components: [
            {
              internalType: "address",
              name: "token",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256"
            },
            {
              internalType: "enum Store.ERCType",
              name: "ercType",
              type: "uint8"
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256"
            }
          ]
        },
        {
          internalType: "struct Store.TokenX",
          name: "profitToken",
          type: "tuple",
          components: [
            {
              internalType: "address",
              name: "token",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256"
            },
            {
              internalType: "enum Store.ERCType",
              name: "ercType",
              type: "uint8"
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256"
            }
          ]
        },
        {
          internalType: "struct Store.PledgeReturn",
          name: "pledgeReturn",
          type: "tuple",
          components: [
            {
              internalType: "enum Store.ProfitType",
              name: "profitType",
              type: "uint8"
            },
            {
              internalType: "bool",
              name: "isDayRelease",
              type: "bool"
            },
            {
              internalType: "uint256",
              name: "profit",
              type: "uint256"
            }
          ]
        },
        {
          internalType: "uint32",
          name: "pledgeDays",
          type: "uint32"
        }
      ],
      stateMutability: "nonpayable",
      type: "function",
      name: "setPledgeCfg"
    }],
    functionName: 'mintPledge',
    args: [
      params.pledgeToken,
      params.payToken,
      params.profitToken,
      params.pledgeReturn,
      params.pledgeDays,
    ],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div className={styles.borderedDiv} >
      <p>
        <span className={styles.boldText}>铸造并质押token(本合约必须先成为NFT合约miner)</span>。
      </p>
      <div className={styles.borderedDiv}>
        <h3>承诺代币 (Pledge Token)</h3>
        <label htmlFor="pledgeTokenAddress">Pledge Token Address:</label>
        <input
          id="pledgeTokenAddress"
          type="text"
          value={pledgeToken.token}
          onChange={(e) =>
            setPledgeToken({ ...pledgeToken, token: e.target.value })
          }
        />
        <br />
        <label htmlFor="pledgeTokenId">Pledge Token ID:</label>
        <input
          id="pledgeTokenId"
          type="number"
          value={pledgeToken.tokenId.toString()}
          onChange={(e) =>
            setPledgeToken({ ...pledgeToken, tokenId: BigNumber.from(e.target.value) })
          }
        />
        <br />
        <label htmlFor="pledgeTokenERCType">Pledge Token ERC Type:</label>
        <select
          id="pledgeTokenERCType"
          value={pledgeToken.ercType.toString()}
          onChange={(e) =>
            setPledgeToken({ ...pledgeToken, ercType: BigNumber.from(e.target.value) })
          }
        >
          <option value={ERCType.ERC20}>ERC20</option>
          <option value={ERCType.ERC721}>ERC721</option>
          <option value={ERCType.ERC1155}>ERC1155</option>
        </select>
        <br />
        <label htmlFor="pledgeTokenAmount">Pledge Token Amount (Ether):</label>
        <input
          id="pledgeTokenAmount"
          type="text"
          value={pledgeToken.amount.toString()}
          onChange={(e) =>
            setPledgeToken({ ...pledgeToken, amount: BigNumber.from(e.target.value) })
          }
        />
        <br />
      </div>
      <div className={styles.borderedDiv}>
        <h3>支付代币 (Pay Token)</h3>
        <label htmlFor="payTokenAddress">Pay Token Address:</label>
        <input
          id="payTokenAddress"
          type="text"
          value={payToken.token}
          onChange={(e) => setPayToken({ ...payToken, token: e.target.value })}
        />
        <br />
        <label htmlFor="payTokenId">Pay Token ID:</label>
        <input
          id="payTokenId"
          type="number"
          value={payToken.tokenId.toString()}
          onChange={(e) => setPayToken({ ...payToken, tokenId: BigNumber.from(e.target.value) })}
        />
        <br />
        <label htmlFor="payTokenERCType">Pay Token ERC Type:</label>
        <select
          id="payTokenERCType"
          value={payToken.ercType.toString()}
          onChange={(e) => setPayToken({ ...payToken, ercType: BigNumber.from(e.target.value) })}
        >
          <option value={ERCType.ERC20}>ERC20</option>
          <option value={ERCType.ERC721}>ERC721</option>
          <option value={ERCType.ERC1155}>ERC1155</option>
        </select>
        <br />
        <label htmlFor="payTokenAmount">Pay Token Amount (Ether):</label>
        <input
          id="payTokenAmount"
          type="text"
          value={payToken.amount.toString()}
          onChange={(e) => setPayToken({ ...payToken, amount: BigNumber.from(e.target.value) })}
        />
        <br />
      </div>
      <div className={styles.borderedDiv}>
        <h3>利润代币 (Profit Token)</h3>
        <label htmlFor="profitTokenAddress">Profit Token Address:</label>
        <input
          id="profitTokenAddress"
          type="text"
          value={profitToken.token}
          onChange={(e) => setProfitToken({ ...profitToken, token: e.target.value })}
        />
        <br />
        <label htmlFor="profitTokenId">Profit Token ID:</label>
        <input
          id="profitTokenId"
          type="number"
          value={profitToken.tokenId.toString()}
          onChange={(e) => setProfitToken({ ...profitToken, tokenId: BigNumber.from(e.target.value) })}
        />
        <br />
        <label htmlFor="profitTokenERCType">Profit Token ERC Type:</label>
        <select
          id="profitTokenERCType"
          value={profitToken.ercType.toString()}
          onChange={(e) => setProfitToken({ ...profitToken, ercType: BigNumber.from(e.target.value) })}
        >
          <option value={ERCType.ERC20}>ERC20</option>
          <option value={ERCType.ERC721}>ERC721</option>
          <option value={ERCType.ERC1155}>ERC1155</option>
        </select>
        <br />
        <label htmlFor="profitTokenAmount">Profit Token Amount (Ether):</label>
        <input
          id="profitTokenAmount"
          type="text"
          value={profitToken.amount.toString()}
          onChange={(e) => setProfitToken({ ...profitToken, amount: BigNumber.from(e.target.value) })}
        />
        <br />
      </div>
      <div>
        <h3>承诺回报 (Pledge Return)</h3>
        <label htmlFor="pledgeReturnProfitType">Pledge Return Profit Type:</label>
        <select
          id="pledgeReturnProfitType"
          value={pledgeReturn.profitType.toString()}
          onChange={(e) =>
            setPledgeReturn({ ...pledgeReturn, profitType: BigNumber.from(e.target.value) })
          }
        >
          <option value={ProfitType.Fixed}>Profit Type A</option>
          <option value={ProfitType.Floating}>Profit Type B</option>
        </select>
        <br />
        <label htmlFor="pledgeReturnIsDayRelease">
          Pledge Return Is Day Release:
        </label>
        <input
          id="pledgeReturnIsDayRelease"
          type="checkbox"
          checked={pledgeReturn.isDayRelease}
          onChange={(e) =>
            setPledgeReturn({ ...pledgeReturn, isDayRelease: e.target.checked })
          }
        />
        <br />
        <label htmlFor="pledgeReturnProfit">Pledge Return Profit (Ether):</label>
        <input
          id="pledgeReturnProfit"
          type="text"
          value={pledgeReturn.profit.toString()}
          onChange={(e) =>
            setPledgeReturn({ ...pledgeReturn, profit: BigNumber.from(e.target.value) })
          }
        />
        <br />
      </div>
      <div>
        <h3>承诺天数 (Pledge Days)</h3>
        <label htmlFor="pledgeDays">Pledge Days:</label>
        <input
          id="pledgeDays"
          type="number"
          value={pledgeDays.toString()}
          onChange={(e) => setPledgeDays(BigNumber.from(e.target.value))}
        />
        <br />
      </div>
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










export function MintPledge() {

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




export function WithdrawProfit() {

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


export function WithdrawPledge() {
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


