const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');


// Controllers
const shopRouter = require('./controllers/api/v1/shop.controller');
const employeeRouter = require('./controllers/api/v1/employee.controller');
const roleCategoryRouter = require('./controllers/api/v1/roleCategory.controller');
const roleRouter = require('./controllers/api/v1/role.controller');
const unitRouter = require('./controllers/api/v1/unit.controller');
const materialRouter = require('./controllers/api/v1/material.controller');
const storeRouter = require('./controllers/api/v1/store.controller');
const printerRouter = require('./controllers/api/v1/printer.controller');
const authRouter = require('./controllers/api/v1/auth.controller');
const tableRouter = require('./controllers/api/v1/table.controller');
const billTemplateRouter = require('./controllers/api/v1/bill-template.controller');
const posSetupRouter = require('./controllers/api/v1/pos-setup.controller');
const expenseCategoryRouter = require('./controllers/api/v1/expense-category.controller');
const expenseRouter = require('./controllers/api/v1/expense.controller');
const menuItemCategoryRouter = require('./controllers/api/v1/menu-item-category.controller');
const menuItemRouter = require('./controllers/api/v1/menu-item.controller');
const stockRouter = require('./controllers/api/v1/stock.controller');
const sessionRouter = require('./controllers/api/v1/session.controller');
const billRouter = require('./controllers/api/v1/bill.controller');
const customerRouter = require('./controllers/api/v1/customer.controller');
const stockLogRouter = require('./controllers/api/v1/stocklog.controller');
const attendanceRouter = require('./controllers/api/v1/attendance.controller');
const emailConfigRouter = require('./controllers/api/v1/email-config.controller');
const companyConfigRouter = require('./controllers/api/v1/company.controller');
const countryConfigRouter = require('./controllers/api/v1/country.controller');
const imageConfigRouter = require('./controllers/api/v1/image.controller');
const dashboardRouter = require('./controllers/api/v1/dashboard.controller');
const billItemsRouter = require('./controllers/api/v1/bill-item.controller');

// dotenv make us can provide constants from the configure file like "config.env" 
dotenv.config({ path: './config.env' });
app.use(cors());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 5555;

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/shop', shopRouter);
app.use('/api/v1/employee', employeeRouter);
app.use('/api/v1/role', roleRouter);
app.use('/api/v1/unit', unitRouter);
app.use('/api/v1/material', materialRouter);
app.use('/api/v1/store', storeRouter);
app.use('/api/v1/printer', printerRouter);
app.use('/api/v1/table', tableRouter);
app.use('/api/v1/bill-template', billTemplateRouter);
app.use('/api/v1/pos-setup', posSetupRouter);
app.use('/api/v1/expense-category', expenseCategoryRouter);
app.use('/api/v1/expense', expenseRouter);
app.use('/api/v1/menu-item-category', menuItemCategoryRouter);
app.use('/api/v1/menu-item', menuItemRouter);
app.use('/api/v1/stock', stockRouter);
app.use('/api/v1/session', sessionRouter);
app.use('/api/v1/customer', customerRouter);
app.use('/api/v1/bill', billRouter);
app.use('/api/v1/stocklog', stockLogRouter);
app.use('/api/v1/attendance', attendanceRouter);
app.use('/api/v1/email-config', emailConfigRouter);
app.use('/api/v1/company',companyConfigRouter);
app.use('/api/v1/role-category',roleCategoryRouter);
app.use('/api/v1/country',countryConfigRouter);
app.use('/api/v1/image',imageConfigRouter);
app.use('/api/v1/dashboard',dashboardRouter);
app.use('/api/v1/bill-item',billItemsRouter);

app.use('/static/public', express.static(`${__dirname}/public`));

app.set('images', path.join(__dirname, '/images'));

app.get('/', (req, res) => {
    res.status(200).send('Server on');
});

app.all('*', (req, res, next) => {
    res.status(404).json({
      status: 'fail',
      message: `can't find ${req.originalUrl}`,
    });
});

app.listen(PORT, () => {
    console.log(process.env.NODE_ENV)
    console.log("The server started on port " + PORT);
});
