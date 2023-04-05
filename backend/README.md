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

- `/user/logout`[^1]

    - Usage: Logout and clear cookies

    - POST

    - Output:
        ```javascript
        {
            "message": "Logout successful"
        }
        ```

- `/tweet/like`
    - Usage: When a user clicks the like button of a tweet, add the user's id to the like list of this tweet
    - post
    - Input: body:

        ```javascript
        {
            tweet_id: Num
            liked: Boolean // 0 if the like button is grey (not liked); 1 if it is light (already liked)
        }
        ```
    - Success output:
        - if not like before:
            ```javascript
            {
                message: 'like successful.',
                liked_status: 1     // 0: not liked, 1: liked
            }
            ```
        - if like before:
             ```javascript
            {
                message: 'Unlike successful.',
                    liked_status: 0     // 0: not liked, 1: liked
            }
            ```

- `/tweet/dislike`
    - Usage: When a user clicks the dislike button of a tweet, add the user's id to the dislike list of this tweet
    - post
    - Input: body:

        ```javascript
        {
            tweet_id: Num
            disliked: Boolean // 0 if the dislike button is grey (not disliked); 1 if it is light (already disliked)
        }
        ```
    - Success output:
        - if not dislike before:
            ```javascript
            {
                message: 'disliked successful.',
                disliked_status: 1     // 0: not disliked, 1: disliked
            }
            ```
        - if dislike before:
             ```javascript
            {
                message: 'Un-disliked successful.',
                disliked_status: 0     // 0: not disliked, 1: disliked
            }
            ```

- `/tweet/fav`
    - Usage: When a user clicks the favorite button of a tweet, add this tweet's id to the favorite list of this user
    - post
    - Input: body:

        ```javascript
        {
            tweet_id: Num
            fav: Boolean // 1 if the favorite button of this tweet is light (already favourited);
                        // 0 if the favorite button of this tweet is grey (not favorited)
        }
        ```
    - Success output:
        - if not favorite before:

            ```javascript
            {
                message: 'favorited successful.',
                favorited_status: 1     // 0: not favorited, 1: favorited
            }
            ```
        - if favorite before:
            ```javascript
            {
                message: 'Un-favorited successful.',
                favorited_status: 0     // 0: not favorited, 1: favorited
            }
            ```

- `/tweet/getTweet/:userId`
    - Usage: Retrive tweet_ids of all tweets that a designated user posted
    - get
    - Success output:
        a list of tweet_ids in json format of the tweets that this user posted before 

- `/tweet/getFav/:userId`
    - Usage: Retrive tweet_ids of all tweets that a designated user favorited
       - get
       - Success output
           a list of tweet_ids in json format of the tweets that this user favorited before

- `/tweet/getTweetInfo`
    - Usage: Get all info of a tweet/retweet by providing its id. The attribute original is not null only if this is a retweet
    - post
    - Input: body:

        ```javascript
        {
            tweet_id: Num
        }
        ```
    - Success output:
        ```javascript
            {
                tweet_id: num,
                content: string,
                image: [{
                    data: buffer,
                    contentType: string
                }],
                time: date,
                user: num, // (i.e., user_id of the user who posted this tweet),
                like: array of user_ids,
                dislike: array of user_ids,
                privacy_state: boolean, // 0: seen by all, 1: seen by self
                original: null if this is not a retweet, else tweet_id of the master tweet,
                tag: string
            }
        ```

- `/tweet/deleteTweet`
    - Usage: Delete a tweet record from db given the its tweet_id
    - post
    - Input: body:

        ```javascript
        {
            tweet_id: Num
        }
        ```
    - Success output:
            ```javascript
            {
                message: 'Tweet successfully deleted'
            }
            ```

- `/tweet/createTweet`
    - Usage: Create a new tweet in the db
    - post
    - Input: 
       body:

        ```javascript
        {
                        content: string,
                        time: date,
                        user: num, // (i.e., user_id of the user who posts this tweet),
                        privacy_state: boolean, // 0 if everyone can see the tweet; 1 if only self can see the tweet
                        tag: string,
        }
        ```
       (optional depending on whether user has uploaded image(s)) files: an array, called 'pic', of objects, each being an image file
    - Success output:
    
            ```javascript
            {
                "Create tweet successfully"
            }
            ```
- `/tweet/createRetweet`
    - Usage: Create a new retweet in the db
    - post
    - Input: 
       body:

        ```javascript
        {
                        content: string,
                        time: date,
                        user: num //(i.e., user_id of the user who posts this tweet),
                        privacy_state: boolean, // 0 if everyone can see the tweet; 1 if only self can see the tweet
                        original: objectId, //(i.e., tweet_id)
                        tag: string,
        }
        ```
    - Success output:
    
            ```javascript
            {
                "Create retweet successfully"
            }
            ```



- `/follow/add/:followId`[^1][^2]

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

- `/follow/delete/:followId`[^1][^2]

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


- `/fan/delete/:fanId`[^1][^2]

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


- `/fan/fanList/:userId`

    - Usage: Return all account in the userId 's fans list

    - GET

    - Output:

        Successful output:

        ```javascript
        [
            {
                "user_id": 4,
                "username": 'Gavin',
                "follow_status": 2,
                "avatar": {
                    "contentType": 'image/vnd.microsoft.icon',
                    "data": {
                        "type": 'Buffer',
                        "data": [
                            0,
                            0
                        ]
                    }
                }
            },
            {
                "user_id": 1,
                'username': 'admin',
                'follow_status': 0,
                'avatar': {
                    'contentType': 'image/png',
                    'data': {
                        'type': 'Buffer',
                        'data': [
                            0,
                            0
                        ]
                    }
                }
            }
        ]
        ```

        ```javascript
        {
            "message": "He/She has no fan."
        }
        ```

        Failure output:

        ```javascript
        {
            "message": "User not found."
        }
        ```

        ````javascript
        {
            "message": "Fail to retrieve follow information."
        }
        ````

- `/fan/fansNum/:userId`


    - Usage: Return how many fans does userId has

    - GET

    - Output:

        Success output:

        ```javascript
        {
            "fansNum": 3
        }
        ```

- `/blacklist/add/:userId`

    - Usage: Add a user to the blacklist

    - GET

    - Output

        Success output: 
        
        ```javascript
        {
                    "message": "User added to blacklist successfully",
                    "blacklist": [
                    6,
                    5,
                    2
               ],
            "action_status": true
        },
        ```
        
        Failure output: 
        
        ```javascript
        {
                    "message": "User already in blacklist"
        }
        ```
        
        ```javascript
         {
                    "message": "User not found. Cannot add a non-existing user to the blacklist."
         }
        ```
        
        ```javascript
        {
                    "message": "Cannot add yourself to the blacklist"
        }
        ```


- `/blacklist/delete/:userId`
    - Usage: Delete a user from blacklist
    
    - GET
    
    - Output: 
    
        Success output:
    
        ```javascript
        {
            "message": "User with ID 2 removed from your blacklist.",
            "blacklist": [
                6,
                5
            ],
            "action_status": true
        }
        ```
    
        Failure output: 
    
        ```javascript
        {
            "message": "User is not in your blacklist."
        }
        ```
    
        ```javascript
        {
            "message": "You have no users in your blacklist."
        }
        ```

- `/blacklist/list`


    - Usage: Return all user in the blacklist

    - GET

    - Output:

        Success output: 

        ```javascript
        [
            {
                "user_id": 6,
                "username": "test",
                "avatar": {
                    "data": {
                        "type": "Buffer",
                        "data": [
                            0,
                            0,
                        ]
                    },
                    "contentType": "image/vnd.microsoft.icon"
                }
            }
        ]
        ```

        ```javascript
        {
            "message": "No user found in the blacklist."
        }
        ```

        Failure output:

        ```javascript
        {
            "message": "Failed to retrieve blacklist.."
        }
        ```

- `/admin/delete/:userId`


    - Usage: Delete a user

    - GET

    - Output:

        Success output:

        ```javascript
        {
            "message": "User removed successfully.",
            "action_status": true
        }
        ```

        Failure output:

        ```javascript
        {
            "message": "User not found."
        }
        ```

- `/admin/ban/:userId`


    - Usage: Ban a user

    - GET

    - Output:

        Success output: 

        ```javascript
        {
            "message": "User banned",
            "ban": true,
            "action_status": true
        }
        ```

        Failure output:

        ```javascript
        {
            "message": "User not found"
        }
        ```

- `/admin/unban/:userId`


    - Usage: Unban a user

    - GET

    - Output:

        Success output:

        ```javascript
        {
            "message": "User unbanned",
            "ban": false,
            "action_status": true
        }
        ```

        Failure output:

        ```javascript
        {
            "message": "User not found"
        }
        ```

        



## To Do

[^1]: action_status
[^2]: Delete something in output
