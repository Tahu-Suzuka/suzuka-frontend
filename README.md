# Tahu Suzuka - Frontend

Welcome to the Tahu Suzuka frontend repository, an e-commerce web application dedicated to ordering traditional tofu from Cibuntu, Bandung.

## About The Project

This project is the user interface (UI) for Tahu Suzuka, built with React and Vite. This application allows customers to browse products, place orders, and manage their accounts. Additionally, there is an admin dashboard to manage products, orders, customers, and vouchers.

### Key Features

* **User Authentication:** Login, registration, OTP, forgot password, and Google login.
* **Product Catalog:** Displays a list of products with details, variations, and reviews.
* **Shopping Cart:** Add, modify, and remove items from the cart.
* **Checkout Process:** Easy checkout flow with payment integration.
* **Order Management:** Users can view their order history and status.
* **User Profile:** Users can manage their personal information and addresses.
* **Admin Dashboard:**
    * Order Management
    * Product & Category Management
    * Customer Management
    * Voucher Management
    * Sales Reports
    * Review Management

### Technologies Used

* **[React](https://reactjs.org/)** - A JavaScript library for building user interfaces.
* **[Vite](https://vitejs.dev/)** - Next-generation frontend tooling.
* **[Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework for rapid UI development.
* **[React Router](https://reactrouter.com/)** - For client-side routing.
* **[Axios](https://axios-http.com/)** - A promise-based HTTP client.
* **[React Slick](https://react-slick.neostack.com/)** - A carousel component for React.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm (or yarn/pnpm) installed on your machine.

### Installation

1.  Clone the repo
    ```sh
    git clone [https://github.com/username/tahu-suzuka-frontend.git](https://github.com/username/tahu-suzuka-frontend.git)
    ```
2.  Navigate to the project directory
    ```sh
    cd tahu-suzuka-frontend
    ```
3.  Install NPM packages
    ```sh
    npm install
    ```
4. Create a `.env` file in the project root and add the necessary environment variables:
    ```
    VITE_API_URL=http://localhost:5000/api
    VITE_MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxxxxxxxxxxx
    ```
5.  Run the development server
    ```sh
    npm run dev
    ```
6.  Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Available Scripts

In the project directory, you can run:

* `npm run dev`: Runs the app in development mode.
* `npm run build`: Builds the app for production to the `dist` folder.
* `npm run lint`: Runs the linter to check for code errors.
* `npm run preview`: Runs the app from the production build locally.
