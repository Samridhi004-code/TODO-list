# 1. Task Manager Frontend

## Setup Instructions

1. **Add Environment Variables:**
   - Create a `.env` file in the root directory.
   - Add the following variables to the `.env` file:
     ```plaintext
     PORT=3000 (optional)
     REACT_APP_API_KEY=<Your_Backend_API_Key>
     ```
     Replace `<Your_Backend_API_Key>` with the actual API key or endpoint of your backend.

2. **Install Dependencies:**
   Run the following command to install all required packages:
   ```bash
   npm install
   ```

3. **Start the Application:**

    - For production, use:
        ```bash
        npm start 
        ```

    - For development, use:
        ```bash
        npm run dev 
        ```
    - Note: npm run dev uses Nodemon to automatically restart the server on file changes.

 ----------------------------------------------------------------
 ----------------------------------------------------------------
 ----------------------------------------------------------------

# 2. Task Manager Backend

## Setup Instructions

1. **Add Environment Variables: (optional)**
   - Create a `.env` file in the root directory.
   - Add the following variables to the `.env` file:
     ```plaintext
     PORT=5000
     ```

2. **Install Dependencies:**
   Run the following command to install all required packages:
   ```bash
   npm install
   ```

3. **Start the Application:**

    - For production/development, use:
        ```bash
        npm start 
        ```


## Points to Address
### Frontend
1. CSS Modifications: The CSS can be adjusted for better styling and design.
2. Routing Optimization: Improve routing efficiency to prevent unnecessary reloading.
### Backend
- Current Status: The backend is functioning well, and no changes are currently needed. The backend developer has ensured its robustness.
### Enjoy!

