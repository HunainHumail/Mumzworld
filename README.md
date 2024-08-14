# React Native Project

## Introduction

This is a React Native assignment project for Mumzworld. It supports both iOS and Android platforms and follows modern design patterns and architecture.
It contains 2 screens:
1) Product List Screen
2) Product Details Screen

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: v18.x or higher
- **npm**: v20.x or higher or **yarn**: v1.x or higher
- **React Native CLI**: Follow [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup) for the detailed guide.
- **Xcode**: For iOS development (macOS only)
- **Android Studio**: For Android development

## Installation

1. **Extract the compressed foler:**

   Extract the compressed folder, you will find the project files

2. **Install dependencies:**

    using yarn:

    ```bash
    yarn install
    ```

3. **Set up the iOS environment (macOS only):**

    ```bash
    cd ios
    pod install
    cd ..
    ```


## Project Structure

```plaintext
src/
│
├── api/                  # API calls
│   ├── productApi.ts     # API methods for products
│
├── assets/               # Images, fonts, and other static assets
│   ├── fonts.ts
|   ├── svg.ts  
|
├── components/           # Reusable UI components
│   ├── ProductList.tsx    # Product list component
│   ├── ProductItem.tsx    # Single product item component
│   ├── AnimatedCartButton.tsx    # An Animated Cart Button
│   ├── AnimatedHeart.tsx    # Animated Heart for Wishlist with sparkels
│   ├── DiscountComponent.tsx    # Discount component in items showing discounted price
│   ├── ProductCarouselComponent.tsx    # Product carousel showing product images
│   ├── SearchBar.tsx    # For Searching Items
│   ├── Tag.tsx    # For Showing Exclusive, MumzChoice or Yala Tags
|
├── navigation/           # Navigation setup
│   ├── index.tsx   # Main app navigator
│
├── store/                # Redux Toolkit slices and sagas
│   ├── slices/           # Redux slices
│   │   ├── productSlice.ts
│   │   └── index.ts      # Root reducer
│   ├── sagas/            # Redux sagas
│   │   ├── productSagas.ts
│   │   └── index.ts      # Root saga
│   ├── index.ts          # Store configuration
│
├── types/           # Data types and interfaces
│   ├── index.ts   
││  ├── Product.ts   
│   ├── ProductDetails.ts  
│   ├── ProductState.ts  
│   ├── RootState.ts   =
|
├── utils/                # Utility functions and constants
│   ├── constants.ts      # Application-wide constants
│   ├── helpers.ts        # Helper functions
│
├── viewmodels/           # ViewModels for MVVM
│   ├── ProductListViewModel.ts
│   ├── ProductDetailsViewModel.ts
│
├── views/                # Views (Screens)
│   ├── ProductListScreen.tsx
│   ├── ProductDetailsScreen.tsx
│
└── App.js        

## Design Patterns and Architecture

### 1. MVVM (Model-View-ViewModel) Pattern
- **Description**: The MVVM pattern separates the UI code from the business logic and data handling, making the application more modular and testable.
- **Implementation**:
  - **Model**: The data layer, including API calls and data structures (e.g., `productApi.ts`).
  - **View**: The UI components that display data and interact with the user (e.g., `ProductListScreen.tsx` and `ProductDetailsScreen.tsx`).
  - **ViewModel**: Acts as a mediator between the View and Model, handling presentation logic (e.g., `ProductListViewModel.ts` and `ProductDetailsViewModel.ts`).

### 2. Redux Toolkit (State Management)
- **Description**: Manages global state in a predictable way using the Redux library, with a modern approach provided by Redux Toolkit.
- **Implementation**:
  - **Slice Pattern**: Organizes state, actions, and reducers in a modular way (e.g., `productSlice.ts`).
  - **Store Configuration**: Centralizes state management, integrating middleware like Redux Saga.

### 3. Redux Saga (Middleware)
- **Description**: Handles side effects (e.g., asynchronous data fetching) in a predictable and manageable way.
- **Implementation**:
  - **Generator Functions**: Uses generator functions to manage complex asynchronous flows (e.g., `productSagas.ts`).

### 4. Dependency Injection
- **Description**: Reduces tight coupling between components, making the code more testable and flexible.
- **Implementation**: The `Provider` component from `react-redux` injects the Redux store into the component tree, allowing any component to access the global state.

### 5. Container-Presenter Pattern
- **Description**: Separates the logic (container) from the rendering (presenter) of UI components.
- **Implementation**:
  - **Container Components**: Handle the logic of data fetching and state management (e.g., `ProductListScreen.tsx`).
  - **Presenter Components**: Pure UI components that only render the UI based on props (e.g., `ProductList.tsx` and `ProductItem.tsx`).

### 6. Observer Pattern
- **Description**: Notifies subscribers (components) about changes in the state.
- **Implementation**: Redux's state management works as an observer pattern where components re-render when the state they rely on changes.

### 7. Command Pattern
- **Description**: Encapsulates requests as objects, allowing for parameterization of clients with different requests, queuing of requests, and logging the requests.
- **Implementation**: Actions in Redux serve as commands that encapsulate information about state changes, which are then dispatched to the store.

### 8. Singleton Pattern
- **Description**: Ensures a class has only one instance and provides a global point of access to it.
- **Implementation**: The Redux store (`store/index.ts`) is a singleton instance that holds the entire state of the application.

These design patterns contribute to creating a scalable, maintainable, and testable application architecture, following best practices in modern React Native development.


## Notes on Potential API Improvements

To enhance the user experience and optimize the application's performance, the following changes to the API could be considered:

1. **Incorporating Review Stars in the Product List**:
    - **Description**: If the API could provide review star ratings for products in the product list response, it would allow the application to display these ratings prominently at the start of each product item in the list.
    - **Benefit**: This would improve the user experience by helping users quickly identify highly-rated products, making the browsing experience more engaging and informative.

2. **Implementing Pagination for Product Data**:
    - **Description**: Instead of sending all 700+ products in a single API response, implementing pagination would be a more efficient approach.
    - **Benefit**: This would lead to faster data retrieval, reducing load times and improving the overall performance of the application. The user could load more products as needed, creating a smoother and more responsive experience.

3. **Optimizing HTML for Product Details**:
    - **Description**: The HTML provided for product details in the API should be structured in a way that is compatible with the app's UI design. This ensures that the content is displayed beautifully and aligns with the overall aesthetic and functionality of the app.
    - **Benefit**: This would make the product details more visually appealing and consistent with the app's design, enhancing the overall user experience and making the app look more polished.


## Notes on App Improvements

To enhance the user experience during navigation and interaction:

- **Loader Display on Specific Item Press**:
    - **Improvement**: Instead of navigating directly to the product detail page and blocking the screen while waiting for the data to load, I implemented a loader that appears only on the specific item that was pressed. This ensures that the user knows which product is being loaded and keeps the rest of the screen interactive.
    - **Implementation Challenge**: Due to limitations with the test API, I couldn't directly use the respective item ID in the product detail API. To overcome this, I modified the product detail API to replace the existing item ID with the selected product ID, enabling this behavior.

- **Wishlist Heart Animation**:
    - **Improvement**: For better user interaction, I added an animation to the wishlist heart icon. When the heart is tapped, it sparkles, providing a delightful and engaging experience for the user.

- **Add to Cart Button Animation on Product Cards**:
    - **Improvement**: To enhance user interaction, I added an animation to the "Add to Cart" button on product cards. This animation makes the button more interactive and visually appealing, improving the overall user experience.

- **Animated Add to Cart Button on Product Detail Page**:
    - **Improvement**: On the product detail page, I implemented an animated "Add to Cart" button designed to capture the user's attention. This is a conceptual enhancement aimed at making the page more engaging. The page can be further improved and made more interactive with additional focus on app development.

- **Suggestion for Microfrontend Architecture**:
    - **Suggestion**: Moving the application to a microfrontend architecture is a potential enhancement worth considering.
    - **Reasoning**: Microfrontend architecture allows for splitting the application into smaller, more manageable frontend components, each developed and deployed independently. This approach offers several benefits:
        - **Scalability**: Different teams can work on different parts of the application simultaneously without affecting each other, enabling faster development and deployment cycles.
        - **Flexibility**: Each microfrontend can use different technologies or frameworks, allowing for the adoption of the best tools for each specific feature.
        - **Resilience**: Issues in one microfrontend do not necessarily bring down the entire application, leading to a more robust system.
        - **Maintainability**: Smaller, decoupled components are easier to maintain, update, and test, reducing the overall complexity of the application.

This suggestion could lead to a more scalable, flexible, and maintainable application, aligning with modern development practices and preparing the app for future growth.