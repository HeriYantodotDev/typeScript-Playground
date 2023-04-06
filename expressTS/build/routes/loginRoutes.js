"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
;
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    else {
        res.status(403).send(`
      Sorry! You have to log in first!!!
    `);
        return;
    }
}
const router = (0, express_1.Router)();
exports.router = router;
router.get('/login', (req, res) => {
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
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.send("Hey Input it correctly please!");
        return;
    }
    ;
    if (email !== 'test@gmail.com' && password !== "123") {
        res.send("Invalid email or password");
        return;
    }
    ;
    req.session = { loggedIn: true };
    res.redirect('/');
});
router.get('/', (req, res) => {
    if (!req.session) {
        return res.send(`
      <div>
        <div>You are logged Out</div>
        <a href="/login">Login</a>
      </div>
    `);
    }
    ;
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
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.loggedIn = false;
        res.redirect('/');
    }
});
router.get('/protected', requireAuth, (req, res) => {
    res.send(`
    <h1>Welcome</h1>
    <p>This is protected route, you log in USER</p>
  `);
});
