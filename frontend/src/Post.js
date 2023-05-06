import { NavigationBar } from './NavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Post.css'

// Tags
const tags=["None", "Food", "Discussion", "Study", "Music", "Game", "Life", "Art", "Love", "Travel", "Sports", "Stars", "Photography"];

function addOption(item, i) {
    return (<option key={i} value={item}>{item} </option>);
  }


export function Post() {
    const handlePost=()=>{
        // Function to handle the post
        let content = document.getElementById('formContent').value;
        let tag = document.getElementById('formTag').value;
        let picture = document.getElementById('formPictures').files;
        let privacy = document.getElementById('formPrivacy').value;
        // We only allow no more than 3 images
        if (picture.length > 3){
            window.alert("Too many images! Please upload no more than 3 pictures!")
            return false;
        }
        console.log(picture)
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
        for (let i=0;i<picture.length;i++){
            formdata.append("image", picture[i]);
        }
        formdata.append("privacy_state", privacy);
        formdata.append("time", t);
        fetch('/tweet/create',
        {method:'POST', body: formdata})
        .then(res=>{
            // redirect to home after successfully post
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
                <Col md={{ span: 8, offset: 2 }} style={{backgroundColor:'#F7F7F7'}}>
                    <Container fluid >
                    <Form id="postform">
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
                            <Form.Control type="file" accept=".jpg,.gif,.png" multiple />
                        </Form.Group>
                        <Form.Group className="m-3" size='lg' controlId="formPrivacy">
                            <Form.Label>Privacy</Form.Label>
                            <Form.Select>
                                <option value={0}>Visible to everyone</option>
                                <option value={1}>Only visible to yourself</option>
                            </Form.Select>
                        </Form.Group>
                        <Container className="d-flex justify-content-center">
                            {/* Here 3 buttons: one for back to previous page, one for reset the input, one for submit */}
                            <Button className="m-3 postpage-backbutton" variant="outline-dark" onClick={()=>{window.history.back()}}>
                                Cancel and Back
                            </Button>
                            <Button className="m-3  postpage-clearbutton" variant="outline-danger" type="reset">
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
  