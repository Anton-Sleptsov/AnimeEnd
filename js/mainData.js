const mainData = () => {

  const renderAnimeList = (array, ganre) => {
    console.log(array);
    console.log(ganre);
  }

  const renderTopAnime = (array) => {
    const container = document.querySelector(".filter__gallery");
    container.innerHTML = "";

    array.forEach(element => {
      container.insertAdjacentHTML("afterbegin", `
        <div class="product__sidebar__view__item set-bg mix" data-setbg="${element.image}">
          <div class="ep">${element.rating} / 10</div>
          <div class="view"><i class="fa fa-eye"></i> ${element.views}</div>
          <h5><a href="/anime-details.html">${element.title}</a></h5>
        </div>
      `);

      container.querySelectorAll(".set-bg").forEach(el => {
        el.style.backgroundImage = `url(${el.dataset.setbg})`;
      })
    });
  }

  fetch("https://anime-6021f-default-rtdb.firebaseio.com/anime.json")
    .then(response => {
      return response.json();
    })
    .then(data => {
      const ganres = new Set();

      renderTopAnime(data.sort((a, b) => b.views - a.views).slice(0, 5).reverse());

      data.forEach(item => ganres.add(item.ganre));

      renderAnimeList(data, ganres)
    });
}

mainData();