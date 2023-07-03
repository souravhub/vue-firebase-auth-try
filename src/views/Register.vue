<template>
  <div>
    <h2 style="display: block">CREATE AN ACCOUNT</h2>
    <div class="register-box">
      <p>
        <input type="text" placeholder="Email" id="email" v-model="email" />
      </p>
      <p>
        <input
          type="password"
          placeholder="Password"
          id="pass"
          v-model="password"
        />
      </p>
      <p><button @click="register">Submit</button></p>
      <p>
        <button @click="signInWithGoogle" class="google-btn">
          Sign In With Google
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async register() {
      await createUserWithEmailAndPassword(getAuth(), this.email, this.password)
        .then(data => {
          console.log("User Successfully Reistered !!!", data);
          this.$router.push("/feed");
        })
        .catch(error => {
          console.log(error.code);
          alert(error.message);
        });
    },
    async signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(getAuth(), provider)
        .then(data => {
          console.log("Signed Up with Google !!!", data);
          this.$router.push("/feed");
        })
        .catch(error => {
          console.log(error.code);
          alert(error.message);
        });
    },
  },
};
</script>

<style scoped>
.register-box {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
input {
  height: 35px;
  width: 300px;
  border: 1px solid black;
  border-radius: 4px;
  padding-left: 5px;
}
p {
  margin-top: 10px;
}
button {
  height: 40px;
  width: 100%;
  background-color: rgb(6, 127, 16);
  color: #fff;
  padding: 0 20px;
  border: #fff;
  border-radius: 6px;
  cursor: pointer;
}
.google-btn {
  background-color: #e93c2e;
}
</style>
