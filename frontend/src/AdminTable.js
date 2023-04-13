import { faHouseMedicalCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import './AdminTable.css';
import React from 'react';
import { useState, useEffect } from 'react';




//Delete a tweet

export function DeleteTweet(tweetID, userID) {
    fetch('/admin/deleteTweet/' + String(tweetID)+'/'+userID, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data=>alert(data.message))
    .catch(error => {
        console.error(error);
    });
}

//Delete a comment
export function DeleteComment(commentID) {
    fetch('/comment/delete/' + String(commentID), {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data=>alert(data.message))
        .catch(error => {
            console.error(error);
        });

}
//Delete a user
export function DeleteUser(userID) {
    fetch('/admin/deleteUser/' + String(userID), {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data=>alert(data.message))
    .catch(error => {
        console.error(error);
    });
}
//Ban a user
function BanUser(userID) {
    console.log('/admin/ban/' + String(userID))
    fetch('/admin/ban/' + String(userID))
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // update the result
        })
        .catch(error => {
            console.error(error);
        });
}
//Unban a user
function UnbanUser(userID) {
    console.log('/admin/unban/' + String(userID))
    fetch('/admin/unban/' + String(userID))
        .then(response => response.json())
        .then(data => {
            // update the result
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
}


export function AdminTable({ page, items }) {
    const [items1, setItems] = useState(items);

    //Tweet part of the table
    const handleTweetDeleteClick = (tweetID,userId) => {
        setItems(items1.filter((i) => i.tweet_id !== tweetID));
        DeleteTweet(tweetID,userId);
      };
    //Comment part of the table
    const handleCommentDeleteClick = (commentID) => {
        setItems(items1.filter((i) => i.comment_id !== commentID));
        DeleteComment(commentID);
    }
    //User part of the table
    const handleBanClick = (item) => {
        const updatedItems = items1.map((i) => {
            if (i.user_id === item.user_id) {
                return { ...i, ban: true };
            }
            return i;
        });
        setItems(updatedItems);
        BanUser(item.user_id);
        // when click ban button, change HTML in the div

    };

    const handleUnbanClick = (item) => {
        const updatedItems = items1.map((i) => {
            if (i.user_id === item.user_id) {
                return { ...i, ban: false };
            }
            return i;
        });
        //Change the items1 to updatedItems by setItems
        setItems(updatedItems);
        UnbanUser(item.user_id);
    };
    const handleDeleteClick = (userId) => {
        setItems(items1.filter((i) => i.user_id !== userId));
        DeleteUser(userId);
      };


    //UseEffect to update the ban status
    // useEffect(() => {

    //     // const tableRows = document.querySelectorAll('.admin-table-column');
    //     // tableRows.forEach((row) => {
    //     //   const userId = row.querySelector('.table-userid').textContent;
    //     //   const banStatus = row.querySelector('.table-ban-status');
    //     // });
    //   }, [items1]);
    // function to open user page
    function handleOpenUser(id) {
        window.location.href = '/personal/tweet?userId=' + id;
    }
    function handleOpen(id) {
        window.location.href = '/tweet?tweetId=' + id;
    }


    // Table for tweet
    let table;
    if (page === 'tweet') {

        table = (
            <div>
                <div className="admin-tweet-container paddings-mini">
                    <table className="tweet-table" id="admin-tweet-table">
                        {items1.map((item) => (
                            <tr className='admin-table-column'>
                                <td className='table-tweetid' onClick={()=>{handleOpen(item.tweet_id)}}>#{item.tweet_id}</td>
                                <div className='table-tweet-content'><td className='table-tweetcontent' onClick={()=>{handleOpen(item.tweet_id)}}>{item.content}</td></div>
                                <td className='table-tweet-username' onClick={()=>{handleOpenUser(item.user)}}>UserID:{item.user}</td>
                                <td className='table-date'>{item.time.substring(0, 10) + '  ' + item.time.substring(11, 19)}</td>
                                <button className="admin-tweet-delele-button" id="delete-button" onClick={() => handleTweetDeleteClick(item.tweet_id,item.user)}>Delete</button>
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
                    {items1.map((item) => (
                        <tr className='admin-table-column'>
                            <td className='table-commentid'>#{item.comment_id}</td>
                            <div className='table-tweet-content'><td className="table-commentcontent">{item.content}</td></div>
                            <td className='table-comment-username' onClick={()=>{handleOpenUser(item.user_id)}}>UserID:{item.user_id}</td>
                            <td className='table-comment-date'>{item.time.substring(0, 10) + '  ' + item.time.substring(11, 19)}</td>
                            <button className="admin-comment-delele-button" id="delete-button" onClick={() => handleCommentDeleteClick(item.comment_id)}>Delete</button>
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
                    {items1.map((item) => (
                        <tr className='admin-table-column'>
                            <td className='table-userid' onClick={()=>{handleOpenUser(item.user_id)}}>{item.user_id}</td>
                            <td className='table-user-email'>{item.email}</td>
                            <td className='table-username' onClick={()=>{handleOpenUser(item.user_id)}}>{item.username}</td>
                            <td className='table-ban-status'>{item.ban ? 'Banned' : 'Normal'}</td>
                            <button className="ban-button" onClick={() => { handleBanClick(item) }}>ban</button>
                            <button className='unban-btn' onClick={() => { handleUnbanClick(item) }}>Unban</button>
                            <button className="admin-user-delele-button" id="delete-button" onClick={() => handleDeleteClick(item.user_id)}>Delete</button>
                        </tr>
                    ))}
                </table>
            </div>
        )
    }

    return table;
}