import React from "react";
import './Loading.css'

// Loading page has no function or data, it just used before the required data is loaded.


export class Loading extends React.Component{
    render(){
        return(
            <>
                <div id="load">
                    <div>G</div>
                    <div>N</div>
                    <div>I</div>
                    <div>D</div>
                    <div>A</div>
                    <div>O</div>
                    <div>L</div>
                </div>
            </>
        )
    }
}