<style>
.sidebar {
  background-color: rgb(41, 45, 88);
  height: 100%; /* サイドバーの高さ */
  width: 400px; /* サイドバーのwidthを指定 */
  max-width: 400px; /* widthの最大値 */
  opacity: 0.9.5; /* 透過する 0に近くほど透過する */
  position: fixed; /* 左上に要素を固定する(スクロールしても位置は固定される) */
  overflow-x: hidden; /* 横軸ではみ出た要素を非表示にする */
  box-sizing: border-box; /* paddingとborderを、widthとheightに含める */
  padding-left: 40px; /* サイドバー内のリンクの位置を右にずらす */
}

.sidebar-link-area {
  padding-top: 20px; /* サイドバーリンクの上部に空白を作る */
}

.sidebar-link {
  color: #ffffff; /* リンクの文字色を白に */
}

.sidebar-link:hover {
  color: #ffffff /* マウスがリンクに乗った時も文字色を白に */
}
</style>

<style scoped>
.sidebar-area {
  /* 左側に固定 */
  float: left;
}

.footer-area {
  margin-top: 40px;
}

.scafold-wrapper {
  /* display: flex; 要素を横並びにする */
  flex-direction: column; /* 要素の並び順の主軸を指定 上 => 下 */
  min-height: 100vh; /* 要素の高さの最小値を指定 vhはviewport(表示領域) heightの略 */

  /* サイドバーのwidth分だけ範囲を削除 */
  width: calc(100% - 200px);

  /* サイドバーで隠れるので右に寄せる */
  margin: 0 0 0 180px;
}


.syde{
  display: flex;

}

.area{
  border: 1px solid #ddd;
    border-radius: 6px;
    height: 10em;
    width: 300px;
    background: #eaedf2;
    font-size: 18px;
}

.btn2 {
    
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

.btnichi{
margin-left: 190px;
padding: 10px;
}

P{
    padding: 1px;
  margin: 10px;
  font-weight: bolder;
   color: #fff;
       list-style: none;
}

.icon{
        height: 25px;
      width: 25px;
}



</style>



<template>
<div class="row">
<div class="col-3">
  <div class="sidebar">
    <div class="sidebar-wrapper">
      <div class="sidebar-link-area">
        <div class="logo2"><img class="logo" src="/img/logo.png"></div>
        <!-- サイドバーメニュー -->
        <div class="syde">
          
          <div class="icon"><img class="icon" src="/img/home.png"></div><NuxtLink to="/"><p class="moji">ホーム</p></NuxtLink>
        </div>
        <div class="syde">
          <div class="icon"><img class="icon" src="/img/logout.png"></div><NuxtLink to="/logout"><p class="moji">ログアウト</p></NuxtLink>
        </div>
        <p class="moji">シェア</p>
        <p>{{ content }}</p>



          <textarea v-model="content" @input="emitFunc" class="area" />
          <div class="btnichi">
            <input class="btn2" type="submit" @click="insertContact"   value="シェアする" />
          </div>
        

      </div>
    </div>
  </div>
  </div>
</div>
</template>




<script>
import firebase from '~/plugins/firebase'


export default {
  data() {
    return {
      user_id: "",
      content: "",
      contactLists: [],
    };
  },
  methods: {

        emitFunc() {
      this.$emit('updateContent', this.content)
    },

    async getContact() {
      const response = await this.$axios.get(
      "http://127.0.0.1:8000/api/posts"
      );
      this.contactLists = response.data.items;
      console.log(response);
    },
    
    async insertContact() {
      　console.log(this.user_id)
    console.log(this.content)
      const sendData = {
        user_id: this.user_id,
        content: this.content,
        created_at: this.created_at,
        updated_at: this.updated_at,
      };

      console.log(sendData)

      await this.$axios.post("http://127.0.0.1:8000/api/post/store", sendData).then( res => {
          location.reload();
          })
      this.content = "";
      this.getContact();
      
      console.log(sendData);
      location.reload();


    },
  },
  
  created() {
    
    


    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid); // ユーザのID確認
        this.user_id = user.uid;
        
        }else{
          console.log("認証に失敗しました");
      }
    });
    this.getContact();


    
    
  },





};


</script>