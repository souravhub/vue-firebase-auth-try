import { createRouter, createWebHashHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: () => import("./views/Home.vue") },
    { path: "/register", component: () => import("./views/Register.vue") },
    { path: "/sign-in", component: () => import("./views/SignIn.vue") },
    {
      path: "/feed",
      component: () => import("./views/Feed.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListner = onAuthStateChanged(
      getAuth(),
      user => {
        removeListner();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async function (to, _, next) {
  if (await getCurrentUser()) {
    if (getAuth().currentUser) {
      next();
    } else {
      alert("You dont have access");
      next("/");
    }
  } else {
    next();
  }
});

export default router;
