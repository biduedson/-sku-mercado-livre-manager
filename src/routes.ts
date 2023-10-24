import { NextFunction, Router, response } from "express";
import { Request, Response } from "express";
import { PostgreCreateUserReposirory } from "./repositories/create-user/create-user";
import { CreateUserController } from "./controller/create-user/create-user";
import { LoginUser } from "./repositories/login/login";
import { Logincontroller } from "./controller/login/login";
import { JwtValidator } from "./middlewares/autorization-jwt.ts/autorization-jwt";

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

export default routes;
