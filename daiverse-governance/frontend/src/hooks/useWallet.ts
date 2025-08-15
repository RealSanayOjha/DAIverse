import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

export function useWallet() {
  const [account, setAccount] = useState<string | null>(null)
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const connect = async () => {
    setIsLoading(true)
    try {
      console.log('Attempting to connect wallet...')
      
      if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed')
        
        // Request account access
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        })
        
        console.log('Accounts:', accounts)
        
        if (accounts.length > 0) {
          const provider = new ethers.BrowserProvider(window.ethereum)
          const signer = await provider.getSigner()
          
          setAccount(accounts[0])
          setProvider(provider)
          setSigner(signer)
          setIsConnected(true)
          
          console.log('Wallet connected successfully:', accounts[0])
        } else {
          console.log('No accounts found')
          alert('No accounts found. Please unlock MetaMask.')
        }
      } else {
        console.log('MetaMask not found')
        alert('Please install MetaMask! Visit https://metamask.io/')
      }
    } catch (error) {
      console.error('Error connecting wallet:', error)
      if (error instanceof Error) {
        alert(`Connection failed: ${error.message}`)
      } else {
        alert('Failed to connect wallet. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const disconnect = () => {
    setAccount(null)
    setProvider(null)
    setSigner(null)
    setIsConnected(false)
    console.log('Wallet disconnected')
  }

  useEffect(() => {
    // Check if already connected
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        console.log('Accounts changed:', accounts)
        if (accounts.length > 0) {
          setAccount(accounts[0])
        } else {
          disconnect()
        }
      })

      window.ethereum.on('chainChanged', (chainId: string) => {
        console.log('Chain changed:', chainId)
        window.location.reload()
      })

      // Check if already connected
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0])
            setIsConnected(true)
            console.log('Already connected to:', accounts[0])
          }
        })
        .catch(console.error)
    }
  }, [])

  return {
    account,
    provider,
    signer,
    isConnected,
    isLoading,
    connect,
    disconnect
  }
}
