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

export function UpdateMintCfg() {

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

export function SetMintCfg() {

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

export function SetPledgeReqire() {

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


export function SetPledgeReturn() {

  const [tokenAddr, setTokenAddr] = useState('');
  const [pledgeDays, setPledgeDays] = useState(0);
  const [pType, setPType] = useState(0);
  const [profit, setProfit] = useState(0);


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
          internalType: "uint16",
          name: "pledgeDays",
          type: "uint16"
        },
        {
          internalType: "enum Store.ProfitType",
          name: "pType",
          type: "uint8"
        },
        {
          internalType: "uint256",
          name: "profit",
          type: "uint256"
        }
      ],
      name: "setPledgeReturn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    }] as const,
    functionName: 'setPledgeReturn',
    args: [tokenAddr as `0x${string}`, pledgeDays, pType, BigNumber.from(profit ? utils.parseEther(profit.toString()) : '0')]
  })

  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  return (
    <div className={styles.borderedDiv} >
      <p>
        <span className={styles.boldText}>返回指定token在指定质押期内的收益情况(仅管理员操作)</span>。
      </p>
      <label htmlFor="tokenAddr">Token Address:</label>
      <input
        id="tokenAddr"
        name="tokenAddr"
        type="text"
        value={tokenAddr}
        onChange={(e) => setTokenAddr(e.target.value)}
      />

      <label htmlFor="pledgeDays">Pledge Days:</label>
      <input
        id="pledgeDays"
        name="pledgeDays"
        type="number"
        value={pledgeDays}
        onChange={(e) => setPledgeDays(parseInt(e.target.value, 10))}
      />

      <label htmlFor="pType">P Type:</label>
      <input
        id="pType"
        name="pType"
        type="number"
        value={pType}
        onChange={(e) => setPType(parseInt(e.target.value, 10))}
      />

      <label htmlFor="profit">Profit:</label>
      <input
        id="profit"
        name="profit"
        type="number"
        value={profit}
        onChange={(e) => setProfit(parseInt(e.target.value, 10))}
      />
      <button disabled={!write || isLoading} onClick={() => write && write()}>
        {isLoading ? 'Minting...' : 'SetPledgeReturn'}
      </button>
      {isSuccess && (
        <div>
          Successfully SetPledgeReturn!
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </div>
  )
}

export function Mint() {

  // "details": "铸造NFT(本合约必须先成为NFT合约miner)",
  // "params": {
  //   "cid": "nft cid",
  //   "tokenAddr": "合约地址",
  //   "tokenAmount": "数量",
  //   "tokenId": "tokenId"
  // }
  const [tokenAddr, setTokenAddr] = useState('');
  const [tokenId, setTokenId] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [cid, setCid] = useState('');

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
          internalType: 'string',
          name: 'cid',
          type: 'string'
        }
      ],
      stateMutability: 'payable',
      type: 'function',
      name: 'mint'
    }],
    functionName: 'mint',
    args: [tokenAddr, tokenId, tokenAmount, cid],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div className={styles.borderedDiv} >
      <p>
        <span className={styles.boldText}>铸造NFT(本合约必须先成为NFT合约miner)</span>。
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
        {isLoading ? 'Minting...' : 'Mint'}
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


export function PledgeToken() {
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


