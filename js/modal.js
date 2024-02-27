const modal = () => {
  const modal = document.querySelector(".search-model");
  const buttonOpen = document.querySelector(".icon_search");
  const buttonClose = modal.querySelector(".search-close-switch");
  const searchString = modal.querySelector("#search-input");

  buttonOpen.addEventListener('click', () => {
    modal.classList.add("active");
  });

  buttonClose.addEventListener('click', () => {
    modal.classList.remove("active");
  });

  searchString.addEventListener('input', () => {
    console.log(searchString.value);
  });
}

modal();