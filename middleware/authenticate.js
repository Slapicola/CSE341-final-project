const isAuthenticated = (req, res, next) => {
    console.log("=== Authentication Check ===");
    console.log("Session ID:", req.sessionID);
    console.log("Session exists:", !!req.session);
    console.log("Session user:", req.session.user);
    console.log("Is authenticated:", req.session.user !== undefined);
    console.log("===========================");
    
    if (!req.session || req.session.user === undefined) {
        console.log("BLOCKING REQUEST - No authentication");
        return res.status(401).json({ message: 'You do not have access to this resource.' });
    }
    
    console.log("ALLOWING REQUEST - User authenticated");
    next();
};

module.exports = {
    isAuthenticated
}