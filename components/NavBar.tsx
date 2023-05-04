import Switch from "./Switch";
import Link from "next/link";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTheme } from "next-themes";

const navList = [{
    name: '关于',
    pathname: '/docs/about'
}]

function getNavList(pathname: string) {
    let className = 'group flex h-8 items-center rounded-md bg-transparent px-3 text-sm font-medium leading-none text-slate-600 hover:bg-gray-50 hover:text-slate-700 dark:text-slate-300 dark:hover:bg-gray-900 dark:hover:text-slate-200'
    return (
        navList.map(nav => (
            <li key={nav.pathname} className={`${pathname === nav.pathname ? 'active' : ''} mr-4 last:mr-0`}><Link className={className} href={nav.pathname}>{nav.name}</Link></li>
        ))
    )
}

function renderIcon(isDark: boolean) {
    return (
        isDark ? <MoonIcon /> : <SunIcon />
    )
}

export default function NavBar() {
    const router = useRouter()
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme();
    const [isDark, setIsDark] = useState(theme === 'dark')
    const switchTheme = (val) => {
        // setIsDark(val)
        // if (val) {
        //     document.documentElement.classList.add('dark')
        //     document.documentElement.classList.remove('light')
        //     localStorage.setItem('theme', 'dark')
        // } else {
        //     document.documentElement.classList.remove('dark')
        //     document.documentElement.classList.add('light')
        //     localStorage.setItem('theme', 'light')
        // }

        const newTheme = isDark ? 'light' : 'dark';
        console.log(newTheme)
        setTheme(newTheme);
        setIsDark(!isDark);
        localStorage.setItem('theme', newTheme);
    }

    // useEffect(() => {
    //     const theme = localStorage.getItem('theme') || 'light'
    //     document.documentElement.classList.add(theme)
    //     setIsDark(theme === 'dark')
    // }, [])

    useEffect(() => {
        setMounted(true)
        // 在组件挂载时，从本地存储中加载之前的主题设置
        const storedTheme = localStorage.getItem('theme');

        if (storedTheme) {
            setIsDark(storedTheme === 'dark');
            console.log(isDark)
        }
    }, []);

    if (!mounted) {
        return null
    }


    return (
        <header className="sticky top-0 z-20 border-t border-transparent block backdrop-blur-md bg-white/75 dark:bg-[rgba(12,12,13,.75)] md:shadow shadow-gray-200 dark:shadow-gray-900">
            <div className="max-w-7xl mx-auto">
                <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 pl-2 md:pl-0 md:mx-4 lg:mx-0">
                    <div className="relative flex items-center">
                        {/* logo */}
                        <Link href="/" className="flex justify-center items-center text-xl font-bold dark:text-white" >
                            <img className="w-6 h-6 mr-2" src="/img/logo.png" alt="UCcoin" />
                            <span className="inline-flex h-8 items-center">UCcoin</span>
                        </Link>
                        {/* nav */}
                        <div className="relative flex items-center ml-auto divide-x-0 md:divide-x divide-gray-200 dark:divide-gray-800">
                            <ul className="hidden md:flex">
                                {getNavList(router.pathname)}
                            </ul>
                            <div className="flex items-center ml-6 px-6">
                                <div className="hidden md:block">
                                    <Switch icon={renderIcon(isDark)} checked={isDark} onChange={switchTheme} />
                                </div>
                                <div className="ml-4">
                                    <ConnectButton accountStatus={{
                                        smallScreen: 'avatar',
                                        largeScreen: 'full',
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}