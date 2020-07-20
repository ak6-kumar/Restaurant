import React,{Component} from 'react';
import {Breadcrumb,BreadcrumbItem,Button,Row,Col,Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control,Form,actions,Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component{

    constructor(props){
        super(props);
        this.onSubmits=this.onSubmits.bind(this);
    }


    onSubmits(value) {
        this.props.postFeedback(value.firstname,value.lastname,value.telnum,value.email,value.agress,value.contactType,value.message);
        this.props.resetFeedbackForm();
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="col-12">
                    <h3>Contact Us</h3>
                    <hr/>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-aling">
                    <div className="col-12">
                        <h3>
                            Send us your feedback
                        </h3>
                        <br/>
                        <br/>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form model="feedback" onSubmit={(value)=>this.onSubmits(value)}>
                            <Row className="form-group">
                                <Label htmlFor="firstname" md={2}>
                                    First Name
                                </Label>
                                <Col md={10}>
                                <Control.text placeholder="First Name" required model=".firstname" className="form-control" id="firstname" name="firstname" validators={{required,minLenght:minLength(2),maxLength:maxLength(15)}}/>
                                <Errors model=".firstname" className="text-danger" show="touched" messages={{required:"This field is required | ",minLength:"Field must have atleast 2 characters  | ",maxLength:"Field must not have more than 15 characters"}}
                                />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                <Control.text id="lastname" name="lastname" required model=".lastname" className="form-control" placeholder="Last Name" validators={{required,minLenght:minLength(2),maxLength:maxLength(15)}}/>
                                <Errors model=".lastname" className="text-danger" show="touched" messages={{required:"This field is required  | ",minLength:"Field must have atleast 2 characters | ",maxLength:"Field must not have more than 15 characters"}}
                                />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telnum" md={2}>Telephone Number</Label>
                                <Col md={10}>
                                <Control.text model=".telnum" required placeholder="Telephone Number" className="form-control" id="telnum" name="telnum" validators={{required,minLenght:minLength(5),maxLength:maxLength(12),isNumber}}/>
                                <Errors model=".telnum" className="text-danger" show="touched" messages={{required:"This field is required  | ",minLength:"Field must have atleast 5 characters | ",maxLength:"Field must not have more than 12 characters | ",isNumber:"Field should be a number"}}
                                />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                <Control.text model=".email" placeholder="Email" className="form-control" id="email" required name="email" validators={{validEmail,required}}/>
                                <Errors model=".email" className="text-danger" show="touched" messages={{required:"This field is required",validEmail:"Enter a valid Email | "}}
                                />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:6,offset:2}}>
                                <div className="form-check">
                                    <Label check>
                                        <Control.checkbox className="form-check-input" model=".agree" name="agree"/>{' '}
                                        <strong>May we contact you?</strong>
                                    </Label>
                                </div>
                                </Col>
                                <Col md={{size:3,offset:1}}>
                                    <Control.select className="form-control" model=".contactType" name="contactType" required>
                                    <option>Tel.</option>
                                    <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                <Control.textarea model=".message" className="form-control"  placeholder="Give your feedback here" required id="message" name="message" row="12" validators={{required,minLenght:minLength(5)}}/>
                                <Errors model=".message" className="text-danger" show="touched" messages={{required:"This field is required  | ",minLength:"Field must have atleast 5 characters"}}
                                />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10,offset:2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>       
        );
    }
}
export default Contact;