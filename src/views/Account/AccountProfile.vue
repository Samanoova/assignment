<template>
  <div class="p-4">
    {{ currentProfile ? currentProfile.name : "No selected profile!" }}
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AccountProfile",
  computed: {
    ...mapState(["currentProfile"]),
  },
};
</script>
