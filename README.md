## Cell Analytics
### Demo Video



https://github.com/user-attachments/assets/d8fc4e47-3b5a-4f99-adf4-c363b0e3a46c




```plaintext

CellAnalytics/
│
├── client/
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── App.js
│   │   ├── api/
│   │   │   └── apiConfig.js
│   │   ├── components/
│   │   │   ├── AuthContext.js
│   │   │   ├── CellChart.css
│   │   │   ├── CellChart.js
│   │   │   ├── Navbar.jsx
│   │   │   ├── PersistLogin.js
│   │   │   ├── ProtectedRoute.js
│   │   │   ├── Sidebar.css
│   │   │   ├── Sidebar.js
│   │   │   └── SoHPieChart.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useLogout.js
│   │   │   ├── usePrivate.js
│   │   │   ├── useRefreshToken.js
│   │   │   └── useUser.js
│   │   ├── index.js
│   │   ├── middlewares/
│   │   │   └── AuthMiddleware.js
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── auth/
│   │   │       ├── Login.jsx
│   │   │       ├── Register.jsx
│   │   │       └── User.jsx
│   └── yarn.lock
│
└── server/
    ├── .gitignore
    ├── api/
    │   ├── __init__.py
    │   ├── admin.py
    │   ├── apps.py
    │   ├── migrations/
    │   │   ├── 0001_initial.py
    │   │   └── __init__.py
    │   ├── models.py
    │   ├── serializers.py
    │   ├── tests.py
    │   ├── urls.py
    │   └── views.py
    ├── core/
    │   ├── __init__.py
    │   ├── asgi.py
    │   ├── settings.py
    │   ├── urls.py
    │   └── wsgi.py
    ├── excel_to_databse.ipynb
    ├── manage.py
    ├── requirements.txt
    ├── user/
    │   ├── __init__.py
    │   ├── admin.py
    │   ├── apps.py
    │   ├── authenticate.py
    │   ├── migrations/
    │   │   ├── 0001_initial.py
    │   │   └── __init__.py
    │   ├── models.py
    │   ├── serializers.py
    │   ├── tests.py
    │   ├── urls.py
    │   └── views.py

```


### Languages and Frameworks

- **Python**: Version 3.9 or above
- **Django**: Version 4.0 or above
- **JavaScript**
- **React.js**: Version 16.8 or above
- **Node.js**: Version 16 or above
- **Express.js**

### Databases

- **MySQL**: Version 5.7 or above

<h2>Backend Setup :</h2>

Clone the repository to your local machine:
```sh
$ git clone https://github.com/jay-arora31/CellAnalytics.git
$ cd CellAnalytics
$ cd server
```
Install the required dependencies:
```sh
$ virtualenv venv
```
```sh
$ venv\scripts\activate


```
```sh
$ pip install -r requirements.txt


```
Configure Database Settings:

Update the DATABASES settings in server/core/settings.py to match your MySQL configuration:

```sh
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'cellanalytics',
        'USER': 'your_mysql_username',
        'PASSWORD': 'your_mysql_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

```
Apply database migrations:
```sh
$ python manage.py makemigrations


```
```sh
$ python manage.py migrate


```

Start the development server:
```sh
$ python manage.py runserver


```
## Frontend Installation (React)

To set up and run the React frontend application, follow these steps:

```sh
$ cd..
$ cd client
```
Install the required dependencies:
```sh
$ npm install
```
Install the required dependencies:
```sh
npm start

```


# API Endpoints Documentation

## 1. User Authentication

### 1.1. Register

- **Endpoint:** `/api/register/`
- **Method:** POST
- **Description:** Registers a new user.

- **Request Body:**
  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "password2": "password123"
  }

**Response**
```json
{
"Registered!"
}
```

### 1.2 Login

**Endpoint:** `/api/login/`  
**Method:** `POST`  
**Description:** Authenticates a user and returns tokens.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response**
```json
{
  "access_token": "<access_token>",
  "refresh_token": "<refresh_token>"
}
```

### 1.3 Logout

**Endpoint:** `/api/logout/`  
**Method:** `POST`  
**Description:** Logs out the user by blacklisting the refresh token and clearing cookies.

**Request Headers:** Requires authentication via token in cookies.

**Response:**

**Status 200 OK:** No content (clears cookies).

## 2. Cell Data

### 2.1 Cell SoH (State of Health)

**Endpoint:** `/api/soh/`  
**Method:** `GET`  
**Description:** Retrieves the state of health (SoH) for all cells.

**Request Headers:** Requires authentication via token.

**Response:**

**Status 200 OK:**
  ```json
  [
    {
        "cell_id": 5308,
        "discharge_capacity": 2992.02,
        "nominal_capacity": 3000.0,
        "soh": 99.734
    },
    {
        "cell_id": 5329,
        "discharge_capacity": 2822.56,
        "nominal_capacity": 3000.0,
        "soh": 94.08533333333334
    }
]
  ```

### 2.2 Unique Cell IDs

**Endpoint:** `/api/unique-cell-ids/`  
**Method:** `GET`  
**Description:** Retrieves a list of unique cell IDs.

**Request Headers:** Requires authentication via token.

**Response:**

**Status 200 OK:**
  ```json
[
    5308,
    5329
]
```
### 2.3 Cell Data Detail

**Endpoint:** `/api/cell-data/<int:cell_id>/`  
**Method:** `GET`  
**Description:** Retrieves detailed data for a specific cell ID.

**Request Headers:** Requires authentication via token.

**Response:**
**Status 200 OK:**
  ```json
 {
    "discharge_capacity": 2992.02,
    "nominal_capacity": 3000.0,
    "data": [
        {
            "current_data": 0.0,
            "voltage_data": 3.59,
            "capacity_data": 0.0,
            "temperature_data": 37.4,
            "time_data": "2019-11-15T19:28:43Z"
        },
        {
            "current_data": 0.0,
            "voltage_data": 3.59,
            "capacity_data": 0.0,
            "temperature_data": 37.4,
            "time_data": "2019-11-15T19:28:44Z"
        },
        {
            "current_data": 0.0,
            "voltage_data": 3.59,
            "capacity_data": 0.0,
            "temperature_data": 37.4,
            "time_data": "2019-11-15T19:28:45Z"
        },
        {
            "current_data": 0.0,
            "voltage_data": 3.59,
            "capacity_data": 0.0,
            "temperature_data": 37.4,
            "time_data": "2019-11-15T19:28:46Z"
        },
        {
            "current_data": 0.0,
            "voltage_data": 3.59,
            "capacity_data": 0.0,
            "temperature_data": 37.3,
            "time_data": "2019-11-15T19:28:47Z"
        },
        ]
  }
  ```


## Login Page
![image](https://github.com/user-attachments/assets/5e3030f7-849b-4b16-b862-051f35a17684)


## Register Page
![image](https://github.com/user-attachments/assets/9f4eb02d-e2bd-4d12-9e6c-6ddf78418280)

## Dashboard
![image](https://github.com/user-attachments/assets/77a64216-99d0-487c-b4e3-cef36032d89e)

## Cell Page
![image](https://github.com/user-attachments/assets/bb31f8f0-abc9-4946-8611-802f263fc543)

