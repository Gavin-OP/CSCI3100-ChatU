import './AdminTable.css';
import React from 'react';

//Delete a tweet

export function DeleteTweet(tweetID){
    console.log('/tweet/delete/'+ String(tweetID))
    fetch('/tweet/delete/'+ String(tweetID),{
        method:'DELETE'
    })
    .then(response => {
        if(!response.ok){
            throw new Error('Failed to delete tweet');
        }
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
    console.log('/user/ban/'+ String(userID))
    fetch('/user/ban/'+ String(userID))
    .then(response => {
        if(!response.ok){
            throw new Error('Failed to ban user');
        }
        // update the result
        alert('Ban successfully!')
    })
    .catch(error => {
        console.error(error);
    });
}
//Unban a user
function UnbanUser(userID){
    console.log('/user/unban/'+ String(userID))
    fetch('/user/unban/'+ String(userID))
    .then(response => {
        if(!response.ok){
            throw new Error('Failed to unban user');
        }
        // update the result
        alert('Unban successfully!')
    })
    .catch(error => {
        console.error(error);
    });
}



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
                                <button className="admin-tweet-delele-button" id="delete-button" onClick={()=>DeleteTweet(item.tweetID)}>Delete</button>
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
                            <td className='table-userid'>{item.userID}</td>
                            <td className='table-user-email'>{item.email}</td>
                            <td className='table-username'>{item.userName}</td>
                            <td className='table-ban-status'>{item.banStatus}</td>
                            <button className="ban-button" onClick={()=>BanUser(item.userID)}>Ban this user</button>
                            <button className='unban-btn' onClick={()=>UnbanUser(item.userID)}>Unban</button>
                            <button className="admin-user-delele-button" id="delete-button" onClick={()=>DeleteUser(item.userID)}>Delete</button>
                        </tr>
                    ))}
                </table>
            </div>
        )
    }

    return table;
}