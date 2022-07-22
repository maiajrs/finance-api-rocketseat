import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { OperationType } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";

let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let getStatementeOperationUseCase: GetStatementOperationUseCase;
let statementRepositoryInMemory: InMemoryStatementsRepository;
let createStatementUseCase: CreateStatementUseCase;

describe("Get a Statement Operation", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    statementRepositoryInMemory = new InMemoryStatementsRepository();
    createStatementUseCase = new CreateStatementUseCase(usersRepositoryInMemory, statementRepositoryInMemory);
    getStatementeOperationUseCase = new GetStatementOperationUseCase(usersRepositoryInMemory, statementRepositoryInMemory);
  })

  it("should be able to get a statement operation", async () => {
    const user = await createUserUseCase.execute({name: "José", email: "jose@mail.com", password: "1234"});

    const statement = await createStatementUseCase.execute({user_id: user.id as string, type: OperationType.DEPOSIT, amount: 100, description: "salario"});

    const operation = await getStatementeOperationUseCase.execute({user_id: user.id as string, statement_id: statement.id as string})

    expect(operation).toHaveProperty("id");
  })
})
