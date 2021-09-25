<template>
  <div v-if="successLogin" class="text-center">
    <div
      class="
        profiles-container
        w-full
        h-full
        bg-black
        opacity-50
        absolute
        top-0
        left-0
        flex
        justify-center
        items-center
      "
    >
      <div
        class="profiles justify-center gap-5 w-1/2 h-64 bg-white rounded-md p-4"
      >
        <h1 class="mb-4 text-xl text-black font-bold block">
          Select an Account
        </h1>
        <div class="flex justify-center gap-10">
          <div
            @click="selectProfile(profile)"
            class="
              text-lg text-white
              mb-3
              cursor-pointer
              flex
              justify-center
              items-center
              bg-purple-700
              hover:bg-purple-600
              py-2
              px-3
              rounded-md
              shadow-md
            "
            v-for="(profile, index) in userProfiles"
            :key="index"
          >
            {{ profile.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Profiles",
  computed: {
    ...mapState(["successLogin"]),
    ...mapState(["userProfiles"]),
  },

  methods: {
    selectProfile(profile) {
      this.$store.dispatch("setCurrentProfile", profile);
      this.$router.push("account/user");
    },
  },
};
</script>
