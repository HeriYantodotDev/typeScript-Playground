import { Router, Response, Request, NextFunction } from "express";

interface RequestWithBody extends Request {
  body : {
    [key: string]: string | undefined
  }
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
  }
}

const router = Router();
router.get('/login', (req: Request, res: Response) => { 
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
});


router.post('/login', (req: RequestWithBody , res: Response) => {

  const {email ,password} = req.body;

  if (!email || !password) {
    res.send("Hey Input it correctly please!");
    return;
  };

  if (email !== 'test@gmail.com' && password !== "123") {
    res.send("Invalid email or password");
    return;
  };

  req.session = {loggedIn: true};
  res.redirect('/');

});


router.get('/', (req: Request, res: Response) => {
  if (!req.session) {
    return res.send(`
      <div>
        <div>You are logged Out</div>
        <a href="/login">Login</a>
      </div>
    `);
  }; 

  if (!req.session.loggedIn) {
    return res.send(`
      <div>
        <div>You are logged Out</div>
        <a href="/login">Login</a>
      </div>
    `);
  }

  res.send(`
    <div>
      <div>You are logged in</div>
      <a href="/logout">Logout</a>
    </div>
  `);
});

router.get('/logout', (req: Request, res: Response) => {
  if (req.session) {
    req.session.loggedIn = false;
    res.redirect('/');
  }
});

router.get('/protected', requireAuth ,(req: Request, res: Response) => {
  res.send(`
    <h1>Welcome</h1>
    <p>This is protected route, you log in USER</p>
  `);
});

export { router }