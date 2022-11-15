import { useAuthUserStore } from "@/stores/authUserStore.js";
import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../components/DefaultLayout.vue";
import AuthLayout from "../components/AuthLayout.vue";
import Dashboard from "../views/DashboardView.vue";
import Surveys from "../views/Surveys.vue";
import SurveysView from "../views/SurveysView.vue";
import SurveysPublic from "../views/SurveysPublic.vue";
import Login from "../views/LoginView.vue";
import Register from "../views/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        { path: "/dashboard", name: "dashboard", component: Dashboard },
        { path: "/surveys", name: "surveys", component: Surveys },
        { path: "/surveys/create", name: "surveys.create", component: SurveysView },
        { path: "/surveys/:id", name: "surveys.view", component: SurveysView },
       
      ],
    },
    { path: "/public/surveys/:slug", name: "surveys.public", component: SurveysPublic },
    {
      path: "/auth",
      redirect: "/login",
      component: AuthLayout,
      meta: { isGuest: true },
      children: [
        { path: "/login", name: "login", component: Login },
        { path: "/register", name: "register", component: Register },
      ],
    },
  ],
});

router.beforeEach((to, before, next) => {
  const authUserStore = useAuthUserStore();

  if (to.meta.requiresAuth && !authUserStore.user.token) {
    next({ name: "login" });
  } else if (authUserStore.user.token && to.meta.isGuest) {
    next({ name: "dashboard" });
  } else {
    next();
  }
});

export default router;
