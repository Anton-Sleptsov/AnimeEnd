const bgElements = () => {
  const elements = document.querySelectorAll(".set-bg");

  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];

    const src = element.dataset.setbg;
    element.style.backgroundImage = `url(${src})`;
  }
}

bgElements();