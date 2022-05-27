const { RoleCategory } = require("../models");
const { v4: uuidv4 } = require('uuid');
const {Op} = require("sequelize");
class RoleService {
    static async addRoleCategory(roleCategoryParams) {
        // Check if role with same name exists or not
        const {name} = roleCategoryParams;
        const roleCategoryExists = await RoleCategory.findOne({ where: {name, isActive: true}});
        if (roleCategoryExists) {
            throw Error("Role Category with same name already exists, please try some other names!");
        }

        const roleCategory = await RoleCategory.create({
            id: uuidv4(),
            ...roleCategoryParams
        })
        
        return roleCategory;
    }

    static async getAllRolesCategoriesPermissions() {
    
        let permissions = Object.keys(RoleCategory.rawAttributes);
    
        let indexes = [
            permissions.indexOf('id'),
            permissions.indexOf('name'),
            permissions.indexOf('isDeletable'),
            permissions.indexOf('createdAt'),
            permissions.indexOf('updatedAt'),
            permissions.indexOf('isActive')
        ]
        
        let table=[]
        for(let i=0;i<permissions.length;i++){
            if(!indexes.includes(i)){
                table.push(permissions[i])
            }
        }
        return table;
    }

    static async updateRoleCategory(roleCategoryParams,roleCategoryId) {
        // Check if role with same name exists or not
        const roleCategory = await RoleCategory.findByPk(roleCategoryId);
        if (!roleCategoryExists) {
            throw Error("No Role Category with Id given.");
        }

        await RoleCategory.update(roleCategoryParams,{ where: { id: roleCategoryId } })
        
        return roleCategory;
    }

    static async getAllRolesCategories(user) {
        console.log(user)
        // employee ==> employee
        // Branch admin ==> eployeee and branch
        // Caompany admin ==> comanpy admin and branch
        // Super admin ==> super admin and company admin
        let roleCategory = await RoleCategory.findByPk(user.RoleCategoryId);
        
        if(!roleCategory){
            throw Error("User has no role category.");
        }

        if(roleCategory.name == 'EMPLOYEE'){
            const roleCategories = await RoleCategory.findAll({ where: { name: 'EMPLOYEE' } });
            return roleCategories;
        }

        if(roleCategory.name == 'BRANCH_ADMIN'){
            const roleCategories = await RoleCategory.findAll({ where: { name: {[Op.in]: ['BRANCH_ADMIN','EMPLOYEE'] } } });
            return roleCategories;
        }

        if(roleCategory.name == 'COMPANY_ADMIN'){
            const roleCategories = await RoleCategory.findAll({ where: { name: {[Op.in]: ['BRANCH_ADMIN','COMPANY_ADMIN'] } } });
            return roleCategories;
        }

        if(roleCategory.name == 'SUPER_ADMIN'){
            const roleCategories = await RoleCategory.findAll({ where: { name: {[Op.in]: ['SUPER_ADMIN','COMPANY_ADMIN'] } } });
            return roleCategories;
        }
        
    }

    static async deleteRoleCategory(roleCategoryId) {
        const roleCategory = await RoleCategory.findByPk(roleCategoryId);
        if(!roleCategory) {
            throw Error('No Role Category found for the given Id.')
        }
        if (roleCategory.isDeletable) {
            return await RoleCategory.update({isActive: false},{where: {id: roleCategoryId}});
        } else {
            throw Error('[ALREADY IN USE] Cannot delete the roles Categories which are in use!');
        }
    }
}

module.exports = RoleService;
