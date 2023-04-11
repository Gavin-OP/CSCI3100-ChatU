import {NavigationBar} from './NavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Loading } from './Loading';
import './Setting.css'

export class Setting extends React.Component{
     constructor(props){
          super(props);
          this.page = this.props.page;
          this.state = {isload: 0, info:{}};
     }
     componentDidMount(){
          let uid = getCookieValue("userId");
          fetch('/user/getUser/'+uid)
          .then(res=>res.json())
          .then(data=>{
               let info = {
                    username: data.username,
                    userId: data.user_id,
                    email: data.email,
                    description: 'Hello ChatU',
                    avatar: data.avatar,
               }
               console.log(data)
               if (data.description!=='' && data.description!==undefined){
                    info.description=data.description;
               }
               this.setState({isload:1, info: info})
          })
     }
     render(){
          return(
               <>
               {this.state.isload===0?<Loading/>: <SettingPage info={this.state.info}/>}
               </>
          )
     }    
}

class SettingPage extends React.Component{
     constructor(props){
          super(props);
          this.info = this.props.info;
     };
     componentDidMount(){
        let code = '';
        if (this.info.avatar.data===undefined){
            code = "<image className='p-2' id='ava' src='../avatar.png' style='width:180px;height:180px;'/>";
            document.getElementById('avatarbox').innerHTML = code;
        }
     }
     handleSelect=()=>{
        let select = document.getElementById('formAvatar').value;
        document.getElementById('ava').src = select;

     }
     handlePost=()=>{
        let name = document.getElementById('formName').value;
        let des = document.getElementById('formDescription').value;
        let avatar = document.getElementById('formAvatar').value;
        
        let formdata = new FormData();
        formdata.append("username", name);
        formdata.append("description", des);
        formdata.append("avatar", avatar);
            
        window.alert("Haven't connect to database now!")
        // fetch('/user/update',
        // {method:'POST', body: formdata})
        //     .then(res=>{
        //     console.log(res);
        //     window.history.href='/home';
        // })
        // .catch(error=>console.log(error))
    
     }
     render(){
          return(
               <>

                <Container fluid className="p-0">
                    <NavigationBar page='user' />
                    <Container fluid className="m-2">
                        <Row >
                            <Col md={{ span: 8, offset: 2 }} style={{backgroundColor:'#F7F7F7'}}>
                                <Container fluid >
                                <button class="return-button m-2" onClick={()=>window.history.back()}> <i class="fa fa-arrow-left"></i></button>
                                <div className="container offset-5 p-2" id="avatarbox"></div>
                                <Form id="postform">
                                    <Form.Group className="m-3" controlId="formId" size='lg'>
                                        <Form.Label>User ID</Form.Label>
                                        <Form.Control defaultValue={this.info.userId} disabled/>
                                    </Form.Group>
                                    <Form.Group className="m-3" controlId="formEmail" size='lg'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control defaultValue={this.info.email} disabled/>
                                    </Form.Group>
                                    <Form.Group className="m-3" controlId="formName" size='lg'>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control defaultValue={this.info.username} minLength={4} maxLength={20} required/>
                                    </Form.Group>
                                    
                                    <Form.Group controlId="formDescription" className="m-3">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control defaultValue={this.info.description} minLength={1} maxLength={80} required />
                                    </Form.Group>
                                    
                                    <Form.Group controlId="formAvatar" className="m-3">
                                        <Form.Label>Choose Avatar</Form.Label>
                                        <Form.Select onChange={this.handleSelect} required>
                                            <option value='../avatar.png' selected>1</option>
                                            <option value='../avatar2.png'>2</option>
                                            <option value='../avatar3.jpg'>3</option>
                                            <option value='../avatar4.jpg'>4</option>
                                            <option value='../avatar5.jpg'>5</option>
                                            <option value='../avatar6.jpg'>6</option>
                                            <option value='../avatar7.jpg'>7</option>
                                            <option value='../avatar8.jpg'>8</option>
                                            <option value='../avatar9.jpg'>9</option>
                                            <option value='../avatar10.jpg'>10</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <div className="p-2" id="preview"></div>

                                    <Container className="d-flex offset-1">
                                        <Button className="m-3" variant="outline-dark" onClick={()=>{window.history.back()}}>
                                            Cancel and Back
                                        </Button>
                                        <Button className="m-3" variant="outline-danger" type="reset">
                                            Clear
                                        </Button>
                                        <Button className="m-3" variant="outline-primary" onClick={this.handlePost}>
                                            Submit
                                        </Button>

                                    </Container>

                                </Form>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </Container>
         </>
        )
    }
}

function getCookieValue(name) {
    let result = document.cookie.match("(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)")
    return result ? result.pop() : ""
}
