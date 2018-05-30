var cubeRotation = 0.0;
var rAmbientLight = 0.1, gAmbientLight = 0.1, bAmbientLight = 0.1;
var rDirectional = 1.0, gDirectional = 1.0, bDirectional = 1.0;
var directional = [1.0, 1.0, 1.0];

//Declaration of spheres
var sphereA, sphereB, sphereC, sphereD, sphereE;
//Declaration of initial positions
var posInitX_A = 0.0, posInitX_B = 0.0, posInitX_C = 0.0, posInitX_D = 0.0, posInitX_E = 0.0;
var posInitY_A = 0.0, posInitY_B = 0.0, posInitY_C = 0.0, posInitY_D = 0.0, posInitY_E = 0.0;
var posInitZ_A = 0.0, posInitZ_B = 0.0, posInitZ_C = 0.0, posInitZ_D = 0.0, posInitZ_E = 0.0;
//Declaration of random positions
var posRandomX_A = 0.0, posRandomX_B = 0.0, posRandomX_C = 0.0, posRandomX_D = 0.0, posRandomX_E = 0.0;
var posRandomY_A = 0.0, posRandomY_B = 0.0, posRandomY_C = 0.0, posRandomY_D = 0.0, posRandomY_E = 0.0;
var posRandomZ_A = 0.0, posRandomZ_B = 0.0, posRandomZ_C = 0.0, posRandomZ_D = 0.0, posRandomZ_E = 0.0;
//Declaration of deltas for positions
var deltaX_A = 0.0, deltaX_B = 0.0, deltaX_C = 0.0, deltaX_D = 0.0, deltaX_E = 0.0;
var deltaY_A = 0.0, deltaY_B = 0.0, deltaY_C = 0.0, deltaY_D = 0.0, deltaY_E = 0.0;
var deltaZ_A = 0.0, deltaZ_B = 0.0, deltaZ_C = 0.0, deltaZ_D = 0.0, deltaZ_E = 0.0;

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

  canvas.addEventListener("mouseup", function(event){

    posRandomX_A = (Math.random() * -1.5) + 1.5;
    posRandomX_B = (Math.random() * -1.5) + 1.5;
    posRandomX_C = (Math.random() * -1.5) + 1.5;
    posRandomX_D = (Math.random() * -1.5) + 1.5;
    posRandomX_E = (Math.random() * -1.5) + 1.5;

    posRandomY_A = (Math.random() * -1.5) + 1.5;
    posRandomY_B = (Math.random() * -1.5) + 1.5;
    posRandomY_C = (Math.random() * -1.5) + 1.5;
    posRandomY_D = (Math.random() * -1.5) + 1.5;
    posRandomY_E = (Math.random() * -1.5) + 1.5;

    posRandomZ_A = (Math.random() * -10) + 1;
    posRandomZ_B = (Math.random() * -10) + 1;
    posRandomZ_C = (Math.random() * -10) + 1;
    posRandomZ_D = (Math.random() * -10) + 1;
    posRandomZ_E = (Math.random() * -10) + 1;

    var cathetusX_A = Math.abs(posRandomX_A-posInitX_A);
    var cathetusX_B = Math.abs(posRandomX_B-posInitX_B);
    var cathetusX_C = Math.abs(posRandomX_C-posInitX_C);
    var cathetusX_D = Math.abs(posRandomX_D-posInitX_D);
    var cathetusX_E = Math.abs(posRandomX_E-posInitX_E);

    var cathetusY_A = Math.abs(posRandomY_A-posInitY_A);
    var cathetusY_B = Math.abs(posRandomY_B-posInitY_B);
    var cathetusY_C = Math.abs(posRandomY_C-posInitY_C);
    var cathetusY_D = Math.abs(posRandomY_D-posInitY_D);
    var cathetusY_E = Math.abs(posRandomY_E-posInitY_E);

    var cathetusZ_A = Math.abs(posRandomZ_A-posInitZ_A);
    var cathetusZ_B = Math.abs(posRandomZ_B-posInitZ_B);
    var cathetusZ_C = Math.abs(posRandomZ_C-posInitZ_C);
    var cathetusZ_D = Math.abs(posRandomZ_D-posInitZ_D);
    var cathetusZ_E = Math.abs(posRandomZ_E-posInitZ_E);

    var hypotenuseA = Math.sqrt((cathetusX_A*cathetusX_A)+(cathetusY_A*cathetusY_A)+(cathetusZ_A*cathetusZ_A));
    var hypotenuseB = Math.sqrt((cathetusX_B*cathetusX_B)+(cathetusY_B*cathetusY_B)+(cathetusZ_B*cathetusZ_B));
    var hypotenuseC = Math.sqrt((cathetusX_C*cathetusX_C)+(cathetusY_C*cathetusY_C)+(cathetusZ_C*cathetusZ_C));
    var hypotenuseD = Math.sqrt((cathetusX_D*cathetusX_D)+(cathetusY_D*cathetusY_D)+(cathetusZ_D*cathetusZ_D));
    var hypotenuseE = Math.sqrt((cathetusX_E*cathetusX_E)+(cathetusY_E*cathetusY_E)+(cathetusZ_E*cathetusZ_E));

    deltaX_A = cathetusX_A / hypotenuseA;
    deltaY_A = cathetusY_A / hypotenuseA;
    deltaZ_A = cathetusZ_A / hypotenuseA;

    deltaX_B = cathetusX_B / hypotenuseB;
    deltaY_B = cathetusY_B / hypotenuseB;
    deltaZ_B = cathetusZ_B / hypotenuseB;

    deltaX_C = cathetusX_C / hypotenuseC;
    deltaY_C = cathetusY_C / hypotenuseC;
    deltaZ_C = cathetusZ_C / hypotenuseC;

    deltaX_D = cathetusX_D / hypotenuseD;
    deltaY_D = cathetusY_D / hypotenuseD;
    deltaZ_D = cathetusZ_D / hypotenuseD;

    deltaX_E = cathetusX_E / hypotenuseE;
    deltaY_E = cathetusY_E / hypotenuseE;
    deltaZ_E = cathetusZ_E / hypotenuseE;
  });

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

  //Initialize spheres
  sphereA = new Sphere(1, 'Sphere', 30.85, 0.1);
  sphereB = new Sphere(2, 'Sphere', 30.85, 0.1);
  sphereC = new Sphere(3, 'Sphere', 30.85, 0.1);
  sphereD = new Sphere(4, 'Sphere', 30.85, 0.1);
  sphereE = new Sphere(5, 'Sphere', 30.85, 0.1);

  var buffers = {};
  buffers.sa = sphereA.initialize(gl);
  buffers.sb = sphereB.initialize(gl);
  buffers.sc = sphereC.initialize(gl);
  buffers.sd = sphereD.initialize(gl);
  buffers.se = sphereE.initialize(gl);

  var then = 0;

  // Draw the scene repeatedly
  function render(now) {
    now *= 0.003;  // convert to seconds
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
  var matrixB = mat4.create();
  mat4.copy(matrixB, modelViewMatrix);
  var matrixC = mat4.create();
  mat4.copy(matrixC, modelViewMatrix);
  var matrixD = mat4.create();
  mat4.copy(matrixD, modelViewMatrix);
  var matrixE = mat4.create();
  mat4.copy(matrixE, modelViewMatrix);

  mat4.translate( modelViewMatrix,  modelViewMatrix, [posInitX_A, posInitY_A, posInitZ_A]);
  sphereA.draw(gl, programInfo, modelViewMatrix, projectionMatrix, buffers.sa, deltaTime, [0.0,0.0,-16.0], textures);

  mat4.translate( matrixB,  matrixB, [posInitX_B, posInitY_B, posInitZ_B]);
  sphereB.draw(gl, programInfo, matrixB, projectionMatrix, buffers.sb, deltaTime, [0.0,0.0,-16.0], textures);

  mat4.translate( matrixC,  matrixC, [posInitX_C, posInitY_C, posInitZ_C]);
  sphereC.draw(gl, programInfo, matrixC, projectionMatrix, buffers.sc, deltaTime, [0.0,0.0,-16.0], textures);

  mat4.translate( matrixD,  matrixD, [posInitX_D, posInitY_D, posInitZ_D]);
  sphereD.draw(gl, programInfo, matrixD, projectionMatrix, buffers.sd, deltaTime, [0.0,0.0,-16.0], textures);

  mat4.translate( matrixE,  matrixE, [posInitX_E, posInitY_E, posInitZ_E]);
  sphereE.draw(gl, programInfo, matrixE, projectionMatrix, buffers.se, deltaTime, [0.0,0.0,-16.0], textures);

  //Check for collisions

  var collisionAWithPlane = Utils.collisionWithPlane(0.1, 0.1, posInitX_A, posInitY_A, posInitZ_A);
  var collisionAWithB = Utils.collisionWithSphere(0.1, 0.1, posInitX_A, posInitY_A, posInitZ_A, posInitX_B, posInitY_B, posInitZ_B);
  var collisionAWithC = Utils.collisionWithSphere(0.1, 0.1, posInitX_A, posInitY_A, posInitZ_A, posInitX_C, posInitY_C, posInitZ_C);
  var collisionAWithD = Utils.collisionWithSphere(0.1, 0.1, posInitX_A, posInitY_A, posInitZ_A, posInitX_D, posInitY_D, posInitZ_D);
  var collisionAWithE = Utils.collisionWithSphere(0.1, 0.1, posInitX_A, posInitY_A, posInitZ_A, posInitX_E, posInitY_E, posInitZ_E);

  if (collisionAWithPlane || collisionAWithB || collisionAWithC || collisionAWithD || collisionAWithE) {

    posRandomX_A = (Math.random() * -1.5) + 1.5;
    posRandomY_A = (Math.random() * -1.5) + 1.5;
    posRandomZ_A = (Math.random() * -10) + 1;
    
    var cathetusX_A = Math.abs(posRandomX_A-posInitX_A);
    var cathetusY_A = Math.abs(posRandomY_A-posInitY_A);
    var cathetusZ_A = Math.abs(posRandomZ_A-posInitZ_A);
    var hypotenuseA = Math.sqrt((cathetusX_A*cathetusX_A)+(cathetusY_A*cathetusY_A)+(cathetusZ_A*cathetusZ_A));
    
    deltaX_A = cathetusX_A / hypotenuseA;
    deltaY_A = cathetusY_A / hypotenuseA;
    deltaZ_A = cathetusZ_A / hypotenuseA;

  }

  var collisionBWithPlane = Utils.collisionWithPlane(0.1, 0.1, posInitX_B, posInitY_B, posInitZ_B);
  var collisionBWithA = Utils.collisionWithSphere(0.1, 0.1, posInitX_B, posInitY_B, posInitZ_B, posInitX_A, posInitY_A, posInitZ_A);
  var collisionBWithC = Utils.collisionWithSphere(0.1, 0.1, posInitX_B, posInitY_B, posInitZ_B, posInitX_C, posInitY_C, posInitZ_C);
  var collisionBWithD = Utils.collisionWithSphere(0.1, 0.1, posInitX_B, posInitY_B, posInitZ_B, posInitX_D, posInitY_D, posInitZ_D);
  var collisionBWithE = Utils.collisionWithSphere(0.1, 0.1, posInitX_B, posInitY_B, posInitZ_B, posInitX_E, posInitY_E, posInitZ_E);

  if (collisionBWithPlane || collisionBWithA || collisionBWithC || collisionBWithD || collisionBWithE) {

    posRandomX_B = (Math.random() * -1.5) + 1.5;
    posRandomY_B = (Math.random() * -1.5) + 1.5;
    posRandomZ_B = (Math.random() * -10) + 1;
    
    var cathetusX_B = Math.abs(posRandomX_B-posInitX_B);
    var cathetusY_B = Math.abs(posRandomY_B-posInitY_B);
    var cathetusZ_B = Math.abs(posRandomZ_B-posInitZ_B);
    var hypotenuseB = Math.sqrt((cathetusX_B*cathetusX_B)+(cathetusY_B*cathetusY_B)+(cathetusZ_B*cathetusZ_B));
    
    deltaX_B = cathetusX_B / hypotenuseB;
    deltaY_B = cathetusY_B / hypotenuseB;
    deltaZ_B = cathetusZ_B / hypotenuseB;

  }

  var collisionCWithPlane = Utils.collisionWithPlane(0.1, 0.1, posInitX_C, posInitY_C, posInitZ_C);
  var collisionCWithB = Utils.collisionWithSphere(0.1, 0.1, posInitX_C, posInitY_C, posInitZ_C, posInitX_B, posInitY_B, posInitZ_B);
  var collisionCWithA = Utils.collisionWithSphere(0.1, 0.1, posInitX_C, posInitY_C, posInitZ_C, posInitX_A, posInitY_A, posInitZ_A);
  var collisionCWithD = Utils.collisionWithSphere(0.1, 0.1, posInitX_C, posInitY_C, posInitZ_C, posInitX_D, posInitY_D, posInitZ_D);
  var collisionCWithE = Utils.collisionWithSphere(0.1, 0.1, posInitX_C, posInitY_C, posInitZ_C, posInitX_E, posInitY_E, posInitZ_E);

  if (collisionCWithPlane || collisionCWithB || collisionCWithA || collisionCWithD || collisionCWithE) {

    posRandomX_C = (Math.random() * -1.5) + 1.5;
    posRandomY_C = (Math.random() * -1.5) + 1.5;
    posRandomZ_C = (Math.random() * -10) + 1;
    
    var cathetusX_C = Math.abs(posRandomX_C-posInitX_C);
    var cathetusY_C = Math.abs(posRandomY_C-posInitY_C);
    var cathetusZ_C = Math.abs(posRandomZ_C-posInitZ_C);
    var hypotenuseC = Math.sqrt((cathetusX_C*cathetusX_C)+(cathetusY_C*cathetusY_C)+(cathetusZ_C*cathetusZ_C));
    
    deltaX_C = cathetusX_C / hypotenuseC;
    deltaY_C = cathetusY_C / hypotenuseC;
    deltaZ_C = cathetusZ_C / hypotenuseC;

  }

  var collisionDWithPlane = Utils.collisionWithPlane(0.1, 0.1, posInitX_D, posInitY_D, posInitZ_D);
  var collisionDWithB = Utils.collisionWithSphere(0.1, 0.1, posInitX_D, posInitY_D, posInitZ_D, posInitX_B, posInitY_B, posInitZ_B);
  var collisionDWithC = Utils.collisionWithSphere(0.1, 0.1, posInitX_D, posInitY_D, posInitZ_D, posInitX_C, posInitY_C, posInitZ_C);
  var collisionDWithA = Utils.collisionWithSphere(0.1, 0.1, posInitX_D, posInitY_D, posInitZ_D, posInitX_A, posInitY_A, posInitZ_A);
  var collisionDWithE = Utils.collisionWithSphere(0.1, 0.1, posInitX_D, posInitY_D, posInitZ_D, posInitX_E, posInitY_E, posInitZ_E);

  if (collisionDWithPlane || collisionDWithB || collisionDWithC || collisionDWithA || collisionDWithE) {

    posRandomX_D = (Math.random() * -1.5) + 1.5;
    posRandomY_D = (Math.random() * -1.5) + 1.5;
    posRandomZ_D = (Math.random() * -10) + 1;
    
    var cathetusX_D = Math.abs(posRandomX_D-posInitX_D);
    var cathetusY_D = Math.abs(posRandomY_D-posInitY_D);
    var cathetusZ_D = Math.abs(posRandomZ_D-posInitZ_D);
    var hypotenuseD = Math.sqrt((cathetusX_D*cathetusX_D)+(cathetusY_D*cathetusY_D)+(cathetusZ_D*cathetusZ_D));
    
    deltaX_D = cathetusX_D / hypotenuseD;
    deltaY_D = cathetusY_D / hypotenuseD;
    deltaZ_D = cathetusZ_D / hypotenuseD;

  }
  
  var collisionEWithPlane = Utils.collisionWithPlane(0.1, 0.1, posInitX_E, posInitY_E, posInitZ_E);
  var collisionEWithB = Utils.collisionWithSphere(0.1, 0.1, posInitX_E, posInitY_E, posInitZ_E, posInitX_B, posInitY_B, posInitZ_B);
  var collisionEWithC = Utils.collisionWithSphere(0.1, 0.1, posInitX_E, posInitY_E, posInitZ_E, posInitX_C, posInitY_C, posInitZ_C);
  var collisionEWithD = Utils.collisionWithSphere(0.1, 0.1, posInitX_E, posInitY_E, posInitZ_E, posInitX_D, posInitY_D, posInitZ_D);
  var collisionEWithA = Utils.collisionWithSphere(0.1, 0.1, posInitX_E, posInitY_E, posInitZ_E, posInitX_A, posInitY_A, posInitZ_A);

  if (collisionEWithPlane || collisionEWithB || collisionEWithC || collisionEWithD || collisionEWithA) {

    posRandomX_E = (Math.random() * -1.5) + 1.5;
    posRandomY_E = (Math.random() * -1.5) + 1.5;
    posRandomZ_E = (Math.random() * -10) + 1;
    
    var cathetusX_E = Math.abs(posRandomX_E-posInitX_E);
    var cathetusY_E = Math.abs(posRandomY_E-posInitY_E);
    var cathetusZ_E = Math.abs(posRandomZ_E-posInitZ_E);
    var hypotenuseE = Math.sqrt((cathetusX_E*cathetusX_E)+(cathetusY_E*cathetusY_E)+(cathetusZ_E*cathetusZ_E));
    
    deltaX_E = cathetusX_E / hypotenuseE;
    deltaY_E = cathetusY_E / hypotenuseE;
    deltaZ_E = cathetusZ_E / hypotenuseE;

  }

  
  //Update positions

  if(posInitX_A != posRandomX_A){
    if(posInitX_A<posRandomX_A){
      posInitX_A+=deltaX_A*deltaTime;
    }
    if(posInitX_A>posRandomX_A){
      posInitX_A-=deltaX_A*deltaTime;
    }   
  }
  if(posInitY_A != posRandomY_A){
    if(posInitY_A<posRandomY_A){
      posInitY_A+=deltaY_A*deltaTime;
    }
    if(posInitY_A>posRandomY_A){
      posInitY_A-=deltaY_A*deltaTime;
    }   
  }
  if(posInitZ_A != posRandomZ_A){
    if(posInitZ_A<posRandomZ_A){
      posInitZ_A+=deltaZ_A*deltaTime;
    }
    if(posInitZ_A>posRandomZ_A){
      posInitZ_A-=deltaZ_A*deltaTime;
    }   
  }

  //Sphere B
  if(posInitX_B != posRandomX_B){
    if(posInitX_B<posRandomX_B){
      posInitX_B+=deltaX_B*deltaTime;
    }
    if(posInitX_B>posRandomX_B){
      posInitX_B-=deltaX_B*deltaTime;
    }   
  }
  if(posInitY_B != posRandomY_B){
    if(posInitY_B<posRandomY_B){
      posInitY_B+=deltaY_B*deltaTime;
    }
    if(posInitY_B>posRandomY_B){
      posInitY_B-=deltaY_B*deltaTime;
    }   
  }
  if(posInitZ_B != posRandomZ_B){
    if(posInitZ_B<posRandomZ_B){
      posInitZ_B+=deltaZ_B*deltaTime;
    }
    if(posInitZ_B>posRandomZ_B){
      posInitZ_B-=deltaZ_B*deltaTime;
    }   
  }

  //Sphere C
  if(posInitX_C != posRandomX_C){
    if(posInitX_C<posRandomX_C){
      posInitX_C+=deltaX_C*deltaTime;
    }
    if(posInitX_C>posRandomX_C){
      posInitX_C-=deltaX_C*deltaTime;
    }   
  }
  if(posInitY_C != posRandomY_C){
    if(posInitY_C<posRandomY_C){
      posInitY_C+=deltaY_C*deltaTime;
    }
    if(posInitY_C>posRandomY_C){
      posInitY_C-=deltaY_C*deltaTime;
    }   
  }
  if(posInitZ_C != posRandomZ_C){
    if(posInitZ_C<posRandomZ_C){
      posInitZ_C+=deltaZ_C*deltaTime;
    }
    if(posInitZ_C>posRandomZ_C){
      posInitZ_C-=deltaZ_C*deltaTime;
    }   
  }

  //Sphere D
  if(posInitX_D != posRandomX_D){
    if(posInitX_D<posRandomX_D){
      posInitX_D+=deltaX_D*deltaTime;
    }
    if(posInitX_D>posRandomX_D){
      posInitX_D-=deltaX_D*deltaTime;
    }   
  }
  if(posInitY_D != posRandomY_D){
    if(posInitY_D<posRandomY_D){
      posInitY_D+=deltaY_D*deltaTime;
    }
    if(posInitY_D>posRandomY_D){
      posInitY_D-=deltaY_D*deltaTime;
    }   
  }
  if(posInitZ_D != posRandomZ_D){
    if(posInitZ_D<posRandomZ_D){
      posInitZ_D+=deltaZ_D*deltaTime;
    }
    if(posInitZ_D>posRandomZ_D){
      posInitZ_D-=deltaZ_D*deltaTime;
    }   
  }

  //Sphere E
  if(posInitX_E != posRandomX_E){
    if(posInitX_E<posRandomX_E){
      posInitX_E+=deltaX_E*deltaTime;
    }
    if(posInitX_E>posRandomX_E){
      posInitX_E-=deltaX_E*deltaTime;
    }   
  }
  if(posInitY_E != posRandomY_E){
    if(posInitY_E<posRandomY_E){
      posInitY_E+=deltaY_E*deltaTime;
    }
    if(posInitY_E>posRandomY_E){
      posInitY_E-=deltaY_E*deltaTime;
    }   
  }
  if(posInitZ_E != posRandomZ_E){
    if(posInitZ_E<posRandomZ_E){
      posInitZ_E+=deltaZ_E*deltaTime;
    }
    if(posInitZ_E>posRandomZ_E){
      posInitZ_E-=deltaZ_E*deltaTime;
    }   
  }

  // Update the rotation for the next draw
  cubeRotation += deltaTime;


  //Here goes temporal delete**

  


  

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
