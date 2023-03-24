import { NavigationBar } from './Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { TweetCard } from './TweetCard'
const tags=["None", "Food", "Discussion", "Study", "Music", "Game", "Life", "Art", "Love", "Travel", "Sports", "Stars", "Photography"];

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
    starCount: 32,
    commentCount: 4,
    followStatus: 'Following',
    imageSrc: '/tweet_card_pic_1.jpg',
    tweetText: 'dfasdfanibh massa blandit orci, eget ultricies turpis lorem ut nulla.',
};
export function Retweet() {
    return (
      <Container fluid>
        <NavigationBar page='user' />
        <Container fluid className="m-2">
            <Row >
                <Col md={{ span: 8, offset: 2 }} style={{backgroundColor:'#F7F7F7'}}>
                    <Container fluid >
                    <Container fluid>
                        <TweetCard {...tweet_data}/>
                    </Container>
                    <Form>
                        <Form.Group className="m-3" controlId="formContent" size='lg'>
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows={4} placeholder="Input your tweet content" required/>
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
                            <Button className="m-3" variant="outline-dark" onClick={()=>{window.history.back()}}>
                                Cancel and Back
                            </Button>
                            <Button className="m-3" variant="outline-danger" type="reset">
                                Clear
                            </Button>
                            <Button className="m-3" variant="outline-primary" type="submit">
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
  