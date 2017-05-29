<template>

    <div class="container">
        <div class="layer background" :style="background.style"></div>
        <div class="layer" v-for="layer in layers" :style="layer.style" :key="layer.id">
            <svg class="layersvg">
                <circle :cx="layer.x[n]" :cy="layer.y[n]" :r="layer.r[n]" fill="white" v-for="n in stars" :key="n"/>
            </svg>
        </div>
        <div class="layer" :style="sun.style">
            <img src="./assets/jupiter.png" width="100px" height="100px" :style="{top: sun.y, left: sun.x}"
                 class="object"/>
        </div>
        <!--<div class="pointer" :style="{top: y+'px', left: x+'px'}"></div>-->
    </div>


</template>

<script>
  export default {
    name: 'app2',
    data: function () {
      return {
        layers: [],
        sun: {
          x: '30%',
          y: '40%',
          z: 1200,
          style: {
            transform: "translateZ(1200px)"
          }
        },
        background: {
          z: 100,
          style: {
            transform: "translateZ(100px)"
          }
        },
        layersCount: 3,
        stars: 200,
        factor: 5,
        mobileFactor: 30,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        dx: 0,
        dy: 0,
        dz: 0,
        r: 1,
        intervalId2: null,
        intervalId: null,
        isMobile: false,
      }
    },
    mounted: function () {
      this.width = this.$el.clientWidth;
      this.height = this.$el.clientHeight;
      this.x = this.width/2;
      this.y = this.height/2;

      for (var i = 0; i < this.layersCount; i++) {
        var layer = {
          id: i + 1,
          style: {
            transform: "translateZ(" + (i * (1000 / this.layersCount)) + "px)"
          },
          x: [],
          y: [],
          r: []
        };
        for (var j = 0; j < this.stars; j++) {
          layer.x.push((Math.random() * 10000) % (2 * this.width));
          layer.y.push((Math.random() * 10000) % (2 * this.height));
          layer.r.push((Math.random() * 10) % (layer.id * 2));
        }
        this.layers.push(layer);
      }
      window.addEventListener('mousemove', this.mouseMove);
      window.addEventListener("devicemotion", this.handleMotion, true);
      this.intervalId2 = setInterval(this.fixCenter.bind(this), 500);
      this.intervalId = setInterval(this.mobile3dEffect.bind(this), 200);
    },
    beforeDestroy: function () {
      window.removeEventListener('mousemove', this.mouseMove);
      window.removeEventListener("devicemotion", this.handleMotion);
      clearInterval(this.intervalId);
      clearInterval(this.intervalId2);
    },
    methods: {
      fixCenter: function(){
        if (!this.isMobile) {
          return;
        }

        this.x = (this.width / 2 < this.x) ? this.x - 1 : this.x + 1;
        this.y = (this.height / 2 < this.y) ? this.y - 1 : this.y + 1;

      },
      mobile3dEffect: function () {

        if (!this.isMobile) {
          return;
        }

        this.x = this.x + this.dx*this.mobileFactor;
        this.y = this.y + this.dy*this.mobileFactor;
        this.x = (this.width < this.x)?this.width:this.x;
        this.y = (this.height < this.y)?this.height:this.y;

        for (var i = 0; i < this.layersCount; i++) {
          this.$set(this.layers[i], 'style', {
            transform: "translateZ(" + (i * (1000 / this.layersCount)) + "px) translateX(" + (-1) * (this.x - (this.width / 2)) / this.factor + "px) translateY(" + (-1) * (this.y - (this.height / 2)) / this.factor + "px)"
          });
        }
        this.$set(this.sun, 'style', {
          transform: "translateZ(" + this.sun.z + "px) translateX(" + (-1) * (this.x - (this.width / 2)) / this.factor + "px) translateY(" + (-1) * (this.y - (this.height / 2)) / this.factor + "px)"
        });
        this.$set(this.background, 'style', {
          transform: "translateZ(" + this.background.z + "px) translateX(" + (-1) * (this.x - (this.width / 2)) / this.factor + "px) translateY(" + (-1) * (this.y - (this.height / 2)) / this.factor + "px)"
        });
      },

      mouseMove: function (event) {

        if (this.isMobile) {
          return;
        }

        this.x = event.clientX;
        this.y = event.clientY;

        for (var i = 0; i < this.layersCount; i++) {
          this.$set(this.layers[i], 'style', {
            transform: "translateZ(" + (i * (1000 / this.layersCount)) + "px) translateX(" + (-1) * (this.x - (this.width / 2)) / this.factor + "px) translateY(" + (-1) * (this.y - (this.height / 2)) / this.factor + "px)"
          });
        }
        this.$set(this.sun, 'style', {
          transform: "translateZ(" + this.sun.z + "px) translateX(" + (-1) * (this.x - (this.width / 2)) / this.factor + "px) translateY(" + (-1) * (this.y - (this.height / 2)) / this.factor + "px)"
        });
        this.$set(this.background, 'style', {
          transform: "translateZ(" + this.background.z + "px) translateX(" + (-1) * (this.x - (this.width / 2)) / this.factor + "px) translateY(" + (-1) * (this.y - (this.height / 2)) / this.factor + "px)"
        });
      },
      handleMotion: function (event) {
        console.log(event.rotationRate);
        const dx = event.rotationRate.beta;
        const dy = event.rotationRate.alpha;
        this.dx = (dx === null) ? 0 : dx;
        this.dy = (dy === null) ? 0 : dy;
        this.isMobile = (dx !== null && dy !== null);
      }
    }
  };
</script>

<style lang='scss'>

    html, body {
        margin: 0px;
        padding: 0px;
        width: 100%;
        height: 100%;
    }

    .container {
        background: black;
        width: 100%;
        height: 100%;
        margin: 0px;
        padding: 0px;
        perspective: 2000px;
        perspective-origin: center;
        position: relative;
        overflow: hidden;
    }

    .layer.background {
        background: url("./assets/back.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        background-origin: content-box;
        background-position: center;
        top: -10%;
        left: -10%;
        width: 150%;
        height: 150%;
        opacity: 0.5;
    }

    .layer {
        transition: all 100ms ease;
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        .layersvg {
            width: 100%;
            height: 100%;
        }
    }

    .object {
        position: absolute;
    }

    .pointer{
        position: absolute;
        width: 10px;
        height: 10px;
        background: red;
    }

</style>