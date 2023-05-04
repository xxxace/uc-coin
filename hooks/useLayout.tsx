import cx from "classnames";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { PropsWithChildren } from 'react';
import { cal, inter } from "@/styles/fonts";
import { MDXProvider } from '@mdx-js/react';
import { MDXComponents } from '@/config/MDXComponents';

function DefaultLayout(props: PropsWithChildren) {
    return (
        <>
            <NavBar />
            <main className={cx(cal.variable, inter.variable)}>
                {props.children}
            </main>
            <Footer />
        </>
    )
}

function MDXLayout(props: PropsWithChildren) {
    return (
        <MDXProvider components={MDXComponents}>
            <NavBar />
            <main className={cx(cal.variable, inter.variable, 'container relative md:max-w-3xl py-6 lg:py-10 mx-auto px-4')}>
                {props.children}
            </main>
            <Footer />
        </MDXProvider>
    )
}

const LayoutConfig = {
    default: DefaultLayout,
    docs: MDXLayout
}

export default function useLayout(path: string) {
    return LayoutConfig[path] || LayoutConfig.default
}
