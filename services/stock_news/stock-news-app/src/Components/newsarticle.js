import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {Card} from 'react-bootstrap'

const NewsArticle = ({title, url, publisher}) =>{
    return (
        <div>
            <Card className="mb-3" style={{margin: "auto"}}>
                <Card.Body className="row no-gutters">
                    <Card.Title className="col-md-3">{publisher}</Card.Title>
                    <Card.Text className="col-md-8"><a href = {url}>{title}</a></Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
export default NewsArticle;