"use client"
import { SWRConfig } from 'swr'
import { localStorageProvider } from './utils/localStorageProvider'

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SWRConfig value={{ provider: localStorageProvider }}>
      {children}
    </SWRConfig>
  )
}