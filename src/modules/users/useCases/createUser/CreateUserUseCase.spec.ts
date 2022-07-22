import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;

describe("Create User", () => {

  beforeEach(async () => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  })

  it("should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({name: "João", email: "joao@email.com", password: "1234"})

    expect(user).toHaveProperty("id");
  })
})
