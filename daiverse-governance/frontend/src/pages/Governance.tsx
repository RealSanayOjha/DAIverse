import React, { useState, useEffect } from 'react'
import { useWallet } from '../hooks/useWallet'
import { ethers } from 'ethers'
import { GovernorABI } from '../lib/Governor'
import { DAIVTokenABI } from '../lib/DAIVToken'

const Governance: React.FC = () => {
  const { account, provider, signer, isConnected } = useWallet()
  const [proposals, setProposals] = useState<any[]>([])
  const [votingPower, setVotingPower] = useState<string>('0')
  const [governorContract, setGovernorContract] = useState<any>(null)
  const [tokenContract, setTokenContract] = useState<any>(null)
  const [newProposalDescription, setNewProposalDescription] = useState<string>('')

  // Contract addresses (you'll need to update these with actual deployed addresses)
  const GOVERNOR_ADDRESS = '0x...' // Replace with actual governor address
  const TOKEN_ADDRESS = '0x...' // Replace with actual token address

  useEffect(() => {
    if (isConnected && provider && signer) {
      const governor = new ethers.Contract(GOVERNOR_ADDRESS, GovernorABI, signer)
      const token = new ethers.Contract(TOKEN_ADDRESS, DAIVTokenABI, provider)
      setGovernorContract(governor)
      setTokenContract(token)
      loadProposals(governor)
      loadVotingPower(token)
    }
  }, [isConnected, provider, signer])

  const loadProposals = async (governor: any) => {
    try {
      // In a real implementation, you would fetch actual proposals from the contract
      // This is a placeholder implementation
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
      setProposals(mockProposals)
    } catch (error) {
      console.error('Error loading proposals:', error)
    }
  }

  const loadVotingPower = async (token: any) => {
    try {
      if (!account) return
      const power = await token.getVotes(account)
      setVotingPower(ethers.formatEther(power))
    } catch (error) {
      console.error('Error loading voting power:', error)
    }
  }

  const vote = async (proposalId: number, support: boolean) => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }

    if (!governorContract) {
      alert('Governor contract not initialized')
      return
    }

    try {
      const tx = await governorContract.castVote(proposalId, support ? 1 : 0)
      await tx.wait()
      alert(`Successfully voted ${support ? 'FOR' : 'AGAINST'} proposal ${proposalId}`)
      // Refresh proposals after voting
      loadProposals(governorContract)
    } catch (error) {
      console.error('Voting error:', error)
      alert('Voting failed')
    }
  }

  const createProposal = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }

    if (!governorContract) {
      alert('Governor contract not initialized')
      return
    }

    if (!newProposalDescription) {
      alert('Please enter a proposal description')
      return
    }

    try {
      // In a real implementation, you would need to specify targets, values, calldatas, and description
      // This is a placeholder implementation
      alert('Proposal creation feature is being implemented!')
      
      // Example of how to create a proposal (uncomment and modify as needed):
      /*
      const targets = ['0x...'] // Target contract addresses
      const values = [0] // ETH values to send
      const calldatas = ['0x...'] // Encoded function calls
      const description = newProposalDescription
      
      const tx = await governorContract.propose(targets, values, calldatas, description)
      await tx.wait()
      alert('Proposal created successfully!')
      setNewProposalDescription('')
      */
    } catch (error) {
      console.error('Proposal creation error:', error)
      alert('Proposal creation failed')
    }
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
            <h3>Create New Proposal</h3>
            <div className="form-group">
              <label>Proposal Description:</label>
              <textarea
                value={newProposalDescription}
                onChange={(e) => setNewProposalDescription(e.target.value)}
                placeholder="Enter proposal description"
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #333',
                  borderRadius: '4px',
                  background: '#2a2a2a',
                  color: 'white',
                  resize: 'vertical'
                }}
              />
            </div>
            <button className="btn-primary" onClick={createProposal}>
              Create Proposal
            </button>
          </div>
          
          <div className="card">
            <h3>Your Voting Power</h3>
            <p><strong>Available Votes:</strong> {votingPower} DAIV</p>
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
