# ChatU Backend Specification

Backend is constructed by NodeJS and Express with MongoDB as the database.  

## Table of Content

- [Backend Router Design](https://github.com/Gavin-OP/CSCI3100-ChatU/blob/main/backend/README.md#backend-router-design)
- [To Do](https://github.com/Gavin-OP/CSCI3100-ChatU/blob/main/backend/README.md#to-do)

## Backend Router Design

- `/feedback/retrieve/:feedbackId`:
  - GET
  
  - Output:
  
    Success output:
  
    ```javascript
    {
        "feedback_id": 1,
        "content": "ChatU is a good software"
    }
    ```
  Failure output:
    ```javascript
    {
        "message": "feedback not found."
    }
    ```
  
  - Usage: Retrieve feedback by feedbackId
  
- `/feedback/create`:
  - POST
  
  - Input: body:
  
    ```javascript
    {
        content: 'xxx'
    }
    ```
  
  - Output: 
  
    Success output:
  
    ```javascript
    {
        "message": "Create feedback successfully.",
        "feedback_creation_status": 1
    }
    ```
  
    Failure output:
  
    ```javascript
    {
        "message": "Fail to create feedback.",
        "feedback_creation_status": 0
    }
    ```
  
  - Usage: Create new feedback
  
- `/user/getUser/:userId`:
  - GET
  
  - Output:
  
    Success output:
  
    ```javascript
    {
        "user_id": 1,
        "username": "Gavin OP",
        "description": "perfectly balanced",
        "avatar":
        {
            "contentType": "image/png",
            "data": {
                "type": "Buffer",
                "data": [137, 80, 88]
            }
        }
    }
    
    ```
  Failure output:
    ```javascript
    {
        "message": "Fail to retrieve user information. Maybe because user does not exist."
    }
    ```
  
  - Usage: Retrieve basic user information.  
  
- `/user/signUp`
  - POST
  
  - Input:
  
    ```javascript
    {
        email: 'OPPPP@gavin.com',
        pwd: 123454,
        username: 'Gavin OP',
    }
    ```
  
  - Output: 

    Success output:
  
    ```javascript
    {
        "message": "Sign up successful. User will automatically login.",
        "login_status": 2
    }
    ```
  
    Cookie: 
  
    ```javascript
    userDbId=j%3A%22642c25d78513c3dbb553fd22%22; Path=/; HttpOnly;
    userId=2; Path=/; HttpOnly;
    ```
  
    Failure output:
  
    ```javascript
    {
        "message": "Fail to create user. Maybe because email has been used."
    }
    ```
  
  - Usage: Create new user
  
- `/user/login`

    - POST

    - Input:

        ```javascript
        {
            email: 'OPPPP@gavin.com',
            pwd: 123454,
        }
        ```

    - Output:

        Success output:

        ```javascript
        {
            "message": "Login successful",
            "login_status": 2
        }
        ```

        Cookie: 

        ```javascript
        userDbId=j%3A%22642c25d78513c3dbb553fd22%22; Path=/; HttpOnly;
        userId=2; Path=/; HttpOnly;
        ```

        Failure output:

        ```javascript
        {
            "message": "Wrong email.",
            "login_status": 0
        }
        ```

        ```javascript
        {
            "message": "Wrong password.",
            "login_status": 1
        }
        ```

    - Usage: Create new user

- `/user/logout`

    - POST

    - Output:

        ```javascript
        {
            "message": "Logout successful"
        }
        ```

    - Usage: Logout and clear cookies


## To Do
