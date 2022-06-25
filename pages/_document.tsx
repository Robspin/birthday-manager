import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {

    return (
        <Html>
            <Head>
                <meta name="description" content="Let's grow together" />
            </Head>
            <body className="bg-zinc-900 h-screen w-screen">
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}

export default Document
