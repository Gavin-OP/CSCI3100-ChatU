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

#### `/tweet/like/:tweetId`

- Usage: When the like button of a tweet is grey and a user clicks it, add the user's id to the like list of this tweet
- GET
- Use scenario: 
    - like button in tweetcards and retweetcards at homepage, tweet search result under homepage, /personal/tweet page, /personal/fav page; 
    - like button in tweet detail page and retweet detail page
- Input: a int-type var named tweetId, which is the id of the tweet for which the user clicks the like button 
- Output:
    Success output
    ```javascript
    {
        "message": 'like successful.',
        "action_status": true // this boolean being true indicates that the user_id of this user has been added to the array
                              // stored in the the 'like' attribute of this tweet
                              // If you clicks the like button when the dislike button is light, the 'true' value here indicates
                              //that this user is removed from the dislike list and then added to the like list of this tweet
    
    }
    ```

#### `/tweet/unlike/:tweetId`

- Usage: When the like button of a tweet is light and a user clicks it, remove the user's id from the like list of this tweet
- GET
- Use scenario: 
    - like button in tweetcards and retweetcards at homepage, tweet search result under homepage, /personal/tweet page, /personal/fav page 
    - like button in tweet detail page and retweet detail page
- Input: a int-type var named tweetId, which is the id of the tweet for which the user clicks the dislike button
- Output:
    Success output:
    ```javascript
    {
        "message": "unlike successful.",
        "action_status": true //if the user clicks the like button again after s/he likes it, this 
                              //boolean being true means that this user's id has now been removed from the like list of this tweet
                              //(successful unlike the tweet)
    }
    ```

#### `/tweet/dislike/:tweetId`

- Usage: When the dislike button of a tweet is grey and a user clicks it, add the user's id to the dislike list of this tweet
- GET
- Use scenario: 
    - dislike button in tweetcards and retweetcards at homepage, tweet search result under homepage, /personal/tweet page, /personal/fav page; 
    - dislike button in tweet detail page and retweet detail page
- Input: a int-type var named tweetId, which is the id of the tweet for which the user clicks the dislike button
- Output:
    Success output:
    ```javascript
    {
        "message": "dislike successful.",
        "action_status": true // this boolean being true indicates that the user_id of this user has been added to the array
                              // stored in the the 'dislike' attribute of this tweet
                              // If you clicks the dislike button when the like button is light, the 'true' value here indicates
                              //that this user is removed from the like list and then added to the dislike list of this tweet
    }
    ```

#### `tweet/undislike/:tweetId`

- Usage: When the dislike button of a tweet is light and a user clicks it, remove the user's id from the dislike list of this tweet
- GET
- Use scenario: 
    - dislike button in tweetcards and retweetcards at homepage, tweet search result under homepage, /personal/tweet page, /personal/fav page; 
    - dislike button in tweet detail page and retweet detail page
- Input: a int-type var named tweetId, which is the id of the tweet for which the user clicks the dislike button
- Output:
    Success output:
    ```javascript
    {
        "message": "undislike successful.",
        "action_status": true //if the user clicks the dislike button again after s/he dislikes it, this 
                              //boolean being true means that this user's id has now been removed from the dislike list of this tweet
                              //(successful undislike the tweet)
    }
    ```

#### `/tweet/getTweet/:tweetId`

- Usage: Get all info of a tweet/retweet by providing its id. The attribute 'original' is not null only if this is a retweet
- GET
- Use scenario: 
    - display content of tweet in tweet detail page
    - display content of retweet in retweet detail page 
    - display partial content of tweet searched under admin/tweet
    - display partial content of tweet search result under homepage
    - disply partial content of tweet in tweetcards and retweetcards at homepage, personal/tweet page, personal fav page  
- Input: a int-type var named tweetId, which is the id of the tweet that someone wants to get all info for
- Output:
    Success output: 
    ```javascript
    {
        "message": "retrieve tweet information successful.",
        "action_status": true, //indicate successfully find all info of the designated tweet
        "tweet": {
            "_id": "642d92af9b16dba5a33c7109", //objectId set by the system (will not be directly used by us)
            "tweet_id": 1, //our id created for this tweet
            "content": "This is the first tweet of ChatU", //a string storing all text content of this tweet
            "user": "5", // user_id of the user who posted this tweet
            "original": -1, //if this is a retweet, then 'original' is the id of its master tweet; if 'original' === -1, then 
                            //this tweet is not a retweet
            "privacy_state": false, // false: this tweet can be seen by everyone; true: this tweet can only be seen by the user 
                                    // who posted this tweet
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
            "like": [], //an array that contains user ids of all users who currently like this tweet
            "dislike": [], //an array that contains user ids of all users who currently dislike this tweet
            "tag": "life", //the tag that creator of this tweet selects
            "time": "2023-04-05T15:24:32.000Z", //time that this tweet is posted
            "__v": 14  // an attribute used by Mongodb only, so can ignore it
        }
    }
    ```

#### `/tweet/delete/:tweetId`

- Usage: given tweet_id, delete this tweet's record from db and from the list of tweets thay the tweet creator posted
- GET
- Use scenario: delete tweet under admin/tweet page and personal/tweet page
- Input: the id of the tweet to delete
- Output:
    Success output:
    ```javascript
    {
        "message": "Tweet successfully deleted",
        "action_status": true // a boolean indicating whether the tweet record is removed from db and from
                              // the list of tweets that the creator of this tweet posted 
    }
    ```

#### `/tweet/create`
- Usage: Create a new tweet in the db
- POST
- Use scenario: create a tweet in the /post page
- Input: 
    ```javascript
    {
                    content: string, // a string object containing the whole text content of the new tweet
                    image: image, //this means the 'name' attribute of the '<input type="file" name="image" >...</input >' should be 'image'. See https://expressjs.com/en/resources/middleware/multer.html for example
                                 // if no image(s) uploaded, the 'image' file here should be of null type
                    privacy_state: boolean, // false if everyone can see the tweet; true if only self can see the tweet
                    tag: string, // the string storing the tag name that the user selects for the tweet 
    }
    ```
- Output:
    Success output:
    ```javascript
        {
            message: 'Create tweet successfully',
            action_status: true //this means the record of new tweet is now added to the db,
                                //and the tweet_id of the new tweet is added to the array stored in the 'tweet' attribute of this user
                                //(check out the 'tweet' attribute in userSchema.js)
        }
    ```
    Failure output: 
    ```javascript
    {
        "message": "Fail to save the new tweet. Backend Error."
    }
    ```

#### `/tweet/retweet`

- Usage: Create a new retweet in the db
- POST
- Use scenario: create a retweet in the /retweet page
- Input:
    ```javascript
    {
                    content: string, // a string containing the whole text content of this new retweet
                    user: userId, // the id of the user who posts this retweet
                    privacy_state: boolean, // 0 if everyone can see the tweet; 1 if only self can see the tweet
                    original: num, //(i.e., the id of the master tweet of this retweet)
                    tag: string, //the string containing the tag of this retweet
    }
    ```
- Output:
    Success output:
    ```javascript
    {
        "message": "Create retweet successfully",
        "action_status": true //this means the record of new retweet is now added to the db,
                                //and the tweet_id of the new retweet is added to the array stored in the 'tweet' attribute of this user
                                //(check out the 'tweet' attribute in userSchema.js)
    }
    ```

#### `/tweet/tweetNum/:userId`

- Usage: Return how many tweet or retweet a user has posted.
- GET
- Use scenario: display the num of tweets the logged-in user had posted before in the /personal/tweet and /personal/fav pages
- Input: the id of the user whom you want to query about the num of tweets s/he posts
- Output:
  Success output:
  ```javascript
  {
      "message": "retrieve tweet number successful.",
      "action_status": true, //indicate the retrieval of num of tweets sent by the given user is successful
      "tweetNum": 3 //num of tweets or retweet that this user posts
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

#### `/user/authorizationCheck`

- Usage: Check whether user is authorized to visit pages other than `/home` and `login`
- GET
- Output:
  Success output:
  ```javascript
  {
      "message": "Authorized",
      "authorized": true
  }
  ```
  Failure output:
  ``` javascript
  {
      "message": "Unauthorized",
      "authorized": false
  }
  ```
  ```javascript
  {
      "message": "Server error",
      "authorized": false
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

#### `/admin/commentList`

- Usage: Retrieve all comment
- GET
- Output: 
  Success output:
  ```javascript
  [
      {
          "_id": "642ff774599d0466ffa03596",
          "comment_id": 3,
          "tweet_id": 10,
          "user_id": 4,
          "content": "Me too",
          "time": "2023-04-07T10:59:00.306Z",
          "__v": 0
      },
      {
          "_id": "642ff753eeab3c781648aec8",
          "comment_id": 2,
          "tweet_id": 2,
          "user_id": 4,
          "content": "Thanks",
          "time": "2023-04-07T10:58:27.374Z",
          "__v": 0
      },
      {
          "_id": "642ff6b324232c87aac43395",
          "comment_id": 1,
          "tweet_id": 1,
          "user_id": 4,
          "content": "Congrats",
          "time": "2023-04-07T10:55:47.276Z",
          "__v": 0
      }
  ]
  ```

#### `/favorite/add/:tweetId`

- Usage: Add favorite
- GET
- Output:
  Success output:
  ```javascript
  {
      "message": "Add tweet to favorite list successfully",
      "favoriteList": [
          1,
          4,
          2
      ]
  }
  ```
  Failure output:
  ```javascript
  {
      "message": "TweetId not found. Can not add a non-existing tweet to the favorite list."
  }
  ```

#### `/admin/userList`

- Usage: Return all user
- GET
- Output:
  Success output:
  ```javascript
  [
      {
          "user_id": 1,
          "username": "admin",
          "email": "admin",
          "ban": true
      },
      {
          "user_id": 2,
          "username": "Gavin",
          "email": "Gavin",
          "ban": false
      }
  ]
  ```

#### `/favorite/delete/:tweetId`

- Usage: Delete favorite
- GET
- Output:
  Success output:
  ```javascript
  {
      "message": "Delete tweet from favorite list successfully",
      "favoriteList": [
          4,
          2
      ]
  }
  ```
  Failure output: 
  ```javascript
  {
      "message": "TweetId not found. Can not delete a non-existing tweet from the favorite list."
  }
  ```

#### `/favorite/favoriteList`

- Usage: Return all the tweets in user's favorite list
- GET
- Output:
  Success output:
  ```javascript
  [{
      _id: '642e248cb446c27b32a27d45',
      tweet_id: 6,
      content: 'I am a fish',
      user: '8',
      original: -1,
      privacy_state: false,
      image: [ [Object] ],
      like: [],
      dislike: [],
      tag: '',
      time: '2023-04-06T01:46:52.750Z',
      __v: 0
    },
    {
      tweet_id: 8,
      content: 'Wow first tweet',
      user: '8',
      time: '2023-04-06T02:57:04.283Z',
      privacy_state: false,
      like: [],
      dislike: [],
      tag: undefined,
      original: {
        _id: '642e2294ea526c54c9831856',
        tweet_id: 1,
        content: 'This is the first tweet of ChatU',
        user: '2',
        original: -1,
        privacy_state: false,
        image: [Array],
        like: [Array],
        dislike: [],
        tag: 'life',
        time: '2023-04-06T01:38:28.052Z',
        __v: 1
      }
    }
  ]
  ```

#### ` /personal/tweet/:userId`

- Usage: return all tweet a user post
- GET
- Output:
  Success output:
  ```javascript
  {
      "message": "No tweet found."
  }
  ```
  ```javascript
  [
    {
      _id: '642e22a6ea526c54c983185c',
      tweet_id: 2,
      content: 'Welcome to ChatU',
      user: '2',
      original: -1,
      privacy_state: false,
      image: [ [Object] ],
      like: [],
      dislike: [],
      tag: 'chat',
      time: '2023-04-06T01:38:46.523Z',
      __v: 0
    },
    {
      tweet_id: 8,
      content: 'Wow first tweet',
      user: '8',
      time: '2023-04-06T02:57:04.283Z',
      privacy_state: false,
      like: [],
      dislike: [],
      tag: undefined,
      original: {
        _id: '642e2294ea526c54c9831856',
        tweet_id: 1,
        content: 'This is the first tweet of ChatU',
        user: '2',
        original: -1,
        privacy_state: false,
        image: [Array],
        like: [Array],
        dislike: [],
        tag: 'life',
        time: '2023-04-06T01:38:28.052Z',
        __v: 1
      }
    }
  ]
  ```

#### `/home/tweet`

- Usage: Return all tweet by time, admin page can also use this. 
- GET
- Output:
  Success output:
  ```javascript
  [
    {
      tweet_id: 8,
      content: 'Wow first tweet',
      user: '8',
      time: '2023-04-06T02:57:04.283Z',
      privacy_state: false,
      like: [],
      dislike: [],
      tag: undefined,
      original: {
        _id: '642e2294ea526c54c9831856',
        tweet_id: 1,
        content: 'This is the first tweet of ChatU',
        user: '2',
        original: -1,
        privacy_state: false,
        image: [Array],
        like: [Array],
        dislike: [],
        tag: 'life',
        time: '2023-04-06T01:38:28.052Z',
        __v: 1
      }
    },
    {
      _id: '642e2294ea526c54c9831856',
      tweet_id: 1,
      content: 'This is the first tweet of ChatU',
      user: '2',
      original: -1,
      privacy_state: false,
      image: [ [Object] ],
      like: [ 8 ],
      dislike: [],
      tag: 'life',
      time: '2023-04-06T01:38:28.052Z',
      __v: 1
    }
  ]
  ```

#### `/home/tweetIdList`

- Usage: Return all tweetId
- GET
- Output:
  Success output:
  ```javascript
  {
      "tweetId": [
          14,
          13,
          12,
          11,
          10,
          9,
          8,
          7,
          6,
          5,
          4,
          3,
          2,
          1
      ]
  }
  ```

  

#### `/comment/create`

- Usage: Create a comment
- POST
- Input:
  ```javascript
  {
      tweet_id: Num,
      content: Str,
  }
  ```
- Output:
  Success output:
  ```javascript
  {
      "message": "Comment created.",
      "action_status": true
  }
  ```


#### `/comment/delete/:commentId`

- Usage: Delete comment
- GET
- Output:
  Success output:
  ```javascript
  {
      "message": "Comment removed successfully.",
      "action_status": true
  }
  ```

#### `/comment/commentList/:tweetId`

- Usage: Retrieve all comments in one tweet
- GET
- Output:
  Success output:
  ```javascript
  [
      {
          "_id": "642f7b366f150ab76c069670",
          "comment_id": 3,
          "tweet_id": 1,
          "user_id": 3,
          "content": "comgrats",
          "time": "2023-04-07T02:08:54.610Z",
          "__v": 0
      },
      {
          "_id": "642f7ae76f150ab76c069663",
          "comment_id": 2,
          "tweet_id": 1,
          "user_id": 2,
          "content": "Congrats",
          "time": "2023-04-07T02:07:35.315Z",
          "__v": 0
      },
      {
          "_id": "642f7ad56f150ab76c06965e",
          "comment_id": 1,
          "tweet_id": 1,
          "user_id": 1,
          "content": "Congrats",
          "time": "2023-04-07T02:07:17.419Z",
          "__v": 0
      }
  ]
  ```



## To Do

1. 用keyword搜索user/tweet/comment，可以分进search
2. recommend user to follow on homepage，可以分进reccomendation
3. 一个精简版的getUser, 用user id 去get user name和avatar（这样tweet card, view tweet, comment, following/fan/ban list等等都可以用这个精简版getUser
4. (!!!重要，用于tweet recommedation) 给定user id和tag (type: string),将此用户喜欢的tag设为input的tag，可以分进setting
5. tweet reccommendation on homepage, 可以分进reccomendation
6. get list of tweet ids of tweets posted by all following users (用于首页的tweet 推送)  
4. 给定user id,修改用户名，可以分进setting
5. 给定user id,修改个人介绍，可以分进setting
6. 给定user id,修改email，可以分进setting
7. 给定user id,修改password，可以分进setting


[^1]: action_status
[^2]: Delete something in output
