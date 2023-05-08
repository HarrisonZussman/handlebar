const withAuth = (req, res, next) => {
    // if the user name is not save already go back to the login screen
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
};
// move it to another file
module.exports = withAuth;