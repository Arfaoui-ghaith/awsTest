const express = require('express');
const AuthService = require("../../../services/AuthService");
const authRouter = express.Router();


// for super admin company admin shop or branch admin
authRouter.post('/login', async (req, res) => {
    try {
        const body = req.body;
        const user = await AuthService.loginShop(body)
        res.status(200).send(user);
    } catch (e) {
        const message = e.message || 'Error occurred while logging in.'
        res.status(400).send({message})
    }
});

// for emplyee
authRouter.post('/pin-login', async (req, res) => {
    try {
        const body = req.body;
        const employee = await AuthService.loginEmployee(body)
        res.status(200).send(employee);
    } catch (e) {
        const message = e.message || 'Error occurred while logging in.'
        res.status(400).send({message: message})
    }
});

authRouter.post('/me', async (req, res) => {
    try {
        const body = req.body;
        const employee = await AuthService.getSessionInfo(body)
        res.status(200).send(employee);
    } catch (e) {
        const message = e.message || 'Error occurred while logging in.'
        res.status(400).send({message: message})
    }
});

// create company
authRouter.post('/company/register', async (req, res) => {
    try {
        const body = req.body;
        const company = await AuthService.registerCompany(body);
        res.status(200).send(company);
    } catch (e) {
        const message = e.message || 'Error occurred while logging in.'
        res.status(400).send({message})
    }
});

// create company
authRouter.get('/company/:companyId/activate/:token', async (req, res) => {
    try {
        if(!req.params.token){
            return res.status(404).send({message: 'Token required to perform this action.'});
        }
        if(!req.params.companyId){
            return res.status(404).send({message: 'Company Id required to perform this action.'});
        }
        const params = req.params;
        await AuthService.activateCompany(params);
        res.status(200).send({
            message: "Account have been verified, please login."
        });
    } catch (e) {
        const message = e.message || 'Error occurred while logging in.'
        res.status(400).send({message})
    }
});

// roleCategory to login done
// role to pin-login done
// add roleCtaegory to employees done
// Employee role in Roles the rest on Role Category done
// return the new fields menu items done
// API role Category

module.exports = authRouter;