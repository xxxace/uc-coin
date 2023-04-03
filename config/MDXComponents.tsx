import { cn } from "@/lib/utils"
import Image from 'next/image'

const ResponsiveImage = (props) => (
    <Image alt={props.alt} layout="responsive" {...props} />
)

export const MDXComponents = {
    h1: (props) => (
        <h1
            className={cn(
                "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
                (props || {}).className
            )}
            {...props}
        />
    ),
    h2: (props) => (
        <h2
            className={cn(
                "mt-10 scroll-m-20 border-b border-b-slate-200 pb-1 text-3xl font-semibold tracking-tight first:mt-0",
                (props || {}).className
            )}
            {...props}
        />
    ),
    h3: (props) => (
        <h3
            className={cn(
                "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
                (props || {}).className
            )}
            {...props}
        />
    ),
    h4: (props) => (
        <h4
            className={cn(
                "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
                (props || {}).className
            )}
            {...props}
        />
    ),
    h5: (props) => (
        <h5
            className={cn(
                "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
                (props || {}).className
            )}
            {...props}
        />
    ),
    h6: (props) => (
        <h6
            className={cn(
                "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
                (props || {}).className
            )}
            {...props}
        />
    ),
    a: (props) => (
        <a
            className={cn(
                "font-medium text-slate-900 underline underline-offset-4",
                (props || {}).className
            )}
            {...props}
        />
    ),
    p: (props) => (
        <p
            className={cn("leading-7 [&:not(:first-child)]:mt-6", (props || {}).className)}
            {...props}
        />
    ),
    ul: (props) => (
        <ul className={cn("my-6 ml-6 list-disc", (props || {}).className)} {...props} />
    ),
    ol: (props) => (
        <ol className={cn("my-6 ml-6 list-decimal", (props || {}).className)} {...props} />
    ),
    li: (props) => (
        <li className={cn("mt-2", (props || {}).className)} {...props} />
    ),
    blockquote: (props) => (
        <blockquote
            className={cn(
                "mt-6 border-l-2 border-slate-300 pl-6 italic text-slate-800 [&>*]:text-slate-600",
                (props || {}).className
            )}
            {...props}
        />
    ),
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
        // eslint-disable-next-line @next/next/no-img-element
        <ResponsiveImage
            className={cn("rounded-md border border-slate-200", (props || {}).className)}
            alt={props.alt}
            {...props}
        />
    ),
    hr: ({ ...props }) => (
        <hr className="my-4 border-slate-200 md:my-8" {...props} />
    ),
    table: (props: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="my-6 w-full overflow-y-auto">
            <table className={cn("w-full", (props || {}).className)} {...props} />
        </div>
    ),
    tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr
            className={cn(
                "m-0 border-t border-slate-300 p-0 even:bg-slate-100",
                (props || {}).className
            )}
            {...props}
        />
    ),
    th: (props) => (
        <th
            className={cn(
                "border border-slate-200 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
                (props || {}).className
            )}
            {...props}
        />
    ),
    td: (props) => (
        <td
            className={cn(
                "border border-slate-200 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
                (props || {}).className
            )}
            {...props}
        />
    ),
    pre: (props) => (
        <pre
            className={cn(
                "mt-6 mb-4 overflow-x-auto rounded-lg bg-slate-900 py-4",
                (props || {}).className
            )}
            {...props}
        />
    ),
    code: (props) => (
        <code
            className={cn(
                "relative rounded border bg-slate-300/25 py-[0.2rem] px-[0.3rem] font-mono text-sm text-slate-600",
                (props || {}).className
            )}
            {...props}
        />
    )
}