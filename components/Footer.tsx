export default function Footer(props) {
    return (
        <footer className="relative border-t u-bg-white u-border-gray-200 -z-40">
            <div className="absolute inset-x-0 flex items-center justify-center -top-5">
                <div className="relative flex justify-center items-center h-10 w-14">
                    <img className="relative w-6 h-6 z-10" src="/img/logo.png" alt="" />
                    <div className="absolute flex w-full h-full inset-0 -top-[2px] blur-[6px] u-bg-white  rounded-full"></div>
                </div>
            </div>
            <div className="py-6 text-center">
                <span className="text-sm text-gray-500">
                    © 2023 UCcoin
                </span>
            </div>
        </footer>
    )
}