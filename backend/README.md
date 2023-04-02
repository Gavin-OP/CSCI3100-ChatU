# ChatU Backend Specification

Backend is constructed by NodeJS and Express with MongoDB as the database.  

## Table of Content

- [Backend Router Design](https://github.com/Gavin-OP/CSCI3100-ChatU/blob/main/backend/README.md#backend-router-design)
- [To Do](https://github.com/Gavin-OP/CSCI3100-ChatU/blob/main/backend/README.md#to-do)

## Backend Router Design

- `/feedback/retrieve/:feedbackId`:
  - GET
  - Output:
    ```javascript
    {
        "feedback_id": 1,
        "content": "ChatU is a good software"
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
  - Output: `'Create feedback successfully.'` for success. `'Fail to create feedback.'` for failure.
  - Usage: Create new feedback
- `/user/getUser/:userId`:
  - GET
  - Output:
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
  - Output: `'Create user successfully.'` for success. `'Fail to create user.'` for failure.
  - Usage: Create new user

## To Do
