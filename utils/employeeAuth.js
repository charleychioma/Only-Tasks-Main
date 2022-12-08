const employeeAuth = (req,res,next) => {
    if(!req.session.employee_id)
    {
        res.redirect('/employee-login');
    }
    else
    {
        next();
    }
};

module.exports = employeeAuth;