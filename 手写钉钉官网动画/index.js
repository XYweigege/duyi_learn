function createAnimation(scrollStart, scrollEnd, valueStart, valueEnd) {
  return function (x) {
    if (x < scrollStart) return valueStart;
    if (x > scrollEnd) return valueEnd;

    return (
      valueStart +
      ((valueEnd - valueStart) * (x - scrollStart)) / (scrollEnd - scrollStart)
    );
  };
}

// 为每一个元素映射一个动画
const animationMap = new Map();
const items = document.querySelectorAll(".list-item");
const playground = document.querySelector(".playground");
const list = document.querySelector(".list");

function getDomAnimation(scrollStart, scrollEnd, dom) {
  scrollStart += dom.dataset.delay * 200;
  const opacity = createAnimation(scrollStart, scrollEnd, 0, 1);
  const scale = createAnimation(scrollStart, scrollEnd, 0.5, 1);
  const { clientWidth, clientHeight, offsetTop, offsetLeft } = dom;
  console.log(clientWidth, clientHeight, offsetTop, offsetLeft);
  const listRect = list.getBoundingClientRect();
  const Xtransform = createAnimation(
    scrollStart,
    scrollEnd,
    listRect.width / 2 - clientWidth / 2 - offsetLeft,
    0
  );
  const Ytransform = createAnimation(
    scrollStart,
    scrollEnd,
    listRect.height / 2 - clientHeight / 2 - offsetTop,
    0
  );
  const transform = (x) => {
    return `translate(${Xtransform(x)}px, ${Ytransform(x)}px) scale(${scale(
      x
    )}) `;
  };
  return {
    opacity,
    transform,
  };
}

// 更新动画隐射
function updateAnimationMap() {
  const playgroundRect = playground.getBoundingClientRect();
  const scrollY = window.scrollY;
  const scrollStart = playgroundRect.top + scrollY;
  const scrollEnd = playgroundRect.bottom + scrollY - window.innerHeight;

  for (const item of items) {
    animationMap.set(item, getDomAnimation(scrollStart, scrollEnd, item));
  }
}
updateAnimationMap();

// 将map结构用于元素
function updateStyle() {
  const scrollY = window.scrollY;
  for (const [element, animation] of animationMap) {
    for (const key in animation) {
      console.log(key);
      console.log(animation[key](scrollY));
      element.style[key] = animation[key](scrollY);
    }
  }
}

updateStyle();
window.addEventListener("scroll", updateStyle);
