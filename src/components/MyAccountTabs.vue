<template>
  <ul id="tabs" class="inline-flex pt-2 px-1 w-full border-b account-tabs">
    <li>
      <router-link
        class="
          cursor-pointer
          px-4
          text-gray-800
          font-semibold
          py-2
          rounded-t
          block
        "
        to="/account/user"
        >User</router-link
      >
    </li>
    <li>
      <router-link
        class="
          cursor-pointer
          px-4
          text-gray-800
          font-semibold
          py-2
          rounded-t
          block
        "
        to="/account/profile"
        >Profile</router-link
      >
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MyAccountTabs",
  computed: {
    ...mapState(["logedin"]),
  },
};
</script>
