import { NavigationBar } from './NavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { TweetCard } from './TweetCard';
import './Post.css';

// A special version of post page. Difference: Post allows images input, Retweet must have the TweetID of original tweet, and will send this
// TweetID to the server as one input.

//Tags
const tags = ["None", "Food", "Discussion", "Study", "Music", "Game", "Life", "Art", "Love", "Travel", "Sports", "Stars", "Photography"];

function addOption(item) {
    return (<option value={item}>{item} </option>);
}

export function Retweet() {
    // Load the tweetID from the current URL
    let params = (new URL(document.location)).searchParams;
    let tid = params.get("tweetId");

    const handlePost=()=>{
        let content = document.getElementById('formContent').value;
        let tag = document.getElementById('formTag').value;
        let privacy = document.getElementById('formPrivacy').value;
        const time = new Date();
        var yr = time.getFullYear();
        var mon = time.getMonth() + 1;
        var day = time.getDate();
        var hr = time.getHours();
        var min = time.getMinutes();
        var t = yr + '-' + mon + '-' + day + ' ' + hr + ':' + min;
        // let formData = new FormData();
        // formData.set("content", content);
        // formData.set("tag", tag);
        // formData.set("privacy", privacy);
        // formData.set("time", t);
        // formData.set("original",  tid);
        // console.log(formData.get('content'))
        fetch('/tweet/retweet',
        {method:'POST', body: JSON.stringify({
            content: content,
            tag: tag,
            privacy_state: privacy,
            time : t,
            original: tid,
        }), headers:{'Content-Type': 'application/json'}})
        .then(res=>{
            console.log(res);
            window.location.href='/home';
        })
        .catch(error=>console.log(error))
    }
    return (
        <Container fluid className="p-0">
            <NavigationBar page='user' />
            <Container fluid className="m-2">
                <Row >
                    <Col md={{ span: 8, offset: 2 }} style={{ backgroundColor: '#F7F7F7' }}>
                        <Container fluid >
                            <Container fluid>
                                <TweetCard tweet_id={tid} />
                            </Container>
                            <Form>
                                <Form.Group className="m-3" controlId="formContent" size='lg'>
                                    <Form.Label>Content</Form.Label>
                                    <Form.Control as="textarea" rows={4} placeholder="Input your tweet content" required />
                                </Form.Group>
                                <Form.Group className="m-3" size='lg' controlId="formTag">
                                    <Form.Label>Tag</Form.Label>
                                    <Form.Select required defaultValue="None">
                                        {tags.map(addOption)}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="m-3" size='lg' controlId="formPrivacy">
                                    <Form.Label>Privacy</Form.Label>
                                    <Form.Select>
                                        <option value={0}>Visible to everyone</option>
                                        <option value={1}>Only visible to yourself</option>
                                    </Form.Select>
                                </Form.Group>
                                <Container className="d-flex justify-content-center">
                                    <Button className="m-3 postpage-backbutton" variant="outline-dark" onClick={() => { window.history.back() }}>
                                        Cancel and Back
                                    </Button>
                                    <Button className="m-3 postpage-clearbutton" variant="outline-danger" type="reset">
                                        Clear
                                    </Button>
                                    <Button className="m-3 postpage-postbutton" variant="outline-primary" onClick={handlePost}>
                                        Submit
                                    </Button>

                                </Container>

                            </Form>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}
