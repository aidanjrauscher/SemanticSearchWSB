import Head from 'next/head'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import SettingsModal from '@/components/SettingsModal'
import Prompt from '@/components/Prompt'
import Posts from '@/components/Posts'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>WSB Search</title>
        <meta name="description" content="GPT-powered semantic search for Wall Street Bets." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/wsb.png"/>
      </Head>
      <main>
        <SettingsModal/>
        <div className='flex flex-col h-screen bg-reddit-gray-dark'>
          <Navbar/>
          <Prompt/>
          <Posts />
          {/* <Footer/> */}
        </div>
      </main>
    </>
  )
}
