import React from "react";
import axios from "axios";

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
    axios.get("https://marvelix.herokuapp.com/movies")
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

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  // selecting a movie
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(user) {
    this.setState({
      user
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

    // Before the movies have been loaded
    if (!movies) return <div className="main-view">LOADING</div>;

    return (
    <div className="main-view">
      {selectedMovie
        ? <MovieView movie={selectedMovie}/>
        : movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
        ))
      }
    </div>
    );
  }
}

