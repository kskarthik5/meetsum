import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic';
const Recorder = dynamic(() => import('../../components/Recorder/index.js'), { ssr: false });

export default function Register() {
    return <>
        <Head>
            <title>Register</title>
            <meta name="description" content="VBA7 registration page" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
            <div className={styles.description}>
            </div>
            <Recorder username={null} method={'register'}/>
        </main>
    </>
}