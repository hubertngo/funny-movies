import { create } from 'zustand';

import { logout, UserType } from 'src/apis/users';

type AuthStoreType = {
  auth: UserType;
  setAuth: (userData?: UserType) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStoreType>((set, get) => ({
  auth: {},
  setAuth: (userData?: UserType) => {
    set({ auth: userData });
  },
  logout: async () => {
    set({ auth: {} });
    await logout();
  },
}));
