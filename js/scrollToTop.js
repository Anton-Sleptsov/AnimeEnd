const scrollToTop = () => {
  const scrollButton = document.querySelector("#scrollToTopButton");

  scrollButton.addEventListener("click", (event) => {
    event.preventDefault();

    seamless.scrollIntoView(document.querySelector(".header"), {
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  });
}

scrollToTop();