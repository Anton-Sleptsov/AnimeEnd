const mainData = () => {
  fetch("https://anime-6021f-default-rtdb.firebaseio.com/anime.json")
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
    });
}

mainData();