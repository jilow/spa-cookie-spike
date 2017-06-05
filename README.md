# spa-cookie-spike

**Spike:**

How to implement SPA token-auth using httpOnly cookies?

**Outcome:**

To get the auth-status, make a generic ajax request to the server using the .withCredentials flag.

To manage the auth state, get the auth-status on app ready and on heartbeat or request.

### Setup

```bash
$ npm install && bower update
```

### Run

```bash
$ npm start
```