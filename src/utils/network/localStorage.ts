import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeDataInAsynStorage = async (key: string, data: any) => {
  let error;
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    error = e;
  }
  return {
    success: error ? false : true,
    error,
  };
};
export const getDataFromAsynStorage = async (key: string) => {
  let data, error;
  try {
    const rawData = await AsyncStorage.getItem(key);
    if (rawData) {
      data = JSON.parse(rawData);
    }
  } catch (e) {
    error = e;
  }
  return {
    success: error ? false : true,
    error,
    data,
  };
};
export const clearAsynStorage = async () => {
  let error;
  try {
    await AsyncStorage.clear();
  } catch (e) {
    error = e;
  }
  return {
    success: error ? false : true,
    error,
    data: 'Async storage is clear',
  };
};
