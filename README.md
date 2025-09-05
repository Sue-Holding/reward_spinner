# 🎰 Reward Spinner Project

This project is a full-stack application where sellers can log in, register their orders, and use spins to win rewards.

## 🤔 Thought Process

We discussed how we should have access to sellers in the database and their orders as in a sales business this would already have been set up in their 'kassa' or likewise programme where they made the orders for their customers. 

So we came to the conculsion for the purpose of this school project that we assume we have access to a sellers collection already so we didn't make a register page, just a log in.

We also discussed how we would attach the orderNumber to the sellerId (as this is a step that would have already taken place at the time of sale). 

We agreed that our landing page after log in would ask the seller to add to orderNumber to themselves to allow them the chance to spin.

We also though it would be a nice touch to add the seller history to their page to show the amount of orders they have entered, spins they have spun, spins still available to spin and total winnings.

## 💰 Reward Structure

### 1. Earning Spins

- Sellers receive spins when they add new valid orders.

- Each order equals 1 spin (cannot be reused for multiple spins).

### 2. Spinning for Rewards

- A spin generates a random reward between 1–100 (configurable).

- Each spin consumes 1 available spin from the seller’s account.

### 3. Spin Rules

- A seller must have at least 1 available spin to play.

- Each orderNumber can only be used once for a spin (prevents double-dipping).

- If the order doesn’t exist or was already used, the spin is rejected.

### 4. Tracking Progress

- The backend stores:

    - All spins made (Spin history per seller).

    - The reward outcome per spin.

    - Remaining available spins for the seller.

- Sellers can view on their profile page:

    - Total number of spins made.

    - Total rewards won.

    - Remaining available spins.

    - Order numbers tied to spins.

## 📂 Project Structure

apps/

 ├── backend/

 └── frontend/

## 🚀 Features

- Authentication: Sellers can log in using sellerId + password.

- Orders: Sellers can add orders and view their order history.

- Spins: Each seller has spins available based on orders.

    - One spin per order.

    - Random reward generation.

    - Prevents duplicate spins for the same order.

- Spin History: Sellers can view past spins, total rewards, and remaining spins.

- Protected Routes: Orders and spins require a valid JWT token.

## 🛠️ Tech Stack

### Backend

- Node.js

- Express

- MongoDB (Mongoose)

- JSON Web Tokens (JWT)

- CORS

## Frontend

- React (Vite)

- TypeScript

## Endpoints

|                  |        |                                        |
|------------------|--------|----------------------------------------|
|Action            | Method | URL                                    |
|Test server       | GET	| http://localhost:3000/                 |
|Login	           | POST   | http://localhost:3000/auth/login       |
|Logout            | POST	| http://localhost:3000/auth/logout      |
|Add order         | POST   | http://localhost:3000/orders/add-order |
|Get seller orders | GET	| http://localhost:3000/orders/:sellerId |
|Spin reward	   | POST   | http://localhost:3000/spins            |
|Get spin history  | GET	| http://localhost:3000/spins/:sellerId  |

## Design

![design](design.png)

## Authors

Made by Sue Holding and Oliwia Matuttis