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

const letter = new Letter();
const root = document.getElementById("root");

function changePostsVisibility(event) {
    const element = event.target.closest(".user-item").querySelector(".post-list");
    if (element.classList.contains("hidden")) {
        element.classList.remove("hidden");
        event.target.textContent = "Hide posts";
    } else {
        element.classList.add("hidden");
        event.target.textContent = "Show posts";
    }
}

function changeInformationVisibility(event) {
    const element = event.target.closest(".user-item").querySelector(".information-list");
    if (element.classList.contains("hidden")) {
        element.classList.remove("hidden");
        event.target.textContent = "Hide information";
    } else {
        element.classList.add("hidden");
        event.target.textContent = "Show information";
    }
}

function itemTemplate(users) {
    return users.map(user => {
        return `
            <li class="user-item">
                <header>
                    <h2>${user.username}</h2>
                </header>
                <ul>
                    <li>
                        <header>
                            <h2>Personal Informations</h2>
                            <button type="button" onClick="changeInformationVisibility(event)">Show informations</button>
                        </header>
                        <ul class="information-list hidden">
                            ${Object.entries(user).map(([key, val])=> {
                                const blacklist = ["posts", "username", "id"];
                                if (blacklist.includes(key)) return '';
                                return `
                                    <li>
                                        <strong>
                                            ${key.charAt(0).toUpperCase() + key.slice(1)}:
                                        </strong>
                                        ${val}
                                    </li>
                                `
                            }).join("")}
                        </ul>
                    </li>
                    <li>
                        <header>
                            <h2>Posts</h2>
                            <button type="button" onClick="changePostsVisibility(event)">Show posts</button>
                        </header>
                        <ul class="post-list hidden">
                            ${user.posts.map(post => `
                                <li>
                                    <strong>${post.title}</strong>
                                    <p>${post.body}</p>
                                </li>
                            `).join("")}
                        </ul>
                    </li>
                </ul>
            </li>
        `;
    }).join("");
}

async function init() {
    const response = await letter.get();
    root.innerHTML = `
        <div>
            <ul>${itemTemplate(response)}</ul>
        </div>
    `;
}

init();
