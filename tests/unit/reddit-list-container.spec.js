import { shallowMount } from "@vue/test-utils";
import RedditListContainer from "@/components/reddit-list-container.vue";

function mountComponentWithProps(Component, propsData) {
    const vm = shallowMount(RedditListContainer, {
        propsData
    });

    return vm;
}

describe("RedditListItem.vue", () => {
    it("Post data should have a length of 25", async () => {
        const wrapper = mountComponentWithProps(RedditListContainer, {});
        await wrapper.vm.getRedditPosts();
        expect(wrapper.vm.posts).toHaveLength(25);
        wrapper.destroy()
    });

});
