<template>
  <div class="card-wrapper" ref="card">
    <a :href="`https://www.reddit.com${post.permalink}`" class="permalink" target="_blank">
      <h3>{{ post.title }}</h3>
    </a>
    <p class="author">Posted by @{{ post.author }} on {{ post.subreddit }}</p>
    <div class="image-container">
      <!-- Blur the image if its nsfw -->
      <img :src="image" v-if="image" :class="[{ blurred: isOver18 }]" />
      <div class="nsfw" v-if="isOver18" @click="isOver18 = false">Click here to see NSFW post</div>
    </div>
  </div>
</template>
<script>
export default {
  // post is the object from the reddit api with the data needed for the card
  // the index prop is needed to observe just the last element of the list using modulo
  props: ["post", "index"],
  data() {
    return {
      // set the initial value that cames from the api
      isOver18: this.post.over_18
    };
  },
  computed: {
    image() {
      if (this.post.is_self) {
        return false;
      }
      //check if the url is an image
      let urlIsImage = this.isImage(this.post.url);
      //if its an image just return the url
      if (urlIsImage) {
        return this.post.url;
        //otherwise check if the thumbnail is
      } else {
        return this.isImage(this.post.thumbnail) ? this.post.thumbnail : false;
      }
    }
  },
  mounted() {
    // call the intersection observer method
    this.observerPosts();
  },
  methods: {
    isImage(url) {
      return (
        url.indexOf(".jpg") != -1 ||
        url.indexOf(".png") != -1 ||
        url.indexOf(".gif") != -1
      );
    },
    observerPosts() {
      // if the modulo return 0, then its the last item, and the observer will be attached
      if (this.index % 24 == 0 && this.index != 0) {
        //get the item to observe
        const itemList = this.$refs.card;
        let options = {
          rootMargin: "0px 0px 700px 0px",
          threshold: [0.5, 1]
        };

        let observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
              // when the item is intersected fire the load event, to load the next 25 posts
              this.$emit("load");
              // remove the observer after its intersected
              observer.unobserve(itemList);
            }
          });
        });
        observer.observe(itemList);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.card-wrapper {
  max-width: 400px;
  width: 100%;
  margin: 20px;
  background: #fff;
  color: #212121;
  padding-top: 20px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  img {
    width: 100%;
  }
  h3 {
    font-size: 16px;
    padding: 0px 20px;
    color: rgba(0, 0, 0, 0.72);
  }
  a {
    text-decoration: none;
  }
  .author {
    font-size: 16px;
    padding: 0px 20px;
  }
  .image-container {
    position: relative;
    overflow: hidden;
    .blurred {
      filter: blur(30px);
    }
    img {
      transition: all 0.3s ease-in-out;
      display: block;
    }
    .nsfw {
      position: absolute;
      width: 100%;
      top: 30px;
      text-align: center;
      background: #212121;
      color: #fff;
      padding: 20px 15px;
      cursor: pointer;
    }
  }
}
</style>
