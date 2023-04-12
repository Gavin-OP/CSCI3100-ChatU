import { NavigationBar } from './NavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { TweetCard } from './TweetCard'
const tags = ["None", "Food", "Discussion", "Study", "Music", "Game", "Life", "Art", "Love", "Travel", "Sports", "Stars", "Photography"];

function addOption(item) {
    return (<option value={item}>{item} </option>);
}

const tweet_data = {
    avatarUrl: './avatar.png',
    username: 'Gavin OP',
    tweetId: '100056',
    likeStatus: 1,
    dislikeStatus: 0,
    starStatus: 1,
    likeCount: 49,
    commentCount: 4,
    followStatus: 'Following',
    imageSrc: '/tweet_card_pic_1.jpg',
    tweetText: 'dfasdfanibh massa blandit orci, eget ultricies turpis lorem ut nulla.',
};
export function Retweet() {
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
        let formdata = new FormData();
        formdata.append("content", content);
        formdata.append("tag", tag);
        formdata.append("privacy", privacy);
        formdata.append("time", t);
        formdata.append("original",  tid);
        console.log(formdata.time)
        fetch('/tweet/retweet',
        {method:'POST', body: formdata})
        .then(res=>{
            console.log(res);
            window.history.back();
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
                                    <Form.Select required>
                                        {tags.map(addOption)}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="m-3" size='lg' controlId="formPrivacy">
                                    <Form.Label>Privacy</Form.Label>
                                    <Form.Select>
                                        <option value={1}>Visible to everyone</option>
                                        <option value={0}>Only visible to yourself</option>
                                    </Form.Select>
                                </Form.Group>
                                <Container className="d-flex offset-1">
                                    <Button className="m-3" variant="outline-dark" onClick={() => { window.history.back() }}>
                                        Cancel and Back
                                    </Button>
                                    <Button className="m-3" variant="outline-danger" type="reset">
                                        Clear
                                    </Button>
                                    <Button className="m-3" variant="outline-primary" onClick={handlePost}>
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
