import './AdminTable.css';
import React from 'react';  
import ReactDOM from 'react-dom';  
export function AdminTable({page}) {



    // Table for tweet
    let table;
    if (page === 'tweet') {


        // Fake data!!!!!!!!!!!!!!!!!!!!!
        let items = 
        [
        { tweetID: "#000001", content:"This is a tweet", userName:"@user1",date:"2021.1.1"},
        { tweetID: "#114514", content:"AAAAAAAAAAAAAAAAAAA,senpai-sukisi!,AAAAAAAAAAAAAAAAAAAAAAAAAAAA",userName:"@user2",date:"2021.11.4"},
        { tweetID: "#191981", content:"@*&!@(*$&@!$^*&",userName:"@user3",date:"2021.5.14"},
        ];



        table=(
                    <div className="container paddings-mini">
                        <table className="tweet-table" id="admin-tweet-table">
                            {items.map((item) => (
                                <tr>
                                    <td>{item.tweetID}</td>
                                    <td id = "content">{item.content}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.date}</td>
                                    <button className= "delele-button" id="delete-button">Delete</button>
                                </tr>
                            ))}
                        </table>
                    </div>
        )
    }
    if (page==='comment'){

        // Fake data!!!!!!!!!!!!!!!!!!!!!
        let items = 
        [
        { commentID: "#012311", content:"This is a comment", userName:"@user1",date:"2021.1.1"},
        { commentID: "#111114", content:"oh hohohohohohohohohohohohohohfuck this program!",userName:"@user2",date:"2021.11.4"},
        { commentID: "#100001", content:"@*&!@(*$&@!$^*&",userName:"@user3",date:"2021.5.14"},
        ];

        table=(
            <div className="container paddings-mini">
                <table className="comment-table" id="admin-comment-table">
                    {items.map((item) => (
                        <tr>
                            <td>{item.commentID}</td>
                            <td id = "content">{item.content}</td>
                            <td>{item.userName}</td>
                            <td>{item.date}</td>
                            <button className= "delele-button" id="delete-button">Delete</button>
                        </tr>
                    ))}
                </table>
            </div>
)
    }
    if (page==='user'){

        // Fake data!!!!!!!!!!!!!!!!!!!!!
        let items = 
        [
        { userID: "1", email:"1314520@love.com", userName:"@user1"},
        { userID: "1919810", email:"3100course@sb.com",userName:"@user2"},
        { userID: "233333", email:"emmmmmm@qq.com",userName:"@user3"},
        ];

        table=(
            <div className="container paddings-mini">
                <table className="user-table" id="admin-user-table">
                    {items.map((item) => (
                        <tr>
                            <td>{item.userID}</td>
                            <td>{item.email}</td>
                            <td>{item.userName}</td>
                            <select id="ban-date"><option value={1}>Ban 1 day</option><option value={2}>Ban 7 days</option></select>
                            <button className= "delele-button" id="delete-button">Delete</button>
                        </tr>
                    ))}
                </table>
            </div>
)
    }

    return table;
}