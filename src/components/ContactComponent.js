import React,{Component} from 'react';
import {Breadcrumb,BreadcrumbItem,Button,Form,FormGroup,Col,Label,Input} from 'reactstrap';
import {Link} from 'react-router-dom';


class Contact extends Component{

    constructor(props){
        super(props);
        this.state={
            firstname:'',
            lastname:'',
            telnum:'',
            email:'',
            agree: false,
            contactType: 'Tel.',
            message:''
        };
        this.onSubmits=this.onSubmits.bind(this);
        this.handleInput=this.handleInput.bind(this);
    }

    handleInput(event){
        const target = event.target;
        const value = target.type==='checkbox'?target.check:target.value;
        const name = target.name;

        this.setState({[name]:value});

    }

    onSubmits(event) {
        // console.log("The current state is " + JSON.stringify(this.state));
        alert("The current state is" + JSON.stringify(this.state));
        event.preventDefault();
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
                        <Form onSubmit={this.onSubmits}>
                            <FormGroup row>
                                <Label htmlFor="firstname" md={2}>
                                    First Name
                                </Label>
                                <Col md={10}>
                                <Input placeholder="First Name" type="text" id="firstname" name="firstname" value={this.state.firstname} onChange={this.handleInput}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                <Input id="lastname" name="lastname" type="text" placeholder="Last Name" value={this.state.lastname} onChange={this.handleInput}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="telnum" md={2}>Telephone Number</Label>
                                <Col md={10}>
                                <Input type="tel" placeholder="Telephone Number" id="telnum" name="telnum" value={this.state.telnum} onChange={this.handleInput}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                <Input type="email" placeholder="Email" id="email" name="email" value={this.state.email} onChange={this.handleInput}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size:6,offset:2}}>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="agree" value={this.state.agree} onChange={this.handleInput}/>{' '}
                                        <strong>May we contact you?</strong>
                                    </Label>
                                </FormGroup>
                                </Col>
                                <Col md={{size:3,offset:1}}>
                                    <Input type="select" name="contactType" value={this.state.contactType} onChange={this.handleInput}>
                                    <option>Tel.</option>
                                    <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                <Input type="textarea"  placeholder="Give your feedback here" id="message" name="message"
                                value={this.state.message} onChange={this.handleInput} row="12"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size:10,offset:2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>       
        );
    }
}
export default Contact;