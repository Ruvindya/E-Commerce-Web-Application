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

  - Authentication is managed through Redux for multiple users.
  - Validations for form fields using Formic and yup
  - Provide feedback notifications for successful login or signup

  
- **Product List & Management**: 
  - Display a list of products with attributes like name, price, description, and image.
  - Products can add to the cart
  - Products can add to the wishlist.
  - Can go to product detail page
  
- **Shopping Cart**: 
  - Add products to the shopping cart.
  - Display the cart with product details and item prices.
  - Update the quantity of items in the cart.
  - Remove items from the cart.
  - Display the total cost of items in the cart.

- **Additional Featuers**: 
  - Implemente the Filter option (Filter by name, category, Max Min Price)
  - Implement the wishlist
  - Mobile responsiveness
  - Use local storage to persist the shopping cart and user authentication state across page reloads. 
  - Use React Router to create separate routes for login/register, product list, and cart pages. 
  - Product card use as reusable component
  - Handle edge cases and validation errors 

- **Design Decisions**: 
  - ***Consistency in Styling:***
    - Ensured a consistent button style throughout the application to maintain a cohesive and user-friendly interface.
    - Used Tailwind CSS for a flexible and responsive design system that helps maintain consistency.
  - ***User-Centered Design:***
    - Prioritized ease of use, with particular attention to accessibility and usability
    - Added visual feedback (e.g., hover states, active states) on interactive elements (buttons, links, etc.) for better user engagement.
  - ***Filters:***
    - Implemented a price range filter with both a slider and text input to cater to different user preferences.
    - This provides users with more control and flexibility when narrowing down their search.
  - ***Responsive Design:***
    - Designed the filter card to be collapsible in mobile view, improving user experience and saving space.
    - Ensured that the application is fully responsive, with a focus on providing an optimal experience across devices (mobile, tablet, desktop).
  - ***Icons for Common Actions:***
    - Added icons for wishlist and cart buttons, making it intuitive for users to understand common actions at a glance.
    - Enhanced the user experience with recognizable and simple iconography for added clarity.
  - ***State Management with Redux:***
    - Used Redux for centralizing the application's authentication and state management to avoid prop-drilling and make it easier to scale the app.
    - Efficiently handled the user session and login state to maintain a smooth experience across different parts of the app.


## Tech Stack:
- React (for building the user interface)
- Redux for state management
- Tailwind CSS (for styling)

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
