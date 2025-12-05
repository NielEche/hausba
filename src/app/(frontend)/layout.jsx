import React from 'react'
import './styles.css'
import Header from './components/Header'

export const metadata = {
  description: 'Welcome to Hausba !',
  title: 'Hausba',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
