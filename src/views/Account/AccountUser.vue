<template>
  <div class="p-4">
    {{ userInfo.username }}
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AccountUser",

  computed: {
    ...mapState(["userInfo"]),
  },
};
</script>
