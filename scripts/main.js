const userURL = "https://jsonplaceholder.typicode.com/users";
const postsURL = "https://jsonplaceholder.typicode.com/posts";

class Letter {
    async fetchAPI(url) {
        const request = await (await fetch(url)).json();
        return request;
    }

    mergeData(user, posts) {
        const response = user;
        const { address, company } = user;
        const { street, suite, city, zipcode } = address;

        response.address = `${street}, ${suite} - ${zipcode} ${city}`;
        response.company = company.name;
        response.posts = posts;

        return response;
    }

    filterPosts(posts, userId) {
        return posts.filter(post => {
            if (post.userId === userId) {
                delete post.userId;
                return post;
            }
        });
    }

    async get() {
        try {
            const posts = await this.fetchAPI(postsURL);
            const users = await this.fetchAPI(userURL);

            return users.map((user) => {
                const userPosts = this.filterPosts(posts, user.id);
                return this.mergeData(user, userPosts);
            });
        } catch ({ message, cause }) {
            return { message, cause };
        }
    }
}

module.exports = Letter;