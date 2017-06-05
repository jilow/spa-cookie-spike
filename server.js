const express = require('express');
const cookieParser = require('cookie-parser');
const jsend = require('jsend');
const open = require('open');

let port = process.env.PORT || 3000;
let delay = 2 * 1000;

const app = express();
app.use(cookieParser());
app.use(jsend.middleware);
app.use(express.static(__dirname));

app.post('/authenticate', (req, res) => {
	let payload = '12345';
  res.cookie('auth', payload, {
    maxAge: 15 * 1000,
    httpOnly: true
  });
  let data = { authenticated: true };
  setTimeout(()=>{
    res.jsend.success(data);
  }, delay);
});

app.get('/auth-status', (req, res)=> {
	let cookie = req.cookies.auth;
	if (cookie !== undefined) {
		let data = { authenticated: true };
		res.jsend.success(data);
	} else {
		res.jsend.error({
      message: 'Unauthorized',
      data: { authenticated: false }
    });
	}
});

app.use(function (req, res, next) {
  let cookie = req.cookies.auth;
  if (cookie === undefined) {
    res.status(401);
    res.jsend.error({
      message: 'Unauthorized',
      data: { authenticated: false }
    });
    return;
  }
  next();
});

app.listen(port, ()=> {
  console.log(`App is listening on port ${port}.`);
  open(`http://localhost:${port}`);
});