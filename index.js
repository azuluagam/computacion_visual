var cubeRotation = 0.0;
var rAmbientLight = 0.1, gAmbientLight = 0.1, bAmbientLight = 0.1;
var rDirectional = 1.0, gDirectional = 1.0, bDirectional = 1.0;
var directional = [1.0, 1.0, 1.0];
var sphereO;
var cylinderO;
var cubeO;

main();

//
// Start here
//
function main() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program

  var vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;

    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    uniform highp vec3 uAmbientLight;
    uniform highp vec3 uDirectionalLightColor;
    uniform highp vec3 uDirectionalVector;

    varying vec2 vTextureCoord;
    varying highp vec3 vLighting;

    void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vTextureCoord = aTextureCoord;

        // Apply lighting effect

        highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
        highp float directional = max(dot(transformedNormal.xyz, normalize(uDirectionalVector)), 0.0);
        vLighting = uAmbientLight + (uDirectionalLightColor * directional);
    }
  `;

  // Fragment shader program

  var fsSource = `
    precision mediump float;
    varying vec2 vTextureCoord;
    varying highp vec3 vLighting;

    uniform sampler2D uSampler;

    void main(void) {
        vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
        gl_FragColor = vec4(textureColor.rgb * vLighting, textureColor.a);
    }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  var shaderProgram = Utils.initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  var programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexTexture: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
      vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      sampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
      normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
      ambientColorUniform: gl.getUniformLocation(shaderProgram, 'uAmbientLight'),
      lightingDirectionUniform: gl.getUniformLocation(shaderProgram, 'uDirectionalLightColor'),
      directionalColorUniform: gl.getUniformLocation(shaderProgram, 'uDirectionalVector'),
    },
  };

  //Textures URLs
  var sphereTextureUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6MD5bWwH6Tds_hHQuayJxxh5VbK_OMtMI1-03_blLirJtXCcf";
  
  const textures = {};
  textures.sphere = Utils.initTexture(gl, sphereTextureUrl);
  
  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  sphereO = new Sphere(1, 'Sphere', 30.85, 0.5);
  cylinderO = new Cylinder(2, 'Cylinder', 2);
  cubeO = new Cube(3, 'Cube');
  var cyBuffers = cylinderO.initialize(gl);//initBuffers(gl);
  var sBuffers = sphereO.initialize(gl);
  var cuBuffers = cubeO.initialize(gl);
  var buffers = {};
  buffers.cy = cyBuffers;
  buffers.sp = sBuffers;
  buffers.cu = cuBuffers;
  var then = 0;
  var objects = [];

  // Draw the scene repeatedly
  function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;

    drawScene(gl, programInfo, buffers, deltaTime, textures);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

//
// Draw the scene.
//
function drawScene(gl, programInfo, buffers, deltaTime, textures) {
  Utils.clear(gl);
  
  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.
  
  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);
  
  var z = -20.0;
  
  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  /*for (var i = 0; i < objects.length; i++) {

  }*/
  sphereO.draw(gl, programInfo, modelViewMatrix, projectionMatrix, buffers.sp, deltaTime, [0.0, 0.0, -16.0], textures);
  //mat4.rotate(modelViewMatrix, modelViewMatrix, 3.14,[0, 0, 1]);
  //mat4.translate( modelViewMatrix,  modelViewMatrix, [3, -6.0, -4.0]);
  cylinderO.draw(gl, programInfo, modelViewMatrix, projectionMatrix, buffers.cy, deltaTime, [-2.0, 0.0, -6.0], textures);
  cubeO.draw(gl, programInfo, modelViewMatrix, buffers.cu, deltaTime, [-2.0, 0.0, -6.0]);
  //sphereO.draw(gl, programInfo, modelViewMatrix, projectionMatrix, buffers, deltaTime, [2.0, 0.0, -6.0], textures);
  
  //drawSphere(gl, programInfo, modelViewMatrix, projectionMatrix, buffers, deltaTime, [0, 0.0, -6.0], textures);
  
  // Update the rotation for the next draw

  cubeRotation += deltaTime;

}


function changeAmbientLight() {
  rAmbientLight = parseFloat(document.getElementById("ambientR").value);
  gAmbientLight = parseFloat(document.getElementById("ambientG").value);
  bAmbientLight = parseFloat(document.getElementById("ambientB").value);
}

function changeDirectionalLight() {
  rDirectional = parseFloat(document.getElementById("directionalR").value);
  gDirectional = parseFloat(document.getElementById("directionalG").value);
  bDirectional = parseFloat(document.getElementById("directionalB").value);
  directional = [
    parseFloat(document.getElementById("lightDirectionX").value), 
    parseFloat(document.getElementById("lightDirectionY").value), 
    parseFloat(document.getElementById("lightDirectionZ").value)
  ];
}
