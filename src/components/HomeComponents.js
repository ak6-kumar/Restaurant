import React from 'react';
import {Card,CardBody,CardImg,CardSubtitle,CardText,CardTitle} from 'reactstrap';
import { Loading } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {fadeTransform} from 'react-animation-components';

function RenderCard({item,isLoading,errmsg}){
            if(isLoading){
                return(
                    <Loading/>
                );
            }
            else if(errmsg){
                return(
                    <h4>{errmsg}</h4>
                );
            }
            else{
            return(
                <fadeTransform in transformProps={{
                    exitTransform: 'scale(0.5) translateY(50%)'
                }}>
                <Card>    
                    <CardImg src={baseUrl+item.image} alt={item.name}/>
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle>:<div></div>}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
                </fadeTransform>
            );
        }
}

function Home(props){
    return(
        <div className="container">
            <div className="row aling-item-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} isLoading={props.dishesLoading} errmsg={props.disheserr}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promos} isLoading={props.promosLoading} errmsg={props.promoserr}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} isLoading={props.leadersLoading} errmsg={props.leadersErrmsg}/>
                </div>
            </div>
        </div>
    );
}
export default Home;