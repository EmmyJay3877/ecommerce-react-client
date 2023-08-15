
# Ecommerce Client using React

Welcome to the Ecommerce Client repository! This project provides a dynamic and user-friendly web interface for interacting with the FastAPI Ecommerce Server 👉 https://github.com/EmmyJay3877/ecommerce-fastapi-server 👈. Built with React, React Router, Socket.IO Client, Context API, and styled with Tailwind CSS, this client application offers seamless navigation, real-time updates, and an appealing UI for managing products, customers, and orders. This README will guide you through setting up and running the client application.

## 🚀 Demo

https://ecommerce-react-client.netlify.app/


## Features

- Browse and search for products.
- View product details.
- Add products to the shopping cart.
- Manage the shopping cart and update quantities.
- Proceed to checkout and place orders.
- Real-time updates for order status using Socket.IO.
- User-friendly and responsive UI with - Tailwind CSS styling.
- Manage customer information
- Handle order and payment history
- User authentication and authorization
- Password reset and update option


## Prerequisites

Before you begin, ensure you have the following dependencies installed:

- Node.js (>= 12.0)
- npm or yarn package manager
## Tech Stack

**Client:** React, TailwindCSS

**Websocket:** Socket.IO Client

**Email Services:** SmtpJS


## Installation

Clone the repository

```bash
git clone https://github.com/EmmyJay3877/ecommerce-react-client.git
```
    
Install the required packages using npm or yarn:

```bash
npm install
# or
yarn install

```
## Configuration

visit https://smtpjs.com/ to get a SECURE_TOKEN

Set up environment variables:

Create a .env file in the root directory and add the following:

```bash
ESLINT_NO_DEV_ERROS=true

REACT_APP_SECURE_TOKEN=your_secure_token

REACT_APP_HOST=http://localhost:3000

REACT_APP_SERVER=http://localhost:8000

REACT_APP_SOCKET_SERVER=ws://localhost:8000

CI=false
```
## Usage

1. Run the client application:

```bash
npm start
# or
yarn start
```

The client application will be accessible at http://localhost:3000

2. Open your browser and navigate to http://localhost:3000 to interact with the client application.



## Contributing

Contributions are always welcome!

If you find any bugs or want to add new features, feel free to submit a pull request.


## License

[MIT](https://choosealicense.com/licenses/mit/)

