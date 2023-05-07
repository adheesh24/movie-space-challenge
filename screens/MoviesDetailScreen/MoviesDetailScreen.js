import { View, Text, Image } from "react-native";
import { useState, useEffect } from "react";
import { fetchSpecificMovieDetails } from "../../api/index";
import styles from "./MoviesDetailScreen.scss";
import StarRating from "../../components/StarRating/StarRating";
import NoImageFound from "../../assets/no-image-found.png";

export default function MoviesDetailScreen({ route, navigation }) {
  const [specificMovie, setSpecificMovie] = useState({});               // Specific movie details
  const [ratings, setRatings] = useState([]);                           // has rating in format eg 8/10
  const [ratingVal, setRatingVal] = useState(0);                        // contains only the rating eg 8

  const specificMovieId = route.params.imdbId;
  const movieName = route.params.movieName;

  //Method API call to get specific movie details
  const getSpecificMovie = async () => {
    setSpecificMovie(await fetchSpecificMovieDetails(specificMovieId));
  };

  // Gets called when the screen first loads.
  useEffect(() => {
    getSpecificMovie();
  }, []);

  // Used to set the title of the page as a movie name
  useEffect(() => {
    navigation.setOptions({ title: movieName });
  }, [movieName]);

  // Getting only IMDB rating after the api call returns movie details. Response received as an array
  // of objects. ratingTemo looks like eg. 8/10 | storing the rating val '8' in ratingVal for StarRating component.
  useEffect(() => {
    if (specificMovie && specificMovie.Ratings) {
      const ratingTemp = specificMovie.Ratings.find(
        (m) => m.Source === "Internet Movie Database"
      ).Value;
      setRatingVal(ratingTemp.split("/")[0]);
      setRatings(ratingTemp);
    }
  }, [specificMovie]);

  return (
    <View style={styles.container}>
      <Image
        source={
          specificMovie.Poster ? { uri: specificMovie.Poster } : NoImageFound
        }
        style={styles.poster}
      />
      <View style={styles.info}>
        <View style={styles.yearContainer}>
          <Text style={styles.year}>Year: {specificMovie.Year}</Text>
        </View>
        <View style={styles.directorContainer}>
          <Text style={styles.director}>
            Director: {specificMovie.Director}
          </Text>
        </View>
      </View>
      <Text style={styles.plot}>Plot: {specificMovie.Plot}</Text>

      <View style={styles.ratingContainer}></View>
      <StarRating rating={ratingVal} />
      <Text style={styles.rating}>
        {ratings}
        {" - IMDB"}
      </Text>
    </View>
  );
}
