import React, { useState, useEffect } from 'react'
import { useWallet } from '../hooks/useWallet'
import { DAIVTokenABI } from '../lib/DAIVToken'
import { ethers } from 'ethers'

const Dashboard: React.FC = () => {
  const { account, provider, signer, isConnected } = useWallet()
  const [tokenBalance, setTokenBalance] = useState<string>('0')
  const [totalSupply, setTotalSupply] = useState<string>('0')
  const [votingPower, setVotingPower] = useState<string>('0')

  // Contract addresses (you'll need to update these with actual deployed addresses)
  const TOKEN_ADDRESS = '0x...' // Replace with actual token address
  const GOVERNOR_ADDRESS = '0x...' // Replace with actual governor address

  useEffect(() => {
    if (isConnected && provider && account) {
      loadTokenData()
    }
  }, [isConnected, provider, account])

  const loadTokenData = async () => {
    try {
      if (!provider || !account) return

      const tokenContract = new ethers.Contract(TOKEN_ADDRESS, DAIVTokenABI, provider)
      
      // Get token balance
      const balance = await tokenContract.balanceOf(account)
      setTokenBalance(ethers.formatEther(balance))

      // Get total supply
      const supply = await tokenContract.totalSupply()
      setTotalSupply(ethers.formatEther(supply))

      // Get voting power
      const power = await tokenContract.getVotes(account)
      setVotingPower(ethers.formatEther(power))

    } catch (error) {
      console.error('Error loading token data:', error)
    }
  }

  return (
    <div>
      <h2>DAIVerse Governance Dashboard</h2>
      
      {!isConnected ? (
        <div className="card">
          <h3>Welcome to DAIVerse Governance</h3>
          <p>Connect your wallet to start participating in governance decisions.</p>
        </div>
      ) : (
        <div className="dashboard">
          <div className="card">
            <h3>Your Account</h3>
            <p><strong>Address:</strong> {account}</p>
            <p><strong>Token Balance:</strong> {tokenBalance} DAIV</p>
            <p><strong>Voting Power:</strong> {votingPower} DAIV</p>
          </div>

          <div className="card">
            <h3>Token Statistics</h3>
            <p><strong>Total Supply:</strong> {totalSupply} DAIV</p>
            <p><strong>Circulating Supply:</strong> {totalSupply} DAIV</p>
          </div>

          <div className="card">
            <h3>Quick Actions</h3>
            <button className="btn-primary" onClick={() => window.location.href = '/governance'}>
              View Proposals
            </button>
            <br /><br />
            <button className="btn-secondary" onClick={() => window.location.href = '/token'}>
              Manage Tokens
            </button>
          </div>

          <div className="card">
            <h3>Recent Activity</h3>
            <p>No recent activity to display.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
