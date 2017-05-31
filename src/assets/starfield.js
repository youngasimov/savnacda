/**
 * Created by camiloveracortes on 30-05-17.
 */


//global values

var mousex;
var mousey;
var isMobile;
var particlesCount = 1000;
var time;

var renderer, scene, camera;
var particles = [];
var starfield;
var geometry;
var material;
var origin = new THREE.Vector3();

window.addEventListener("devicemotion", function (event) {
  var dx = event.rotationRate.beta;
  var dy = event.rotationRate.alpha;
  dx = (dx === null) ? 0 : dx;
  dy = (dy === null) ? 0 : dy;
  isMobile = (dx !== null && dy !== null);

  if (isMobile) {
    mousex = mousex + dx * 5;
    mousey = mousey + dy * 5;
    mousex = (window.innerWidth < mousex) ? window.innerWidth : mousex;
    mousey = (window.innerHeight < mousey) ? window.innerWidth : mousey;
  }


}, true);


window.addEventListener('mousemove', function (event) {
  dx = mousex - event.pageX;
  dy = mousex - event.pageY;
  mousex = event.pageX;
  mousey = event.pageY;
  //origin.x = mousex - window.innerWidth/2;

});

var loader = new THREE.TextureLoader();

loader.load('/src/assets/spikey.png', function (texture) {

  material = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 6,
    map: texture,
    opacity: 0.5,
    transparent: true

  });

  init();
  render();

});


function Particle() {
  this.position = new THREE.Vector3();
  this.ray = new THREE.Ray();
  this.distance = 0;
  this.initialDistance = 500;
  this.velocity = 1;
  this.target = null;

  this.init = function (x, y, v) {
    this.velocity = v;
    this.distance = this.initialDistance;
    this.target = new THREE.Vector3(x, y, 1000);
    this.ray.lookAt(this.target);
    this.ray.at(this.distance, this.position);

  }

  this.update = function () {
    this.distance += this.velocity;
    if (this.distance > 1000) {
      this.distance = this.initialDistance;
    }
    //this.ray.origin.x = origin.x;
    //this.ray.origin.y = origin.y;
    this.ray.at(this.distance, this.position);
  }
}


function init() {
  time = 0;
  dx = 0;
  dy = 0;

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 0, 900);

  geometry = new THREE.Geometry();


  for (var i = 0; i < particlesCount; i++) {
    var particle = new Particle();
    var r = 50;
    var x = THREE.Math.mapLinear(i, 0, particlesCount, -r, r);
    var y = Math.sqrt(r * r - Math.pow(x, 2));
    y = (i % 2 === 0) ? y : -y;
    particle.init(x, y, THREE.Math.randFloat(0.1, 1.5));
    particles.push(particle);
    geometry.vertices.push(particle.position);
  }
  starfield = new THREE.Points(geometry, material);
  scene.add(starfield);


}

// animate
function animate() {
  var tx = THREE.Math.mapLinear(mousex, 0, window.innerWidth, -1, 1);
  var ty = -THREE.Math.mapLinear(mousey, 0, window.innerHeight, -1, 1);
  if ((tx > 0 && camera.position.x < 20) || (tx < 0 && camera.position.x > -20)) {
    camera.translateX(tx);
  }
  if ((ty > 0 && camera.position.y < 20) || (ty < 0 && camera.position.y > -20)) {
    camera.translateY(ty);
  }
  camera.lookAt(origin);
  //camera.rotateZ(0.005);
  starfield.rotateZ(0.005);
  time += 1;
  for (var i = 0; i < particlesCount; i++) {
    particles[i].update();
    geometry.vertices[i].x = particles[i].position.x;
    geometry.vertices[i].y = particles[i].position.y;
    geometry.vertices[i].z = particles[i].position.z;
  }
  if (time > 1) {
    geometry.verticesNeedUpdate = true;
  }
}


function render() {
  requestAnimationFrame(render);
  animate();
  renderer.render(scene, camera);
}