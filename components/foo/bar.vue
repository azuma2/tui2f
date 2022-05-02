<template>
<header>

  <div class="head">
    <div class="logo2"><img class="logo" src="/img/logo.png"></div>
    <ul>
    <li><NuxtLink to="/register">新規登録</NuxtLink></li>
    <li><NuxtLink to="/login">ログイン</NuxtLink></li>
    </ul>
  </div>
</header>
</template>

<style>

a {
 
color: inherit;
text-decoration: none;
 
}


header{

  margin-left:50px;
  margin-top:20px;
}
.head {
  display: flex;
  justify-content: space-between;
}

    .logo{
      height: 30px;
      width: 100px;
        padding: 10px;
    }

.logo{

}

li {
  padding: 10px;
  margin: 10px;
  font-weight: bolder;
   color: #fff;
       list-style: none;
}

ul{
   display: flex;
    list-style: none;
}

</style>