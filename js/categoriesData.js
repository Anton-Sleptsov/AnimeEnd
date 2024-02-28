const categoriesData = () => {

  const preloader = document.querySelector(".preloder");
  const renderGanreList = (ganres) => {
    const dropdownBlock = document.querySelector(".header__menu .dropdown");

    ganres.forEach(ganre => {
      dropdownBlock.insertAdjacentHTML("beforeend", `
        <li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>
      `)
    });
  }

  const renderAnimeList = (array, ganres) => {
    const container = document.querySelector(".product-page .col-lg-8");

    ganres.forEach(ganre => {
      const productBlock = document.createElement("div");
      const listBlock = document.createElement("div");
      const list = array.filter(item => item.tags.includes(ganre));

      listBlock.classList.add("row");
      productBlock.classList.add("mb-5");

      productBlock.insertAdjacentHTML("afterbegin", `
        <div class="row">
        <div class="col-lg-8 col-md-8 col-sm-8">
          <div class="section-title">
            <h4>${ganre}</h4>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-4">
          <div class="btn__all">
            <a href="/categories.html?ganre=${ganre}" class="primary-btn"
              >View All <span class="arrow_right"></span
            ></a>
          </div>
        </div>
      `)

      list.forEach(item => {
        const tagsBlock = document.createElement("ul");

        item.tags.forEach(tag => {
          tagsBlock.insertAdjacentHTML("afterbegin", `
            <li>${tag}</li>
          `)
        });

        listBlock.insertAdjacentHTML("afterbegin", `
          <div class="col-lg-4 col-md-6 col-sm-6">
          <div class="product__item">
            <div
              class="product__item__pic set-bg"
              data-setbg="${item.image}"
            >
              <div class="ep">${item.rating} / 10</div>
              <div class="view"><i class="fa fa-eye"></i> ${item.views}</div>
            </div>
            <div class="product__item__text">
              ${tagsBlock.outerHTML}
              <h5>
                <a href="/anime-details.html?itemId=${item.id}"
                  >${item.title}</a
                >
              </h5>
            </div>
          </div>
        `);
      });


      productBlock.append(listBlock);
      container.append(productBlock);

      container.querySelectorAll(".set-bg").forEach(el => {
        el.style.backgroundImage = `url(${el.dataset.setbg})`;
      });

      setTimeout(() => preloader.classList.remove("active"), 500);
    });
  }

  const renderTopAnime = (array) => {
    const container = document.querySelector(".filter__gallery");

    array.forEach(element => {
      container.insertAdjacentHTML("afterbegin", `
        <div class="product__sidebar__view__item set-bg mix" data-setbg="${element.image}">
          <div class="ep">${element.rating} / 10</div>
          <div class="view"><i class="fa fa-eye"></i> ${element.views}</div>
          <h5><a href="/anime-details.html?itemId=${element.id}">${element.title}</a></h5>
        </div>
      `);

      container.querySelectorAll(".set-bg").forEach(el => {
        el.style.backgroundImage = `url(${el.dataset.setbg})`;
      });
    });
  }

  fetch("https://anime-6021f-default-rtdb.firebaseio.com/anime.json")
    .then(response => response.json())
    .then(data => {
      const ganres = new Set();
      const ganreParams = new URLSearchParams(window.location.search).get("ganre");
      console.log(ganreParams);

      data.forEach(item => ganres.add(item.ganre));

      renderTopAnime(data.sort((a, b) => b.views - a.views).slice(0, 5).reverse());

      if (ganreParams) {
        renderAnimeList(data.reverse(), [ganreParams]);
      } else {
        renderAnimeList(data.reverse(), ganres);
      }
      renderGanreList(ganres);
    });
}

categoriesData();