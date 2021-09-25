import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "homePage",
    meta: { title: "Home" },
    component: Home,
  },
  {
    path: "/login",
    name: "loginPage",
    meta: { title: "Login" },
    component: () => import("../views/login.vue"),
  },
  {
    path: "/account",
    name: "accountPage",
    meta: { title: "My Account", requiresAuth: true },
    component: () => import("../views/Account/Account.vue"),
    children: [
      {
        path: "",
        name: "defaultAccountPage",
        redirect: { name: "userPage" },
        meta: { title: "My Account" },
      },
      {
        path: "user",
        name: "userPage",
        meta: { title: "My Account" },
        component: () => import("../views/Account/AccountUser.vue"),
      },
      {
        path: "profile",
        name: "profilePage",
        meta: { title: "My Account" },
        component: () => import("../views/Account/AccountProfile.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// set the title for pages from meta attribute
const DEFAULT_TITLE = "Assignmet";
router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

// in this way we can set the private pages from one place by requiresAuth attribute in meta
router.beforeEach(async (to, from, next) => {
  if (localStorage.token) {
    await store.dispatch("fetchUserData", localStorage.token);
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.successLogin) {
      next({
        path: "/login",
      });
    } else {
      next();
    }
  } else {
    next(); // call next() if it's a public page
  }
});
export default router;
