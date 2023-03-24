# CSCI3100-ChatU

<img src="frontend\public\logo_colorful.png" alt="ChatU" style="zoom:25%;" />

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

A social media application to post, view tweets, follow others, and engage in real-time chat with other users. 

## Table of Contents
- [Install](https://github.com/Gavin-OP/CSCI3100-ChatU/blob/main/README.md#install)) 
- [Usage](https://github.com/Gavin-OP/CSCI3100-ChatU/blob/main/README.md#usage)  
- [Frontend Module Design](https://github.com/Gavin-OP/CSCI3100-ChatU/blob/main/README.md#frontend-module-design)  
- [To Do](https://github.com/Gavin-OP/CSCI3100-ChatU/blob/main/README.md#to-do)  
- [Reference](https://github.com/Gavin-OP/CSCI3100-ChatU/blob/main/README.md#reference)  
- [Contributing](https://github.com/Gavin-OP/CSCI3100-ChatU/blob/main/README.md#contributing)  
- [License](https://github.com/Gavin-OP/CSCI3100-ChatU/blob/main/README.md#license)  

## Install

1. Download [Node.js](https://nodejs.org/en/download) and [Git](https://git-scm.com/downloads)
2. Open terminal and go to the directory where you want to install the project. 
3. Type `git clone https://github.com/Gavin-OP/CSCI3100-ChatU.git` in the terminal. 

## Usage

- Open terminal under the project folder `./CSCI3100-ChatU/`. 

---

### Front-end

- `cd frontend`: Go to the frontend folder.  
- `npm install`: Install all the dependencies. 
- `npm start`: Start the frontend.
- Go to the web browser, access the web app in localhost port 3000: [http://localhost:3000/](http://localhost:3000/)  

> Note: Frontend is connected to backend by setting the proxy in the the file `./frontend/package.json` with "http://localhost:5000". If presented in a public IP, this proxy link need to be updated to [{public IP}:5000]()

---

### Back-end

- `cd backend`: Go to the backend folder.

- `npm install`: Install all dependencies. 

- `npx nodemon server.js`: Start the backend server, connect to mongoDB

- Go to the web browser, server can be accessed in localhost port 5000: [http://localhost:5000/](http://localhost:5000/)

---

- `Ctrl`+`c`: Shutdown backend  

## Frontend Module Design

> Recommend reading: CSCI2720 chapter 6, 9  
> The number of ⭐ represents the difficulty of the module.   
1. Header
   - Features: logo, navigation bar, avatar, dropdown
   - People in Charge: OP
   - Difficulty: ⭐
   - Versions: 
     - Login page header
     - User page header
     - Admin page header  
   - Usage
      1. write `import { NavigationBar } from './Navbar.js';` at the beginning of the file to import the Header module
      2. write `<NavigationBar page='login' />`, `<NavigationBar page='user' />`, `<NavigationBar page='admin' />` like a basic HTML element in the return part. The codes are for login, user, and admin respectively.  
  
2. Tweet Card
   - Features: Poster info, follow button, tweet ID, contents with or without photo, action buttons including like, dislike, favorite, comment, and share with color display, toggle comment input place. 
   - People in Charge: OP
   - Difficulty: ⭐⭐
   - Usage
   
     1. write `import { TweetCard } from './TweetCard'` at the beginning of the file to import the Tweet Card module
   
     2. Store JSON data to `tweet_data`, data structure should be stored like below
   
        ```javascript
        const tweet_data = {
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
        };
        ```
        
     3. write `<TweetCard {...tweet_data} />` like a basic HTML element in the return part. 
   - Required JSON data from the server should be the structure below
   
     ```javascript
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
     }
     ```
   
3. Retweet Card
   - Features: 
   - People in Charge: OP
   - Difficulty: ⭐




👍2 login, register  central components (LZX).    
👍<3 admin tweet page : search bar, result box (LZX).   
4 admin user page : search bar, result box.   
5 admin comment: search bar, result box>.       

#SearchBar component usage:   
'''Javascript
import "./SearchBar.js"
#In where you want to apply:
<SearchBar page="(you can add your wanted SBar in SearchBar.js file )"/>
'''   
    
👍8 refresh and user recommendation box (LZX)	  


👍👍10 post tweet page (GZH).    
👍👍11 tweet detail and retweet detail (GZH).    


👍👍9  home page basic UI: search bar, page structure (DHP).    
👍👍13 personal page structure and information detail (import card)  (DHP).    

👍12 setting (TYF).     
👍14 following, fans and black list page (TYF)   
👍15 (opt) message box contact list (TYF).    
👍16 (opt) message box. (TYF).   

## To do

1. admin user ban

## Reference

[JavaScript 图片压缩参考](https://github.com/wuwhs/js-image-compressor/blob/master/README-CN.md)  
[Lazy load Reference](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading)  
[Git Book](https://git-scm.com/book/en/v2)
[css reference](https://css-tricks.com/lets-look-50-interesting-css-properties-values/#all)

## Contributing

PRs and [issues](https://github.com/Gavin-OP/CSCI3100-ChatU/issues) gladly accepted!

## License

`UNLICENSED`

