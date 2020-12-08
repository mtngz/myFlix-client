import React from 'react';
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col'
import { Link } from "react-router-dom";

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <Row sm={1} md={2}>
        <Col><img width={256} height={414} className="movie-poster" src={movie.ImagePath} alt="Movie Poster" /></Col>
        <Col><h3>{movie.Title}</h3>
          <p className="movie-description">{movie.Description}</p>
          <p className="movie-phase">
            <span className="label">Phase: </span>
            <span className="value"><Link to={`/phases/${movie.Phase.Name}`}>{movie.Phase.Name}</Link></span>
          </p>
          <p className="movie-director">
            <span className="label">Director: </span>
            <span className="value"><Link to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link></span>
          </p>
          <Button onClick={() => window.open("/", "_self")} variant="warning">Back</Button>
          </Col>
      </Row>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Phase: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string.isRequired
  })
};