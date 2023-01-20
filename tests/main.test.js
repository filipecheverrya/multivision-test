const Letter = require('../scripts/main');

const MOCK = {
    USERS: [
        {
            id: 1,
            name: "Leanne Graham",
            username: "Bret",
            email: "Sincere@april.biz",
            address: {
                street: "Kulas Light",
                suite: "Apt. 556",
                city: "Gwenborough",
                zipcode: "92998-3874",
                geo: {
                    lat: "-37.3159",
                    lng: "81.1496"
                }
            },
            phone: "1-770-736-8031 x56442",
            website: "hildegard.org",
            company: {
                name: "Romaguera-Crona",
                catchPhrase: "Multi-layered client-server neural-net",
                bs: "harness real-time e-markets"
            }
        }
    ],
    POSTS: [
        {
            userId: 1,
            id: 1,
            title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            body: "quia et nostrum rerum est autem sunt rem eveniet architecto"
        }
    ],
    RESULT: {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: 'Kulas Light, Apt. 556 - 92998-3874 Gwenborough',
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: 'Romaguera-Crona',
        posts: [
            {
                id: 1,
                title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                body: "quia et nostrum rerum est autem sunt rem eveniet architecto"
            }
        ],
    }
}

const letter = new Letter();
const filterPosts = letter.filterPosts(MOCK.POSTS, MOCK.USERS[0].id);
const userResult = letter.mergeData(MOCK.USERS[0], filterPosts);

test('filterPosts', () => {
    expect(filterPosts).toEqual(MOCK.RESULT.posts);
});

test('mergeData', () => {
    expect(userResult).toEqual(MOCK.RESULT);
});