import { NavigationBar } from './NavBar';
import React from "react";
import ScrollToTop from 'react-scroll-to-top';
import ReactDOM from 'react-dom';
import "./PersonalPage.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export function PersonalPage({ page }) {
    return (
        <>
            <ScrollToTop />
            <div>
                {/* NavigationBar */}
                <NavigationBar page={'user'} />
            </div>

            <div class="a">
                <button class="return-button"> <i class="fa fa-arrow-left"></i></button>
                <div class="container">
                    <div className="pg-avatar">
                        <br /> <br /> <img src='./avatar.png' alt="Avatar" />

                        <div class="pg-username">Gavin OP</div>
                    </div>
                </div>
            </div>








        </>
    )
}