const { EmailConfig, Shop } = require("../models");
const { v4: uuidv4 } = require('uuid');

class EmailConfigService {
    static async updateEmailConfig(emailConfigParams) {
        const {shopId, senderEmail, password, ccEmails, stockDifferencePurchase,
            billRefund, discountedBill, sessionClose, monthlyReport} = emailConfigParams;
        if(!shopId) throw Error('Shop id required.')
        const shop = await Shop.findByPk(shopId);
        const emailConfig = await EmailConfig.findOne({where: {ShopId: shopId}})

        if(!emailConfig) {
            const emailConfig = await EmailConfig.create({
                id: uuidv4(),
                senderEmail,
                password,
                ccEmails,
                stockDifferencePurchase,
                billRefund,
                discountedBill,
                sessionClose,
                monthlyReport
            });
            await shop.addEmailConfig(emailConfig)
            return emailConfig;
        }

        emailConfig.senderEmail = senderEmail || emailConfig.senderEmail;
        emailConfig.password = password || emailConfig.password;
        emailConfig.ccEmails = ccEmails || emailConfig.ccEmails;
        emailConfig.stockDifferencePurchase = stockDifferencePurchase || emailConfig.stockDifferencePurchase;
        emailConfig.billRefund = billRefund || emailConfig.billRefund;
        emailConfig.discountedBill = discountedBill || emailConfig.discountedBill;
        emailConfig.sessionClose = sessionClose || emailConfig.sessionClose;
        emailConfig.monthlyReport = monthlyReport || emailConfig.monthlyReport;

        await emailConfig.save();
        return emailConfig;
    }

    static async getEmailConfig(shopId) {
        const emailConfig = await EmailConfig.findOne({where: {ShopId: shopId}});
        return emailConfig;
    }
}

module.exports = EmailConfigService;
