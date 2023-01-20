const Letter = require("./main");
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
                            <button type="button" class="btn-information">Show informations</button>
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
                            <button type="button" class="btn-posts">Show posts</button>
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

function addMultipleEventListeners(target, event, callback) {
    root.querySelectorAll(target).forEach(item => {
        item.addEventListener(event, callback, false);
    });
}

async function init() {
    const response = await letter.get();
    root.innerHTML = `
        <div>
            <ul>${itemTemplate(response)}</ul>
        </div>
    `;
    addMultipleEventListeners(".btn-information", "click", changeInformationVisibility);
    addMultipleEventListeners(".btn-posts", "click", changePostsVisibility);
}

init();
