import { PToken } from "./type";

export default function ResultDetail(props: { data: PToken | undefined }) {
    const { data } = props
    return (<>
        {
            data
                ? (
                    <div>
                        <p>token: {data.token}</p>
                        <p>tokenId: {data.tokenId.toHexString()}</p>
                        <p>地址类型(ercType): {data.ercType}</p>
                        <p>数量(amount): {data.amount.toString()}</p>
                    </div>
                )
                : '暂无数据'
        }
    </>)

}