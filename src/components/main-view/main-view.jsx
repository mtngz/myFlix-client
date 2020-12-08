import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import {RegistrationView} from "../registration-view/registration-view";
import {LoginView} from "../login-view/login-view";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";

export class MainView extends React.Component {
  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();

    // Initialize the state is set to null
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  // selecting a movie
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  getMovies(token) {
    axios.get("https://marvelix.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // This overrides the render() method of the superclass
  // No need to call super() though, as it does nothing by default
  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, selectedMovie, user } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    //if (!user) return <RegistrationView/>;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view">LOADING</div>;

    return (
    <div className="main-view">
      <Container fluid="md">
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
              <Navbar.Brand href="#home">MARVELIX</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="">Profile</Nav.Link>
                  <Button onClick={this.onLogOut} variant="danger" type="submit" className="button logout">Log Out</Button>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        <Row className="ml-0 mr-0">
          {selectedMovie
          ? <MovieView movie={selectedMovie}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
          ))
          }
        </Row>
      </Container>
    </div>
    );
  }
}

MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Phase: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        Death: PropTypes.string.isRequired
      }),
      ImagePath: PropTypes.string.isRequired,
      Featured: PropTypes.bool.isRequired
    })
  ),
  user: PropTypes.string.isRequired
};
