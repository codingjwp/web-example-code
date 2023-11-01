(function () {
  const groups = document.querySelector('#photoGroup');
  const lodaer = document.querySelector('#loader');
  let currentPage = 1;
  const limit = 25;
  let total = false;

  const getPhotoLists = async (page, limit) => {
    const API_URL = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
    const res = await fetch(API_URL, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-type': 'aplication/json; charset=UTF-8',
        'Cache-Control': 'no-cache; max-age=3600'
      }
    })
    if (!res.ok) {
      throw new Error(`error occured: ${res.status}`);
    }
    return await res.json();
  }

  const showPhotoLists = (lists) => {
    lists.forEach(list => {
      const photoEl = document.createElement('div');
      photoEl.classList.add('photo');
      photoEl.innerHTML = `
      <span>${list.title}</span>
      <p>${list.body}</p>
    `
      groups.appendChild(photoEl);
    });
  }

  const hideLoader = () => {
    lodaer.classList.remove('show');
  }
  const showLoader = () => {
    lodaer.classList.add('show');
  }

  const hasMorePhotos = (page, limit, total) => {
    return true;
    // const startIndex = (page - 1) * limit + 1;
    // return total === 0 || startIndex < total;
  }

  const loaderPhotos = async (page, limit) => {
    showLoader();
    setTimeout(async () => {
      try {
        if (hasMorePhotos(page, limit, total) && !total) {
          const res = await getPhotoLists(page, limit);
          showPhotoLists(res);
          total = res.length === 0 ? true : false;
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        hideLoader();
      }
    }, 1000);
  }

  window.addEventListener('scroll', () => {
    const {
      scrollTop, scrollHeight, clientHeight
    } = document.documentElement;
    if (!total && scrollTop + clientHeight >= scrollHeight - 5 &&
      hasMorePhotos(currentPage, limit, total)) {
      currentPage++;
      loaderPhotos(currentPage, limit);
    }
  }, { passive: true })

  loaderPhotos(currentPage, limit);

})();