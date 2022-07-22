import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase"
import { OperationType } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;
let statementRepositoryInMemory: InMemoryStatementsRepository;
let createStatementeUseCase: CreateStatementUseCase;

describe("Create Statement", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    statementRepositoryInMemory = new InMemoryStatementsRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    createStatementeUseCase = new CreateStatementUseCase(usersRepositoryInMemory, statementRepositoryInMemory);
  })
  it("should be able to create a statement", async () => {
    const user = await createUserUseCase.execute({name: "José", email: "jose@mail.com", password: "1234"});

    const statement = await createStatementeUseCase.execute({user_id: user.id as string, amount: 100, type: OperationType.DEPOSIT, description: "salario"});

    expect(statement).toHaveProperty("user_id");
  })
})
