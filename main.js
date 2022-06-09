import {loadGLTF , loadVideo  } from "/libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '/asset/targets.mind',
      maxTrack: 3,
    });
    const {renderer, scene, camera} = mindarThree;

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

///**************************************************** */
// const video = await loadVideo("/asset/DeveloperCodeBaseVideo.mp4");
// const texture = new THREE.VideoTexture(video);

// // video.scale.set(0.1, 0.1, 0.1);

// const geometry = new THREE.PlaneGeometry(1, 204/480);
// const material = new THREE.MeshBasicMaterial({map: texture});
// const plane = new THREE.Mesh(geometry, material);
// const anchor = mindarThree.addAnchor(1);
//     anchor.group.add(plane);

//     anchor.onTargetFound = () => {
//       video.play();
//     }
//     anchor.onTargetLost = () => {
//       video.pause();
//     }
//     video.addEventListener( 'play', () => {
//       video.currentTime = 6;
//     });
///***************************************************** */

    const raccoon = await loadGLTF('/asset/musicband-raccoon/scene.gltf');
    raccoon.scene.scale.set(0.1, 0.1, 0.1);
    raccoon.scene.position.set(0, -0.4, 0);

    const bear = await loadGLTF('/asset/musicband-bear/scene.gltf');
    bear.scene.scale.set(0.1, 0.1, 0.1);
    bear.scene.position.set(0, -0.4, 0);
//*************************************** */
    const robot = await loadGLTF('/asset/robot/RobotExpressive.glb');
    robot.scene.scale.set(0.1, 0.1, 0.1);
    robot.scene.position.set(0, -0.4, 0);
//********************************************************************** */
    const raccoonAnchor = mindarThree.addAnchor(0);
    raccoonAnchor.group.add(raccoon.scene);

    const bearAnchor = mindarThree.addAnchor(2);
    bearAnchor.group.add(bear.scene);

    const robotAnchor = mindarThree.addAnchor(1);
    robotAnchor.group.add(robot.scene);
    
//************* */
    const raconmixer = new THREE.AnimationMixer(raccoon.scene);
    const raconaction = raconmixer.clipAction(raccoon.animations[0]);
    raconaction.play();

    const bearmixer = new THREE.AnimationMixer(bear.scene);
    const bearaction = bearmixer.clipAction(bear.animations[0]);
    bearaction.play();

    const robotmixer = new THREE.AnimationMixer(robot.scene);
    const robotaction = robotmixer.clipAction(robot.animations[0]);
    robotaction.play();
    
    
    

    const clock = new THREE.Clock();
//***************** */
    await mindarThree.start();
    // renderer.setAnimationLoop(() => {
    //   renderer.render(scene, camera);
    // });
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      raccoon.scene.rotation.set(0, raccoon.scene.rotation.y+delta, 0);
      bear.scene.rotation.set(0, bear.scene.rotation.y+delta, 0);
      robot.scene.rotation.set(0, robot.scene.rotation.y+delta, 0);

      raconmixer.update(delta);
      bearmixer.update(delta);
      robotmixer.update(delta);

      renderer.render(scene, camera);
    });
  }
  start();
});
