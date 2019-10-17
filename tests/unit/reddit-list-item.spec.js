import { shallowMount } from "@vue/test-utils";
import RedditListItem from "@/components/reddit-list-item.vue";

function mountComponentWithProps(Component, propsData) {
    const vm = shallowMount(RedditListItem, {
        propsData
    });

    return vm;
}
const post = {
    author: "Arcanaboy",
    id: "dj463d",
    is_self: false,
    is_video: false,
    over_18: true,
    permalink: "/r/traphentai/comments/dj463d/perfect/",
    spoiler: false,
    subreddit: "traphentai",
    thumbnail: "nsfw",
    thumbnail_height: 140,
    thumbnail_width: 140,
    title: "Perfect",
    url: "https://i.redd.it/17maibasq2t31.png"
};
describe("RedditListItem.vue", () => {
    it("image should have blurred class", () => {
        const wrapper = mountComponentWithProps(RedditListItem, { post });
        const image = wrapper.find("img");
        expect(image.classes()).toContain("blurred");
    });

    it("image should contain link", () => {
        const wrapper = mountComponentWithProps(RedditListItem, { post });
        const image = wrapper.find("img");
        expect(image.attributes("src")).toContain(
            "https://i.redd.it/17maibasq2t31.png"
        );
    });
    it("title heading should have text 'Perfect'", () => {
        const wrapper = mountComponentWithProps(RedditListItem, { post });
        const title = wrapper.find("h3");
        expect(title.text()).toBe("Perfect");
    });
    it("Author should have text", () => {
        const wrapper = mountComponentWithProps(RedditListItem, { post });
        const author = wrapper.find(".author");
        expect(author.text()).toBe("Posted by @Arcanaboy on traphentai");
    });
    it("Link should be valid", () => {
        const wrapper = mountComponentWithProps(RedditListItem, { post });
        const link = wrapper.find(".permalink");
        expect(link.attributes("href")).toContain(
            "https://www.reddit.com/r/traphentai/comments/dj463d/perfect/"
        );
    });

    it("nsfw class toggle", () => {
        const wrapper = mountComponentWithProps(RedditListItem, { post });
        const link = wrapper.find(".nsfw");

        expect(wrapper.vm.isOver18).toBeTruthy();
        link.trigger("click");
        expect(wrapper.vm.isOver18).toBeFalsy();
    });
});
