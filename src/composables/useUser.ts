import { reactive, toRefs } from "vue";
import {
  UserLoginParam,
  UserMe,
  UserMeUpdate,
  UserRegisterParam,
} from "./types/user";
import { http } from "../services/http/client";
import { useGlobal } from "./useGlobal";
import router from "src/router";
import { parseError } from "src/Utils/ErrorHandling";

const ACCESS_TOKEN = "_token";

const { setLoading } = useGlobal();

interface UserState {
  user: UserMe;
  authErrorMessage: string[];
  updateErrorMessage: string[];
  authLoading: boolean;
}

const userState = reactive<UserState>({
  user: {} as UserMe,
  authErrorMessage: [],
  updateErrorMessage: [],
  authLoading: false,
});

export const useUser = () => {
  const setUserAuth = (token: string) => {
    userState.user.token = token;
    localStorage.setItem(ACCESS_TOKEN, token);
  };

  const doRegister = async (param: UserRegisterParam) => {
    userState.authLoading = true;
    try {
      const { data, status } = await http.post<
        any,
        { data: { user: UserMe }; status: any }
      >("/users", { user: param });
      userState.user = data.user;
      userState.authErrorMessage = [];
      setUserAuth(userState.user.token!);
      userState.authLoading = false;

      router.push({ name: "Home" });
    } catch (error: any) {
      userState.authErrorMessage = parseError(error?.response.data.errors);
      userState.authLoading = false;
    }
  };
  const doLogIn = async (param: UserLoginParam) => {
    userState.authLoading = true;
    try {
      const { data, status } = await http.post<
        any,
        { data: { user: UserMe }; status: any }
      >("/users/login", { user: param });
      userState.user = data.user;
      userState.authErrorMessage = [];
      setUserAuth(userState.user.token!);
      userState.authLoading = false;
      router.push({ name: "Home" });
    } catch (error: any) {
      userState.authErrorMessage = parseError(error?.response.data.errors);
      userState.authLoading = false;
    }
  };
  const doLogOut = () => {
    cleanLS();
    router.push({ name: "Home" });
  };
  const getUser = async () => {
    setLoading(true);
    try {
      const { data, status } = await http.get<
        any,
        { data: { user: UserMe }; status: any }
      >("/user");
      userState.user = data.user;
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };
  const updateUser = async (param: UserMeUpdate) => {
    userState.authLoading = true;
    try {
      const { data, status } = await http.put<
        any,
        { data: { user: UserMe }; status: any }
      >("/user", { user: param });
      userState.user = data.user;
      userState.updateErrorMessage = [];
      setUserAuth(userState.user.token!);
      userState.authLoading = false;
      router.push({ name: "Profile" });
    } catch (error: any) {
      userState.updateErrorMessage = parseError(error?.response.data.errors);
      userState.authLoading = false;
    }
  };

  const checkLS = () => {
    const access_token = localStorage.getItem(ACCESS_TOKEN);
    if (access_token) {
      setUserAuth(access_token);

      return true;
    }
    return false;
  };
  const cleanLS = () => {
    userState.user = {} as UserMe;
    localStorage.removeItem(ACCESS_TOKEN);
  };
  checkLS();

  return {
    doRegister,
    doLogIn,
    doLogOut,
    getUser,
    updateUser,
    checkLS,
    cleanLS,
    ...toRefs(userState),
  };
};
