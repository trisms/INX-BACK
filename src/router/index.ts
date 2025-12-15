import {createRouter, createWebHistory, type RouteRecordRaw} from "vue-router";
import { type ProgressFinisher, useProgress } from '@marcoschulte/vue3-progress';

const progresses: ProgressFinisher[] = [];
const constantRouterMap: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/login',
    component: () => import('@/views/AppLogin.vue'),
    meta: {
      title: '로그인',
      nav: ['로그인'],
      depth: 1,
    },
  },
];

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRouterMap,
});

router.beforeEach(async (to, from, next) => {
  // if (!localStorage.getItem('isUpdated')) {
  // 	localStorage.setItem('isUpdated', true);
  // 	const authStore = useAuthStore();
  // 	authStore.logout();
  // 	location.reload();
  // }

  next();
});
router.afterEach(async () => {
  progresses.forEach((p) => p.finish());
});

export default router;
