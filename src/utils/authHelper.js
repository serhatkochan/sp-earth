import {
  LocalStorageKeys,
  GetLocalStorageItem,
  UpdateLocalStorageItem,
  SetLocalStorageItem,
  DeleteLocalStorageItem,
} from 'utils/localStorageHelper';

export const SetAuthInfo = (user) => {
  const localData = GetLocalStorageItem(LocalStorageKeys.AUTH);
  if (localData && localData.userId !== 0) {
    UpdateLocalStorageItem(LocalStorageKeys.AUTH, user);
  } else {
    SetLocalStorageItem(LocalStorageKeys.AUTH, user);
  }
};
export const GetAuthInfo = () => {
  const localData = GetLocalStorageItem(LocalStorageKeys.AUTH);
  return localData;
};

export const GetAuthInfoByKey = (key) => {
  const localData = GetLocalStorageItem(LocalStorageKeys.AUTH);
  let result;
  if (localData && localData.hasOwnProperty(key)) {
    result = localData[key];
  } else {
    result = null;
  }
  return result;
};

export const IsLogin = () => {
  const localData = GetLocalStorageItem(LocalStorageKeys.AUTH);
  return localData && localData.userId !== 0;
};

export const LogoutAuth = () => {
  DeleteLocalStorageItem(LocalStorageKeys.AUTH);
};
