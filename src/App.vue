<template>
    <div id="app">
        <transition appear appear-active-class="initial-animation-active-class" :duration="5000">
            <div class="animation">
                <div class="background">
                    <div class="background-inner"></div>
                </div>
                <div class="back" id="back3"></div>
                <div class="back" id="back2"></div>
                <div class="back" id="back1"></div>
                <div class="overlay"></div>
                <div class="cell-container">
                    <div v-for="n in 25" class="cell" :class="{active: n === x}"></div>
                </div>
                <transition name="page">
                    <div class="frontpage" v-if="landpage">
                        <div class="logo">
                            <img src="./assets/mainlogo.svg" class="logo-img">
                            <p>The first richer rich media mobile ad platform in the world</p>
                        </div>
                        <button class="gallery-btn" @click="landpage = false">
                            Cats
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </button>
                    </div>
                    <dreamer-card-grid v-else :items="cats" :cols="2" :cols-md="4" :col-gap="10" :gap="10"
                                       class="grid">
                        <template scope="cat">
                            <progressive-img :src="cat.value" class="cat-image"/>
                        </template>
                    </dreamer-card-grid>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script>
  import Vue from 'vue'
  import { DreamerCardGrid } from 'dreamer-vue-components';
  import VueProgressiveImage from 'vue-progressive-image';
  Vue.use(VueProgressiveImage)

  export default {
    name: 'app',
    data: function () {
      return {
        x: 0,
        landpage: true,
        cats: [
          'http://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg',
          'https://huilesante.com/wp-content/uploads/2016/10/huile-de-foie-de-morue-pour-animaux.jpg',
          'http://cdn1-www.cattime.com/assets/uploads/gallery/persian-cats-and-kittens/persian-cats-and-kittens-1.jpg',
          'https://s-media-cache-ak0.pinimg.com/736x/35/8c/57/358c57c204a2fec21fa50b917a0728aa.jpg',
          'https://s-media-cache-ak0.pinimg.com/736x/71/96/5c/71965c7b1434d8f233c2862fdd7e8a4a.jpg',
          'http://media.salon.com/2015/05/kitten.jpg',
          'https://s-media-cache-ak0.pinimg.com/736x/ba/03/23/ba03237a6d6499f0e2633314826e1526.jpg',
          'https://s-media-cache-ak0.pinimg.com/736x/a4/cd/17/a4cd17f7a0f57e006949f60f398a66c5.jpg',
          'https://s-media-cache-ak0.pinimg.com/736x/40/c1/bd/40c1bd174fa0f13f6a025e6e7e44bec4.jpg',
          'http://cms.hostelbookers.com/hbblog/wp-content/uploads/sites/3/2012/02/shoreditch-cat.jpg',
          'https://s-media-cache-ak0.pinimg.com/736x/dd/4e/7e/dd4e7e7dcba5526cd983fc5c9381502a.jpg',
          'http://static4.businessinsider.com/image/5485631e69bedda63303ed51/grumpy-cat-has-earned-her-owner-nearly-100-million-in-just-2-years.jpg',
          'https://s-media-cache-ak0.pinimg.com/originals/06/43/57/0643578d6830ca896e90fea5d9b35d3a.jpg',
          'http://www.cutestpaw.com/wp-content/uploads/2016/02/Yawn..jpeg',
          'https://s-media-cache-ak0.pinimg.com/736x/2d/43/54/2d43547bfb29dfefcd4d55fca597b73e.jpg',
          'http://stuffpoint.com/cats/image/443205-cats-cute-cat-17.jpg',
          'http://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg',
          'http://cdn.images.express.co.uk/img/dynamic/galleries/x701/76621.jpg',
          'https://huilesante.com/wp-content/uploads/2016/10/huile-de-foie-de-morue-pour-animaux.jpg',
          'http://cdn1-www.cattime.com/assets/uploads/gallery/persian-cats-and-kittens/persian-cats-and-kittens-1.jpg',
          'https://s-media-cache-ak0.pinimg.com/736x/71/96/5c/71965c7b1434d8f233c2862fdd7e8a4a.jpg',
          'https://s-media-cache-ak0.pinimg.com/736x/35/8c/57/358c57c204a2fec21fa50b917a0728aa.jpg',
          'http://media.salon.com/2015/05/kitten.jpg',
          'https://s-media-cache-ak0.pinimg.com/736x/ba/03/23/ba03237a6d6499f0e2633314826e1526.jpg',
          'https://s-media-cache-ak0.pinimg.com/736x/a4/cd/17/a4cd17f7a0f57e006949f60f398a66c5.jpg',
          'https://s-media-cache-ak0.pinimg.com/736x/40/c1/bd/40c1bd174fa0f13f6a025e6e7e44bec4.jpg',
          'https://s-media-cache-ak0.pinimg.com/736x/dd/4e/7e/dd4e7e7dcba5526cd983fc5c9381502a.jpg',
          'https://s-media-cache-ak0.pinimg.com/originals/06/43/57/0643578d6830ca896e90fea5d9b35d3a.jpg',
          'http://cms.hostelbookers.com/hbblog/wp-content/uploads/sites/3/2012/02/shoreditch-cat.jpg',
          'http://static4.businessinsider.com/image/5485631e69bedda63303ed51/grumpy-cat-has-earned-her-owner-nearly-100-million-in-just-2-years.jpg',
          'http://cdn.images.express.co.uk/img/dynamic/galleries/x701/76621.jpg',
          'http://www.cutestpaw.com/wp-content/uploads/2016/02/Yawn..jpeg',
          'http://stuffpoint.com/cats/image/443205-cats-cute-cat-17.jpg',
          'https://s-media-cache-ak0.pinimg.com/736x/2d/43/54/2d43547bfb29dfefcd4d55fca597b73e.jpg',
        ]
      }
    },
    created: function () {
      setInterval(function () {
        this.x = Math.ceil(((Math.random() * 100) % 25));
        console.log("update cell", this.x);
      }.bind(this), 5000);
    },
    components: {
      DreamerCardGrid
    }
  }
</script>

<style lang="scss">
    $basecolor: #FFFFFF;

    html {
        background: $basecolor;
    }

    html, body, .animation, .back, .cell-container, .overlay, .background, .background-inner, .frontpage, #app {
        width: 100%;
        height: 100%;
        margin: 0px;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: white;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
    }

    .back, .logo, .overlay, .background, .frontpage, .cell-container {
        position: absolute;
    }

    .frontpage {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
    }

    .cell-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .overlay {
        background: black;
        opacity: 0.7;
    }

    .cell {
        width: 20%;
        height: 20%;
        opacity: 0;
        background-color: #ff7c47;
        transition: all 2s ease;
        border-radius: 5px 5px 5px 5px;
        &.active {
            opacity: 0.2;
            transition: all 2s ease;
        }
    }

    .logo {
        width: 70%;
        p {
            font-family: 'Covered By Your Grace', cursive;
            animation: appear3 5s ease;
            opacity: 1;
            font-size: 40px;
        }
    }

    .background {
        opacity: 1;
        animation: appear2 4s ease;
        perspective: 1200px;
    }

    .background-inner {
        background-image: url("./assets/back3.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        animation: slow-move 15s linear infinite;
        transform: translateX(10px) translateZ(50px);
    }

    .animation {
        perspective: 1200px;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        &.v-leave {
            transition: all 1s ease;
            width: 0%;
        }
    }

    .gallery-btn {
        position: absolute;
        width: 140px;
        height: 90px;
        color: white;
        bottom: 10px;
        background: none;
        border: none;
        font-size: 40px;
        animation: jump 10s ease-in-out infinite;
        cursor: pointer;

    }

    .cat-image {
        width: 100%;
        height: auto;
        -webkit-box-shadow: 0 0 20px 3px rgba(100, 100, 100, 1);
        box-shadow: 0 0 20px 3px rgba(100, 100, 100, 1);
        img{
            width: 100%;
        }
    }

    .initial-animation-active-class {

        .logo {
            animation: anim-logo 4s ease-in-out;
        }

        .back {
            animation: appear 2s ease-in;
        }
        #back1 {
            animation-delay: 0s;
        }
        #back2 {
            animation-delay: 1s;
        }
        #back3 {
            animation-delay: 2s;
        }
    }

    .back {
        background-repeat: no-repeat;
        background-size: cover;
        transform-origin: left;
        opacity: 0;
    }

    #back1 {
        background-image: url("./assets/back1.jpg");
    }

    #back2 {
        background-image: url("./assets/back2.jpg");
    }

    #back3 {
        background-image: url("./assets/back3.jpg");
    }

    .grid {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: scroll;
    }

    .page-enter, .page-leave-to {
        opacity: 0;
    }

    .page-enter-to, .page-leave {
        opacity: 1;
    }

    .page-enter-active, .page-leave-active {
        transition: all 3s ease;
    }

    .list-item {
        display: inline-block;
        margin-right: 10px;
    }

    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }

    .list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */
    {
        opacity: 0;
        transform: translateY(30px);
    }

    @keyframes jump {
        0% {
            bottom: 10px;
        }
        80% {
            bottom: 10px;
        }
        90% {
            bottom: 20px;
        }
        95% {
            bottom: 10px;
        }
        98% {
            bottom: 13px;
        }
        100% {
            bottom: 10px;
        }
    }

    @keyframes slow-move {
        0% {
            transform: translateX(10px) translateZ(50px);
        }
        50% {
            transform: translateX(0px) translateZ(0px);
        }
        100% {
            transform: translateX(10px) translateZ(50px);
        }
    }

    @keyframes appear3 {
        0% {

            opacity: 0;
        }
        70% {

            opacity: 0;
        }
        100% {

            opacity: 1;
        }
    }

    @keyframes appear2 {
        0% {
            opacity: 0;
        }
        80% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes appear {
        0% {
            opacity: 0;
            transform: rotateY(90deg) scaleZ(2) translateZ(-200px);
        }
        50% {
            opacity: 1;
            transform: rotateY(0deg) scaleZ(2) translateZ(0px);
        }
        100% {
            opacity: 0;
            transform: rotateY(0deg) translateZ(100px);
        }
    }

    @keyframes anim-logo {
        0% {
            opacity: 0;
            transform: translateZ(-600px);
        }
        15% {
            opacity: 1;
            transform: translateZ(-600px);
        }
        20% {
            transform: translateZ(-600px);
        }
        25% {
            transform: translateZ(-400px);
        }
        45% {
            transform: translateZ(-400px);
        }
        50% {
            transform: translateZ(-200px);
        }
        70% {
            transform: translateZ(-200px);
        }
        75% {
            transform: translateZ(0px);
        }
        100% {
            transform: translateZ(0px);
        }
    }

</style>
