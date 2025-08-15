import React, { useState, useEffect } from 'react'
import { useWallet } from '../hooks/useWallet'

const TrainingJobs: React.FC = () => {
  const { account, provider, signer, isConnected } = useWallet()
  const [jobs, setJobs] = useState<any[]>([])
  const [newJob, setNewJob] = useState({
    name: '',
    description: '',
    datasetId: '',
    modelType: ''
  })

  // Mock data for demonstration
  const mockJobs = [
    {
      id: 1,
      name: "ImageNet Training",
      description: "Training ResNet-50 on ImageNet dataset",
      datasetId: "ImageNet-1K",
      modelType: "ResNet-50",
      status: "Running",
      owner: "0x1234...5678",
      startTime: "2024-01-15"
    },
    {
      id: 2,
      name: "GPT-3 Fine-tuning",
      description: "Fine-tuning GPT-3 on custom text data",
      datasetId: "GPT-3 Training Data",
      modelType: "GPT-3",
      status: "Completed",
      owner: "0x8765...4321",
      startTime: "2024-01-10"
    }
  ]

  useEffect(() => {
    if (isConnected) {
      setJobs(mockJobs)
    }
  }, [isConnected])

  const createJob = () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }

    if (!newJob.name || !newJob.description) {
      alert('Please fill in all required fields')
      return
    }

    // Mock job creation
    const job = {
      id: jobs.length + 1,
      ...newJob,
      status: "Pending",
      owner: account,
      startTime: new Date().toISOString().split('T')[0]
    }

    setJobs([...jobs, job])
    setNewJob({ name: '', description: '', datasetId: '', modelType: '' })
    alert('Training job created successfully!')
  }

  return (
    <div>
      <h2>Training Jobs</h2>
      
      {!isConnected ? (
        <div className="card">
          <h3>Connect Wallet</h3>
          <p>Please connect your wallet to manage training jobs.</p>
        </div>
      ) : (
        <div>
          <div className="card">
            <h3>Create New Training Job</h3>
            <div className="form-group">
              <label>Job Name:</label>
              <input
                type="text"
                value={newJob.name}
                onChange={(e) => setNewJob({...newJob, name: e.target.value})}
                placeholder="Enter job name"
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                value={newJob.description}
                onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                placeholder="Enter job description"
              />
            </div>
            <div className="form-group">
              <label>Dataset ID:</label>
              <input
                type="text"
                value={newJob.datasetId}
                onChange={(e) => setNewJob({...newJob, datasetId: e.target.value})}
                placeholder="Enter dataset ID"
              />
            </div>
            <div className="form-group">
              <label>Model Type:</label>
              <input
                type="text"
                value={newJob.modelType}
                onChange={(e) => setNewJob({...newJob, modelType: e.target.value})}
                placeholder="e.g., ResNet-50, GPT-3"
              />
            </div>
            <button className="btn-primary" onClick={createJob}>
              Create Job
            </button>
          </div>

          <div className="dashboard">
            {jobs.map((job) => (
              <div key={job.id} className="card">
                <h3>{job.name}</h3>
                <p><strong>Status:</strong> <span className={`status ${job.status === 'Running' ? 'pending' : job.status === 'Completed' ? 'success' : 'error'}`}>{job.status}</span></p>
                <p><strong>Description:</strong> {job.description}</p>
                <p><strong>Dataset:</strong> {job.datasetId}</p>
                <p><strong>Model:</strong> {job.modelType}</p>
                <p><strong>Owner:</strong> {job.owner}</p>
                <p><strong>Started:</strong> {job.startTime}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TrainingJobs
