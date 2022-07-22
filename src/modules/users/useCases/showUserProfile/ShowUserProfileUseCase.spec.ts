import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import {ShowUserProfileUseCase} from "./ShowUserProfileUseCase";

let createUserUseCae: CreateUserUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe("Show user profile", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCae = new CreateUserUseCase(usersRepositoryInMemory);
    showUserProfileUseCase = new ShowUserProfileUseCase(usersRepositoryInMemory)
  })
  it("should be able to show  user profile", async () => {
    const user = await createUserUseCae.execute({name: "José", email: "jose@mail.com", password: "1234"});

    const userProfile = await showUserProfileUseCase.execute(user.id as string);

    expect(userProfile).toHaveProperty("id");
  })
})
