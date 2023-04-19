<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="this.$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header/index.vue";
import Footer from "@/components/Footer/index.vue";

export default {
  name: "",
  components: {
    Header,
    Footer
  },
  mounted() {
    this.$store.dispatch("getCategory");
    if (this.$route.path != "/home") {
      this.show = false;
    }
  }
};
</script>

<style>
</style>
