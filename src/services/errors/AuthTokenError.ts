export class AuthTokenError extends Error {
  constructor() {
    super("Erro:Sem autorização");
  }
}
