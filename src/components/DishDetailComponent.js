import React from 'react';
import {Card, CardImg, CardText, CardTitle} from 'reactstrap';
import {BreadcrumbItem,Breadcrumb} from 'reactstrap';
import {Link} from 'react-router-dom';


    
    function RenderDish({dish}){
        
            return(
                <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top width="100%"  src={dish.image} alt={dish.name} />
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText><p>{dish.description}</p></CardText>
                </Card>
                </div>  
            );
        }
        
    function RenderComments({comments}){
            const comm= comments.map((Comment=>{
                return(
                    <div key={Comment.id}>
                        <ul className="list-unstyled">
                            <li>{Comment.comment}</li>
                            <li>--{Comment.author}, {new Intl.DateTimeFormat('en-IN', {year:'numeric', month:'short', date:'2-digit'}).format(new Date(Date.parse((Comment.date))))}</li>
                        </ul>
                    </div>
                );
            }));
            return(
                <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        {comm}
                </div>
            );
    }

    const DishDetails=(props)=>{
    
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
                <RenderComments comments={props.comments}/>
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