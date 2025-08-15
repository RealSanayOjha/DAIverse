import React, { useState, useEffect } from 'react'
import { useWallet } from '../hooks/useWallet'
import { DAIVTokenABI } from '../lib/DAIVToken'
import { ethers } from 'ethers'

const TokenManagement: React.FC = () => {
  const { account, provider, signer, isConnected } = useWallet()
  const [balance, setBalance] = useState<string>('0')
  const [allowance, setAllowance] = useState<string>('0')
  const [recipient, setRecipient] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [status, setStatus] = useState<string>('')

  // Contract addresses (you'll need to update these with actual deployed addresses)
  const TOKEN_ADDRESS = '0x...' // Replace with actual token address

  useEffect(() => {
    if (isConnected && provider && account) {
      loadTokenData()
    }
  }, [isConnected, provider, account])

  const loadTokenData = async () => {
    try {
      if (!provider || !account) return

      const tokenContract = new ethers.Contract(TOKEN_ADDRESS, DAIVTokenABI, provider)
      
      const balance = await tokenContract.balanceOf(account)
      setBalance(ethers.formatEther(balance))

    } catch (error) {
      console.error('Error loading token data:', error)
    }
  }

  const transfer = async () => {
    if (!signer || !recipient || !amount) {
      setStatus('Please fill in all fields')
      return
    }

    try {
      setStatus('Processing transfer...')
      const tokenContract = new ethers.Contract(TOKEN_ADDRESS, DAIVTokenABI, signer)
      const amountWei = ethers.parseEther(amount)
      
      const tx = await tokenContract.transfer(recipient, amountWei)
      await tx.wait()
      
      setStatus('Transfer successful!')
      setRecipient('')
      setAmount('')
      loadTokenData()
    } catch (error) {
      console.error('Transfer error:', error)
      setStatus('Transfer failed')
    }
  }

  const approve = async () => {
    if (!signer || !recipient || !amount) {
      setStatus('Please fill in all fields')
      return
    }

    try {
      setStatus('Processing approval...')
      const tokenContract = new ethers.Contract(TOKEN_ADDRESS, DAIVTokenABI, signer)
      const amountWei = ethers.parseEther(amount)
      
      const tx = await tokenContract.approve(recipient, amountWei)
      await tx.wait()
      
      setStatus('Approval successful!')
      setRecipient('')
      setAmount('')
    } catch (error) {
      console.error('Approval error:', error)
      setStatus('Approval failed')
    }
  }

  return (
    <div>
      <h2>Token Management</h2>
      
      {!isConnected ? (
        <div className="card">
          <h3>Connect Wallet</h3>
          <p>Please connect your wallet to manage tokens.</p>
        </div>
      ) : (
        <div className="dashboard">
          <div className="card">
            <h3>Your Token Balance</h3>
            <p><strong>DAIV Balance:</strong> {balance} DAIV</p>
          </div>

          <div className="card">
            <h3>Transfer Tokens</h3>
            <div className="form-group">
              <label>Recipient Address:</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..."
              />
            </div>
            <div className="form-group">
              <label>Amount (DAIV):</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                step="0.01"
              />
            </div>
            <button className="btn-primary" onClick={transfer}>
              Transfer
            </button>
          </div>

          <div className="card">
            <h3>Approve Tokens</h3>
            <div className="form-group">
              <label>Spender Address:</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..."
              />
            </div>
            <div className="form-group">
              <label>Amount (DAIV):</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                step="0.01"
              />
            </div>
            <button className="btn-secondary" onClick={approve}>
              Approve
            </button>
          </div>

          {status && (
            <div className={`status ${status.includes('successful') ? 'success' : status.includes('failed') ? 'error' : 'pending'}`}>
              {status}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TokenManagement
