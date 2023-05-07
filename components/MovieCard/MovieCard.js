import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import styles from "./MovieCard.scss";
import NoImageFound from "../../assets/no-image-found.png";

/* This component is used to display the list of movies with a vertical scroll. It displays two rows. 
   It takes in 3 props.
   movieData has all the movies returned from the API.
   index is the key value of each movie in the list.
   onPress handles the click functionality
*/

const MovieCard = ({ movieData, index, onPress })=> {
  if (index % 2 === 0) {
    return (
      <View style={styles.row} key={movieData[index].imdbID}>
        <TouchableOpacity
          style={styles.container}
          onPress={() => onPress(movieData[index])}
        >
          <View style={styles.column}>
            <Image
              style={styles.poster}
              source={movieData[index].Poster ? { uri: movieData[index].Poster } : NoImageFound}
              resizeMode="cover"
            />
            <Text style={styles.title}>{movieData[index].Title}</Text>
            <Text style={styles.year}>{movieData[index].Year}</Text>
          </View>
        </TouchableOpacity>
        {movieData[index + 1] && (
          <TouchableOpacity
            style={styles.container}
            onPress={() => onPress(movieData[index + 1])}
          >
            <View style={styles.column}>
              <Image
                style={styles.poster}
                source={movieData[index+1].Poster ? { uri: movieData[index+1].Poster } : NoImageFound}
                resizeMode="cover"
              />
              <Text style={styles.title}>{movieData[index + 1].Title}</Text>
              <Text style={styles.year}>{movieData[index + 1].Year}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  } else {
    return null;
  }
}

export default MovieCard;

