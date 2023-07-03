<template>
  <div class="link-box">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/feed">Feed</router-link>
      <router-link to="/register">Register</router-link>
      <router-link to="/sign-in">Sign In</router-link>
      <button style="cursor: pointer" @click="handleSignOut" v-if="isLoggedIn">
        Sign Out
      </button>
    </nav>
  </div>
  <router-view></router-view>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
export default {
  name: "App",
  components: {},
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    async handleSignOut() {
      await signOut(getAuth()).then(() => {
        this.$router.push("/");
      });
    },
  },
  async mounted() {
    await onAuthStateChanged(getAuth(), user => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  },
};
</script>

<style scoped>
.link-box {
  display: flex;
  justify-content: center;
}

nav {
  margin: 15px;
}
a {
  margin: 0 20px;
  text-decoration: none;
  font-size: 22px;
  font-weight: 700;
  padding: 5px 10px;
  border-radius: 4px;
  color: black;
}
.router-link-exact-active {
  background: #000;
  color: #fff;
}
</style>
