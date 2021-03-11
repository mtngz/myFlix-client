# **myFlix-client**

This project is a React application that allows users to get information about movies, genres, and directors. Users can also save movies in their list of favorites and edit details of their profile. This application uses an existing server-side REST API ([https://github.com/mtngz/movie_api](https://github.com/mtngz/movie_api)) and MongoDB database.

### The application is deployed here []().

# Demo

![Screen recording of project demo]()

# Features

- Displays a welcome screen where users can log in or register for a new account.
- Users are authenticated, then they can view all movies.
- In the main view, users see all movies and can select a movie for more detials. They can also search for movies.
- In a single movie view, users can click on buttons to:
  - view the genre of the movie and details about the genre.
  - view the director of the movie and details about the director.
  - add the movie to their list of favorites.
- Users can also view their profile where they can see their favorite movies, remove movies from their favorites, and edit their profile details.

# Technologies

- Single-Page Application (SPA) using React
- Requires npm, Parcel, and Babel
- UI styled with Bootstrap
- State management with React Redux

# Development

To run this project locally, use `parcel <path to index.html>`, then navigate to the localhost port stated in your terminal.
