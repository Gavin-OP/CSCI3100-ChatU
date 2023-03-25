import { NavigationBar } from './NavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const tags=["None", "Food", "Discussion", "Study", "Music", "Game", "Life", "Art", "Love", "Travel", "Sports", "Stars", "Photography"];

function addOption(item) {
    return (<option value={item}>{item} </option>);
  }


export function Post() {
    return (
      <Container fluid className="p-0">
        <NavigationBar page='user' />
        <Container fluid className="m-2">
            <Row >
                <Col md={{ span: 8, offset: 2 }} style={{backgroundColor:'#F7F7F7'}}>
                    <Container fluid >
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
                        <Form.Group controlId="formPictures" className="m-3">
                            <Form.Label>Upload Pictures</Form.Label>
                            <Form.Control type="file" multiple />
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
  