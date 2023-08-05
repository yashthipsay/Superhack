"use client"
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextUIProvider } from '@nextui-org/react'
import DefiSwap from './swap/page'

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  
    <html lang="en">
      <body className={inter.className}>
      <NextUIProvider>{children}
      </NextUIProvider>
  
      </body>
      
    </html>
  )  
}
