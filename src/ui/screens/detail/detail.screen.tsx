import { FlatList, Image, ListRenderItem, Text, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen } from '../../navigation/types';
import { RouteProp } from '@react-navigation/native';
import { GenericCard } from '../../atoms/genericCard/genericCard.atom';
import { styles } from './detail.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../../atoms/button/button.atom';


interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Detail>;
  route: RouteProp<MainParamList, Screen.Detail>;
}

const DetailScreen = ({ navigation, route }: Props) => {
  const { top, bottom } = useSafeAreaInsets();
  const { item } = route.params;
  
  return (
    <View style={[styles.container, { marginTop: top, marginBottom: bottom }]}>
      <Text style={styles.row}>{item.title}</Text>
      <Image source={{ uri: item.image }} style={styles.imageStyle} />
      <Text style={styles.row}>{item.category.toUpperCase()}</Text>
      <Text style={styles.row}>{item.description}</Text>
      <Text style={styles.row}>{item.price} $</Text>
      <Button title={'Back'} onPress={navigation.goBack} />
    </View>
  );
};

export default DetailScreen;
