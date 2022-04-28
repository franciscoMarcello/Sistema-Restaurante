import { Request, Response } from "express";
import { RemoveItemSevice } from "../../services/order/RemoveItemSevice";
class RemoveItemContorller {
  async handle(req: Request, res: Response) {
    const item_id = req.query.item_id as string;

    const removeItem = new RemoveItemSevice();

    const order = await removeItem.execute({
      item_id,
    });
    return res.json(order);
  }
}
export { RemoveItemContorller };
