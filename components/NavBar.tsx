import Link from "next/link";

export default function NavBar(props) {
    return (
        <header className="sticky top-0 z-40 w-full flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] supports-backdrop-blur:bg-white/95 bg-white/80 backdrop-blur-md dark:bg-slate-900/75">
            <div className="max-w-7xl mx-auto">
                <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
                    <div className="relative flex items-center">
                        {/* logo */}
                        <Link href="/" className="flex justify-center items-center text-xl font-bold" >
                            <img className="w-8 h-8 -translate-y-0.5" src="/img/logo.jpg" alt="UCcoin" />
                            <span className="inline-flex w-8 h-8 items-center">UCcoin</span>
                        </Link>
                        {/* nav */}
                        <div className="relative hidden lg:flex items-center ml-auto">
                            <ul>
                                <li className="group flex h-8 items-center rounded-md bg-transparent px-3 text-sm font-medium leading-none text-slate-600 hover:bg-gray-50 hover:text-slate-700 dark:text-slate-300 dark:hover:bg-gray-900 dark:hover:text-slate-200"><Link href="/doc/about">关于</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}