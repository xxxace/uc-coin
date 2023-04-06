export const setPledgeCfgAbi = [
  
]









export const mintPledgeAbi = [{
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
}];




export const withdrawProfitAbi = [{
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
}];

export const withdrawPledgeAbi = [{
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
}];

export const getPledgeInfoAbi = [{
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
}];

export const getPledgeReturnAbi = [{
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
}];

export const getPledgeReqireAbi = [{
  inputs: [
    {
      internalType: 'address',
      name: 'plgToken',
      type: 'address'
    }
  ],
  name: 'getPledgeReqire',
  outputs: [
    {
      internalType: 'bool',
      name: '',
      type: 'bool'
    },
    {
      internalType: 'address',
      name: '',
      type: 'address'
    },
    {
      internalType: 'enum Store.ERCType',
      name: '',
      type: 'uint8'
    },
    {
      internalType: 'address',
      name: '',
      type: 'address'
    },
    {
      internalType: 'enum Store.ERCType',
      name: '',
      type: 'uint8'
    }
  ],
  stateMutability: 'view',
  type: 'function'
}];

