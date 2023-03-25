import './AdminTable.css';
import React from 'react';
import ReactDOM from 'react-dom';
export function AdminTable({ page }) {



    // Table for tweet
    let table;
    if (page === 'tweet') {


        // Fake data!!!!!!!!!!!!!!!!!!!!!
        let items =
            [
                { tweetID: "#000001", content: "This is a tweet", userName: "@user1", date: "2021.1.1" },
                { tweetID: "#114514", content: "AAAAAAAAAAAAAAAAAAA,senpai-sukisi!,AAAAAAAAAAAAAAAAAAAAAAAAAAAA", userName: "@user2", date: "2021.11.4" },
                { tweetID: "#191981", content: "@*&!@(*$&@!$^*&", userName: "@user3", date: "2021.5.14" },
                { tweetID: "#233333", content: "This is a long tweet! askdjqwfjqok q oqkdpqs os qj q0i pqoiqwqokdpqow niqfqwofjqpowjfwfqkwfnpqwfw qiwfqwokfpoqwkfpqwf qpwfqpokfpqwkfpqwkfpoqw qwpfjqpowkfqwokfpqowkfpoqwkfpq qwokdpqowkdpqwpqwokdq oqkwdpoqwkdpqokwdpok!!!!!!!!!!!!!!!", userName: "Long tweet", date: "2021.6.6" },
                { tweetID: "#233334", content: "This is a short tweet! ", userName: "short tweet", date: "2021.6.7" },
            ];



        table = (
            <div className="admin-tweet-container paddings-mini">
                <table className="tweet-table" id="admin-tweet-table">
                    {items.map((item) => (
                        <tr className='admin-table-column'>
                            <td className='table-tweetid'>{item.tweetID}</td>
                            <div className='table-tweet-content'><td className='table-tweetcontent'>{item.content}</td></div>
                            <td className='table-tweet-username'>{item.userName}</td>
                            <td className='table-date'>{item.date}</td>
                            <button className="admin-tweet-delele-button" id="delete-button">Delete</button>
                        </tr>
                    ))}
                </table>
            </div>
        )
    }
    if (page === 'comment') {

        // Fake data!!!!!!!!!!!!!!!!!!!!!
        let items =
            [
                { commentID: "#012311", content: "This is a comment", userName: "@user1", date: "2021.1.1" },
                { commentID: "#111114", content: "oh hohohohohohohohohohohohohohfuck this program!", userName: "@user2", date: "2021.11.4" },
                { commentID: "#100001", content: "@*&!@(*$&@!$^*&", userName: "@user3", date: "2021.5.14" },
                { commentID: "#123333", content: "This is a long comment! askdjqwfjqok q oqkdpqs os qj q0i pqoiqwqokdpqow niqfqwofjqpowjfwfqkwfnpqwfw qiwfqwokfpoqwkfpqwf qpwfqpokfpqwkfpqwkfpoqw qwpfjqpowkfqwokfpqowkfpoqwkfpq qwokdpqowkdpqwpqwokdq oqkwdpoqwkdpqokwdpok!!!!!!!!!!!!!!!", userName: "Long comment", date: "2021.6.6" },
            ];

        table = (
            <div className="admin-comment-container paddings-mini">
                <table className="comment-table" id="admin-comment-table">
                    {items.map((item) => (
                        <tr className='admin-table-column'>
                            <td className='table-commentid'>{item.commentID}</td>
                            <div className='table-tweet-content'><td className="table-commentcontent">{item.content}</td></div>
                            <td className='table-comment-username'>{item.userName}</td>
                            <td className='table-comment-date'>{item.date}</td>
                            <button className="admin-comment-delele-button" id="delete-button">Delete</button>
                        </tr>
                    ))}
                </table>
            </div>
        )
    }
    if (page === 'user') {

        // Fake data!!!!!!!!!!!!!!!!!!!!!
        let items =
            [
                { userID: "000001", email: "1314520@love.com", userName: "@user1" , banStatus:"Normal"},
                { userID: "191981", email: "3100course@sb.com", userName: "@user2", banStatus:"Banned till 2023.03.25 12:00pm" },
                { userID: "233333", email: "emmmmmm@qq.com", userName: "@user3", banStatus:"Normal" },
            ];

        table = (
            <div className="admin-user-container paddings-mini">
                <table className="user-table" id="admin-user-table">
                    {items.map((item) => (
                        <tr className='admin-table-column'>
                            <td className='table-userid'>{item.userID}</td>
                            <td className='table-user-email'>{item.email}</td>
                            <td className='table-username'>{item.userName}</td>
                            <td className='table-ban-status'>{item.banStatus}</td>
                            <select className="admin-user-ban-date"><option value={1}>Ban 1 day</option><option value={2}>Ban 7 days</option></select>
                            <button className='ban-confirm-btn'>Confirm</button>
                            <button className="admin-user-delele-button" id="delete-button">Delete</button>
                        </tr>
                    ))}
                </table>
            </div>
        )
    }

    return table;
}