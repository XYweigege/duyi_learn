const imgs = ["./img/1.png", "./img/2.png", "./img/3.jpg", "./img/4.jpg"];

const container = document.querySelector(".scroll-container");
let curIndex = 0;

const getPrevIndex = () => {
  return curIndex === 0 ? imgs.length - 1 : curIndex - 1;
};
const getNextIndex = () => {
  return curIndex === imgs.length - 1 ? 0 : curIndex + 1;
};

const creatDiv = (i) => {
  const div = document.createElement("div");
  div.className = "item";
  const img = document.createElement("img");
  img.src = imgs[i];
  div.appendChild(img);
  container.appendChild(div);
  // 还要加样式，所以不要忘记了return
  return div;
};

function getContent() {
  // 会反复调用，所以清空一下
  container.innerHTML = "";
  const prevIndex = getPrevIndex();
  const nextIndex = getNextIndex();
  const prevDiv = creatDiv(prevIndex);
  const curDiv = creatDiv(curIndex);
  const nextDiv = creatDiv(nextIndex);
  prevDiv.classList.add("prev");
  curDiv.classList.add("cur");
  nextDiv.classList.add("next");
}

let animationDoing = false;
window.addEventListener("wheel", (e) => {
  if (!e.deltaY || animationDoing) {
    return;
  }
  animationDoing = true;
  if (e.deltaY > 0) {
    curIndex = getNextIndex();
    container.classList.add("scroll-down");
  } else {
    curIndex = getPrevIndex();
    container.classList.add("scroll-up");
  }
});

container.addEventListener("transitionend", (e) => {
  container.classList.remove("scroll-down");
  container.classList.remove("scroll-up");
  animationDoing = false;
  getContent();
});

getContent();
