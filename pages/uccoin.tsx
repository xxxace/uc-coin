import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

import UCcoinMD from '@/markdown/uccion'

export default function TestPage({ source }) {
    return (
        <div className="my-40 w-11/12 sm:w-3/4 m-auto prose prose-md sm:prose-lg">
            <MDXRemote {...source} />
        </div>
    )
}

export async function getStaticProps() {
    // MDX text - can be from a local file, database, anywhere
    const source = UCcoinMD
    const mdxSource = await serialize(source)
    return { props: { source: mdxSource } }
}