import { BigNumber } from "ethers";

export enum ERCType {
    ERC20 = 0,
    ERC721 = 1,
    ERC1155 = 2,
  }
  
  export enum ProfitType {
    Fixed = 0,
    Floating = 1,
  }
  
  export interface TokenX {
    token: string;
    tokenId: BigNumber;
    ercType: BigNumber;
    amount: BigNumber;
  }
  
  export interface PledgeReturn {
    profitType: BigNumber;
    isDayRelease: boolean;
    profit: BigNumber;
  }
  
  export interface ContractParams {
    pledgeToken: TokenX;
    payToken: TokenX;
    profitToken: TokenX;
    pledgeReturn: PledgeReturn;
    pledgeDays: BigNumber;
  }