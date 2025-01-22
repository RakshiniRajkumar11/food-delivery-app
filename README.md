# **Food Delivery App**

**Description:**  
A simple and interactive full-stack food delivery application built to practice and demonstrate web development skills. This app allows users to browse food items, add them to a cart, and simulate a seamless checkout experience.

---
## **Features**:
1. **User Authentication:** Login and Signup functionality.
2. **Browse Food Items:** View a list of available food items categorized by cuisine.
3. **Cart Management:** Add, remove, and update item quantities in the cart.
4. **Checkout Process:** Simulated payment experience with cart reset upon completion.
5. **Responsive Design:** Fully functional on desktop and mobile devices.

---
## **Technologies Used**
1. **Frontend**: React, Bootstrap
2. **Backend**: Node.js, Express.js
3. **Database**: MongoDB Atlas
4. **State Management**: React Context API
5. **VS Code**: For writing and debugging code.
6. **Thunder Client**: For testing API endpoints during development.


---
## **Run the Application**

1. **Start the Backend Server:**  
   ```bash
   cd backend
   nodemon index.js
   ```
Runs on: http://localhost:5000

2. **Start the Frontend Server:**
   ```bash
   cd ../frontend
   npm start
   ```
Runs on: http://localhost:3000

---
## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/YourUsername/food-delivery-app.git
cd food-delivery-app
```
### **2. Install dependencies**
Frontend:
```bash
cd frontend
npm install
```

Backend:
```bash
cd ../backend
npm install
```
## Configuration: 

### **Connecting MongoDB:**

1. Create a .env file in the backend directory:
``` bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/foodDelivery?retryWrites=true&w=majority
```
Replace *username* and *password* with your MongoDB Atlas credentials.

---

## **API Endpoints**

### **User Endpoints**

POST: /api/CreateUser - Register a new user.

POST: /api/loginUser - Log in an existing user.

### **Order Endpoints**

POST: /api/saveOrder - Save a new order.

GET: /api/myOrders - Fetch orders for the logged-in user.

### **Data Endpoints**
GET: /api/displayData - Fetch food items and categories.

---
**Screenshots**

![image](https://github.com/user-attachments/assets/c32b9fed-cf5a-45bc-b589-3a2c9eda0a82)
![image](https://github.com/user-attachments/assets/6323b258-c651-4d38-a69b-193f8fb6e89a)
![image](https://github.com/user-attachments/assets/1592f48c-c2bb-44db-8ca0-163043faddfe)
![image](https://github.com/user-attachments/assets/3d866720-d136-4a45-8d7a-b180d207896c)
![image](https://github.com/user-attachments/assets/d22f84c7-7f98-4a47-8b2b-6a428537f9cf)
![image](https://github.com/user-attachments/assets/0eaf4d70-5924-46b7-a693-6e850a88e8d9)
![image](https://github.com/user-attachments/assets/2b28ba52-ac30-4b6c-8079-a878c3a5a653)
![image](https://github.com/user-attachments/assets/971e714e-d06e-45b9-881d-0a0aa5011e43)
![image](https://github.com/user-attachments/assets/085cc785-10ea-420c-8861-68fb091b5606)
![image](https://github.com/user-attachments/assets/effa5834-6c2d-42d1-b9c2-75a1508eb9af)







   
