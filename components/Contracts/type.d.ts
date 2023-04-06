import { BigNumber } from "ethers";

export interface PledgeToken { token: `0x${string}`; tokenId: BigNumber; ercType: number; amount: BigNumber; }

export interface PayToken { token: `0x${string}`; tokenId: BigNumber; ercType: number; amount: BigNumber; }

export interface ProfitToken { token: `0x${string}`; tokenId: BigNumber; ercType: number; amount: BigNumber; }

export interface PledgeReturn { profitType: number; isDayRelease: boolean; profit: BigNumber; }