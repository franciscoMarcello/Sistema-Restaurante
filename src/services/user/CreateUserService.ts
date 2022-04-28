import prismaCliente from "../../prisma";
import { hash } from "bcryptjs";
interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    if (!email) {
      throw new Error("O email e obrigatorio");
    }
    const userAlreadyExists = await prismaCliente.user.findFirst({
      where: { email: email },
    });
    if (userAlreadyExists) {
      throw new Error("O email já esta em uso");
    }
    if (!password) {
      throw new Error("A senha e obrigatoria");
    }
    const passwordHash = await hash(password, 8);
    const user = await prismaCliente.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    return user;
  }
}
export { CreateUserService };
