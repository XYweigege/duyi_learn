const pArr = document.querySelectorAll(".title");

let time = 0;
for (let i of pArr) {
  i.innerHTML = i.textContent
    .split("")
    .map((e, i, arr) => {
      // console.log(time);
      time = time + 0.2;
      return `<span style='--delay:${time}s'>${e}</span>`;
    })
    .join("");
}
