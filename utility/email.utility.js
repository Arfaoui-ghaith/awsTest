const templates = require('../templates');

const mailjet = require('node-mailjet')
  .connect('4523a03e8a1814995edd51c0aa6a58c7', '1946960e5f3a67d631d6842f4aed3cb2');


class EmailService {

   static async send(options){

    "display: none; display: none;"

    let mailContent = templates.REGISTRATION_TEMPLATE;
    mailContent = mailContent.replace('{{REGISTRATION_LINK}}', options.link);
    if(options.companyName){
      mailContent = mailContent.replace('{{COMPANY_NAME}}', `Company : ${options.companyName}`);
    }else{
      mailContent = mailContent.replace('{{STYLE0}}', `display: none; display: none;`);
    }

    if(options.shopName){
      mailContent = mailContent.replace('{{SHOP_NAME}}', `Shop : ${options.shopName}`);
    }else{
      mailContent = mailContent.replace('{{STYLE1}}', `display: none; display: none;`);
    }

    if(options.email){
      mailContent = mailContent.replace('{{EMAIL}}', `Email : ${options.email}`);
    }else{
      mailContent = mailContent.replace('{{STYLE2}}', `display: none; display: none;`);
    }

    if(options.password){
      mailContent = mailContent.replace('{{PASSWORD}}', `Password : ${options.password}`);
    }else{
      mailContent = mailContent.replace('{{STYLE3}}', `display: none; display: none;`);
    }

    if(options.pin){
      mailContent = mailContent.replace('{{PIN}}', `Pin : ${options.pin}`);
    }else{
      mailContent = mailContent.replace('{{STYLE4}}', `display: none; display: none;`);
    }
 
    /*mailContent = mailContent.replace('{{SHOP_NAME}}', options.shopName ? `Shop : ${options.shopName}` : '');
    mailContent = mailContent.replace('{{EMAIL}}', options.shopName ? `Email : ${options.email}` : '');
    mailContent = mailContent.replace('{{PASSWORD}}', options.shopName ? `Password : ${options.password}` : '');
    mailContent = mailContent.replace('{{PIN}}', options.shopName ? `Pin : ${options.pin}` : '');*/

    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
        "Messages":[{
            "From": {
                "Email": "themidribpos@gmail.com",
                "Name": "themidrib"
            },
            "To": [{
                "Email": `${options.email}`,
                "Name": `${options.name}`
            }],
            "Subject": `${options.subject}`,
            "TextPart": `${options.TextPart}`,
            "HTMLPart": mailContent
        }]
    })
request
    .then((result) => {
        //console.log(result.body)
    })
    .catch((err) => {
        console.log(err.statusCode)
    })
   }
    
  

  /*static async send(toArray = [], { link }) {
    const subject = 'Employee Registration';
    let mailContent = templates.REGISTRATION_TEMPLATE;
    mailContent = mailContent.replace('{{REGISTRATION_LINK}}', link);
    const mappedToArray = toArray.map(item => {
      if (typeof item === 'object') {
        return {
          item,
          name: item.email
        }
      }
      return {
        Email: item,
        Name: item
      }
    });
    await new Promise(async (resolve) => {
      try {
        await mailjet
          .post("send", { 'version': 'v3.1' })
          .request({
            "Messages": [
              {
                "From": {
                  "Email": "themidribpos@gmail.com",
                  "Name": "themidrib"
                },
                "To": mappedToArray,
                "Subject": subject,
                "HTMLPart": mailContent
              }
            ]
          });
        return resolve({
          ok: true
        })
      } catch (_) {
        return resolve({
          ok: false
        })
      }
    });
  }*/

}

module.exports = EmailService;