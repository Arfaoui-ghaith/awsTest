const { Shop, Role, Employee, RoleCategory } = require("../models");
const { v4: uuidv4 } = require('uuid');
const {Op} = require('sequelize');

class RoleService {

    static async addRoleToShop(roleParams) {
        const {shopId, name, roleCategoryId} = roleParams;

        if(name){
            if(name.trim() == ""){
                throw Error('Name is needed for Role!')
            }
        }
        
        if(!shopId){
            throw Error('shop id required.')
        }
        const shop = await Shop.findByPk(shopId);
        if(!shop){
            throw Error('no shops for the id given.')
        }

        // Check if role with same name exists or not
        const roleExists = await Role.findOne({ where: {name, ShopId: shopId} });
        if (roleExists) {
            throw Error("Role with same name already exists, please try some other names!");
        }

        let roleCategory = await RoleCategory.findByPk(roleCategoryId);
        if(!roleCategory){
            roleCategory = await RoleCategory.findOne({ where: { name: 'EMPLOYEE' } });
        }

        delete roleParams.shopId;
        delete roleParams.roleCategoryId;

        roleParams
        const role = await Role.create({
            id: uuidv4(),
            name,
            ShopId: shop.id,
            RoleCategoryId: roleCategory.id,
            ...roleParams
        })
        //await shop.addRole(role)
        return role;
    }

    static async addRole(roleParams) {

        if(!roleParams.name){
            throw Error('Name is needed for the role!')
        }

        if(!roleParams.shopId){
            throw Error('shop id required.')
        }
        const shop = await Shop.findByPk(roleParams.shopId);
        if(!shop){
            throw Error('no shops for the id given.')
        }
        delete roleParams.shopId;
        roleParams.ShopId = shop.id;
        // Check if role with same name exists or not
        const roleExists = await Role.findOne({ where: {name: roleParams.name, ShopId: shop.id}});
        if (roleExists) {
            throw Error("Role with same name already exists, please try some other names!");
        }

        const role = await Role.create({
            id: uuidv4(),
            ...roleParams
        });
        
        return role;
    }

    static async updateRole(roleParams) {
        const {id, name} = roleParams;

        if(name){
            if(name.trim() == ""){
                throw Error('Name is needed for Role!')
            }
        }

        const role = await Role.findByPk(id);
        // Check if role with same name exists or not
        if (name && name !== role.name) {
            const roleExists = await Role.findOne({ where: {name}});
            if (roleExists) {
                throw Error("Role with same name already exists, please try some other names!");
            }
        }
        delete roleParams.id;
        
        let roleUpdate = await Role.update(roleParams,{ where:{ id: role.id } })
        return roleUpdate;
    }

    static async getRoles(shopId) {
        const roles = await Role.findAll({where: {ShopId: shopId}});
        return roles;
    }

    static async getAllRoles() {
        const roles = await Role.findAll({});
        return roles;
    }

    static async deleteRole(roleId) {
        const role = await Role.findByPk(roleId);
        if(!role) {
            throw Error('No Role found for the given Id.')
        }
        if (role.isDeletable) {
            return await Role.destroy({where: {id: roleId}});
        } else {
            throw Error('[ALREADY IN USE] Cannot delete the roles which are in use!');
        }
    }

    static async getAllRolesPermissions() {
    
        let permissions = Object.keys(Role.rawAttributes);
    
        let indexes = [
            permissions.indexOf('id'),
            permissions.indexOf('name'),
            permissions.indexOf('isDeletable'),
            permissions.indexOf('createdAt'),
            permissions.indexOf('updatedAt'),
            permissions.indexOf('isActive'),
            permissions.indexOf('RoleCategoryId'),
            permissions.indexOf('ShopId')
        ]
        
        let table=[]
        for(let i=0;i<permissions.length;i++){
            if(!indexes.includes(i)){
                table.push(permissions[i])
            }
        }
        return table;
    }
}

module.exports = RoleService;
