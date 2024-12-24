const authorize = (allowedRoles) => {
    return (req, res, next) => {
        const { role_id } = req.user; // Extract role from the JWT payload

        if (!allowedRoles.includes(role_id)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        next();
    };
};

module.exports = authorize;
