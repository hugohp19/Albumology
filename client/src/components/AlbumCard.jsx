import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import AlbumDescription from './AlbumDescription';

const AlbumCard = (props) => {
  const [image, setImage] = useState(props.image);
  return (
    <Card style={{ margin: '10px', padding: '10px', width: '18rem' }}>
      <Card.Img
        variant="top"
        src={image}
        onMouseEnter={() => {
          setImage(props.backImage);
        }}
        onMouseOut={() => {
          setImage(props.image);
        }}
      />
      <Card.Body>
        <Card.Title>{props.albumTitle}</Card.Title>
        <AlbumDescription
          description={props.description}
          title={props.albumTitle}
          name={props.name}
        />
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>{props.genre}</ListGroupItem>
        <ListGroupItem>{props.year}</ListGroupItem>
        <ListGroupItem>{props.label}</ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default AlbumCard;
