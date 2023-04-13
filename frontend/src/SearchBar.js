import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { AdminTable } from './AdminTable';
import { createRoot } from 'react-dom/client';
import { TweetCard } from './TweetCard';
export function SearchBar({ page }) {

    let Bar;
    // Search bar for tweet
    // !!! need a search button
    if (page === 'tweet') {    


         // Fake data!!!!!!!!!!!!!!!!!!!!!
         let data1 =
        [
            { tweet_id: "#000001", content: "This is a tweet", user: "@user1", time: "2021.1.1" },
            { tweet_id: "#114514", content: "AAAAAAAAAAAAAAAAAAA,senpai-sukisi!,AAAAAAAAAAAAAAAAAAAAAAAAAAAA", user: "@user2", time: "2021.11.4" },
            { tweet_id: "#191981", content: "@*&!@(*$&@!$^*&", user: "@user3", time: "2021.5.14" },
            { tweet_id: "#233333", content: "This is a long tweet! askdjqwfjqok q oqkdpqs os qj q0i pqoiqwqokdpqow niqfqwofjqpowjfwfqkwfnpqwfw qiwfqwokfpoqwkfpqwf qpwfqpokfpqwkfpqwkfpoqw qwpfjqpowkfqwokfpqowkfpoqwkfpq qwokdpqowkdpqwpqwokdq oqkwdpoqwkdpqokwdpok!!!!!!!!!!!!!!!", user: "Long tweet", time: "2021.6.6" },
            { tweet_id: "#233334", content: "This is a short tweet! ", user: "short tweet", time: "2021.6.7" },
        ];

        //this is the initial table
        fetch('/home/tweet')
        .then(response => response.json())
        //initail the admin table
        .then(data => {
            FrontendFcn(data.tweets)
        })
        .catch(error => console.log(error));

        const handleSearch = (query) => {
            // send the search query to the backend
            let url = '';
            if (query[0]==='#'){
                url='/admin/tweet/search/'+query.substring(1);
            }
            else{
                url='/admin/tweet/search/'+query;
            }
            fetch(url)
            .then(response => response.json())
            .then(data => {
                FrontendFcn(data)
            })
            .catch(error => console.log(error));
            

            //test function
            FrontendFcn(data1);
            console.log(url);


        };
        

            // Frontend function
        function FrontendFcn(data){
            //Create a HTML for the search results, if it exists, remove it
            if (document.querySelector('.search-result')) {
                document.querySelector('.search-result').remove();
            }
            const resultElement = document.createElement('div');
            resultElement.className = 'search-result';
            // Define the JSX expression
            var adminTweetTable = <AdminTable page='tweet' items= {data} />;
            // Render the JSX expression
            const root = createRoot(resultElement);
            root.render(adminTweetTable);
            const searchBox = document.querySelector('.search-container');
            // Insert the search results container after the search box
            searchBox.parentNode.insertBefore(resultElement, searchBox.nextSibling);
        };
        const handleKeyDown = (event) => {
            if (event.keyCode === 13 && event.target.value !== '') {
                event.preventDefault();
                const query = event.target.value;
                handleSearch(query);
            }
        };
       
        Bar = (
            <div className='bar-and-result'>
                <div class="search-container">
                    <div className="search-box">
                        <i><FontAwesomeIcon icon={faMagnifyingGlass} /></i>
                        <form name="search" onSubmit={handleKeyDown}>
                            <input type="text" className="search-input" name="txt" onmouseout="this.value = ''; this.blur();" placeholder='#ID/content' onKeyDown={handleKeyDown} />
                        </form>
                    </div>
                </div>
            </div>
        )

    }
    // Search bar for home page
    else if (page === 'homepage') {

        let data1=[1,2,3]

        const handleSearch = (query) => {
            // send the search query to the backend
            // fetch('/admin/user/search/'+query)
            // .then(response => response.json())
            // .then(data => {
            //     FrontendFcn(data)
            // })
            // .catch(error => console.log(error));

            //test function
            FrontendFcn(data1);
            console.log('search query:', '/admin/user/search/'+query);
        };

        function FrontendFcn(tweetIDs) {
            //Create a HTML for the search results, if it exists, remove it
            if (document.querySelector('.tweetCard-container')) {
              document.querySelector('.tweetCard-container').remove();
            }
            if (document.querySelector('.search-result')) {
              document.querySelector('.search-result').remove();
            }
            const resultElement = document.createElement('div');
            resultElement.className = 'search-result';
            // Define the JSX expression
            var tweetCards = tweetIDs.map((tweetID) => (
              <TweetCard tweet_id={tweetID} />
            ));
            // Render the JSX expression
            const root = createRoot(resultElement);
            root.render(tweetCards);
            const searchBox = document.querySelector('.search-container');
            // Insert the search results container after the search box
            searchBox.parentNode.insertBefore(resultElement, searchBox.nextSibling);
          }
          const handleKeyDown = (event) => {
            if (event.keyCode === 13 && event.target.value !== '') {
              event.preventDefault();
              const query = event.target.value;
              handleSearch(query);
            }
        };

        Bar = (
            <div class="search-container">
                <div className="search-box">
                    <i><FontAwesomeIcon icon={faMagnifyingGlass} /></i>
                    <form name="search">
                        <input type="text" className="search-input" name="txt" onmouseout="this.value = ''; this.blur();" placeholder='Tweet ID/Key Words/Tags' onKeyDown={handleKeyDown}/>
                    </form>
                </div>
            </div>
        )
    }

    // Search bar for user
    // !!! need a search button
    else if (page === 'user') {



        // Fake data!!!!!!!!!!!!!!!!!!!!!
        let data1 =
        [
            { user_id: "000001", email: "1314520@love.com", username: "@user1" , ban:false},
            { user_id: "191981", email: "3100course@sb.com", username: "@user2", ban:true },
            { user_id: "233333", email: "emmmmmm@qq.com", username: "@user3", ban:false},
        ];
        

        //this is the initial table
        fetch('/admin/userList')
        .then(response => response.json())
        //initail the admin table
        .then(data => {
            FrontendFcn(data);
        })
        .catch(error => console.log(error));


        const handleSearch = (query) => {
            // send the search query to the backend
            // fetch('/admin/user/search/'+query)
            // .then(response => response.json())
            // .then(data => {
            //     FrontendFcn(data)
            // })
            // .catch(error => console.log(error));

            //test function
            FrontendFcn(data1);
            console.log('search query:', '/admin/user/search/'+query);
        };
        


            // Frontend function
        function FrontendFcn(data){
            //Create a HTML for the search results, if it exists, remove it
            if (document.querySelector('.search-result')) {
                document.querySelector('.search-result').remove();
            }
            const resultElement = document.createElement('div');
            resultElement.className = 'search-result';
            // Define the JSX expression
            var adminUserTable = <AdminTable page='user' items= {data} />;
            // Render the JSX expression
            const root = createRoot(resultElement);
            root.render(adminUserTable);
            const searchBox = document.querySelector('.search-container');
            // Insert the search results container after the search box
            searchBox.parentNode.insertBefore(resultElement, searchBox.nextSibling);
        };
        const handleKeyDown = (event) => {
            if (event.keyCode === 13 && event.target.value !== '') {
              event.preventDefault();
              const query = event.target.value;
              handleSearch(query);
            }
        };
        Bar = (
            <div class="search-container">
                <div className="search-box">
                    <i><FontAwesomeIcon icon={faMagnifyingGlass} /></i>
                    <form name="search">
                        <input type="text" className="search-input" name="txt" onmouseout="this.value = ''; this.blur();" placeholder='ID/UserName' onKeyDown={handleKeyDown}/>
                    </form>
                </div>
            </div>
        )
    }

    // Search bar for comment
    // !!! need a search button
    else if (page === 'comment') {
        //Initial the table
        fetch('/admin/commentList')
        .then(response => response.json())
        //initail the admin table
        .then(data => {
            FrontendFcn(data);
        })
        .catch(error => console.log(error));



        // Fake data!!!!!!!!!!!!!!!!!!!!!
        let data1 =
        [
            { comment_id: "#012391", content: "This is a comment", user_id: "@user1",  time: "2021.1.1" },
            { comment_id: "#111114", content: "oh hohohohohohohohohohohohohohfuck this program!", user_id: "@user2",  time: "2021.11.4" },
            { comment_id: "#100001", content: "@*&!@(*$&@!$^*&", user_id: "@user3",  time: "2021.5.14" },
            { comment_id: "#123333", content: "This is a long comment! askdjqwfjqok q oqkdpqs os qj q0i pqoiqwqokdpqow niqfqwofjqpowjfwfqkwfnpqwfw qiwfqwokfpoqwkfpqwf qpwfqpokfpqwkfpqwkfpoqw qwpfjqpowkfqwokfpqowkfpoqwkfpq qwokdpqowkdpqwpqwokdq oqkwdpoqwkdpqokwdpok!!!!!!!!!!!!!!!", user_id: "Long comment",  time: "2021.6.6" },
        ];


        const handleSearch = (query) => {
            // send the search query to the backend
            // fetch('/admin/comment/search/'+query)
            // .then(response => response.json())
            // .then(data => {
            //     FrontendFcn(data)
            // })
            // .catch(error => console.log(error));
            

            //test function
            FrontendFcn(data1);
            console.log('search query:', '/admin/comment/search/'+query);
            };
            
        

            // Frontend function
        function FrontendFcn(data){
            //Create a HTML for the search results, if it exists, remove it
            if (document.querySelector('.search-result')) {
                document.querySelector('.search-result').remove();
            }
            const resultElement = document.createElement('div');
            resultElement.className = 'search-result';
            // Define the JSX expression
            var adminCommentTable = <AdminTable page='comment' items= {data} />;
            // Render the JSX expression
            const root = createRoot(resultElement);
            root.render(adminCommentTable);
            const searchBox = document.querySelector('.search-container');
            // Insert the search results container after the search box
            searchBox.parentNode.insertBefore(resultElement, searchBox.nextSibling);
        };
        const handleKeyDown = (event) => {
            if (event.keyCode === 13 && event.target.value !== '') {
              event.preventDefault();
              const query = event.target.value;
              handleSearch(query);
            }
        };


        Bar = (
            <div class="search-container">
                <div className="search-box">
                    <i><FontAwesomeIcon icon={faMagnifyingGlass} /></i>
                    <form name="search">
                        <input type="text" className="search-input" name="txt" onmouseout="this.value = ''; this.blur();" placeholder='#ID/content' onKeyDown={handleKeyDown}/>
                    </form>
                </div>
            </div>
        )
    }
    return Bar;
}
