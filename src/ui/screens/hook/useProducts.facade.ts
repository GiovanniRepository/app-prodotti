import { useState, useCallback } from 'react';
import { PREFERRED_PRODUCTS, Product } from '../../../core/storage/types';
import { storage } from '../../../core/storage/storage';




export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [initialProducts, setInitialProducts] = useState<Product[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const refreshProducts = useCallback(async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setInitialProducts([...data]);
      setProducts([...data]);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, []);
  
  const loadFavorites = useCallback(async () => {
    try {
      const storedFavorites = await storage.getItem(PREFERRED_PRODUCTS);
      const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      setFavoriteIds(parsedFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  const addFavorite = useCallback(
    async (item: Product) => {
      const updatedFavorites = favoriteIds.includes(item.id)
        ? favoriteIds.filter((id) => id !== item.id)
        : [...favoriteIds, item.id];

      setFavoriteIds(updatedFavorites);
      await storage.setItem(PREFERRED_PRODUCTS, JSON.stringify(updatedFavorites));
    },
    [favoriteIds]
  );


  const loadCategories = useCallback(async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      const categories:any =[]
      data.forEach((element:any) => {
        categories.push({label: element, value: element})
      });
      setCategories(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  return {
    products,
    setProducts,
    initialProducts,
    setInitialProducts,
    favoriteIds,
    refreshProducts,
    loadFavorites,
    addFavorite,
    categories,
    setCategories,
    loadCategories
  };
};
