<template>
  <div>
    <h2 style="display: block">SIGN IN INTO AN ACCOUNT</h2>
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
      <p class="error-msg" v-if="errorMessage.length">{{ errorMessage }}</p>
      <p><button @click="signIn">Sign In</button></p>
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
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async signIn() {
      await signInWithEmailAndPassword(getAuth(), this.email, this.password)
        .then(data => {
          console.log("User Successfully Reistered !!!", data);
          this.$router.push("/feed");
        })
        .catch(error => {
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-email":
              this.errorMessage = "Invalid Email";
              break;
            case "auth/user-not-found":
              this.errorMessage = "There is not account with this email";
              break;
            case "auth/wrong-password":
              this.errorMessage = "Incorrect Password";
              break;

            default:
              this.errorMessage = "Email or password was incorrect";
              break;
          }
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
.error-msg {
  color: red;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
}
</style>
