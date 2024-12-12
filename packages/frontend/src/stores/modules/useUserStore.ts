import { defineStore } from "pinia";
import { getNav, postLogout } from "~/config/biliApiFn";
import { UserInfoByNva } from "~/types/biliApi/user";
type UserInfo = {
  identity: {
    isLogin: boolean;
    mid: number;
    uname: string;
    emailVerified: boolean;
    mobileVerified: boolean;
  };
  avatar: {
    face: string;
    pendant: {
      name: string;
      image: string;
    };
  };
  level: {
    currentLevel: number;
    currentExp: number;
    nextExp: string | number;
  };
  currency: {
    money: number;
    wallet: {
      bcoinBalance: number;
      couponBalance: number;
      couponDueTime: number;
    };
  };
  vip: {
    type: number;
    status: number;
    dueDate: number;
    label: {
      text: string;
      imgLabelUri: string;
    };
  };
};
function extractUserInfo(data: UserInfoByNva): UserInfo {
  return {
    identity: {
      isLogin: data.isLogin || false,
      mid: data.mid || 0,
      uname: data.uname || "",
      emailVerified: !!data.email_verified,
      mobileVerified: !!data.mobile_verified,
    },
    avatar: {
      face: data.face || "",
      pendant: {
        name: data.pendant?.name || "",
        image: data.pendant?.image || "",
      },
    },
    level: {
      currentLevel: data.level_info?.current_level || 0,
      currentExp: data.level_info?.current_exp || 0,
      nextExp: data.level_info?.next_exp || "--",
    },
    currency: {
      money: data.money || 0,
      wallet: {
        bcoinBalance: data.wallet?.bcoin_balance || 0,
        couponBalance: data.wallet?.coupon_balance || 0,
        couponDueTime: data.wallet?.coupon_due_time || 0,
      },
    },
    vip: {
      type: data.vip?.type || 0,
      status: data.vip?.status || 0,
      dueDate: data.vip?.due_date || 0,
      label: {
        text: data.vip_label?.text || "",
        imgLabelUri:
          data.vip_label?.img_label_uri_hans_static ||
          data.vip_label?.img_label_uri_hant_static ||
          "",
      },
    },
  };
}

const useUserStore = defineStore("user-store", () => {
  const userInfo = ref<UserInfo | null>(null);

  const getInfo = getNav();
  const out = postLogout()
  function getUserInfo() {
    return new Promise<void>((resolve, reject) => {
      getInfo
        .start()
        .then((res) => {
          userInfo.value = extractUserInfo(res);
          resolve();
        })
        .catch(reject);
    });
  }
  function logout(){
    const cookieValues = useCookie<'bili_jct'>()
    const bili_jct = cookieValues.getCookie('bili_jct')
    if(bili_jct){
      out.start(bili_jct).then((res) => {
        $message.success("退出成功！");
        userInfo.value = null;
        cookieValues.deleteAll()
        window.location.reload()
      })
    }
  }
  return {
    userInfo,
    getUserInfo,
    logout
  };
});
export default useUserStore;
