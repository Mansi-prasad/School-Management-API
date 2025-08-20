# 🏫 School API Project

A simple **Node.js + MySQL** API project to manage schools and fetch them based on proximity to the user's location.  
This project demonstrates input validation, database integration, and sorting distance using latitude & longitude.

---

## 📌 Features

- **Add School API**
  - Endpoint: `/addSchool`
  - Method: `POST`
  - Payload:
    ```json
    {
      "name": "ABC Public School",
      "address": "123 Main Street, City",
      "latitude": 28.6139,
      "longitude": 77.2090
    }
    ```
  - Functionality:
    - Validates input fields.
    - Ensures `name` and `address` are non-empty strings.
    - Ensures `latitude` and `longitude` are valid numbers within allowed ranges.
    - Inserts the school record into the `schools` table.
  - Example Response:
    ```json
    {
      "success": true,
      "message": "School added successfully"
    }
    ```

---

- **List Schools API**
  - Endpoint: `/listSchools`
  - Method: `GET`
  - Query Parameters:
    ```
    /listSchools?latitude=28.6139&longitude=77.2090
    ```
  - Functionality:
    - Fetches all schools from the `schools` table.
    - Calculates the **geographical distance** (Haversine formula) between the user’s coordinates and each school.
    - Returns schools sorted by **nearest first**.
  - Example Response:
    ```json
    {
      "success": true,
      "schools": [
        {
          "id": 1,
          "name": "ABC Public School",
          "address": "123 Main Street, City",
          "latitude": 28.6139,
          "longitude": 77.2090,
          "distance_km": 0.0
        },
        {
          "id": 2,
          "name": "XYZ International School",
          "address": "456 Park Avenue, City",
          "latitude": 28.7041,
          "longitude": 77.1025,
          "distance_km": 11.2
        }
      ]
    }
    ```

---

## Database Setup

1. Create a MySQL database:
      ```sql
      CREATE DATABASE schooldb;
      USE schooldb;
      ```

---
2. Create the schools table:
      ```sql
      CREATE TABLE schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(500) NOT NULL,
        latitude DECIMAL(10, 8) NOT NULL,
        longitude DECIMAL(11, 8) NOT NULL
      );
      ```

## ⚙️ Installation & Setup
1. Clone this repo:
      ``` bash
      git clone https://github.com/Mansi-prasad/School-Management-API
      cd School-Management-API
      ```

2. Install dependencies:
      ``` bash
      npm install
      ```

3. Setup environment variables in .env:
      ``` ini
      DBURL=mysql://username:password@host:3306/schooldb
      PORT=5000
      ```

4. Run the server:
      ``` bash
      npm run server
      ```
  
Server will run on:
  `http://localhost:5000`

---

## 🛠 Tech Stack
1. Node.js (Express.js)
2. MySQL (via mysql2 driver)
3. dotenv for environment management

---

## Testing the APIs with Postman

You can test the APIs easily using **Postman**.  

### 1. Add School API

**Endpoint:** `POST /addSchool`  
**URL (local):** `http://localhost:5000/api/school/addSchool`

**Steps:**

1. Open Postman → Click **New → HTTP Request**  
2. Select **POST** method  
3. Enter the URL: `http://localhost:5000/api/school/addSchool`
4. Go to **Body → raw → JSON** and add the following payload:  
```json
{
  "name": "ABC Public School",
  "address": "123 Main Street, City",
  "latitude": 28.6139,
  "longitude": 77.2090
}
```
5. Click on Send

### 2. List Schools API
**Endpoint:** `POST /listSchools`  
**URL (local):** `http://localhost:5000/api/school/listSchools?latitude=28.6139&longitude=77.2090`


#### Steps:
1. Open Postman → Click **New → HTTP Request**.
2. Select **GET** method.
3. Enter the URL with query params:  `http://localhost:5000/api/school/listSchools?latitude=28.6139&longitude=77.2090`
4. Click on Send.
