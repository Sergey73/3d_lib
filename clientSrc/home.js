'use strict';

// import THREE from 'three'

import dat from 'dat-gui'
import StereoEffect from 'three-stereo-effect';
//var StereoEffect = require('three-stereo-effect')(THREE);
import OrientationControl from 'three.orientation';
import OrbitControls from 'three-orbit-controls'


var scene, camera, effect, renderer;

// mesh
var cubeGeometry;
var cubeMaterial; 
var cube;

var planeGeometry;
var planeMaterial;
var plane;
// end mesh

// light
var spotLight;
//end light

// dat-gui
var guiControls;
var datGUI;
var controls;
// end dat-gui

// helpers
var axis;
var grid;
var color;
// end helpers

  init();
  animate();

  function init() {

    scene = new THREE.Scene(); 

    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 700);
    camera.position.z = 0;
    camera.position.y = 15;
    camera.position.x = 0;

    camera.lookAt(scene.position);
    
    // gui 
    guiControls = new function () {
      this.rotationX = 0.01;
      this.rotationY = 0.01;
      this.rotationZ = 0.01;
    };
    datGUI = new dat.GUI();
    datGUI .add(guiControls, 'rotationX', 0, 1);
    datGUI .add(guiControls, 'rotationY', 0, 1);
    datGUI .add(guiControls, 'rotationZ', 0, 1);
    // end gui
    
    // mesh
    cubeGeometry = new THREE.BoxGeometry( 5, 5, 5 );
    cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff3300});
    cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
    cube.position.x = 2.5;
    cube.position.y = 2.5;
    cube.position.z = 2.5;
    cube.castShadow = true;
    scene.add( cube );


    planeGeometry = new THREE.PlaneGeometry(30, 30, 30);
    planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff});
    plane = new THREE.Mesh( planeGeometry, planeMaterial);
    plane.rotation.x = -.5*Math.PI;
    plane.receiveShadow = true;
    scene.add(plane);

    // end mesh

    // light
    spotLight = new THREE.SpotLight(0xffffff);
    spotLight.castShadow = true;
    spotLight.position.set(15, 30, 50);
    scene.add(spotLight);
    // end light

    renderer = new THREE.WebGLRenderer({alpha: true});
   // renderer.setClearColor(0xdddddd); // цвет фона
    renderer.setSize( window.innerWidth, window.innerHeight );
   // renderer.shadowMapEnabled = true; // ?
   // renderer.shadowMapSoft = true; // ?

    // controls
    controls = new THREE.OrbitControls (camera, renderer.domElement);
    controls.addEventListener('change', render );
    // end controls

    // helpers
    axis = new THREE.AxisHelper(10);
    scene.add(axis);

    grid = new THREE.GridHelper(50, 5);
    color = new THREE.Color( "rgb(255,0,0)" );
    grid.setColors(color, 0x000000);
    scene.add(grid);

    // end helpers
    document.getElementById('container').appendChild( renderer.domElement );

    // stereo effect
    var sEffect = new StereoEffect(THREE);
    effect = new sEffect(renderer);
    effect.eyeSeparation = 3;
    effect.setSize( window.innerWidth, window.innerHeight );
  }

  function render () {
    cube.rotation.x += guiControls.rotationX;
    cube.rotation.y += guiControls.rotationY;
    cube.rotation.z += guiControls.rotationZ;

    // spotLight.position.x = guiControls.lightX;
    // spotLight.position.y = guiControls.lightY;
    // spotLight.position.z = guiControls.lightZ;


  }
  OrientationControl(camera).update();
  function animate() {
    // вызов саму себя
    requestAnimationFrame( animate );
    render();

    effect.render( scene, camera );

  }

//exports.welcome = welcome; 