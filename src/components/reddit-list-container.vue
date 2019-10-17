<template>
  <div class="list" ref="list">
    <reddit-list-item
      v-for="(post, i) in posts"
      :key="post.id"
      :post="post.data"
      :index="i"
      ref="item"
      @load="getRedditPosts"
    ></reddit-list-item>
    <div v-if="loading" class="loading">Loading more items...</div>
  </div>
</template>
<script>
import RedditListItem from "@/components/reddit-list-item.vue";
import axios from "axios";
export default {
  components: {
    RedditListItem
  },
  data() {
    return {
      posts: [],
      afterPost: "",
      limit: 25,
      sort: "new",
      loading: false
    };
  },
  mounted() {
    this.getRedditPosts();
  },
  methods: {
    async getRedditPosts() {
      this.loading = true;
      const { data } = await axios(
        `https://www.reddit.com/r/all/new.json?sort=${this.sort}&limit=${this.limit}&after=${this.afterPost}&over_18=true`
      );
      this.posts = [...this.posts, ...data.data.children];
      this.afterPost = data.after;
      this.loading = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.list {
  display: flex;
  flex-flow: wrap column;
  align-items: center;
  .loading {
    text-align: center;
  }
}
</style>
