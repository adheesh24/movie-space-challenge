import React from "react";
import { View, Image } from "react-native";
import FilledStarIcon from "../../assets/star-filled.png";
import EmptyStarIcon from "../../assets/star-empty.png";
import styles from "./StarRating.scss";

/* This component is used to display the stars based on the value received.
   Can be further enhanced by displaying the half stars as well.
*/

const StarRating = ({ rating }) => {
  const maxRating = 10; 
  const filledStars = Math.floor(rating); 
  const remainingStars = Math.round(maxRating - rating);

  return (
    <View style={styles.container}>
      {[...Array(filledStars)].map((_, index) => (
        <Image
          key={`star-${index}`}
          source={FilledStarIcon}
          style={styles.star}
        />
      ))}
      {[...Array(remainingStars)].map((_, index) => (
        <Image
          key={`empty-star-${index}`}
          source={EmptyStarIcon}
          style={styles.star}
        />
      ))}
    </View>
  );
};

export default StarRating;
