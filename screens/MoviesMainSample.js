import React, { useState, useEffect } from 'react';
import { View, Text,Image, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native';
import MovieCard from '../components/MovieCard/MovieCard';
import MovieItem from './MovieItem';
//import { fetchMovies } from "../api/index";

const MoviesMainSample = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  

  const getMovies = async () => {

    try {

    const apiKey = 'd0aca1e3';
    const apiUrl = `http://www.omdbapi.com/?s=star+wars&apikey=${apiKey}&page=${page}`;
    const response = await fetch(apiUrl);

    const data = await response.json();

    if (data && data.Search) {
        //setMovies([...movies, ...data.Search]);
        setMovies((prevMovies) => [...prevMovies, ...data.Search]);
        setIsLoading(false);
    }

    //setMovies((prevMovies) => [...prevMovies, ...response.data.Search]);
    

    } catch (error) {
      console.error(error);
    }
  };

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(
//         `https://www.omdbapi.com/?apikey=<your-api-key>&s=${searchTerm}&page=${page}`
//       );
//       const data = await response.json();
//       if (data && data.Search) {
//         setMovies([...movies, ...data.Search]);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

  useEffect(() => {
    getMovies();
  }, [page]);

  const handleLoadMore = () => {
    setIsLoading(true);
    setPage((prevPage) => prevPage + 1);
  };

  const renderFooter = () => {
    if (isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={styles.loadMore}>
          <Button title="Load More" onPress={handleLoadMore} />
        </View>
      );
    }
  };

  const renderItem = ({ item, index }) => {
    if (index % 2 === 0) {
      return (
        <View style={styles.row} key={item.imdbID}>
          <View style={styles.column}>
            <Image
              style={styles.poster}
              source={{ uri: item.Poster }}
              resizeMode="cover"
            />
            <Text style={styles.title}>{item.Title}</Text>
          </View>
          {movies[index + 1] && (
            <View style={styles.column}>
              <Image
                style={styles.poster}
                source={{ uri: movies[index + 1].Poster }}
                resizeMode="cover"
              />
              <Text style={styles.title}>{movies[index + 1].Title}</Text>
            </View>
          )}
        </View>
      );
    } else {
      return null;
    }
  };

  //return <View style={styles.container}>{isLoading ? <Text>Loading...</Text> : renderMovies()}</View>;

  return (
    <>
    
    <FlatList
      data={movies}
      //renderItem={renderItem}
      renderItem={({item,index }) => <MovieCard movieData= {movies} movie={item} index={index} />}
      keyExtractor={(item) => item.imdbID}
      ListFooterComponent={renderFooter()} 
      
    />
    </>
    
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    paddingVertical: 20,
  },
  loadMore: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  movieList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  poster: {
    width: '100%',
    height: 200,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MoviesMainSample;
















// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// //import { fetchMovies } from "../api/index";
// const url = "http://www.omdbapi.com/?apikey=d0aca1e3&s=batman";

// const API_KEY = 'd0aca1e3';
// const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&type=movie&s=`;

// const MoviesMainSample = () => {
//   const [movies, setMovies] = useState([]);
//   const [page, setPage] = useState(1);
  
// //   useEffect(() => {
// //     getMovies();
// //   }, []);

//   useEffect(() => {
//     fetchMovies();
//   }, []);
  
//   const fetchMovies = async () => {
//     const response = await fetch(`${API_URL}&page=${page}`);

//     setMovies(response);

//     // if (Array.isArray(response)) {
//     //     setMovies((prevMovies) => [...prevMovies, ...response]);
//     // }
    
//         //setMovies(movies => [...movies, ...response]);

    
//     //setMovies(response);
//   };

  

//   const getMovies = async () => {
//     const response = await fetchMovies("batman",page);
//     setMovies(response);
//     if(movies === undefined){
//         //setMovies(response);

//     }else{
//         //setMovies(movies => [...movies, ...response]);
        
//     }
//     //setMovies(movies => [...movies, ...response]);
//     //setSearchMovie("");
//   };

// //   const fetchMovies = async () => {
// //     const response = await fetch(`${url}&page=${page}`);
// //     setMovies(movies => [...movies, ...response.data.Search]);
// //   };
  
//   const handleLoadMore = () => {
//     setPage(page => page + 1);
//   };
  
//   const renderMovie = ({ item }) => (
//     <View style={styles.movie}>
//       <Text style={styles.title}>{item.Title}</Text>
//       <Text style={styles.year}>{item.Year}</Text>
//     </View>
//   );
  
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={movies}

//         renderItem={(item) => (
//             <View style={styles.movie}>
//                 <Text style={styles.title}>{item.Title}</Text>
//                 <Text style={styles.year}>{item.Year}</Text>
//             </View>
//           )}

        
//         // renderItem={(renderMovie)}
//         keyExtractor={item => item.imdbID}
//       />
//       <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
//         <Text style={styles.loadMoreButtonText}>Load More</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   movie: {
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   year: {
//     fontSize: 14,
//     color: '#888',
//   },
//   loadMoreButton: {
//     alignSelf: 'center',
//     backgroundColor: '#f1c40f',
//     padding: 8,
//     borderRadius: 8,
//     marginTop: 16,
//   },
//   loadMoreButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
// });



// export default MoviesMainSample;