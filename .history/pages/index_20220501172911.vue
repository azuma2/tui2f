
<style>


    body {
      font-size:16px;
     
  background-color: rgb(41, 45, 88);
  overflow-x: hidden;
  margin: 0;
    }

    .oowaku{
    width: 100%;
    
    top: 10px;
    margin-top:-10px;
    margin-left: 400px;
    margin-right: 1000px;
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


div{
  color: #ffffff;
}

h1{
   text-align: left;
   padding: 5px;
    margin: 0;
}

h2{
   margin: 0;
}

.post{
  text-align: left;
  border: solid;border-color: #fff;
  border-width: 1px;
}

.post2{
  border: solid;border-color: #fff;
  border-width: 1px;
  padding: 20px;
  margin: 0;
  font-size: 16px;
}



    tr{
      border: solid;border-color: #fff;
      border-width: 1px;
    }

    table{
    border-collapse: collapse;

    }



.waku{
justify-content: space-between;
  display: flex;
    width: auto;


    top: 0px;
    left: 1%;
}

.main2{
width: 100%;
  display: block;
}

.icon{
      height: 20px;
      width: 20px;
}

.btn3{
background-color: transparent;
cursor: pointer;

margin-left: 20px;
}

.btn4{
background-color: transparent;
cursor: pointer;
margin-left: 20px;
margin-right: 60px;
}

.btn5{
background-color: transparent;
cursor: pointer;
}

.name{
  font-weight: bold; 
}
.post3{
  padding: 10px;
  font-size: 24px;
  margin:0;

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
          <th><h1>ホーム</h1> </th>

        </tr>
        <tr >
          <td class=post>
            <div class=post2  v-for="post in contactLists" :key="post">
            {{ post.user.name }}
            
              <button class="btn3" @click="deleteContact3(like.id)"><img class="icon" src="/img/heart.png"></button>
              数字




              <button v-if="status == false" type="button" @click.prevent="like" class="btn btn-outline-warning">Like</button>
   <button v-else type="button" @click.prevent="like" class="btn btn-warning">Liked</button>



              <button class="btn4" @click="deleteContact(post.id)"><img class="icon" src="/img/cross.png"></button>
          
              <NuxtLink :to="{ path: 'comment', query: { postId: post.id } }"><button class="btn5"><img class="icon" src="/img/feather.png"></button></NuxtLink>
            
            <br>
            <p class=post3>{{ post.content }}</p>
            </div></td>
        </tr>
        <p>{{ message }}</p>
      </table>
      
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
      user: "",
      like:"",
      status: false,
      contactLists: [],
      message: 'ログインができておりません',
    }
    
  },




  methods: {


  like_check() {
     const id = this.post_id
     const array = ["/posts/",id,"/check"];
     const path = array.join('')
     axios.get("http://127.0.0.1:8000/api/like/a").then(res => {
       if(res.data == 1) {
         this.status = true
       } else {
         this.status = false
       }
     }).catch(function(err) {
       console.log(err)
     })
   },







   like() {                         
     const id = this.post_id
     axios.post("http://127.0.0.1:8000/api/like/store", sendData)
     .then(res => {
       location.reload();
       this.like_check()
     }).catch(function(err) {
       console.log(err)
     })
   },







     async deleteContact3(id) {
      await this.$axios.delete("http://127.0.0.1:8000/api/like/destroy" + id);
      this.getContact();
    },

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
  },

  created() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.message = 'ログイン済みです'
      }
    })
    this.getContact()

   this.like_check()


    
  },
}




</script>
