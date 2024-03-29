# CSCI3100-ChatU

<img src="frontend\public\logo_colorful.png" alt="ChatU" style="zoom:25%;" />

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

A social media application to post, view tweets, follow others, and engage in real-time chat with other users.

The requirements of running our application: In terms of the software requirements, you need react.js for frontend interface display, express.js for backend server hosting, and MongoDB for database connections and access. There are no worthy-to-mention hardware requirements, just use any modern personal computer or laptop. 

## Table of Contents

- [Install](#install)  
- [Usage](#usage)
- [To Do](#to-do)  
- [Reference](#reference)  
- [Contributing](#contributing)  
- [License](#license)  

## Install

1. Download [Node.js](https://nodejs.org/en/download) and [Git](https://git-scm.com/downloads)
2. Open the terminal and go to the directory where you want to install the project.
3. Type `git clone https://github.com/Gavin-OP/CSCI3100-ChatU.git` in the terminal.

## Usage

- Open the terminal under the project folder `./CSCI3100-ChatU/`.

---

### Front-end

- `cd frontend`: Go to the frontend folder.  
- `npm install`: Install all the dependencies.
- `npm start`: Start the frontend.
- Go to the web browser, and access the web app in localhost port 3000: [http://localhost:3000/](http://localhost:3000/)  

> Note: Frontend is connected to the backend by setting the proxy in the file `./frontend/package.json` with "http://localhost:5555". If presented in a public IP, this proxy link needs to be updated to [{public IP}]()

---

### Back-end

- `cd backend`: Go to the backend folder.
- `npm install`: Install all dependencies.
- `npx nodemon server.js`: Start the backend server, connect to mongoDB
- Go to the web browser, the server can be accessed in localhost port 5000: [http://localhost:5555/](http://localhost:5555/)

---

- `Ctrl`+`c`: Shutdown backend  

## To do

1. Change Navbar.
   1. Navbar for login, click logo is the home page, click icon is login
   2. Navbar for user, Navbar is slightly different in the toggle list for the personal page and setting.

1. admin user ban
2. Change tweet card and retweet card CSS background color to be consistent with login and signup.

## Reference

[JavaScript 图片压缩参考](https://github.com/wuwhs/js-image-compressor/blob/master/README-CN.md)  
[Lazy load Reference](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading)  
[Git Book](https://git-scm.com/book/en/v2)
[css reference](https://css-tricks.com/lets-look-50-interesting-css-properties-values/#all)

## Contributing

PRs and [issues](https://github.com/Gavin-OP/CSCI3100-ChatU/issues) gladly accepted!

## License

[UNLICENSE](./LICENSE)
