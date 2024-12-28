// Utility for checking roles
export const hasRole = (requiredRoles) => {
	const roles = JSON.parse(localStorage.getItem("roles")) || [];
	return roles.some((role) => requiredRoles.includes(role));
};

// Utility for managing tokens
export const setToken = (token) => {
	localStorage.setItem("token", token);
};

export const getToken = () => {
	return localStorage.getItem("token");
};

export const clearToken = () => {
	localStorage.removeItem("token");
};
