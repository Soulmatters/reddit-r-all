<template>
  <div id="app">
    <h1>Reddit r/all feed</h1>
    <reddit-list-container></reddit-list-container>
  </div>
</template>

<script>
const RedditListContainer = () =>
  import(
    /* webpackChunkName: "reddit-list-container" */ "@/components/reddit-list-container.vue"
  );
export default {
  name: "app",
  components: {
    RedditListContainer
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #212121;
}
h1 {
  text-align: center;
}
</style>
