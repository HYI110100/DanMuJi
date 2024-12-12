import { ref } from "vue";

type CookieOptions = {
  expires?: Date | string | number; // 过期时间，可以是日期、字符串或数字（天数）
  path?: string; // Cookie 的作用路径
  domain?: string; // Cookie 的作用域
  secure?: boolean; // 是否启用 HTTPS 安全标志
  sameSite?: "Strict" | "Lax" | "None"; // SameSite 属性
};
type CookieData<T> = {
  key: T;
  value: string;
};

export function useCookie<T extends string>() {
  const cookieValues = ref<CookieData<T>[]>([]);

  // 更新 cookieValues，解析当前的 document.cookie
  function updateCookie() {
    cookieValues.value = document.cookie
      .split("; ")
      .map((item) => {
        const [key, ...rest] = item.split("=");
        return {
          key: decodeURIComponent(key) as unknown as T,
          value: decodeURIComponent(rest.join("=")),
        };
      })
      .filter((item) => item.key !== "");
  }

  // 设置 Cookie
  function setCookie(data: CookieData<T>, options: CookieOptions = {}): void {
    const { expires, path = "/", domain, secure, sameSite } = options;
    let cookieString = `${encodeURIComponent(data.key)}=${encodeURIComponent(
      data.value
    )}`;

    if (expires) {
      if (typeof expires === "number") {
        const date = new Date();
        date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
        cookieString += `; expires=${date.toUTCString()}`;
      } else if (expires instanceof Date) {
        cookieString += `; expires=${expires.toUTCString()}`;
      } else {
        cookieString += `; expires=${expires}`;
      }
    }

    if (path) {
      cookieString += `; path=${path}`;
    }

    if (domain) {
      cookieString += `; domain=${domain}`;
    }

    if (secure) {
      cookieString += `; secure`;
    }

    if (sameSite) {
      cookieString += `; samesite=${sameSite}`;
    }

    document.cookie = cookieString;
    updateCookie();
  }

  // 删除 Cookie
  function deleteCookie(key: T): void {
    setCookie({ key, value: "" }, { expires: "Thu, 01 Jan 1970 00:00:00 GMT" });
  }
  function deleteAll() {
    cookieValues.value = [];
    document.cookie = "";
  }
  function getCookie(key: T) {
    return cookieValues.value.find((item) => item.key === key)?.value;
  }
  // 初始化时更新 cookieValues
  updateCookie();

  return {
    cookieValues,
    setCookie,
    deleteCookie,
    deleteAll,
    getCookie
  };
}
