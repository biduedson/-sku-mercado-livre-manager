import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IjwtValidation } from "./protocols";
import { knex } from "../../database/conection";

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

export class JwtValidator implements IjwtValidation {
  async verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any | void> {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send("Não autorizado.");
    }

    try {
      const token = authorization.replace("Bearer", "").trim();
      const result = jwt.verify(token, String(process.env.JWT_PASS));

      if (typeof result === "string") {
        return res.status(401).send("Não .");
      }

      const { id } = result as JwtPayload;
      const user = await knex("users").where({ id }).first();

      if (!user) {
        return res.status(401).send("Usuario não encontrado.");
      }

      const { password, ...rest } = user;
      req.user = rest;

      next();
    } catch (error) {
      return res.status(401).send("Não autorizado.");
    }
  }
}
