import React from 'react';
import './Leads.css';
import { AiOutlineEye } from 'react-icons/ai';
import { MdPerson,MdOutlinePhone, MdOutlineEmail} from 'react-icons/md';
import {  IoMdCalendar, IoIosMore } from 'react-icons/io';

const Leads = () => {
    // Local data array
    const rows = [
        {
            id: 1, name: 'John Doe', number: '1234567890', email: 'john.doe@example.com',
            category: 'Category 1', cp: '₹ 1000', sp: '₹ 900', reference: 'Reference 1',
            agent: 'Agent 1', date: '2022-12-31', status: 'Follow Up'
        },
        {
            id: 2, name: 'Jane Smith', number: '9876543210', email: 'jane.smith@example.com',
            category: 'Category 2', cp: '₹ 2000', sp: '₹ 1800', reference: 'Reference 2',
            agent: 'Agent 2', date: '2022-12-31', status: 'Rejected'
        },
        {
            id: 3, name: 'Alice Johnson', number: '2345678901', email: 'alice.johnson@example.com',
            category: 'Category 3', cp: '₹ 3000', sp: '₹ 2500', reference: 'Reference 3',
            agent: 'Agent 3', date: '2022-12-31', status: 'Converted'
        }
    ];

    return (
        <div className="table-container" style={{ maxWidth: 'calc(300px * 7)' }}>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>C NAME</th>
                        <th>C NUMBER</th>
                        <th>C EMAIL</th>
                        <th>CATEGORY</th>
                        <th>C.P</th>
                        <th>S.P</th>
                        <th>Reference By</th>
                        <th>Agent</th>
                        <th>Follow Up Date</th>
                        <th>Status</th>
                        <th>View</th>
                        <th>Quotation</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td><MdOutlinePhone className="phone-btn"/> {row.number}</td>
                            <td><MdOutlineEmail className="email-btn"/> {row.email}</td>
                            <td>{row.category}</td>
                            <td>{row.cp}</td>
                            <td>{row.sp}</td>
                            <td>{row.reference}</td>
                            <td>{row.agent}</td>
                            <td style={{ color: getStatusColor(row.status) }}>{row.date}</td>
                            <td className="status-cell"><div className={`status ${getStatusClassName(row.status)}`}>{row.status}</div></td>
                            <td><button className="view-btn"><AiOutlineEye /></button></td>
                            <td><button className="quotation-btn">Quotation</button></td>
                            <td>
                            <button className="action-btn"><MdPerson /></button>
                            <button className="action-btn"><IoMdCalendar /></button>
                            <button className="action-btn"><IoIosMore /></button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Utility function to get color based on status
const getStatusColor = (status) => {
    switch (status) {
        case 'Follow Up':
            return '#333'; // Dark gray for follow up
        case 'Converted':
            return '#3EBA00'; // Dark green for converted
        case 'Rejected':
            return '#D90000'; // Dark red for rejected
        default:
            return 'black'; // Default color if none of the statuses match
    }
};

// Utility function to get status class names
const getStatusClassName = (status) => {
    return status.toLowerCase().replace(/\s+/g, '-');
};

export default Leads;
