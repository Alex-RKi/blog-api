## AUTH

All requests must have JWT token in header's Authorization field as `Bearer ${jwt}` string. If no token provided - auth middleware will return access err message.

POST: `/auth/registration`
Register new user, if such username already exists - deny.
username and password.

POST: `/auth/login`
Logg in if such user exists and provided password is correct.
username and password

GET: `/auth/users`
Admin-only request type. Provides list of registered users.

---

## BLOG

All requests must have JWT token in header's Authorization field as `Bearer ${jwt}` string. If no token provided - auth middleware will return access err message.

POST: `/blog/add`
Add new post. Req body should contain props: data, title &content props.

GET: `/blog/get-all`
Get all user posts. User selects in DB by JWT's username prop.

PUT: `/blog/edit`
Edit chosen post. Req body should contain props: PostId, data, title & content props.

DELETE: `/blog/delete`
Delete chosen post. Req body should contain PostId in string format.
