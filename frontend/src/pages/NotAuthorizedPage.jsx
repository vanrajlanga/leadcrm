import React from "react";

const NotAuthorizedPage = () => {
	return (
		<div className="container text-center">
			<h1>403 - Not Authorized</h1>
			<p>You do not have permission to access this page.</p>
			<a href="/login" className="btn btn-primary">
				Go to Login
			</a>
		</div>
	);
};

export default NotAuthorizedPage;
