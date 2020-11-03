function checkAuthentication(req, res, next) {
    if (req.isAuthenticated) {
        //req.isAuthenticated() will return true if user is sign in
        next();
    } else {
        res.redirect("/api/v1/signup");
    }
}
module.exports = checkAuthentication;