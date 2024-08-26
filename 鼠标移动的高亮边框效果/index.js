const container = document.querySelector(".container");
const cards = document.querySelectorAll(".card");

window.onmousemove = (e) => {
  for (let card of cards) {
    let rect = card.getBoundingClientRect();
    let x = e.clientX - rect.left - rect.width / 2;
    let y = e.clientY - rect.top - rect.height / 2;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  }
};
