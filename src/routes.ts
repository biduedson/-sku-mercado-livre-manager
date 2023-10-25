import { NextFunction, Router, response } from "express";
import { Request, Response } from "express";
import { PostgreCreateUserReposirory } from "./repositories/create-user/create-user";
import { CreateUserController } from "./controller/create-user/create-user";
import { LoginUser } from "./repositories/login/login";
import { Logincontroller } from "./controller/login/login";
import { JwtValidator } from "./middlewares/autorization-jwt.ts/autorization-jwt";
import { CreateCategoryController } from "./controller/create-category/create.category";
import { PostgreCreateCategoryRepository } from "./repositories/create-category/create-category";
import { PostgreCreateProductsRepository } from "./repositories/create-products/create-products";
import { CreateProductsController } from "./controller/create-products/create-products";

const routes = Router();

routes.post("/login", async (req: Request, res: Response) => {
  const loginUser = new LoginUser();
  const loginUserController = new Logincontroller(loginUser);
  const { body, statusCode } = await loginUserController.handle({
    body: req.body
  });

  res.status(statusCode).send(body);
});

const autorization = new JwtValidator();
routes.use((req: Request, res: Response, next: NextFunction) => {
  autorization.verifyToken(req, res, next);
});

routes.post("/users", async (req: Request, res: Response) => {
  const postgreCreateUserRepository = new PostgreCreateUserReposirory();
  const createUserController = new CreateUserController(
    postgreCreateUserRepository
  );

  const { body, statusCode } = await createUserController.handle({
    body: req.body
  });

  res.status(statusCode).send(body);
});

routes.post("/categories", async (req: Request, res: Response) => {
  const postgreCreateCategoryRepository = new PostgreCreateCategoryRepository();
  const createCategoryController = new CreateCategoryController(
    postgreCreateCategoryRepository
  );

  const { body, statusCode } = await createCategoryController.handle({
    body: req.body
  });

  res.status(statusCode).send(body);
});

routes.post("/products", async (req: Request, res: Response) => {
  const postegreCreateProductsRepository =
    new PostgreCreateProductsRepository();
  const createProductsController = new CreateProductsController(
    postegreCreateProductsRepository
  );

  const { body, statusCode } = await createProductsController.handle({
    body: req.body
  });

  res.status(statusCode).send(body);
});

export default routes;
