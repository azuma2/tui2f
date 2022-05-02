<template>
  <div class="register">
    <FooBar></FooBar>
    <div class="card">
      <div class="nakami">
        <div class="narabe"><h2>新規登録</h2></div>
        

        <label><input class="input-add" v-model="name" type="name" required placeholder="名前"/></label>
        <br />

        <label><input class="input-add" v-model="email" type="email" required placeholder="メールアドレス"/></label>
        <br />
        <label><input class="input-add" v-model="password" type="password" required placeholder="パスワード"/></label>
        <br />
        <div class="narabe"><button class="btn" @click="register">新規登録</button></div>
        <br />
        <div class="narabe"><NuxtLink to="/">戻る</NuxtLink></div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      name: null,
      email: null,
      password: null,
    }
  },
  methods: {
    register() {
      if (!this.name || !this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user.sendEmailVerification().then(async() => {
            const sendData = {
              id: data.user.uid,
              name: this.name,
              email: this.email,
              password: this.password,
            };
            await this.$axios.post("http://127.0.0.1:8000/api/user/store", sendData);
            this.$router.replace("/");
          });
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/email-already-in-use':
              alert('このメールアドレスはすでに使われています。')
              break
            case 'auth/weak-password':
              alert('パスワードは6文字以上で入力してください。')
              break
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。')
              break
          }
        })
    },
  },
}
</script>