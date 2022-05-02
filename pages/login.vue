<style>
    body {
      font-size:16px;
      margin: 5px;
  background-color: rgb(41, 45, 88);
    }
    

.narabe{
  text-align: center;
}
    
        td {
      
      text-align: center;
    }

    .narabe{
        flex-flow: column;
    }

    .btn {
    
    border: 2px solid #dc70fa;
    font-size: 12px;
    color: #fff;
    background-color: #dc70fa;
    font-weight: bold;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.4s;
    outline: none;
}
.input-add {
  margin: 10px;
    width: 80%;
    padding: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
    appearance: none;
    font-size: 14px;
    outline: none;
}
.input-update {
    width: 90%;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    appearance: none;
    font-size: 14px;
    outline: none;
}
    .card {
    background-color: #fff;
    width: 30vw;
    padding: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
}
    h1 {
      font-size:32px;
      color:white;
      text-shadow:1px 0 5px #289ADC;
      margin-left: 1px
    }
    .content {
      margin:10px; 
    }
    </style>


<template>
  <div class="login">
    <FooBar></FooBar>
    <div class="card">
      <div class="nakami">
        <div class="narabe"><h2>ログイン</h2></div>
        <label> <input class="input-add"  v-model="email" type="email" required placeholder="メールアドレス" /></label>
        <br />
        <input class="input-add"   v-model="password" type="password" required placeholder="パスワード" />
        <br />
        <div class="narabe"><button class="btn" @click="login">ログイン</button></div>
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
      email: null,
      password: null,
    }
  },
  methods: {
    login() {
      if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert('ログインが完了しました')
          this.$router.push('/')
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/user-disabled':
              alert('ユーザーが無効になっています。')
              break
            case 'auth/user-not-found':
              alert('ユーザーが存在しません。')
              break
            case 'auth/wrong-password':
              alert('パスワードが間違っております。')
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