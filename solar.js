const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050518);
scene.fog = new THREE.Fog(0x050518, 30, 80);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(12, 8, 18);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

scene.add(new THREE.AmbientLight(0xffffff, 0.2));
const sunLight = new THREE.PointLight(0xfff8c0, 1.2, 100);
sunLight.position.set(0,0,0);
scene.add(sunLight);

// 太阳
const sunGeo = new THREE.SphereGeometry(1.8, 32, 32);
const sunMat = new THREE.MeshBasicMaterial({ color: 0xffdd44 });
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

// 地球组
const earthGroup = new THREE.Group();
scene.add(earthGroup);

const earthGeo = new THREE.SphereGeometry(0.8, 32, 32);
const earthMat = new THREE.MeshStandardMaterial({ color: 0x42a5f5 });
const earth = new THREE.Mesh(earthGeo, earthMat);
earth.position.x = 6;
earthGroup.add(earth);

//月球
const moonGeo = new THREE.SphereGeometry(0.25, 24, 24);
const moonMat = new THREE.MeshStandardMaterial({ color: 0xb0b0b0 });
const moon = new THREE.Mesh(moonGeo, moonMat);
moon.position.x = 1.8;
earth.add(moon);

//公转轨道
const orbitGeo = new THREE.RingGeometry(5.9,6.1,64);
const orbitMat = new THREE.MeshBasicMaterial({color:0x444466, side:THREE.DoubleSide});
const earthOrbit = new THREE.Mesh(orbitGeo,orbitMat);
earthOrbit.rotation.x = -Math.PI / 2;
scene.add(earthOrbit);

//动画
const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  sun.rotation.y += 0.002;
  earthGroup.rotation.y += 0.008;
  earth.rotation.y += 0.02;
  moon.rotation.y += 0.03;
  moon.rotation.z += 0.025;
  renderer.render(scene, camera);
};
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
