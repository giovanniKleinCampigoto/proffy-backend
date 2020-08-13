import db from "../database/connection";

import { Class } from "../interfaces/ClassInterfaces";

export default class ClassRepository {
  async createClass(classObject: Class) {
    const trx = await db.transaction();
    const { subject, cost, user_id } = classObject;

    try {
      const insertedClassesIds = await trx("classes").insert({
        subject,
        cost,
        user_id,
      });

      await trx.commit();

      return { id: insertedClassesIds[0], trxSuccessfull: true };
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
