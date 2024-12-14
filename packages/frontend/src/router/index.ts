import { createRouter, createWebHistory } from "vue-router";
import Index from "~/pages/index.vue";
import { BasicLayout, BlankLayout } from '~/layouts/index'
import { getBuvid, postBiLTicket } from "~/config/biliApiFn";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/layout/basic',
      name: 'BasicLayout',
      redirect: '/404',
      component: BasicLayout,
      children: [
        {
          path: "/",
          name: "Index",
          component: Index,
        },
        {
          path: "/dashboard/:id",
          name: "Dashboard",
          component: () => import("~/pages/dashboard.vue"),
        },
        {
          path: "/send/:id",
          name: "Send",
          component: () => import("~/pages/send.vue"),
        },
        {
          path: "/test",
          name: "Test",
          component: () => import("~/pages/test.vue"),
        },
      ],
    },
    {
      path: '/layout/blank',
      name: 'BlankLayout',
      redirect: '/404',
      component: BlankLayout,
      children: [
        {
          path: "/404",
          name: "404",
          component: () => import("~/pages/errorPage/404.vue"),
        },
        {
          path: "/error",
          name: "error",
          component: () => import("~/pages/errorPage/error.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found-page",
      redirect: "/404",
    },
  ],
});

const buvid = getBuvid()
const biLTicket = postBiLTicket()
const cookieValue = useCookie<'buvid3' | 'buvid4' | 'bili_jct' | 'bili_ticket' | 'bili_ticket_expires'>()
router.beforeResolve(async (to) => {
  const appStore = useAppStore();
  if(to.path !==  '/404' && to.path !== '/error'){
    const userStore = useUserStore()
    try {
      appStore.loading = true;
      if(!cookieValue.cookieValues.value.find(x => x.key === 'buvid3') || !cookieValue.cookieValues.value.find(x => x.key === 'buvid4')){
        const bv = await buvid.start()
        let currentDate = new Date();
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        cookieValue.setCookie({key: 'buvid3', value: bv.b_3}, { expires: currentDate })
        cookieValue.setCookie({key: 'buvid4', value: bv.b_4}, { expires: currentDate })
      }
      if(cookieValue.cookieValues.value.find(x => x.key === 'bili_jct') && !cookieValue.cookieValues.value.find(x => x.key === 'bili_ticket')){
        const biLTicketRes = await biLTicket.start(cookieValue.getCookie('bili_jct')!)
        cookieValue.setCookie({ key: 'bili_ticket', value: biLTicketRes.ticket})
        cookieValue.setCookie({ key: 'bili_ticket_expires', value: `${biLTicketRes.created_at}`})
      }
      if(cookieValue.cookieValues.value.find(x => x.key === 'bili_jct')){
        await userStore.getUserInfo()
      }
      appStore.loading = false;
    } catch (error) {
      appStore.loading = false;
      return router.push('/error')
    }
  }
});
export default router;
