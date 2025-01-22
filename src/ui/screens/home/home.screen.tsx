import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { styles } from "./home.styles";
import Card from "../../atoms/product/product.atom";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainParamList, Screen } from "../../navigation/types";
import { useProducts } from "../hook/useProducts.facade";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../atoms/button/button.atom";
import { Picker } from "../../atoms/picker/picker.atom";
import { Product } from "../../../core/storage/types";

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Home>;
}

enum FilterType {
  initial = "initial",
  ascendentRating = "ascendentRating",
  descendentRating = "descendentRating",
  ascendentAlphabetically = "ascendentAlphabetically",
  descendentAlphabetically = "descendentAlphabetically",
  category = "category",
  rating = "rating",
  reset = "reset",
}

const HomeScreen = ({ navigation }: Props) => {
  const {
    products,
    setProducts,
    initialProducts,
    favoriteIds,
    refreshProducts,
    loadFavorites,
    addFavorite,
    loadCategories,
    categories,
  } = useProducts();
  const [filterType, setFilterType] = useState<FilterType>(FilterType.initial);
  const [openFilter, setOpenFilter] = useState<boolean>(true);
  const [ratingFilterValue, setRatingFilterValue] = useState<string>("");
  const [categoryFilterValue, setCategoryFilterValue] = useState<string>("");

  const onFilterApply = useCallback(
    (type: FilterType, value?: string) => {
      setFilterType(type);

      switch (type) {
        case FilterType.ascendentAlphabetically: {
          const sortedAlphabetically = products.sort((a, b) => {
            if (a.category < b.category) return -1;
            if (a.category > b.category) return 1;
            return 0;
          });
          setProducts(sortedAlphabetically);
          break;
        }

        case FilterType.descendentAlphabetically: {
          const sortedAlphabetically = products.sort((a, b) => {
            if (a.category < b.category) return 1;
            if (a.category > b.category) return -1;
            return 0;
          });
          setProducts(sortedAlphabetically);
          break;
        }

        case FilterType.descendentRating: {
          const sortedRating = products.sort(
            (a, b) => b.rating.rate - a.rating.rate
          );
          setProducts(sortedRating);
          break;
        }

        case FilterType.ascendentRating: {
          const sortedRating = products.sort(
            (a, b) => a.rating.rate - b.rating.rate
          );
          setProducts(sortedRating);
          break;
        }

        case FilterType.category: {
          if (value === "null") {
            setProducts(products);
          } else {
            const filteredProducts = initialProducts.filter(
              (product: Product) => {
                if (ratingFilterValue) {
                  return (
                    product.category === value &&
                    parseInt(ratingFilterValue) - 1 <= product.rating.rate &&
                    product.rating.rate <= parseInt(ratingFilterValue)
                  );
                }
                return product.category === value;
              }
            );
            setProducts(filteredProducts);
          }
          setCategoryFilterValue(value ?? "");
          break;
        }

        case FilterType.rating: {
          if (value === "null") {
            setProducts(products);
          } else {
            const filteredProducts = initialProducts.filter((product: any) => {
              if (value && categoryFilterValue) {
                return (
                  parseInt(value) - 1 <= product.rating.rate &&
                  product.rating.rate <= parseInt(value) &&
                  product.category === categoryFilterValue
                );
              } else if (value) {
                return (
                  parseInt(value) - 1 <= product.rating.rate &&
                  product.rating.rate <= parseInt(value)
                );
              }
              return null;
            });
            setProducts(filteredProducts);
          }
          setRatingFilterValue(value ?? "");
          break;
        }

        case FilterType.reset: {
          setProducts(initialProducts);
          setRatingFilterValue("");
          setCategoryFilterValue("");
          break;
        }

        default:
          setProducts(initialProducts);
      }
    },
    [products, initialProducts, setProducts]
  );

  const renderFilterButtons = useCallback(() => {
    return (
      <>
        {openFilter ? (
          <View style={styles.filtersContainer}>
            <Text>Category filter</Text>
            <Picker
              items={categories}
              value={categoryFilterValue}
              onValueChange={(value: string) =>
                onFilterApply(FilterType.category, value)
              }
              placeholder={"Select category"}
            />
            <Text>Rating range filter</Text>
            <Picker
              items={[
                { label: "0-1", value: "1" },
                { label: "1-2", value: "2" },
                { label: "2-3", value: "3" },
                { label: "3-4", value: "4" },
                { label: "4-5", value: "5" },
              ]}
              value={ratingFilterValue}
              onValueChange={(value: string) =>
                onFilterApply(FilterType.rating, value)
              }
              placeholder={"Select rating"}
            />
            <Text>Rating filter</Text>
            <View style={styles.filterContainer}>
              <Button
                onPress={() => onFilterApply(FilterType.descendentRating)}
              >
                <Ionicons
                  name={"arrow-down"}
                  size={24}
                  color={
                    filterType === FilterType.descendentRating
                      ? "green"
                      : "#ffffff"
                  }
                />
              </Button>
              <Button onPress={() => onFilterApply(FilterType.ascendentRating)}>
                <Ionicons
                  name={"arrow-up"}
                  size={24}
                  color={
                    filterType === FilterType.ascendentRating
                      ? "green"
                      : "#ffffff"
                  }
                />
              </Button>
            </View>
            <Text>Category alphabetical filter</Text>
            <View style={styles.filterContainer}>
              <Button
                onPress={() =>
                  onFilterApply(FilterType.descendentAlphabetically)
                }
              >
                <Ionicons
                  name={"arrow-down"}
                  size={24}
                  color={
                    filterType === FilterType.descendentAlphabetically
                      ? "green"
                      : "#ffffff"
                  }
                />
              </Button>
              <Button
                onPress={() =>
                  onFilterApply(FilterType.ascendentAlphabetically)
                }
              >
                <Ionicons
                  name={"arrow-up"}
                  size={24}
                  color={
                    filterType === FilterType.ascendentAlphabetically
                      ? "green"
                      : "#ffffff"
                  }
                />
              </Button>
            </View>
            <Button
              title="Reset"
              onPress={() => onFilterApply(FilterType.reset)}
            />

            <Ionicons
              name={"chevron-up"}
              size={24}
              color={"black"}
              onPress={() => setOpenFilter(!openFilter)}
            />
            <Text>Close Filters</Text>
          </View>
        ) : (
          <View style={styles.filtersContainer}>
            <Text>Expand Filters</Text>
            <Ionicons
              name={"chevron-down"}
              size={24}
              color={"black"}
              onPress={() => setOpenFilter(!openFilter)}
            />
          </View>
        )}
      </>
    );
  }, [
    filterType,
    onFilterApply,
    categories,
    openFilter,
    ratingFilterValue,
    categoryFilterValue,
  ]);

  const renderItem = useCallback(
    ({ item }: any) => (
      <Card
        product={item}
        onAddFavorite={() => addFavorite(item)}
        selected={favoriteIds.includes(item.id)}
        onPress={() => {
          if (!item.id) {
            return;
          }
          navigation.navigate(Screen.Detail, {
            item,
          });
        }}
      />
    ),
    [addFavorite, products, favoriteIds, navigation]
  );

  const ItemSeparatorComponent = useCallback(
    () => <View style={styles.itemSeparator}></View>,
    []
  );

  // ** USE EFFECT ** //
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refreshProducts();
      loadFavorites();
      loadCategories();
    });

    return unsubscribe;
  }, [loadFavorites, navigation, refreshProducts]);

  return (
    <View style={styles.container}>
      {renderFilterButtons()}

      <FlatList
        showsVerticalScrollIndicator={false}
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
};

export default HomeScreen;
