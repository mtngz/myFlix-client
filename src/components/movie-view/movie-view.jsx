import React from 'react';
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Media from "react-bootstrap/Media";
import Col from 'react-bootstrap/Col'

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
          <span className="value">{movie.Phase.Name}</span>
          </p>
          <p className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
          </p>
          <Button onClick={() => window.open("mainView", "_self")} variant="warning">Back</Button>
          </Col>
      </Row>


      /*
      <Media>
        <img width={256} height={414} className="movie-poster" src={movie.ImagePath} alt="Movie Poster" />
        <Media.Body>
          <h3>{movie.Title}</h3>
          <p className="movie-description">{movie.Description}</p>
          <p className="movie-phase">
          <span className="label">Phase: </span>
          <span className="value">{movie.Phase.Name}</span>
          </p>
          <p className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
          </p>
          <Button onClick={() => window.open("mainView", "_self")} variant="warning">Back</Button>
        </Media.Body>
      </Media>
*/


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