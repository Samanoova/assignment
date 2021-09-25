<template>
  <div class="home text-center">
    <div v-if="!successLogin">
      <h1 class="mb-2 text-2xl font-bold">Welcome to our Portal</h1>
      <router-link
        to="/login"
        class="
          bg-blue-500
          hover:bg-blue-700
          text-white
          font-bold
          py-2
          px-4
          rounded
          inline-block
          cursor-pointer
        "
      >
        Please Go to Login
      </router-link>
    </div>
    <div v-else>
      <div class="mb-2 text-lg font-bold">Welcome back {{ name }}</div>
      <router-link
        to="/account/user"
        class="
          bg-blue-500
          hover:bg-blue-700
          text-white
          font-bold
          py-2
          px-4
          rounded
          inline-block
          cursor-pointer
          mb-3
        "
      >
        My Account
      </router-link>
      <br />
      <LogoutButton />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LogoutButton from "../components/LogoutButton.vue";

export default {
  name: "Home",
  components: { LogoutButton },
  computed: {
    ...mapState(["successLogin"]),
  },
  data() {
    return {
      name: localStorage.currentProfile
        ? JSON.parse(localStorage.currentProfile).name
        : "",
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
