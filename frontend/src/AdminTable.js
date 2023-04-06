import { faHouseMedicalCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import './AdminTable.css';
import React from 'react';
import { useState,useEffect } from 'react';




//Delete a tweet

export function DeleteTweet(tweetID,userID){
    console.log('/admin/deleteTweet/'+ String(tweetID)+'/'+String(userID))
    fetch('/tweet/delete/'+ String(tweetID)+'/'+String(userID),{
        method:'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // update the search result
        alert('Delete successfully!')
    })
    .catch(error => {
        console.error(error);
    });

}

//Delete a comment
export function DeleteComment(commentID){
    console.log('/commnet/delete/'+ String(commentID))
    fetch('/comment/delete/'+ String(commentID),{
        method:'DELETE'
    })
    .then(response => {
        if(!response.ok){
            throw new Error('Failed to delete comment');
        }
        // update the search result
        alert('Delete successfully!')
    })
    .catch(error => {
        console.error(error);
    });

}
//Delete a user
export function DeleteUser(userID){
    console.log('/user/delete/'+ String(userID))
    fetch('/user/delete/'+ String(userID),{
        method:'DELETE'
    })
    .then(response => {
        if(!response.ok){
            throw new Error('Failed to delete comment');
        }
        // update the search result
        alert('Delete successfully!')
    })
    .catch(error => {
        console.error(error);
    });

}
//Ban a user
function BanUser(userID){
    console.log('/admin/ban/'+ String(userID))
    fetch('/admin/ban/'+ String(userID))
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
function UnbanUser(userID){
    console.log('/admin/unban/'+ String(userID))
    fetch('/admin/unban/'+ String(userID))
    .then(response => response.json())
    .then(data => {
        // update the result
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });
}


export function AdminTable({page,items}) {
    const [items1, setItems] = useState([]);
    const handleBanClick = (item) => {
    const updatedItems = items1.map((i) => {
        if (i.user_id === item.user_id) {
        return { ...i, ban: true };
        }
        return i;
    });
    setItems(updatedItems);
    BanUser(item.user_id);
    };
    const handleUnbanClick = (item) => {
    const updatedItems = items1.map((i) => {
        if (i.user_id === item.user_id) {
        return { ...i, ban: false };
        }
        return i;
    });
    setItems(updatedItems);
    UnbanUser(item.user_id);
    };


    // Table for tweet
    let table;
    if (page === 'tweet') {

        table = (
            <div>
                <div className="admin-tweet-container paddings-mini">
                    <table className="tweet-table" id="admin-tweet-table">
                        {items.map((item) => (
                            <tr className='admin-table-column'>
                                <td className='table-tweetid'>#{item.tweet_id}</td>
                                <div className='table-tweet-content'><td className='table-tweetcontent'>{item.content}</td></div>
                                <td className='table-tweet-username'>UserID:{item.user}</td>
                                <td className='table-date'>{item.time.substring(0,10)+'  '+item.time.substring(11,19)}</td>
                                <button className="admin-tweet-delele-button" id="delete-button" onClick={()=>DeleteTweet(item.tweet_id)}>Delete</button>
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
                            <button className="admin-comment-delele-button" id="delete-button" onClick={()=>DeleteComment(item.commentID)}>Delete</button>
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
                            <td className='table-userid'>{item.user_id}</td>
                            <td className='table-user-email'>{item.email}</td>
                            <td className='table-username'>{item.username}</td>
                            <td className='table-ban-status'>{item.ban ? 'Banned' : 'Normal'}</td>
                            <button className="ban-button" onClick={()=>{handleBanClick(item)}}>ban</button>
                            <button className='unban-btn' onClick={()=>{handleUnbanClick(item)}}>Unban</button>
                            <button className="admin-user-delele-button" id="delete-button" onClick={()=>DeleteUser(item.user_id)}>Delete</button>
                        </tr>
                    ))}
                </table>
            </div>
        )
    }

    return table;
}