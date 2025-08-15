import React, { useState, useEffect } from 'react'
import { useWallet } from '../hooks/useWallet'

const Governance: React.FC = () => {
  const { account, provider, signer, isConnected } = useWallet()
  const [proposals, setProposals] = useState<any[]>([])
  const [votingPower, setVotingPower] = useState<string>('0')

  // Mock data for demonstration
  const mockProposals = [
    {
      id: 1,
      title: "Increase Dataset Registry Fee",
      description: "Proposal to increase the fee for registering datasets from 10 DAIV to 15 DAIV",
      status: "Active",
      forVotes: "1500",
      againstVotes: "500",
      startTime: "2024-01-15",
      endTime: "2024-01-22"
    },
    {
      id: 2,
      title: "Add New Training Job Type",
      description: "Proposal to add support for reinforcement learning training jobs",
      status: "Pending",
      forVotes: "0",
      againstVotes: "0",
      startTime: "2024-01-20",
      endTime: "2024-01-27"
    }
  ]

  useEffect(() => {
    if (isConnected) {
      setProposals(mockProposals)
      setVotingPower("1000") // Mock voting power
    }
  }, [isConnected])

  const vote = async (proposalId: number, support: boolean) => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }

    try {
      // Mock voting - in real implementation, this would call the governance contract
      alert(`Voted ${support ? 'FOR' : 'AGAINST'} proposal ${proposalId}`)
    } catch (error) {
      console.error('Voting error:', error)
      alert('Voting failed')
    }
  }

  const createProposal = () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }
    alert('Proposal creation feature coming soon!')
  }

  return (
    <div>
      <h2>Governance</h2>
      
      {!isConnected ? (
        <div className="card">
          <h3>Connect Wallet</h3>
          <p>Please connect your wallet to participate in governance.</p>
        </div>
      ) : (
        <div>
          <div className="card">
            <h3>Your Voting Power</h3>
            <p><strong>Available Votes:</strong> {votingPower} DAIV</p>
            <button className="btn-primary" onClick={createProposal}>
              Create Proposal
            </button>
          </div>

          <div className="dashboard">
            {proposals.map((proposal) => (
              <div key={proposal.id} className="card">
                <h3>{proposal.title}</h3>
                <p><strong>Status:</strong> <span className={`status ${proposal.status === 'Active' ? 'pending' : 'success'}`}>{proposal.status}</span></p>
                <p><strong>Description:</strong> {proposal.description}</p>
                <p><strong>For Votes:</strong> {proposal.forVotes} DAIV</p>
                <p><strong>Against Votes:</strong> {proposal.againstVotes} DAIV</p>
                <p><strong>Start:</strong> {proposal.startTime}</p>
                <p><strong>End:</strong> {proposal.endTime}</p>
                
                {proposal.status === 'Active' && (
                  <div>
                    <button 
                      className="btn-primary" 
                      onClick={() => vote(proposal.id, true)}
                      style={{ marginRight: '10px' }}
                    >
                      Vote For
                    </button>
                    <button 
                      className="btn-secondary" 
                      onClick={() => vote(proposal.id, false)}
                    >
                      Vote Against
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Governance
