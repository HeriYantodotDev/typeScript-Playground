import { Request, Response, NextFunction } from "express";
import { get, controller, use } from "./decorators";

const HTMLLogout: string = `
  <div>
  <div>You are logged Out</div>
  <a href="/auth/login">Login</a>
  </div>
`;

const HTMLLogin: string =`
  <div>
    <div>You are logged in</div>
    <a href="/auth/logout">Logout</a>
  </div>
`;


@controller('')
class RootController {

  @get('/')
  getRoot(req: Request, res: Response) {
    if (!req.session) {
      return res.send(HTMLLogout);
    }; 
  
    if (!req.session.loggedIn) {
      return res.send(HTMLLogout);
    }
  
    res.send(HTMLLogin);
  };

};