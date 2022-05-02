
<style >
h2{
   text-align: left;
   padding: 5px;
}

.comment{
  text-align: left;

  font-size: 24px;
  margin:0;
}
.comedaiji{
  margin-left: 350px;
}
.comeichi{
  margin-left: 450px;
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

.area2{
  margin: 10px;
  border: 1px solid #ddd;
    border-radius: 6px;
    height: 2em;
    width: 700px;
    background: #eaedf2;
    font-size: 18px;
}
</style>

<template>
<div class="waku">
  <div class="tes">
  <FooSidebar @updateContent="updateContent"></FooSidebar>
  <Register @updateName="updateName"></Register>
  </div>
  <div class="main2">


    


        <table class=oowaku>
        <tr>
          <th><h1>コメント</h1> </th>

        </tr>
        <tr >
          <td class=post>
            
            <div v-if="post" class="post2">
            {{ post.user.name }}
            {{ this.$route.query.postId }}
            
            
              <button class="btn3" @click="deleteContact(post.id)"><img class="icon" src="/img/heart.png"></button>
              <button class="btn4" @click="deleteContact(post.id)"><img class="icon" src="/img/cross.png"></button>
          
            
            
            <br>
            <p class=post3>{{ post.content }}</p>
            </div>
            
            </td>
            <tr>
              <h2 class=comedaiji>コメント</h2>
            </tr>
        <tr >
          <td v-if="post" class=post>
            
            <div class="post2" v-for="comment in post.comments" :key="comment">
            ゲスト
            <br>
             <p class=post3>{{ comment.content }}</p>
            </div>
          </td>
        </tr>

            <td>

            </td>
      </table>

  <div class=comeichi>
    <textarea v-model="content" @input="emitFunc2" class="area2" />
    <div>
   <input class="btn2" type="submit" @click="insert2Contact"   value="コメントする" /></div>
  </div>

</div>

 <p>{{ message }}</p>
  </div>
      

</template>

<script>

import firebase from '~/plugins/firebase'
export default {
  
  data() {
     return {
      user_id: "",
      content: "",
      user: "",
      post: null,
      contactLists: [],
      message: 'ログインができておりません',
    }
    
  },

  methods: {




    async deleteContact(id) {
      await this.$axios.delete("http://127.0.0.1:8000/api/post/destroy/" + id);
      this.getContact();
    },


    async getContact() {
      const response = await this.$axios.get(
      "http://127.0.0.1:8000/api/posts"
      );
      this.contactLists = response.data.items;
      console.log(response);
    },
    


    updateContent(content) {
      this.content = content;
    },
    updateName(name) {
      this.name = name;
    },


      async insert2Contact() {
      console.log(this.user_id)
    console.log(this.content)
      const sendData = {
        post_id: this.$route.query.postId,
        content: this.content,
        created_at: this.created_at,
        updated_at: this.updated_at,
      };

      console.log(sendData)

      await this.$axios.post("http://127.0.0.1:8000/api/comment/store", sendData).then( res => {
          location.reload();
          })
      this.content = "";
      this.getContact();
      
      console.log(sendData);
    },

    
        emitFunc2() {
      this.$emit('updateContent', this.content)
    },


  },






async created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.message = "ログイン済みです";
      }
    });
    this.getContact();

    const response = await this.$axios.get(
      `http://127.0.0.1:8000/api/post/show/${this.$route.query.postId}`
    );
    this.post = response.data.data;
  },
}
</script>



<style>



</style>