import { BigNumber } from "ethers";

export interface PToken { token: `0x${string}`; tokenId: BigNumber; ercType: number; amount: BigNumber; }

export interface PledgeToken extends PToken { }

export interface PayToken extends PToken { }

export interface ProfitToken extends PToken { }

export interface PledgeReturn { profitType: number; isDayRelease: boolean; profit: BigNumber; }