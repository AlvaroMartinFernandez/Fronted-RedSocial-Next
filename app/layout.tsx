import './globals.css'
import { rubik } from './fonts'
import Navbar from '@/components/navbar'

export const metadata = {
  title: 'Petma',
  description: 'Red Social Petma',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="es">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={rubik.className}>
      <Navbar/>
      {children}
      </body>
    </html>
  )
}
