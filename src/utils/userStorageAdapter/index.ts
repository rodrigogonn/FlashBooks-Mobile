import AsyncStorage from '@react-native-async-storage/async-storage';

export const createUserSpecificStorage = (userId: string) => ({
  getItem: async (key: string) => {
    return AsyncStorage.getItem(`${userId}-${key}`);
  },
  setItem: async (key: string, value: string) => {
    return AsyncStorage.setItem(`${userId}-${key}`, value);
  },
  removeItem: async (key: string) => {
    return AsyncStorage.removeItem(`${userId}-${key}`);
  },
});
