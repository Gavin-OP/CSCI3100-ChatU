# ChatU Backend Specification

Backend is constructed by NodeJS and Express with MongoDB as the database.  

## Table of Content

- [Backend Router Design](https://github.com/Gavin-OP/CSCI3100-ChatU/blob/main/backend/README.md#backend-router-design)
- [To Do](https://github.com/Gavin-OP/CSCI3100-ChatU/blob/main/backend/README.md#to-do)

## Backend Router Design

- `/feedback/retrieve/:feedbackId`:
  
  - Usage: Retrieve feedback by feedbackId
  
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
  
- `/feedback/create`:

  - Usage: Create new feedback

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

- `/user/getUser/:userId`:

  - Usage: Retrieve basic user information.  

  - GET

  - Output:

    Success output:

    ```javascript
    {
        "user_id": 3,
        "username": "Gavin",
        "description": "perfectly balanced",
        "email": "gavin@cuhk.com",
        "ban": false,
        "follow_status": 1,		// 0: not following, 1: following, 2: self
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

- `/user/signUp`

  - Usage: Create new user and send cookie

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
    isAdmin=false; Path=/; HttpOnly;
    ```

    Failure output:

    ```javascript
    {
        "message": "Fail to create user. Maybe because email has been used."
    }
    ```

- `/user/login`

    - Usage: Login and send cookie

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
        isAdmin=false; Path=/; HttpOnly;
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

- `/user/logout`

    - Usage: Logout and clear cookies

    - POST

    - Output:

        ```javascript
        {
            "message": "Logout successful"
        }
        ```

- `/follow/create/:followId`

    - Usage: Follow a user

    - GET

    - Output:

        Success output: 

        ```javascript
        {
            "message": "Follow user successfully. Followed user's fan list updated.",
            "followList": [
                1,
                3,
                2
            ],
            "fanList": [
                1,
                4
            ]
        }
        ```

        Failure output: 
        ```javascript
        {
            "message": "FollowId not found. Can not follow an non-existing user."
        }
        ```

        ```javascript
        {
            "message": "Cannot follow yourself"
        }
        ```

- `/follow/delete/:followId`

    - Usage: Unfollow a user

    - GET

    - Output:

        Success output: 

        ```javascript
        {
            "message": "Unfollow user successfully. Followed user's fan list updated.",
            "followList": [
                1
            ],
            "fanList": [
                1
            ]
        }
        ```

        Failure output:

        ```javascript
        {
            "message": "FollowId not found. Can not unfollow an non-existing user."
        }
        ```

        ```javascript
        {
            "message": "Can't unfollow yourself"
        }
        ```

- `/fan/delete/:fanId`

    - Usage: Delete a fan

    - GET

    - Output:

        Success output: 

        ```javascript
        {
            "message": "Unfan user successfully. Fan's following list updated.",
            "fanList": [
                2
            ],
            "followList": [
                2,
                4,
                5
            ]
        }
        ```

        Failure output: 

        ```javascript
        {
            "message": "Can't unfan yourself"
        }
        ```

        ```javascript
        {
            "message": "FanId not found. Can not delete an non-existing fan."
        }
        ```

- `/follow/followList/:userId`

    - Usage: Return all account that userId is currently following. 

    - GET

    - Output:

        Success output:

        ```javascript
        {
            "message": "He/She followes no one."
        }
        ```

        ```javascript
            {
                "user_id": 5,
                "username": "123456",
                "email": "123456@cuhk.com",
                "ban": false,
                "follow_status": 1,
                "avatar": {
                    "contentType": "image/vnd.microsoft.icon",
                    "data": {
                        "type": "Buffer",
                        "data": [
                            0,
                            0,
                        ]
                    }
                }
            },
            {
                "user_id": 1,
                "username": "admin",
                "email": "admin",
                "ban": false,
                "follow_status": 0,
                "avatar": {
                    "contentType": "image/vnd.microsoft.icon",
                    "data": {
                        "type": "Buffer",
                        "data": [
                            0,
                            0,
                        ]
                    }
                }
            }
        ]
        ```

        Failure output:

        ```javascript
        {
            "message": "Fail to retrieve follow information."
        }
        ```

        ```javascript
        {
            "message": "User not found."
        }
        ```

        


## To Do
