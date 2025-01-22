import React, { memo } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import styles from "./product.styles";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "../../../core/storage/types";


interface ProductCardProps {
  product: Product;
  selected: boolean;
  onPress?: () => void;
  onAddFavorite: () => void;
}

const Card = ({ product, selected, onAddFavorite, onPress }: ProductCardProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <Image source={{ uri: product.image }} style={styles.imageStyle} />
          <View style={styles.favoriteIcon}>
            <Ionicons
              onPress={onAddFavorite}
              name={selected ? "heart-sharp" : "heart-outline"}
              size={28}
              color={"#ffd700"}
            />
          </View>
        </View>
        <Text style={styles.genericCardText}>{product.title}</Text>
        <Text style={styles.genericCardText}>{product.description}</Text>
        <Text style={styles.genericCardText}>
         Category: {product.category}
        </Text>
        <Text style={styles.genericCardText}>
         Price: {product.price} $
        </Text>
        <Text style={styles.genericCardText}>
          Rating: {product.rating.rate}
        </Text>
      </View>
    </Pressable>
  );
};

export default memo(Card);
