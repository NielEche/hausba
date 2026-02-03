import React from 'react'
import './styles.css'
import Header from './components/Header'
import Footer from './components/Footer'

export const metadata = {
  description: 'HAUSBA | Premium Audiovisual Solutions',
  title: 'Hausba',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
       
        <main>{children}</main>
     
      </body>
    </html>
  )
}
