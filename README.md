# CSCI3100-ChatU
## Front-end Start Command  

1. Download NodeJS
1. Open Command Line under the project folder. 
1. `cd frontend`: Go to the frontend folder.  
2. `npm install`: Install all the dependencies, including packages: `react`, `react-router-dom`, `bootstrap`, `body-parser`, `mdb-react-ui-kit`, `react-google-maps`, etc. 
3. `npm start`: Start the frontend.
4. Go to the web browser, access the web app in localhost port 3000: [http://localhost:3000/](http://localhost:3000/)  
5. `Ctrl`+`c`: Shutdown frontend  
> Note: Frontend is connected to backend by setting the proxy in the the file "/frontend/package.json" with "http://localhost:5000". If presented in a public IP, this proxy link need to be updated to {public IP}:5000

## Back-end Start Command

1. Download NodeJS
2. Open Command Line under the project folder. 
3. `cd backend`: Go to the backend folder.
4. `npm install`: Install all dependencies, including packages: `express`, `nodemon`, `mongoose`, `xml2json-light`, `cors`, `express-session`, `cookie-parser`, etc. 
5. `npx nodemon server.js`: Start the backend server, connect to mongoDB
6. Go to the web browser, server can be accessed in localhost port 5000: [http://localhost:5000/](http://localhost:5000/)
7. `Ctrl`+`c`: Shutdown backend  

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
      1. write `import { NavigationBar } from './Navbar.js';` at the begining of the file to import the header module
      2. write `<NavigationBar page='login' />`, `<NavigationBar page='user' />`, `<NavigationBar page='admin' />` like a basic HTML element in the return part. The codes are for login, user, and admin respectively.  
  
2. Tweet Card
   - Features: comment 
   - People in Charge: OP
   - Difficulty: ⭐⭐



3. Retweet Card
   - Features: 
   - People in Charge: OP
   - Difficulty: ⭐




👍2 login, register  central components (LZX).    
👍<3 admin tweet page : search bar, result box (LZX).   
4 admin user page : search bar, result box.   
5 admin comment: search bar, result box>.   
👍8 refresh and user recommendation box (LZX)	  


👍👍10 post tweet page (GZH).    
👍👍11 tweet detail and retweet detail (GZH).    


👍👍9  home page basic UI: search bar, page structure (DHP).    
👍👍13 personal page structure and information detail (import card)  (DHP).    


👍12 setting (TYF).     
👍14 following, fans and black list page (TYF)   
👍15 (opt) message box contact list (TYF).    
👍16 (opt) message box. (TYF).   



## Reference

[JavaScript 图片压缩参考](https://github.com/wuwhs/js-image-compressor/blob/master/README-CN.md)  
[Lazy load Reference](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading)  
[Git Book](https://git-scm.com/book/en/v2)
[css reference](https://css-tricks.com/lets-look-50-interesting-css-properties-values/#all)
