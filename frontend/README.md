# ChatU Frontend Specification

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of Content
- [Frontend Router Design](https://github.com/Gavin-OP/CSCI3100-ChatU/main/frontend/README.md#frontend-router-design)
- [Frontend Module Design]()

## Frontend Router Design

- `/login`: Login page
- `/signup`: Sign up page
- `/admin/tweet`: Admin tweet management page
- `/admin/user`: Admin user management page
- `/admin/comment`: Admin comment management page
- `/home`: Home page
- `/personal/tweet`: Show the tweet the user posted in the past
- `/personal/fav`: Show the tweet in the user's favorite
- `/personal/following`: Show the like which the user is currently following
- `/personal/fans`: Show the fans of the user
- `/personal/blacklist`: Show blacklist of the user
- `/post`: Page to edit and post tweet
- `/retweet`: Page to retweet a tweet
- `/tweet`: Tweet detail page
- `/*`: Under development or no match for the URL

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

4. Search Bar
   - Features: 
   - People in Charge: LZX
   - Difficulty: ⭐
   - Usage: 
     1. write `import { SearchBar } from './SearchBar';` at the beginning of the file to import the module
     2. write `<SearchBar page={'homepage'} />`, `<SearchBar page={'tweet'} />`, `<SearchBar page={'user'} />`, `<SearchBar page={'comment'} />` like a basic HTML element in the return part. The codes are for homepage, admin-tweet, admin-user, and admin-comment respectively
     3. add whatever your wanted in SearchBar.js file

5. Post Tweet Page
   - Features: Text area for text content, tag selection, file uploading, privacy.
   - People in Charge: GZH
   - Difficulty: ⭐⭐
   - Versions: 
     - Normal post page (allows pictures uploading)
     - Retweet post page (Uses `<TweetCard />` component)     
   - Usage: Just use `<Post  />`

6. Tweet Detail and Retweet Detail    
      - Features: Tweet content display, comment input, comments display.
      - People in Charge: GZH
      - Difficulty: ⭐⭐
      - Note: 
        - Since we don't have a limit for the number of pictures now, we should set this limit to 2 or 3 in future.
        - Normal post doesn't have tweet_data, retweet post doesn't have imageSrc.
      - Usage: Just use `<Tweetpage />`. No input now, we may use `<Tweetpage file={file}} />` later (need to change the file).
         ```javascript
        let test_file = {
           username: 'David',
           avatar: "./avatar2.png",
           time: '2023-3-7 0:04',
           tweetId: 9978,
           content: "A test twitter: aobtb abyaaotbaotbao btap tnap tpiabt pabtapit bata tat ",
           favos: 2,
           likes: 9,
           comments: [{user:'user1', avatar:"./avatar.png", content:'Comment 1', time:'2023-3-21 19:00'},
           {user:'uagoab', avatar:"./avatar2.png", content:'anoaotiba', time:'2023-3-22 11:40'},
           {user:'CSCI3100', avatar:"./avatar.png", content:'Good job', time:'2023-3-22 14:38'}],
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
         ```

  

👍2 login, register  central components (LZX).    
👍<3 admin tweet page : search bar, result box (LZX).   
4 admin user page : search bar, result box.   
5 admin comment: search bar, result box>.       


👍8 refresh and user recommendation box (LZX)	  

👍9  home page basic UI: search bar, page structure (DHP).    
👍👍13 personal page structure and information detail (import card)  (DHP).    

👍12 setting (TYF).     
👍14 following, fans and black list page (TYF)   
👍15 (opt) message box contact list (TYF).    
👍16 (opt) message box. (TYF).   


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
