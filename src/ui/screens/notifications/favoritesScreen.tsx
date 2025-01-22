import React, { useCallback, useEffect, useMemo } from 'react';
import { FlatList, View, Text } from 'react-native';
import { styles } from './favorites.styles';
import Card from '../../atoms/product/product.atom';
import { useProducts } from '../hook/useProducts.facade';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen } from '../../navigation/types';

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Favorites>;
}

const FavoritesScreen = ({ navigation }: Props) => {
  const { products, favoriteIds, refreshProducts, loadFavorites, addFavorite } = useProducts();

  // **DATA ** //
  const favorites = useMemo(
    () => products.filter((cart) => favoriteIds.includes(cart.id)),
    [products, favoriteIds]
  );

  // ** CALLBACKS ** //
  const renderItem = useCallback(
    ({ item }:any) => (
      <Card
        product={item}
        onAddFavorite={() => addFavorite(item)}
        selected={favoriteIds.includes(item.id)}
      />
    ),
    [addFavorite, favoriteIds]
  );

  const ItemSeparatorComponent = useCallback(() => <View style={styles.itemSeparator}></View>, []);

  // ** USE EFFECT ** //
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshProducts();
      loadFavorites();
    });

    return unsubscribe;
  }, [loadFavorites, navigation, refreshProducts]);

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      ) : (
        <Text>No favorites</Text>
      )}
    </View>
  );
};

export default FavoritesScreen;
