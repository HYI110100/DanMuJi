import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import "./styles/main.css";
import "uno.css";

if (!window.SEVER_PORT) {
  window.SEVER_PORT = "2233";
}

if (!window.SEVER_PATH) {
  window.SEVER_PATH = "127.0.0.1";
}

window.SEVER_URL = `${window.SEVER_PATH}:${window.SEVER_PORT}`;

const app = createApp(App);
app.directive("req-proxy", {
  mounted(el) {
    const imgElement = el.tagName === "IMG" ? el : el.querySelector("img");
    const dataPreviewSrc =
      imgElement.getAttribute("src") ||
      imgElement.getAttribute("data-preview-src");
    if (dataPreviewSrc) {
      const proxySrc = `http://${
        window.SEVER_URL
      }/api/proxy/image?url=${encodeURIComponent(dataPreviewSrc)}`;
      imgElement.setAttribute("data-preview-src", proxySrc);
      imgElement.setAttribute("src", proxySrc);
    }
  },
  updated(el) {
    const imgElement = el.tagName === "IMG" ? el : el.querySelector("img");
    const dataPreviewSrc = imgElement.getAttribute("data-preview-src");
    const src = imgElement.getAttribute("src");
    if (dataPreviewSrc !== src) {
      const proxySrc = `http://${
        window.SEVER_URL
      }/api/proxy/image?url=${encodeURIComponent(dataPreviewSrc)}`;
      imgElement.setAttribute("data-preview-src", proxySrc);
      imgElement.setAttribute("src", proxySrc);
    }
  },
});

app.use(router);
app.use(store);
app.mount("#app");
