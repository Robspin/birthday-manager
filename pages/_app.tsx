import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head"
import {useEffect, useState} from "react"
import Navigation from "../components/Navigation"

const MyApp = ({ Component, pageProps }: AppProps) => {

    const [treeStage, setTreeStage] = useState(1)

    useEffect(() => {
        const treeTimer = () => setTimeout(() => {
            const date = new Date()
            const newStage = date.getMinutes() % 2 === 0 ? 1 : 2
            setTreeStage(newStage)
            treeTimer()
        }, 60000)
        treeTimer()
    }, [treeStage])

        return (
            <>
                <Head>
                    <title>Green Temple</title>
                    <meta name="description" content="Let's grow together" />
                    <link rel="icon" href={`/treeStage${treeStage}.png`} />
                </Head>
                <Navigation />
                <Component {...pageProps} />
            </>
        )
}

export default MyApp
