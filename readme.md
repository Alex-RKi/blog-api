## AUTH

All requests must have JWT token in header's Authorization field as `Bearer ${jwt}` string. If no token provided - auth middleware will return access err message.

/auth/registration
Register new user, if such username already exists - deny.
POST: username and password.

/auth/login
Logg in if such user exists and provided password is correct.
POST: username and password

/auth/users
GET: Admin-only request type. Provides list of registered users.

---

## BLOG

All requests must have JWT token in header's Authorization field as `Bearer ${jwt}` string. If no token provided - auth middleware will return access err message.

/blog/add
POST: Add new post. Req body should contain props: data, title &content props.

/blog/get-all
GET: Get all posts for user. User selects in DB by JWT's username prop. 
