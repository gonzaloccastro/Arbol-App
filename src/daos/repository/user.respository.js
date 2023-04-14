import {UserDTO} from "../dtos/user.dto.js";


class UserRepository{
    constructor(dao){
        this.dao=dao;
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
}

export {UserRepository};