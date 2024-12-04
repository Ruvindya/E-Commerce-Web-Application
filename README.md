# Simple E-Commerce Web Application

This is a simple e-commerce web application built with React that demonstrates key functionalities such as user authentication, a product list, and a shopping cart. The application manages its state using React Context and local state, without the need for a backend. 

## Features:
- **User Authentication**: 
  - ***User Sign Up:***
    - Before creating an account, the system checks if the user already exists.
    - If the user already exists, an error message is shown (User already exists).
    - If the user doesn’t exist, the account is created successfully.
  - ***User Log In:***
    - Before logging in, the system checks if the user exists and verifies the credentials.
    - If the user doesn't exist or credentials are incorrect, an error message is shown (Invalid username or password).
    - If the credentials are correct, the user is logged in.

  - Authentication is managed through Redux.
  - Validations for form fields using Formic and yup
  - Provide feedback notifications for successful login or signup

  
- **Product List & Management**: 
  - Display a list of products with attributes like name, price, description, and image.
  
- **Shopping Cart**: 
  - Add products to the shopping cart.
  - Display the cart with product details and item prices.
  - Update the quantity of items in the cart.
  - Remove items from the cart.
  - Display the total cost of items in the cart.

## Tech Stack:
- React (for building the user interface)
- React Context or Local State (for state management)
- CSS (for styling)

## How to Run:
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repository-name.git

2. Navigate to the project folder:
    ```bash
    cd your-repository-name

3. Install dependencies::
    ```bash
    npm install

 4. Run the application
    ```bash
    npm start
