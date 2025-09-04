```
npm init -y
npm install express
npm install nodemon typescript @types/express ts-node --dev
npx tsc --init
npm i mongoose dotenv
npm i -D @types/node
npm install jsonwebtoken
npm install --save-dev @types/jsonwebtoken
```


<!-- npm i express mongoose cors zod jsonwebtoken bcryptjs helmet morgan express-rate-limit
npm i -D typescript ts-node-dev @types/node @types/express @types/jsonwebtoken @types/bcryptjs
npx tsc --init
npm i nodemon typescript @types/express ts-node --dev -->

|ENDPOINTS         |        |                                        |
|------------------|--------|----------------------------------------|
|Action            | Method | URL                                    |
|Test server       | GET	| http://localhost:3000/                 |
|Login	           | POST   | http://localhost:3000/auth/login       |
|Logout            | POST	| http://localhost:3000/auth/logout      |
|Add order         | POST   | http://localhost:3000/orders/add-order |
|Get seller orders | GET	| http://localhost:3000/orders/:sellerId |
|Spin reward	   | POST   |http://localhost:3000/spins             |
|Get spin history  | GET	| http://localhost:3000/spins/:sellerId  |

figma https://www.figma.com/design/JwOTQjtUJoAqz4dpgQNlK4/Chas-work?node-id=63-2