
    async function getUsers() {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        const users = document.querySelector('.nav');
        data.forEach(user => {
            const userElement = document.createElement('li');
            userElement.classList.add('nav-item');
            userElement.innerHTML = `
                <a class="nav-link" href="#" data-id="${user.id}">${user.name}</a>
            `;
            users.appendChild(userElement);
        });
        users.addEventListener('click', async (e) => {
            const navItems = document.querySelectorAll('.nav-item');
            const titlePosts = document.getElementById('title-posts');
            navItems.forEach(item => {
                item.classList.remove('active');
            });
            e.target.parentElement.classList.add('active');
            if (e.target.tagName === 'A') {
                const userId = e.target.getAttribute('data-id');
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
                const data = await response.json();
                const posts = document.querySelector('.posts');
                posts.innerHTML = '';
                data.forEach(post => {
                    titlePosts.innerHTML = `Posts of ${post.userId}`;
                    const postElement = document.createElement('div');
                    postElement.classList.add('card', 'mb-3');
                    postElement.innerHTML = `
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${post.body}</p>
                        </div>
                    `;
                    posts.appendChild(postElement);
                });
            }
        });
    }
    getUsers();