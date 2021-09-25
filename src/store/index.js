import Vue from "vue";
import Vuex from "vuex";
//this file is used to mock the users data when trying to fetch them from our mocked APIs
//(loginAPI, fetchDataAPI) to simulate real requests
import data from "../data/users.json";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: undefined,
    userProfiles: undefined,
    loginErrorMessage: undefined,
    successLogin: false,
    currentProfile: undefined,
  },
  mutations: {
    setSuccessLogin(state, successLogin) {
      state.successLogin = successLogin;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    setUserProfiles(state, userProfiles) {
      state.userProfiles = userProfiles;
    },
    setLoginErrorMessage(state, loginErrorMessage) {
      state.loginErrorMessage = loginErrorMessage;
    },
    setCurrentProfile(state, currentProfile) {
      localStorage.currentProfile = JSON.stringify(currentProfile);
      state.currentProfile = currentProfile;
    },
  },
  actions: {
    /* get user data by token  */
    fetchUserData({ commit }, token) {
      /* this promise is used to simulate the back-end request API */
      const fetchDataAPI = new Promise((resolve, reject) => {
        const matchedUser = data.find((user) => {
          return user.token == token;
        });
        if (matchedUser) {
          resolve({
            success: true,
            token: matchedUser.token,
            user: { username: matchedUser.email },
            profiles: matchedUser.profiles,
          });
        } else {
          reject({ success: false, message: "Invalid or Expired Token" });
        }
      });

      return fetchDataAPI
        .then((response) => {
          commit("setSuccessLogin", true);
          commit("setUserInfo", response.user);
          commit("setUserProfiles", response.profiles);
          if (response.profiles.length == 1) {
            commit("setCurrentProfile", response.profiles[0]);
          } else {
            if (localStorage.currentProfile) {
              commit(
                "setCurrentProfile",
                JSON.parse(localStorage.currentProfile)
              );
            }
          }
          localStorage.token = response.token;
        })
        .catch((error) => {
          commit("setSuccessLogin", false);
          commit("setLoginErrorMessage", error.message);
        });
    },

    /* the current profile is the profile who's the user select when he login if he have more than one profile */
    setCurrentProfile({ commit }, currentProfile) {
      commit("setCurrentProfile", currentProfile);
    },

    logout({ commit }, router) {
      commit("setSuccessLogin", false);
      commit("setUserInfo", undefined);
      commit("setUserProfiles", undefined);
      localStorage.removeItem("token");
      localStorage.removeItem("currentProfile");
      router.push("/login");
    },

    login({ commit }, auth) {
      /* this promise is used to simulate the back-end request API */
      const loginAPI = new Promise((resolve, reject) => {
        /* set timeout for simulate the real call of api  */
        setTimeout(() => {
          const matchedUser = data.find((user) => {
            return user.email == auth.email && user.password == auth.password;
          });
          if (matchedUser) {
            resolve({
              success: true,
              token: matchedUser.token,
              user: { username: matchedUser.email },
              profiles: matchedUser.profiles,
            });
          } else {
            reject({ success: false, message: "Invalid Email Or Password" });
          }
        }, 1500);
      });

      return loginAPI
        .then((response) => {
          commit("setSuccessLogin", true);
          commit("setUserInfo", response.user);
          commit("setUserProfiles", response.profiles);
          if (response.profiles.length == 1) {
            commit("setCurrentProfile", response.profiles[0]);
          }
          localStorage.token = response.token;
        })
        .catch((error) => {
          commit("setSuccessLogin", false);
          commit("setLoginErrorMessage", error.message);
        });
    },
  },
});
