import { Request, Response } from "express";
import { ListByCategorySevice } from "../../services/product/ListByCategorySevice";

class ListByCategoryController {
  async handle(req: Request, res: Response) {
    const category_id = req.query.category_id as string;

    const listByCategory = new ListByCategorySevice();

    const products = await listByCategory.execute({ category_id });
    return res.json(products);
  }
}
export { ListByCategoryController };
