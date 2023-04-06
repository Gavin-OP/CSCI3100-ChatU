# ChatU Backend Specification

Backend is constructed by NodeJS and Express with MongoDB as the database.  

## Table of Content

- [Backend Router Design](https://github.com/Gavin-OP/CSCI3100-ChatU/blob/main/backend/README.md#backend-router-design)
- [To Do](https://github.com/Gavin-OP/CSCI3100-ChatU/blob/main/backend/README.md#to-do)

## Backend Router Design

#### `/feedback/retrieve/:feedbackId`

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

#### `/feedback/create`

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

#### `/user/getUser/:userId`

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

#### `/user/signUp`

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

#### `/user/login`

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

#### `/user/logout`[^1]

- Usage: Logout and clear cookies

- POST

- Output:
    ```javascript
    {
        "message": "Logout successful"
    }
    ```

#### `/tweet/like/:tweetId`

- Usage: When a user clicks the like button of a tweet, add the user's id to the like list of this tweet

- GET

- Output:
  
    Success output
    ```javascript
    {
        "message": "like successful.",
        "action_status": true
    }
    ```

#### `/tweet/unlike/:tweetId`

- Usage: unlike a tweet

- GET

- Output:

    Success output:

    ```javascript
    {
        "message": "unlike successful.",
        "action_status": true
    }
    ```

#### `/tweet/dislike/:tweetId`

- Usage: When a user clicks the dislike button of a tweet, add the user's id to the dislike list of this tweet

- GET

- Output:
  
    Success output:
    ```javascript
    {
        "message": "dislike successful.",
        "action_status": true
    }
    ```

#### `tweet/undislike/:tweetId`

- Usage: Undislike a tweet.

- GET

- Output:

    Success output:

    ```javascript
    {
        "message": "undislike successful.",
        "action_status": true
    }
    ```

#### `/tweet/getTweet/:tweetId`

- Usage: Get all info of a tweet/retweet by providing its id. The attribute original is not null only if this is a retweet

- GET

- Output:
  
    Success output: 
    
    ```javascript
    {
        "message": "retrieve tweet information successful.",
        "action_status": true,
        "tweet": {
            "_id": "642d92af9b16dba5a33c7109",
            "tweet_id": 1,
            "content": "This is the first tweet of ChatU",
            "user": "5",
            "original": -1,
            "privacy_state": false,
            "image": [
                {
                    "data": {
                        "type": "Buffer",
                        "data": [
                            137,
                            80,
                        ]
                    },
                    "contentType": "image/png",
                    "_id": "642d92af9b16dba5a33c710b"
                }
            ],
            "like": [],
            "dislike": [],
            "tag": "life",
            "time": "2023-04-05T15:24:32.000Z",
            "__v": 14
        }
    }
    ```

#### `/tweet/delete/:tweetId`

- Usage: Delete a tweet record from db given the its tweet_id

- GET

- Output:

    Success output:

    ```javascript
    {
        "message": "Tweet successfully deleted",
        "action_status": true
    }
    ```

#### `/tweet/create`

- Usage: Create a new tweet in the db
- POST
- Input: 
  
    ```javascript
    {
                    content: string,
                    image: files,
                    privacy_state: boolean, // false if everyone can see the tweet; true if only self can see the tweet
                    tag: string,
    }
    ```
- Output:

    Success output:
    
        {
            "message": "Create tweet successfully",
            "action_status": true
        }
    
    Failure output: 
    
    ```javascript
    {
        "message": "Fail to save the new tweet."
    }
    ```

#### `/tweet/retweet`

- Usage: Create a new retweet in the db
- POST
- Input:
  
    ```javascript
    {
                    content: string,
                    privacy_state: boolean, // 0 if everyone can see the tweet; 1 if only self can see the tweet
                    original: num, //(i.e., tweet_id)
                    tag: string,
    }
    ```
- Output:

    Success output:
    
    ```javascript
    {
        "message": "Create retweet successfully",
        "action_status": true
    }
    ```

#### `/tweet/tweetNum/:userId`

- Usage: Return how many tweet a user has posted.

- GET

- Output:

  Success output:

  ```javascript
  {
      "message": "retrieve tweet number successful.",
      "action_status": true,
      "tweetNum": 3
  }
  ```

#### `/follow/add/:followId`[^1][^2]

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

#### `/follow/delete/:followId`[^1][^2]

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

#### `/follow/followList/:userId`

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

#### `/follow/followNum/:userId`

- Usage: Return how many user the userId follows

- GET

- Output:

    Success output:

    ```javascript
    {
        "message": "User with ID 3 is following 3 users.",
        "following_count": 3
    }
    ```

    Failure output:

    ```javascript
    {
        "message": "User with ID 12 not found."
    }
    ```

#### `/fan/delete/:fanId`[^1][^2]

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

#### `/fan/fanList/:userId`

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

#### `/fan/fansNum/:userId`


- Usage: Return how many fans does userId has

- GET

- Output:

    Success output:

    ```javascript
    {
        "fansNum": 3
    }
    ```


#### `/blacklist/add/:userId`

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

#### `/blacklist/delete/:userId`

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

#### `/blacklist/list`


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

#### `/admin/deleteUser/:userId`


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

#### `/admin/ban/:userId`


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

#### `/admin/unban/:userId`


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


#### `/admin/deleteTweet/:tweetId/:userId`

- Usage: Delete a tweet by admin

- GET

- Output:

  Success output:

  ```javascript
  {
      "message": "Tweet removed successfully.",
      "action_status": true
  }
  ```

  


## To Do
1. 用keyword搜索user，可以分进search
2. recommend user to follow相关的，可以分进recomendation
3. 一个精简版的getUser, 用user id 去get user name和avatar（这样tweet card, view tweet, comment, following/fan/ban list等等都可以用这个精简版getUser
4. 给定user id,修改用户名或者修改个人介绍，可以分进setting


[^1]: action_status
[^2]: Delete something in output
