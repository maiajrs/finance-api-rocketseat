import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { OperationType } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let statementeRepositoryInMemory: InMemoryStatementsRepository;
let getBalanceUseCase: GetBalanceUseCase;
let createStatementeUseCase: CreateStatementUseCase;

describe("Get User balance", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    statementeRepositoryInMemory = new InMemoryStatementsRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    getBalanceUseCase = new GetBalanceUseCase(statementeRepositoryInMemory, usersRepositoryInMemory);
    createStatementeUseCase = new CreateStatementUseCase(usersRepositoryInMemory, statementeRepositoryInMemory);

  })
  it("should be able to get all user's balance", async () => {
    const user = await createUserUseCase.execute({name: "José", email: "jose@mail.com", password: "1234"});

    await createStatementeUseCase.execute({user_id: user.id as string, amount: 100, type: OperationType.DEPOSIT, description: "salario"});

    await createStatementeUseCase.execute({user_id: user.id as string, amount: 50, type: OperationType.WITHDRAW, description: "agua"});

    await createStatementeUseCase.execute({user_id: user.id as string, amount: 100, type: OperationType.DEPOSIT, description: "extra"});

    await createStatementeUseCase.execute({user_id: user.id as string, amount: 50, type: OperationType.WITHDRAW, description: "gas"});

    const balance = await getBalanceUseCase.execute({user_id: user.id as string})

    expect(balance).toHaveProperty("statement");
  })
})
