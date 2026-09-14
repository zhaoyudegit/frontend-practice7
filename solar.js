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

// 光源
scene.add(new THREE.AmbientLight(0xffffff, 0.2));
const sunLight = new THREE.PointLight(0xfff8c0, 1.2, 100);
sunLight.position.set(0,0,0);
scene.add(sunLight);

// 太阳
const sunGeo = new THREE.SphereGeometry(1.8, 32, 32);
const sunMat = new THREE.MeshBasicMaterial({ color: 0xffdd44 });
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

// 动画：仅太阳自转
const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  sun.rotation.y += 0.002;
  renderer.render(scene, camera);
};
animate();

// 窗口适配
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
