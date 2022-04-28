import { Request, Response } from "express";

import { DetailUserSevice } from "../../services/user/DetailUserSevice";

class DetailUserController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const detailUserSevice = new DetailUserSevice();

    const user = await detailUserSevice.execute(user_id);

    return res.json(user);
  }
}
export { DetailUserController };
