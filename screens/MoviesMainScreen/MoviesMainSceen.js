import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  Keyboard,
} from "react-native";

import { fetchMovies } from "../../api/index";
import { TextInput } from "react-native-paper";
import MovieCard from "../../components/MovieCard/MovieCard";
import styles from "./MoviesMainScreen.scss";
import SearchIcon from "../../assets/search-icon.png";

export default function MoviesMainScreen({ navigation }) {
  const [movies, setMovies] = useState([]);                         // contains the list of all movies
  const [page, setPage] = useState(1);                              // handles the page numbers
  const [isLoading, setIsLoading] = useState(true);                 // handles the loader

  // search query user input | Initially gets the popular list with keyword "batman"
  const [searchMovie, setSearchMovie] = useState("batman");              

  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);    // handles the visibility of loadMore button

  // API call to get the list of popular(batman) movies or any other search performed by user.
  const getMovies = async () => {
    try {
     
      const  response = await fetchMovies(searchMovie, page); 
      const data = await response.json();

      // if invalid search is performed then an alert is shown to the user.
      if (data.Response === "False") {
        setShowLoadMoreBtn(false);
        alert(data.Error);
      } else {
        if (movies && data && data.Search) {
          setMovies((prevMovies) => [...prevMovies, ...data.Search]); // spreading the prev pages data
        } else {
            setMovies(...data.Search);
        }
        setIsLoading(false);
        setShowLoadMoreBtn(true);
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  // This runs on first load && every time user clicks on LoadMore button
  useEffect(() => {
    getMovies();
  }, [page]);

  //Search functionality handler
  const handleSearch = async () => {
    if (searchMovie.trim() === "") {
      return;
    }
    setMovies([]);
    setPage(1);
    getMovies();
    Keyboard.dismiss();
  };

  //LoadMore pagination. || Increments the page value
  const handleLoadMore = () => {
    setIsLoading(true);
    setPage((prevPage) => prevPage + 1);
  };

  // To render the LoadMore button and spinner when loading
  const renderFooter = () => {
    if (isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <>
          {showLoadMoreBtn && (
            <View style={styles.loadMore}>
              <Button title="Load More" onPress={handleLoadMore} />
            </View>
          )}
        </>
      );
    }
  };

  return (
    <>
      <View style={styles.searchview}>
        <TextInput
          placeholder="Search by title"
          value={searchMovie}
          onChangeText={(text) => setSearchMovie(text)}
          style={styles.searchbox}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Image
            style={styles.searchImage}
            source={SearchIcon}
            onPress={handleSearch}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={movies}
        renderItem={({ item, index }) => (
          <MovieCard
            movieData={movies}
            index={index}
            onPress={(movie) =>
              navigation.navigate("MoviesDetailScreen", {
                imdbId: movie.imdbID,
                movieName: movie.Title,
              })
            }
          />
        )}
        keyExtractor={(item) => item.imdbID}
        ListFooterComponent={renderFooter()}
      />
    </>
  );
}
