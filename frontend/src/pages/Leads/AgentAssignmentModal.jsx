import React, { useState } from 'react';
import './AgentAssignmentModal.css'; // Add your CSS for the modal

const AgentAssignmentModal = ({ isOpen, toggleModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [previousAgent, setPreviousAgent] = useState('Kalim');

  const handleSearch = () => {
    console.log("Searching for ID:", searchTerm);
    toggleModal(); // Close the modal after searching (optional)
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <h2>Assign New Agent</h2>
            <button className="close-btn" onClick={toggleModal}>X</button>
          </div>
          <div className="modal-body">
            <div>
              <label>Previous Agent</label>
              <input type="text" value={previousAgent} disabled />
            </div>
            <div>
              <label>Search New Agent</label>
              <input
                type="text"
                placeholder="Search Here..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="add-btn" onClick={handleSearch}>Add</button>
          </div>
          <div className="history">
            <h3>History</h3>
            <ul>
              <li>1. Ram Ram@gmail.com</li>
              <li>2. Kalim Kalim@gmail.com</li>
            </ul>
          </div>
          <button className="submit-btn">Submit</button>
        </div>
      </div>
    )
  );
};

export default AgentAssignmentModal;
