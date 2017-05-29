<template>

    <div class="container">
        <div class="layer background" :style="background.style"></div>
        <div class="layer" v-for="layer in layers" :style="layer.style" :key="layer.id">
            <svg class="layersvg">
                <circle :cx="layer.x[n]" :cy="layer.y[n]" :r="layer.r[n]" fill="white" v-for="n in stars" :key="n"  />
            </svg>
        </div>
        <div class="layer" :style="sun.style" >
            <img src="./assets/jupiter.png" width="100px" height="100px" :style="{top: sun.y, left: sun.x}" class="object"/>
        </div>
    </div>


</template>

<script>
  export default {
    name: 'app2',
    data: function () {
      return {
        layers: [],
        sun:{
          x:'30%',
          y:'40%',
          z: 1200,
          style:{
            transform: "translateZ(1200px)"
          }
        },
        background:{
          x:0,
          y:0,
          z: 100,
          style:{
            transform: "translateZ(100px)"
          }
        },
        layersCount: 3,
        stars: 200,
        factor: 5,
        width: 0,
        height: 0,
        x: 0,
        y:0,
        r:1
      }
    },
    mounted: function(){
      this.width= this.$el.clientWidth;
      this.height= this.$el.clientHeight;
      console.log(this.width,this.height);

      for(var i = 0; i < this.layersCount; i++){
        var layer = {
          id: i+1,
          style:{
            transform: "translateZ("+(i*(1000/this.layersCount))+"px)"
          },
          x: [],
          y: [],
          r: []
        };
        for(var j = 0; j < this.stars; j++){
          layer.x.push((Math.random() * 10000) % (2*this.width));
          layer.y.push((Math.random() * 10000) % (2*this.height));
          layer.r.push((Math.random() * 10) % (layer.id*2));
        }
        this.layers.push(layer);
      }
      window.addEventListener('mousemove', this.mouseMove);
      window.addEventListener("devicemotion", this.handleMotion, true);
    },
    beforeDestroy: function() {
      window.removeEventListener('mousemove', this.mouseMove);
      window.removeEventListener("devicemotion", this.handleMotion);
    },
    methods: {
      mouseMove: function(event){

        this.x = event.clientX;
        this.y = event.clientY;

        for(var i = 0; i < this.layersCount; i++){
          this.$set(this.layers[i], 'style', {
            transform: "translateZ("+(i*(1000/this.layersCount))+"px) translateX("+(-1)*(this.x-(this.width/2))/this.factor+"px) translateY("+(-1)*(this.y-(this.height/2))/this.factor+"px)"
          });
        }
        this.$set(this.sun, 'style', {
          transform: "translateZ("+this.sun.z+"px) translateX("+(-1)*(this.x-(this.width/2))/this.factor+"px) translateY("+(-1)*(this.y-(this.height/2))/this.factor+"px)"
        });
        this.$set(this.background, 'style', {
          transform: "translateZ("+this.background.z+"px) translateX("+(-1)*(this.x-(this.width/2))/this.factor+"px) translateY("+(-1)*(this.y-(this.height/2))/this.factor+"px)"
        });
      },
      handleMotion: function(event){
        console.log(event);

        const x = event.acceleration.x;
        const y = event.acceleration.y;

        if(x === null || y === null){
          return;
        }
        this.x = x;
        this.y = y;

        for(var i = 0; i < this.layersCount; i++){
          this.$set(this.layers[i], 'style', {
            transform: "translateZ("+(i*(1000/this.layersCount))+"px) translateX("+(-1)*(this.x-(this.width/2))/this.factor+"px) translateY("+(-1)*(this.y-(this.height/2))/this.factor+"px)"
          });
        }
        this.$set(this.sun, 'style', {
          transform: "translateZ("+this.sun.z+"px) translateX("+(-1)*(this.x-(this.width/2))/this.factor+"px) translateY("+(-1)*(this.y-(this.height/2))/this.factor+"px)"
        });
        this.$set(this.background, 'style', {
          transform: "translateZ("+this.background.z+"px) translateX("+(-1)*(this.x-(this.width/2))/this.factor+"px) translateY("+(-1)*(this.y-(this.height/2))/this.factor+"px)"
        });
      }
    }
  };
</script>

<style lang='scss'>

    html, body{
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

    .layer.background{
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

    .object{
        position: absolute;
    }

</style>