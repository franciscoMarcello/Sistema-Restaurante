import React, { useState, createContext, ReactNode, useEffect } from "react";
import { api } from "../services/api";
import AsyncStorege from "@react-native-async-storage/async-storage";
type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  loading: boolean;
  loadingAuth: boolean;
  signOut: () => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
};
type AuthProviderProps = {
  children: ReactNode;
};
type SignInProps = {
  email: string;
  password: string;
};
export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: "",
    name: "",
    token: "",
    email: "",
  });
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user.name;
  useEffect(() => {
    async function getUser() {
      //Pegando dados do user do asyncStorage
      const userInfo = await AsyncStorege.getItem("@token");
      let hasUser: UserProps = JSON.parse(userInfo || "{}");

      if (Object.keys(hasUser).length > 0) {
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${hasUser.token}`;
        setUser({
          id: hasUser.id,
          name: hasUser.name,
          email: hasUser.email,
          token: hasUser.token,
        });
      }
      setLoading(false);
    }
    getUser();
  }, []);

  async function signIn({ email, password }: SignInProps) {
    setLoadingAuth(true);
    try {
      const response = await api.post("/session", {
        email,
        password,
      });
      const { id, name, token } = response.data;

      const data = {
        ...response.data,
      };
      await AsyncStorege.setItem("@token", JSON.stringify(data));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser({
        id,
        name,
        email,
        token,
      });
      setLoadingAuth(false);
    } catch (err) {
      console.log("erro ao acessar", err);
      setLoadingAuth(false);
    }
  }
  async function signOut() {
    await AsyncStorege.clear().then(() => {
      setUser({
        id: "",
        name: "",
        token: "",
        email: "",
      });
    });
  }
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, loading, loadingAuth, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
