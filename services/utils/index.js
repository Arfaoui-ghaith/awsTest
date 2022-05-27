const { Session } = require("../../models");
const { Op } = require("sequelize");

exports.StartAndEndDateManySessions = async (shopId) => {
    const lastSession = await Session.findAll({ where: {ShopId: shopId}, order: [['endedAt', 'DESC']], limit: 1  });
    
    if(lastSession.length < 1){
        return {empty: true};
    }
    let endDate;
    if(lastSession[0].endedAt){
        endDate = lastSession[0].endedAt
    }else{
        endDate = new Date().toISOString()
    }

    const firstSession = await Session.findAll({ where: {ShopId: shopId, date: {[Op.between]: [lastSession[0].date, endDate]}}, order: [['createdAt']], limit: 1  })

    return { startDate:  firstSession[0].createdAt, endDate, empty: false};
}

exports.StartAndEndDateLastSession = async (shopId) => {
    const lastSession = await Session.findAll({ where: {ShopId: shopId}, order: [['endedAt', 'DESC']], limit: 1  });
        
    if(lastSession.length < 1){
        return {empty: true};
    }

    let endDate;
    if(lastSession[0].endedAt){
        endDate = lastSession[0].endedAt
    }else{
        endDate = new Date().toISOString()
    }

    return { startDate:  lastSession[0].createdAt, endDate, empty: false};
}

exports.StartAndEndDateManySessionsByManyDays = async (shopId,d) => { 
    const date = new Date(d).toISOString().substring(0,10);
    
    const lastSession = await Session.findAll({ where: {ShopId: shopId, createdAt: {[Op.between]: [date+'T00:00:00.000Z',date+'T23:59:59.000Z']}}, order: [['endedAt', 'DESC']], limit: 1  });
        
    if(lastSession.length < 1){
        return {empty: true};
    }

    let endDate;
    if(lastSession[0].endedAt){
        endDate = lastSession[0].endedAt
    }else{
        endDate = new Date().toISOString()
    }

    const firstSession = await Session.findAll({ where: {ShopId: shopId, date: {[Op.between]: [lastSession[0].date, endDate]}}, order: [['createdAt']], limit: 1  })

    return { startDate:  firstSession[0].createdAt, endDate, empty: false};
}