/**
 * 判断是否是微信浏览器
 */
export const isWxBrowser = () => {
  // 判断是否H5微信环境，true为微信浏览器
  const ua = navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) == "micromessenger" ? true : false;
};

/**
 * 下载工具
 * @param {string} url 下载地址
 * @param {string} name 文件名
 *
 */
export const downloadTool = (url, name = "") => {
  if (isWxBrowser()) {
    // eslint-disable-next-line
    ElMessage({
      message: "请先在浏览器中打开再下载！",
      type: "error",
    });
  } else {
    let a = document.createElement("a");
    a.style = "display: none"; // 创建一个隐藏的a标签
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click(); // 触发a标签的click事件
    document.body.removeChild(a);
  }
};
