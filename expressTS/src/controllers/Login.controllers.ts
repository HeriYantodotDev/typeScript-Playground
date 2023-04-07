import { NextFunction, Request, Response} from "express";
import {get, controller, bodyValidator, post} from "./decorators";

function logger(req: Request, res: Response, next: NextFunction){
  console.log('Request was made!!!');
  next();
};

@controller('/auth')
class LoginControllers {

  @get('/login')
  getLogin(req: Request, res: Response): void { 
    res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>Password</label>
        <input name= "password" type="Password" />
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  `);
  };

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request , res: Response) {

    const {email ,password} = req.body;
    
    if (!email || !password) {
      res.send("Hey Input it correctly please!");
      return;
    };
  
    if (email !== 'test@gmail.com' && password !== "123") {
      res.send("Invalid email or password");
      return;
    };

    req.session = {loggedIn : true};
    res.redirect('/');

  };

  @get('/logout')
  getLogout(req: Request, res: Response){
    if (req.session) {
      req.session.loggedIn = false;
      res.redirect('/');
    }
  };

};