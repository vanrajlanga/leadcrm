import React from "react";
import "./Card.css";
const Card = ({ title, value, graphImage }) => {
	return (
		<div className="card">
			<div className="card-title">{title}</div>
			<div className="card-value">{value}</div>
			<div className="card-graph">
				<img src={graphImage} alt="Graph" />
			</div>
		</div>
	);
};

export default Card;
