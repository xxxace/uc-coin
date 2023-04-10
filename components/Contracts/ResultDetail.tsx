import { PToken } from "./type";
import { utils } from "ethers";
export default function ResultDetail(props: { data: PToken | undefined }) {
    const { data } = props
    return (<>
        {
            data
                ? (
                    <div>
                        <p>token: {data.token}</p>
                        <p>tokenId: {data.tokenId.toString() as any * 1}</p>
                        <p>地址类型(ercType): {data.ercType}</p>
                        <p>数量(amount): {utils.formatEther(data.amount)}</p>
                    </div>
                )
                : '暂无数据'
        }
    </>)

}