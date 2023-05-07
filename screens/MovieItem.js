import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const MovieItem = ({ movie }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.poster} source={{ uri: movie.Poster }} />
      <View style={styles.details}>
        <Text style={styles.title}>{movie.Title}</Text>
        <Text style={styles.year}>{movie.Year}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  poster: {
    width: 60,
    height: 90,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  year: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
  },
});

export default MovieItem;