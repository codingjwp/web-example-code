const group = document.querySelector('#group');
const loader = document.querySelector('#loader');
let _page = 1;
const _limit = 20;
let _end = false;

const getPost = async (page, limit) => {
  if (_end) return;
  const API_URL = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;
  const res = await fetch(API_URL, {
    cache: 'force-cache'
  })
  if (!res.ok) throw new Error(`Erros ${res.status}`)
  return await res.json();
}

const showLoader = () => {
  loader.classList.add('show');
}
const hiddenLoader = () => {
  loader.classList.remove('show');
}

const createPostEl = (data) => {
  data.forEach((element) => {
    const post = document.createElement('div');
    post.classList.add('post');
    post.innerHTML = `
      <span>#${element.id}</span>
      <p>${element.title}</p>
      <pre>${element.body}</pre>
    `;
    group.appendChild(post);
  });
}

const showPost = async (page, limit) => {
  if (_end) return;
  showLoader()
  setTimeout(async () => {
    try {
      const data = await getPost(page, limit);
      if (data.length === 0) {
        _end = true;
        return;
      }
      createPostEl(data);
      _page++;
    } catch (error) {
      console.log(`error ${error.message}`);
    } finally {
      hiddenLoader();
      if (!_end)
        createObserver();
    }
  }, 2000);
}

const infinity = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      observer.disconnect();
      showPost(_page, _limit);
    }
  });

}

const createObserver = () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  }
  const observer = new IntersectionObserver(infinity, options);
  observer.observe(loader);
}

window.addEventListener('load', async () => {
  await showPost(_page, _limit);
  // createObserver();
})