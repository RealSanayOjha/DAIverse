import React, { useState, useEffect } from 'react'
import { useWallet } from '../hooks/useWallet'

const DatasetRegistry: React.FC = () => {
  const { account, provider, signer, isConnected } = useWallet()
  const [datasets, setDatasets] = useState<any[]>([])
  const [newDataset, setNewDataset] = useState({
    name: '',
    description: '',
    size: '',
    type: '',
    source: 'upload', // 'upload' or 'url'
    url: '',
    license: '',
    tags: ''
  })

  // Mock data for demonstration
  const mockDatasets = [
    {
      id: 1,
      name: "ImageNet-1K",
      description: "Large-scale image classification dataset",
      size: "150GB",
      type: "Image Classification",
      source: "url",
      url: "https://image-net.org/download",
      license: "MIT",
      tags: "computer-vision, classification",
      owner: "0x1234...5678",
      registeredDate: "2024-01-10"
    },
    {
      id: 2,
      name: "GPT-3 Training Data",
      description: "Text corpus for language model training",
      size: "45TB",
      type: "Text Generation",
      source: "upload",
      url: "",
      license: "Apache 2.0",
      tags: "nlp, text-generation",
      owner: "0x8765...4321",
      registeredDate: "2024-01-15"
    },
    {
      id: 3,
      name: "Kaggle Titanic Dataset",
      description: "Classic machine learning dataset for survival prediction",
      size: "50MB",
      type: "Classification",
      source: "url",
      url: "https://www.kaggle.com/c/titanic/data",
      license: "CC0",
      tags: "classification, survival, kaggle",
      owner: "0x9999...8888",
      registeredDate: "2024-01-20"
    }
  ]

  useEffect(() => {
    if (isConnected) {
      setDatasets(mockDatasets)
    }
  }, [isConnected])

  const registerDataset = () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }

    if (!newDataset.name || !newDataset.description) {
      alert('Please fill in all required fields')
      return
    }

    if (newDataset.source === 'url' && !newDataset.url) {
      alert('Please provide a valid URL for external datasets')
      return
    }

    // Mock registration
    const dataset = {
      id: datasets.length + 1,
      ...newDataset,
      owner: account,
      registeredDate: new Date().toISOString().split('T')[0]
    }

    setDatasets([...datasets, dataset])
    setNewDataset({ 
      name: '', 
      description: '', 
      size: '', 
      type: '', 
      source: 'upload',
      url: '',
      license: '',
      tags: ''
    })
    alert('Dataset registered successfully!')
  }

  const validateUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  return (
    <div>
      <h2>Dataset Registry</h2>
      
      {!isConnected ? (
        <div className="card">
          <h3>Connect Wallet</h3>
          <p>Please connect your wallet to manage datasets.</p>
        </div>
      ) : (
        <div>
          <div className="card">
            <h3>Register New Dataset</h3>
            
            <div className="form-group">
              <label>Dataset Name:</label>
              <input
                type="text"
                value={newDataset.name}
                onChange={(e) => setNewDataset({...newDataset, name: e.target.value})}
                placeholder="Enter dataset name"
              />
            </div>

            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={newDataset.description}
                onChange={(e) => setNewDataset({...newDataset, description: e.target.value})}
                placeholder="Enter dataset description"
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

            <div className="form-group">
              <label>Dataset Source:</label>
              <select
                value={newDataset.source}
                onChange={(e) => setNewDataset({...newDataset, source: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #333',
                  borderRadius: '4px',
                  background: '#2a2a2a',
                  color: 'white'
                }}
              >
                <option value="upload">File Upload</option>
                <option value="url">External URL</option>
              </select>
            </div>

            {newDataset.source === 'url' && (
              <div className="form-group">
                <label>External URL:</label>
                <input
                  type="url"
                  value={newDataset.url}
                  onChange={(e) => setNewDataset({...newDataset, url: e.target.value})}
                  placeholder="https://example.com/dataset"
                  style={{
                    borderColor: newDataset.url && !validateUrl(newDataset.url) ? '#ff4444' : '#333'
                  }}
                />
                <small style={{ color: '#888', fontSize: '0.8rem' }}>
                  Paste External URL → e.g., link to an existing dataset hosted elsewhere (Open Data portal, Kaggle, etc.)
                </small>
              </div>
            )}

            <div className="form-group">
              <label>Size:</label>
              <input
                type="text"
                value={newDataset.size}
                onChange={(e) => setNewDataset({...newDataset, size: e.target.value})}
                placeholder="e.g., 1GB, 500MB, 2TB"
              />
            </div>

            <div className="form-group">
              <label>Type:</label>
              <input
                type="text"
                value={newDataset.type}
                onChange={(e) => setNewDataset({...newDataset, type: e.target.value})}
                placeholder="e.g., Image Classification, Text Generation, Tabular Data"
              />
            </div>

            <div className="form-group">
              <label>License:</label>
              <select
                value={newDataset.license}
                onChange={(e) => setNewDataset({...newDataset, license: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #333',
                  borderRadius: '4px',
                  background: '#2a2a2a',
                  color: 'white'
                }}
              >
                <option value="">Select License</option>
                <option value="MIT">MIT</option>
                <option value="Apache 2.0">Apache 2.0</option>
                <option value="GPL-3.0">GPL-3.0</option>
                <option value="CC0">CC0 (Public Domain)</option>
                <option value="CC-BY">CC-BY</option>
                <option value="CC-BY-SA">CC-BY-SA</option>
                <option value="Custom">Custom License</option>
              </select>
            </div>

            <div className="form-group">
              <label>Tags:</label>
              <input
                type="text"
                value={newDataset.tags}
                onChange={(e) => setNewDataset({...newDataset, tags: e.target.value})}
                placeholder="e.g., computer-vision, nlp, classification (comma-separated)"
              />
            </div>

            <button 
              className="btn-primary" 
              onClick={registerDataset}
              disabled={newDataset.source === 'url' && !validateUrl(newDataset.url)}
            >
              Register Dataset
            </button>
          </div>

          <div className="dashboard">
            {datasets.map((dataset) => (
              <div key={dataset.id} className="card">
                <h3>{dataset.name}</h3>
                <p><strong>Description:</strong> {dataset.description}</p>
                <p><strong>Size:</strong> {dataset.size}</p>
                <p><strong>Type:</strong> {dataset.type}</p>
                <p><strong>Source:</strong> 
                  <span className={`status ${dataset.source === 'url' ? 'success' : 'pending'}`}>
                    {dataset.source === 'url' ? 'External URL' : 'File Upload'}
                  </span>
                </p>
                {dataset.source === 'url' && dataset.url && (
                  <p><strong>URL:</strong> 
                    <a href={dataset.url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '5px' }}>
                      {dataset.url}
                    </a>
                  </p>
                )}
                <p><strong>License:</strong> {dataset.license}</p>
                <p><strong>Tags:</strong> {dataset.tags}</p>
                <p><strong>Owner:</strong> {dataset.owner}</p>
                <p><strong>Registered:</strong> {dataset.registeredDate}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DatasetRegistry
