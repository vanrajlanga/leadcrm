import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Quotations.css";
import { FaUserPlus, FaTrash, FaEdit, FaEye } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";


const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

const Quotations = () => {
	const [quotations, setQuotations] = useState([]);
	const [quotationsHistory, setQuotationsHistory] = useState([]);
	const [isFormVisible, setIsFormVisible] = useState(false);

	useEffect(() => {
		fetchQuotations();
		setIsFormVisible(true);
	}, []);

	const getStatusClassName = (status) => {
		return status?.toLowerCase().replace(/\s+/g, "-");
	};

	const fetchQuotations = async () => {
		try {
			const response = await axios.post(
				`${API_URL}/get-quotations`,
				{},
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			setQuotations(response.data);
		} catch (error) {
			console.log("Error fetching quotations: ", error);
			toast.error("Failed to load quotations!");
		}
	};

	const showQuotationsHistory = async (trackingId) => {
		const history = await axios.post(
			`${API_URL}/get-quotations-history`,
			{trackingId: trackingId},
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		setQuotationsHistory(history.data)
		setIsFormVisible(false);
	};
	
	return (
		<div className="quotation-container">
			{isFormVisible ? (
				<>
				<div className="d-flex justify-content-between align-items-center mb-4">
					<h3 className="title">Quotation History</h3>
				</div>

				<div className="card">
					<div className="card-body table-responsive">
						<table className="table table-hover">
							<thead>
								<tr>
									<th>ID</th>
									<th>C Name</th>
									<th>C Number</th>
									<th>C Email</th>
									<th>Category</th>
									<th>Reference By</th>
									<th>C.P</th>
									<th>Final S.P</th>
									<th>Q.Status</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{quotations.map((quotation) => (
									<tr key={quotation.id}>
										<td>#{quotation.id}</td>
										<td>{quotation.lead.name}</td>
										<td>{quotation.lead.phone}</td>
										<td>{quotation.lead.email}</td>
										<td>{quotation.product_name}</td>
										<td>{quotation.agent}</td>
										<td>{quotation.product_price}</td>
										<td>{quotation.selling_price}</td>
										<td className="status-cell">
											<div className={`status ${getStatusClassName(quotation.status)}`}>
												{quotation.status}
											</div>
										</td>
										<td>
											<button
												className="btn btn-dark btn-sm me-2"
												onClick={() => showQuotationsHistory(quotation.lead.trackingId)}
											>
												<FaEye />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div> 
				</>
			) : (
				<>

					<div className="d-flex align-items-center mb-4">
						<button
							className="btn btn-outline-secondary back-btn me-2"
							onClick={() => {
								setIsFormVisible(true);
							}}
						>
							<AiOutlineArrowLeft />
						</button>
						<h3 className="title">All Quotations</h3>
					</div>
					
					<div className="card">
						<div className="card-body table-responsive">
							<table className="table table-hover">
								<thead>
									<tr>
										<th>ID</th>
										<th>A Name</th>
										<th>Quote Detail</th>
										<th>Category</th>
										<th>C.P</th>
										<th>Shipping</th>
										<th>Tax</th>
										<th>Discount</th>
										<th>Final S.P</th>
										<th>Voucher</th>
										<th>Q.Status</th>
									</tr>
								</thead>
								<tbody>
									{quotationsHistory.map((quotationH) => (
										<tr key={quotationH.id}>
											<td>#{quotationH.id}</td>
											<td>{quotationH.agent}</td>
											<td>{quotationH.quote_details}</td>
											<td>{quotationH.product_name}</td>
											<td>{quotationH.product_price}</td>
											<td>{quotationH.shipping}</td>
											<td>{quotationH.tax}</td>
											<td>{quotationH.discount}</td>
											<td>{quotationH.selling_price}</td>
											<td>{quotationH.voucher}</td>
											<td className="status-cell">
												<div className={`status ${getStatusClassName(quotationH.status)}`}>
													{quotationH.status}
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div> 
				</>
			)}
		</div>
	);
};

export default Quotations;
