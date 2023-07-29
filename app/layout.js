import Header from '@/components/Header'
import './globals.css'
import Footer from '@/components/Footer'
import { Inter } from 'next/font/google'
import AppState from './context/AppState'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <AppState>
    <html lang="en">
      <body>
        <Header/>
        <main className='w-ful'>
          {children}
        </main>
      </body>
    </html>
    </AppState>
  )
}
