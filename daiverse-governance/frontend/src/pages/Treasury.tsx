import React, { useState, useEffect } from 'react'
import { useWallet } from '../hooks/useWallet'

const Treasury: React.FC = () => {
  const { account, provider, signer, isConnected } = useWallet()
  const [balance, setBalance] = useState<string>('0')
  const [transactions, setTransactions] = useState<any[]>([])

  // Mock data for demonstration
  const mockTransactions = [
    {
      id: 1,
      type: "Income",
      amount: "1000",
      description: "Dataset registration fees",
      date: "2024-01-15"
    },
    {
      id: 2,
      type: "Expense",
      amount: "500",
      description: "Training job rewards",
      date: "2024-01-14"
    }
  ]

  useEffect(() => {
    if (isConnected) {
      setBalance("5000") // Mock treasury balance
      setTransactions(mockTransactions)
    }
  }, [isConnected])

  const withdrawFunds = () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }
    alert('Withdrawal feature coming soon!')
  }

  const addFunds = () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }
    alert('Add funds feature coming soon!')
  }

  return (
    <div>
      <h2>Treasury</h2>
      
      {!isConnected ? (
        <div className="card">
          <h3>Connect Wallet</h3>
          <p>Please connect your wallet to view treasury information.</p>
        </div>
      ) : (
        <div className="dashboard">
          <div className="card">
            <h3>Treasury Balance</h3>
            <p><strong>Total Balance:</strong> {balance} DAIV</p>
            <button className="btn-primary" onClick={addFunds}>
              Add Funds
            </button>
            <button className="btn-secondary" onClick={withdrawFunds} style={{ marginLeft: '10px' }}>
              Withdraw
            </button>
          </div>

          <div className="card">
            <h3>Recent Transactions</h3>
            {transactions.map((tx) => (
              <div key={tx.id} style={{ borderBottom: '1px solid #333', padding: '10px 0' }}>
                <p><strong>{tx.type}:</strong> {tx.amount} DAIV</p>
                <p><strong>Description:</strong> {tx.description}</p>
                <p><strong>Date:</strong> {tx.date}</p>
              </div>
            ))}
          </div>

          <div className="card">
            <h3>Treasury Statistics</h3>
            <p><strong>Total Income:</strong> 2000 DAIV</p>
            <p><strong>Total Expenses:</strong> 1500 DAIV</p>
            <p><strong>Net Position:</strong> +500 DAIV</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Treasury
