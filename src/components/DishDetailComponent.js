import React,{Component} from 'react';
import {Card, CardImg, CardText, CardTitle, Button,Modal, ModalHeader,ModalBody,ModalFooter, Label} from 'reactstrap';
import {BreadcrumbItem,Breadcrumb} from 'reactstrap';
import {Link} from 'react-router-dom';
import {LocalForm,Control,Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {fadeTransform,Fade,Stagger} from 'react-animation-components';

const minLength = (len) => (val) => (val) && val.length>=len;
const maxLength = (len) => (val) => !(val) || val.length<=len;

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            navOpen:false
        }
        this.toggleModal=this.toggleModal.bind(this);
    }

        toggleModal(){
            this.setState({navOpen:!this.state.navOpen});
        }

        handleSubmit(value){
            this.toggleModal();
            this.props.postComment(this.props.dishId,value.author,value.rating,value.comment);    
        }

        render(){
            return(
                <div className="row">
                <Button outline onClick={this.toggleModal} ><span className="fa fa-pencil"></span>  Submit Comment</Button>
                <Modal isOpen={this.state.navOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comments</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(value)=>this.handleSubmit(value)}>
                            <Label htmlFor="Rating">Rating</Label>
                            <Control.select className="form-control" model=".Rating" name="Rating" id="Rating" >
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                            {<br/>}
                            <Label htmlFor="author">Your Name<span className="text-danger">*</span>   </Label>
                            <Control.text className="form-control" model=".author" id="author" name="author" placeholder="Your Name" validators={{maxLength:maxLength(15),minLength:minLength(3)}}/>
                            <Errors model=".author" className="text-danger" show={{touched:true,focus:false}} messages={{minLength:"Must be greater than 2 characters",maxLength:"Must be less than 16 characters"}}/>
                            {<br/>}
                            <Label htmlFor="comment">Comment</Label>
                            <Control.textarea className="form-control" model=".comment" id="comment" name="comment" row="12"/>
                            {<br/>}
                            <Button  type="submit" colour="primary" >Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </div>
            );
        }
    }

    function RenderDish({dish}){
        
            return(
                <div className="col-12 col-md-5 m-1">
                    <fadeTransform in transformProps={{
                    exitTransform: 'scale(0.5) translateY(50%)'
                }}>
                <Card>
                    <CardImg top width="100%"  src={baseUrl+dish.image} alt={dish.name} />
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText><p>{dish.description}</p></CardText>
                </Card>
                </fadeTransform>
                </div>  
            ); 
        }
        
    function RenderComments({comments,postComment,dishId}){
            const comm= comments.map((Comment=>{
                return(
                    <Fade in>
                    <div key={Comment.id}>
                        <ul className="list-unstyled">
                            <li>{Comment.comment}</li>
                            <li>--{Comment.author}, {new Intl.DateTimeFormat('en-IN', {year:'numeric', month:'short', date:'2-digit'}).format(new Date(Date.parse((Comment.date))))}</li>
                        </ul>
                    </div>
                    </Fade>
                );
            }));
            return(
                <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <Stagger in>
                        {comm}
                        </Stagger>
                        {<br/>}
                        {<br/>}
                        <CommentForm postComment={postComment} dishId={dishId}/>
                </div>
            );
    }

    const DishDetails=(props)=>{
    if(props.isLoading){
        return (
        <div className="container">
            <div className="row">
                <Loading/>
            </div>
        </div>
            );
    }
    else if(props.errmsg){
        return (
            <div className="container">
            <div className="row">
                <h4>{props.errmsg}</h4>
            </div>
        </div>
        );
    }
        if(props.dish!=null && props.comments!=null){
        return(
            <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div> 
            <div className="row">
                <RenderDish dish={props.dish}/>
                <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id}/>
            </div>
            </div>
        );
        }
        else{
            return(
            <div></div>
            );}
    }

export default DishDetails;