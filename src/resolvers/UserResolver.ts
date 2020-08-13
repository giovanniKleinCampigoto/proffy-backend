import { Resolver, Query, Mutation, Arg, Int, Field, ObjectType } from "type-graphql";
import { hash } from 'bcryptjs'
import UserRepository from "../repository/UserRepository";

@ObjectType()
class User {
  @Field(type => String)
  email: string = '';

  @Field(type => String)
  name: string = '';

  @Field(type => String)
  bio: string = '';

  @Field(type => String)
  whatsapp: string = '';

  @Field(type => String)
  avatar: string = '';
}

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  users() {
    const userRepository = new UserRepository();

    return userRepository.allUsers();
  }

  @Mutation(() => Int)
  async create(
    @Arg("name", () => String) name: string,
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string,
    @Arg("bio", () => String) bio: string,
    @Arg("whatsapp", () => String) whatsapp: string,
    @Arg("avatar", () => String) avatar: string
  ) {
    try {

      const hashedPassword = await hash(password, 12)

      const userRepository = new UserRepository();

      const { id: user_id } = await userRepository.createUser({
        name,
        avatar,
        whatsapp,
        bio,
        email,
        password: hashedPassword,
      });

      return user_id;
    } catch (error) {
      console.error(error)
      return -1
    }
  }
}
