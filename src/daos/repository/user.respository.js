import {UserDTO} from "../dtos/user.dto.js";


class UserRepository{
    constructor(dao){
        this.dao=dao;
    }
    
    async getUsers(){
        const users = await this.dao.getUsers();
        const resultDTOs = users.map((user) => new UserDTO(user));
        return resultDTOs;
    }

    async getUsersForAdmin(){
        const users = await this.dao.getUsers();
        return users;
    }

    async addUser(user){
        const userToAdd = await this.dao.addUser(user);
        return userToAdd;
    }

    async getUserById(id){
        const user = await this.dao.getUserById(id);
        const resultDTO = new UserDTO(user);
        return resultDTO;
    }
    
    async getUserByEmail(email){
        return await this.dao.getUserByEmail(email);
    };

    async updateUser(id, user){
        return await this.dao.updateUser(id, user);
    };

    async deleteUserById(id){
    return await this.dao.deleteUserById(id);
}}

export {UserRepository};