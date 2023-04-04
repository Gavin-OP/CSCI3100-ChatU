import './AdminTable.css';
import React from 'react';
export function AdminTable({page,items}) {


    // Table for tweet
    let table;
    if (page === 'tweet') {

        table = (
            <div>
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
            </div>
        )
    }
    if (page === 'comment') {


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


        table = (
            <div className="admin-user-container paddings-mini">
                <table className="user-table" id="admin-user-table">
                    {items.map((item) => (
                        <tr className='admin-table-column'>
                            <td className='table-userid'>{item.userID}</td>
                            <td className='table-user-email'>{item.email}</td>
                            <td className='table-username'>{item.userName}</td>
                            <td className='table-ban-status'>{item.banStatus}</td>
                            <button className="ban-button">Ban this user</button>
                            <button className='unban-btn'>Unban</button>
                            <button className="admin-user-delele-button" id="delete-button">Delete</button>
                        </tr>
                    ))}
                </table>
            </div>
        )
    }

    return table;
}