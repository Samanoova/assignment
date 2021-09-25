<template>
  <div class="account w-1/2 mx-auto p-4">
    <div class="rounded border">
      <MyAccountTabs />
      <div id="tab-contents">
        <router-view> </router-view>
      </div>
    </div>
    <div class="text-right mt-3">
      <LogoutButton />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MyAccountTabs from "../../components/MyAccountTabs.vue";
import LogoutButton from "../../components/LogoutButton.vue";

export default {
  name: "Account",
  components: { MyAccountTabs, LogoutButton },
  computed: {
    ...mapState(["successLogin"]),
  },
  mounted() {
    // if (!this.successLogin) {
    //   this.$router.push("/login");
    // }
  },
  methods: {},
};
</script>
