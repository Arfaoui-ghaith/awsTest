const jwt = require('jsonwebtoken');
const { Employee, RoleCategory } = require("../models");

exports.protect = async (req, res, next) => {
    try{
        let token;
        if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) {
        token = req.headers.authorization.split(' ')[1];
        }
    
        if (!token) {
            return res.status(401).send({ message: 'You are not logged In ! Please log in to get access.' })
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const freshUser = await Employee.findByPk(decoded.payload.id);

        if (!freshUser) {
            return res.status(401).send({ message: 'The user belonging to this token does not exist.' });
        }

        req.user = {...decoded.payload};

        next();
    }catch(e){
        console.log(e.message)
        const message = e.message ? e.message : 'Some error occurred while authorization.'
        res.status(401).send({ message })
    }
};

exports.restrictTo = (permission) => {
    return async (req, res, next) => {
        let roleCategory = await RoleCategory.findByPk(req.user.RoleCategoryId);
        console.log(roleCategory)
        if(!roleCategory[permission]){
            return res.status(403).send({ message: 'You do not have permission to perform this action.' });
        }
        next();
    };
    
};


exports.editOnlySelfEmployee = () => {
    return async (req, res, next) => {
        
        let roleCategory = await RoleCategory.findByPk(req.user.RoleCategoryId);
        if(roleCategory.name == 'EMPLOYEE'){
            if(req.body.id != req.user.id){
                return res.status(403).send({ message: 'Employee can only edit his self.' });
            }
        }
        console.log("pass********************")
        next();
    };
};

exports.deleteAuth = () => {
    return async (req, res, next) => {
        let roleCategory = await RoleCategory.findByPk(req.user.RoleCategoryId);
        if(roleCategory.name == 'EMPLOYEE'){
            return res.status(403).send({ message: "Employee can't perform the delete action." });
        }
        next();
    };
};
