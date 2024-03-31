import { randomBytes } from "crypto";
import { UserEntity } from "src/user/user.entity";
import { EntityManager, getConnection } from "typeorm";

export default async function seedDatabese(): Promise<void> {
  getConnection().transaction(async (entityManager: EntityManager) => {
    const userCount = await entityManager.count(UserEntity);
    if (!userCount) {
      const userName = "Admin";
      const password = randomBytes(12).toString("hex");
      const newUser = new UserEntity();
      newUser.userName = userName;
      newUser.password = password;
      await entityManager.save(newUser);
      console.log(`userName: ${userName} password: ${password}`);
    }
  });
}
