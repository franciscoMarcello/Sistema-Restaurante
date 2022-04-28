import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
interface AuthRequest {
  email: string;
  password: string;
}
class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!email) {
      throw new Error("O email e obrigatorio");
    }
    if (!password) {
      throw new Error("A senha e obrigatoria");
    }
    if (!user) {
      throw new Error("Usuário não existe");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("email/senha Incorreta");
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "7d",
      }
    );

    return { id: user.id, name: user.name, email: user.email, token: token };
  }
}
export { AuthUserService };
