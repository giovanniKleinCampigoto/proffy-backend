import { Request, Response } from "express";
import db from "../database/connection";
import UserRepository from "../repository/UserRepository";

class UsersController {

    async create(request: Request, response: Response) {
        const { name, avatar, whatsapp, bio, subject, cost, schedule, email, password } = request.body;

        const userRepository = new UserRepository();

        const { id: user_id } = await userRepository.createUser({
            name,
            avatar,
            whatsapp,
            bio,
            email,
            password,
        });

        return user_id;
    }
}
