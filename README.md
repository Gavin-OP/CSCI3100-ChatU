# CSCI3100-ChatU
## Front-end Start Command  

1. Download NodeJS
1. Open Command Line under the project folder. 
1. `cd frontend`: Go to the frontend folder.  
2. `npm install`: Install all the dependencies, including packages: `react`, `bootstrap`, `body-parser`, `mdb-react-ui-kit`, `react-google-maps`, etc. 
3. `npm start`: Start the frontend.
4. Go to the web browser, access the web app in localhost port 3000: [http://localhost:3000/](http://localhost:3000/)  
5. `Ctrl`+`c`: Shutdown frontend  
> Note: Frontend is connected to backend by setting the proxy in the the file "/frontend/package.json" with "http://localhost:5000". If presented in a public IP, this proxy link need to be updated to {public IP}:5000

## Back-end Start Command

1. Download NodeJS
1. Open Command Line under the project folder. 
1. `cd backend`: Go to the backend folder.
2. `npm install`: Install all dependencies, including packages: `express`, `nodemon`, `mongoose`, `xml2json-light`, `cors`, `express-session`, `cookie-parser`, etc. 
3. `npx nodemon server.js`: Start the backend server, connect to mongoDB
4. Go to the web browser, server can be accessed in localhost port 5000: [http://localhost:5000/](http://localhost:5000/)
5. `Ctrl`+`c`: Shutdown backend  


## Reference
[JavaScript 图片压缩参考](https://github.com/wuwhs/js-image-compressor/blob/master/README-CN.md)  
[Lazy load Reference](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading)  
[Git Book](https://git-scm.com/book/en/v2)
[css reference](https://css-tricks.com/lets-look-50-interesting-css-properties-values/#all)
