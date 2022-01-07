import Head from 'next/head'
import { useEffect, useState } from 'react'
import socketIOClient from "socket.io-client";

import styles from '../styles/Home.module.css'

export default function Home() {
  const [timer, setTimer] = useState("")
  const [response, setResponse] = useState("")

  useEffect(() => {
    const socket = socketIOClient("http://localhost:4001", { transports: ['websocket'] });
    socket.on("FromAPI", (data) => {
      setTimer(data);
    });

    socket.on("File", (data) => {
      setResponse(data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
         {timer} - {response}
        </h1>
      </main>
    </div>
  )
}
