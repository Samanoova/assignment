<template>
  <div
    class="
      bg-red-500
      hover:bg-red-700
      text-white
      font-bold
      py-2
      px-4
      rounded
      inline-block
      cursor-pointer
    "
    @click="logout()"
  >
    Log Out
  </div>
</template>
<script>
export default {
  name: "LogoutButton",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout", this.$router);
    },
  },
};
</script>
