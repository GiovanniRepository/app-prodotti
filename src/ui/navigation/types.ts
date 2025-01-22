export enum Screen {
  TabNavigator = "TabNavigator",
  Home = "Home",
  Detail = "Detail",
  Settings = "Settings",
  Favorites = "Favorites",
}

export type TabParams = {
  [Screen.Home]: {
    hasFavoritesUpdated: boolean;
  };
  [Screen.Settings]: undefined;
  [Screen.Favorites]: {
    hasFavoritesUpdated: boolean;
  };
};

export type MainParamList = {
  TabNavigator: undefined;
  [Screen.Detail]: {
    item: {
      id: number;
      title: string;
      price: number;
      image: string;
      description: string;
      category: string;
    };
  };
};
