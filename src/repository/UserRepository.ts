import db from "../database/connection";

import { User } from "../interfaces/UserInterfaces";

export default class UserRepository {
  async allUsers() {
    const users = await db("users").select("*")

    return users;
  }

  async findUser(id: number) {
    const user = await db("users").select("*").where(`${id} = id;`);

    return user;
  }


  async createUser(user: User) {
    const trx = await db.transaction();
    const { name, avatar, whatsapp, bio, email, password } = user;

    try {
      const insertedUsersIds = await trx("users").insert({
        name,
        avatar,
        whatsapp,
        bio,
        email,
        password,
      });

      await trx.commit();

      return { id: insertedUsersIds[0], trxSuccessfull: true };
    } catch (error) {
      await trx.rollback();
      console.error(error);

      return {
        trxSuccessfull: false,
        error,
      };
    }
  }
}
