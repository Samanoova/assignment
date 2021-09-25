<template>
  <div>
    <Profiles />
    <form @submit.prevent="login" class="w-full max-w-sm m-auto">
      <div class="flex items-center mb-6">
        <div class="">
          <label
            class="block text-gray-500 font-bold mb-1 mb-0 pr-4 w-24 text-left"
            for="inline-full-name"
          >
            Email
          </label>
        </div>
        <div class="w-2/3">
          <input
            class="
              bg-gray-200
              appearance-none
              border-2 border-gray-200
              rounded
              w-full
              py-2
              px-4
              text-gray-700
              leading-tight
              focus:outline-none focus:bg-white focus:border-purple-500
            "
            type="email"
            v-model="email"
            required
          />
        </div>
      </div>
      <div class="flex items-center mb-6">
        <div class="">
          <label
            class="block text-gray-500 font-bold mb-1 mb-0 pr-4 w-24 text-left"
          >
            Password
          </label>
        </div>
        <div class="w-2/3">
          <input
            required
            class="
              bg-gray-200
              appearance-none
              border-2 border-gray-200
              rounded
              w-full
              py-2
              px-4
              text-gray-700
              leading-tight
              focus:outline-none focus:bg-white focus:border-purple-500
            "
            type="password"
            v-model="password"
          />
        </div>
      </div>
      <div
        v-if="!successLogin"
        class="mb-2 text-center m-auto text-sm text-red-400"
      >
        {{ loginErrorMessage }}
      </div>
      <div class="flex items-center justify-center">
        <div class="">
          <button
            v-if="!loging"
            class="
              shadow
              bg-purple-500
              hover:bg-purple-400
              focus:shadow-outline focus:outline-none
              text-white
              font-bold
              py-2
              px-4
              rounded
            "
            type="submit"
          >
            Log In
          </button>
          <div
            v-else
            class="
              loader
              ease-linear
              rounded-full
              border-4 border-t-4 border-gray-200
              h-12
              w-12
              mb-4
            "
          ></div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Profiles from "../components/Profiles.vue";
import store from "../store";
export default {
  name: "Login",
  components: { Profiles },
  data() {
    return {
      email: "",
      password: "",
      loging: false,
    };
  },
  computed: {
    ...mapState(["loginErrorMessage"]),
    ...mapState(["successLogin"]),
    ...mapState(["userProfiles"]),
    ...mapState(["isCalling"]),
  },

  beforeRouteEnter(to, from, next) {
    if (store.state.successLogin) {
      next({
        path: "/account",
      });
    } else {
      next();
    }
  },
  methods: {
    selectProfile(profile) {
      this.$store.dispatch("setCurrentProfile", profile);
      this.$router.push("account/user");
    },
    async login() {
      this.loging = true;
      await this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
      this.loging = false;
      if (this.successLogin) {
        if (this.userProfiles.length == 1) {
          this.$router.push("account/user");
        }
      }
    },
  },
};
</script>

<style scoped>
.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
