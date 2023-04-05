// general
// API: `/getUser/:userId`, GET
res.send([
    {
        avatar: './avatar.png',
        username: "User1",
    }
])
{
    "message": "User added to blacklist successfully",
        "blacklist": [
            6,
            5,
            2
        ],
            "action_status": true
}
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

// /login
// API: `/login`, POST
input = {
    username: XXX,
    password: XXX
}
res.send({}
    login_status: 1 / 0,  //1: success, 0: fail
    cookie: 'xxxxxxx'
})

// API: `/signUp` POST
input = {
    username: XXX,
    email: xxxxxx.com,
    password: XXX
}
res.send({}
    login_status: 1 / 0,  //1: success, 0: fail
    cookie: 'xxxxxxx'   // userID is in the cookie
})


// API: `/logOut` GET
res.send({
    clearcooki: ''
})






// /home
// API: `/homeTweet/:userID`, GET
res.send([
    {
        avatarUrl: './avatar.png',
        username: 'Gavin OP',
        tweetId: '100056',
        likeStatus: 1,
        dislikeStatus: 0,
        starStatus: 1,
        likeCount: 49,
        starCount: 32,
        commentCount: 4,
        followStatus: 'Following',
        imageSrc: '/tweet_card_pic_1.jpg',
        tweetText: 'This is a tweet.',
    },
    {
        avatarUrl: './avatar.png',
        username: 'Gavin OP',
        tweetId: '100056',
        likeStatus: 1,
        dislikeStatus: 0,
        starStatus: 1,
        likeCount: 49,
        starCount: 32,
        commentCount: 4,
        followStatus: 'Following',
        imageSrc: '/tweet_card_pic_1.jpg',
        tweetText: 'This is a tweet.',
    },
    {
        username: 'David',
        avatar: "./avatar2.png",
        time: '2023-3-7 0:04',
        tweetId: 9978,
        content: "A test twitter: aobtb abyaaotbaotbao btap tnap tpiabt pabtapit bata tat ",
        favos: 2,
        likes: 9,
        comments: [{ user: 'user1', avatar: "./avatar.png", content: 'Comment 1', time: '2023-3-21 19:00' },
        { user: 'uagoab', avatar: "./avatar2.png", content: 'anoaotiba', time: '2023-3-22 11:40' },
        { user: 'CSCI3100', avatar: "./avatar.png", content: 'Good job', time: '2023-3-22 14:38' }],
        likeStatus: 0,
        favorStatus: 0,
        followStatus: 'Following',
        //imageSrc: ['/tweet_card_pic_1.jpg'],
        tweet_data: {
            avatarUrl: './avatar.png',
            username: 'Gavin OP',
            tweetId: '100056',
            likeStatus: 1,
            dislikeStatus: 0,
            starStatus: 1,
            likeCount: 49,
            starCount: 32,
            commentCount: 4,
            followStatus: 'Following',
            // imageSrc: '/tweet_card_pic_1.jpg',
            tweetText: 'dfasdfanibh massa blandit orci, eget ultricies turpis lorem ut nulla.',
        }
    }
])

// API: `/userRecommendation/:userID`, GET
res.send([
    {
        icon: './avatar.png',
        name: "User1",
        signature: "?????123123123123123123123123?what is the project????"
    },
    {
        icon: './avatar.png',
        name: "User1",
        signature: "?????123123123123123123123123?what is the project????"
    }
])


// API: `/home/:keyword`, GET
res.send([
    {
        avatarUrl: './avatar.png',
        username: 'Gavin OP',
        tweetId: '100056',  // if === '', then no result
        likeStatus: 1,
        dislikeStatus: 0,
        starStatus: 1,
        likeCount: 49,
        starCount: 32,
        commentCount: 4,
        followStatus: 'Following',
        imageSrc: '/tweet_card_pic_1.jpg',
        tweetText: 'This is a tweet.',
    },
])
























