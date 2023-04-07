import { Request, Response, NextFunction } from "express";
import { get, controller, use } from "./decorators";

@controller('')
class ProtectedController {

  @get('/protected')
  @use(requireAuth)
  getProtected (req: Request, res: Response) {
    res.send(`
      <h1>Welcome</h1>
      <p>This is protected route, you log in as a USER</p>
    `);
  };
};

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  } else {
    res.status(403).send(`
      Sorry! You have to log in first!!!
    `);
    return;
  };
};