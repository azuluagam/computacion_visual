var cubeRotation = 0.0;
var rAmbientLight = 0.1, gAmbientLight = 0.1, bAmbientLight = 0.1;
var rDirectional = 1.0, gDirectional = 1.0, bDirectional = 1.0;
var directional = [1.0, 1.0, 1.0];
var sphereO;
var sphereV;
var cylinderO;
var cubeO;
var translation = [0.0, 0, -16.0];
var mouseXclick = 0.0;
var mouseYclick = 0.0;
var mouseZclick = 0.0;
var posX = 0.0;
var posY = 0.0;
var posZ = 0.0;
var deltaY = 0.0;
var deltaX = 0.0;
var deltaZ = 0.0;
var mouseXclick2 = 0.0;
var mouseYclick2 = 0.0;
var mouseZclick2 = 0.0;
var posX2 = 0.0;
var posY2 = 0.0;
var posZ2 = 0.0;
var deltaY2 = 0.0;
var deltaX2 = 0.0;
var deltaZ2 = 0.0;


//
var numberOfObjects = 2;
var objects = [];
var spheresPositions = [];
var matrices = [];


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

  for (var i = 0; i < numberOfObjects; i++) {
      var sphereObject = new Sphere(i, 'Sphere', 30.85, 0.1);
      objects.push(sphereObject);

    }

    for (var i = 0; i < numberOfObjects; i++) {
      var positionObject = {};
      positionObject.initX = 0.0;
      positionObject.initY = 0.0;
      positionObject.initZ = 0.0;
      positionObject.randomX = (Math.random() * -1.5) + 1.5;
      positionObject.randomY = (Math.random() * -1.5) + 1.5;
      positionObject.randomZ = (Math.random() * -10) + 1;
      
      var catetoX = Math.abs(positionObject.randomX - positionObject.initX);
      var catetoY = Math.abs(positionObject.randomY - positionObject.initY);
      var catetoZ = Math.abs(positionObject.randomZ - positionObject.initZ);
      var hipote = Math.sqrt((catetoX*catetoX)+(catetoY*catetoY)+(catetoZ*catetoZ));



      positionObject.deltaX = catetoX/hipote;
      positionObject.deltaY = catetoY/hipote;
      positionObject.deltaZ = catetoZ/hipote;

      spheresPositions.push(positionObject);

    }

  canvas.addEventListener("mouseup", function(event){


    
    /*var width=canvas.width;
    var height=canvas.height; -1 */ 
    

    /*mouseXclick = Math.floor((Math.random() * -1.5) + 1.5);//(2/width)*(event.clientX-width)+1;
    mouseYclick = Math.floor((Math.random() * -1.5) + 1.5);//-((2/height)*(event.clientY-height)+1);
    mouseZclick = Math.floor((Math.random() * -10) + 1);*/
    
    /*mouseXclick = (Math.random() * -1.5) + 1.5;//(2/width)*(event.clientX-width)+1;
    mouseYclick = (Math.random() * -1.5) + 1.5;//-((2/height)*(event.clientY-height)+1);
    mouseZclick = (Math.random() * -10) + 1; -1*/

    //console.log("Vars: "+mouseXclick+","+mouseYclick+","+mouseZclick);

    /*var catetoY = Math.abs(mouseYclick-posY);
    var catetoX = Math.abs(mouseXclick-posX);
    var catetoZ = Math.abs(mouseZclick-posZ);
    var hipote = Math.sqrt((catetoX*catetoX)+(catetoY*catetoY)+(catetoZ*catetoZ))
    deltaX = catetoX/hipote;
    deltaY = catetoY/hipote;
    deltaZ = catetoZ/hipote;-1*/

    /*console.log("Hipote: "+hipote);
    console.log("Catetos: "+catetoX+","+catetoY+","+catetoZ);
    console.log("Deltas: "+deltaX+","+deltaY+","+deltaZ);*/
    //deltaX = Math.abs(catetoX/hipote);
    //deltaY = Math.abs(catetoY/hipote);
    
    /*mouseXclick2 = (Math.random() * -1.5) + 1.5;//(2/width)*(event.clientX-width)+1;
    mouseYclick2 = (Math.random() * -1.5) + 1.5;//-((2/height)*(event.clientY-height)+1);
    mouseZclick2 = (Math.random() * -10) + 1;-1*/

    //console.log("Vars: "+mouseXclick2+","+mouseYclick2+","+mouseZclick2);

    /*var catetoY2 = Math.abs(mouseYclick2-posY2);
    var catetoX2 = Math.abs(mouseXclick2-posX2);
    var catetoZ2 = Math.abs(mouseZclick2-posZ2);
    var hipote2 = Math.sqrt((catetoX2*catetoX2)+(catetoY2*catetoY2)+(catetoZ2*catetoZ2))
    deltaX2 = catetoX2/hipote2;
    deltaY2 = catetoY2/hipote2;
    deltaZ2 = catetoZ2/hipote2;-1*/

    /*console.log("Hipote: "+hipote2);
    console.log("Catetos: "+catetoX2+","+catetoY2+","+catetoZ2);
    console.log("Deltas: "+deltaX2+","+deltaY2+","+deltaZ2);-1*/
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
  
  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  /*sphereO = new Sphere(1, 'Sphere', 30.85, 0.1);
  sphereV = new Sphere(4, 'Sphere', 30.85, 0.1);
  cylinderO = new Cylinder(2, 'Cylinder', 2);
  cubeO = new Cube(3, 'Cube');
  var cyBuffers = cylinderO.initialize(gl);//initBuffers(gl);
  var soBuffers = sphereO.initialize(gl);
  var svBuffers = sphereV.initialize(gl);
  var cuBuffers = cubeO.initialize(gl);
  var buffers = {};
  buffers.cy = cyBuffers;
  buffers.spo = soBuffers;
  buffers.spv = svBuffers;
  buffers.cu = cuBuffers;*/
  var buffers = [];
  for (var i = 0; i < numberOfObjects; i++) {
    buffers.push(objects[i].initialize(gl));
  }
  var then = 0;

  // Draw the scene repeatedly
  function render(now) {
    now *= 0.003;  // convert to seconds
    const deltaTime = now - then;
    then = now;

    drawScene(gl, programInfo, buffers, deltaTime, textures, objects);

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
  matrices = [];
  const modelViewMatrix = mat4.create();
  matrices.push(modelViewMatrix);

  if (numberOfObjects>1) {
    for (var j = 1; j < numberOfObjects; j++) {
      var matrix = mat4.create();
      mat4.copy(matrix, modelViewMatrix);
      matrices.push(matrix);
    }  
  }


  for (var i = 0; i < numberOfObjects; i++) {
    var sphereObj = objects[i];
    //console.log(sphereObj);
    var positionObj = spheresPositions[i];
    //console.log(positionObj);
    mat4.translate(matrices[i], matrices[i], [positionObj.randomX, positionObj.randomY, positionObj.randomZ]);
    sphereObj.draw(gl, programInfo, matrices[i], projectionMatrix, buffers[i], deltaTime, [0.0,0.0,-16.0], textures);

    var collision = false;
    collision = ((positionObj.randomX >=1.0 || positionObj.randomX <= -1.0) || (positionObj.randomY >=1.0 || positionObj.randomY <= -1.0) || (positionObj.randomZ >=1.0 || positionObj.randomZ <= -10.0));
    
    if (collision) {

      positionObj.randomX = (Math.random() * -1.5) + 1.5;
      positionObj.randomY = (Math.random() * -1.5) + 1.5;
      positionObj.randomZ = (Math.random() * -10) + 1;

      var catetoX = Math.abs(positionObj.randomX-positionObj.initX);
      var catetoY = Math.abs(positionObj.randomY-positionObj.initY);
      var catetoZ = Math.abs(positionObj.randomZ-positionObj.initZ);
      var hipote = Math.sqrt((catetoX*catetoX)+(catetoY*catetoY)+(catetoZ*catetoZ))
      positionObj.deltaX = catetoX/hipote;
      positionObj.deltaY = catetoY/hipote;
      positionObj.deltaZ = catetoZ/hipote;

    }

    if(positionObj.randomX != positionObj.initX){
      if(positionObj.randomX<positionObj.initX){
        positionObj.randomX+=positionObj.deltaX*deltaTime;
      }
      if(positionObj.randomX>positionObj.initX){
        positionObj.randomX-=positionObj.deltaX*deltaTime;
      }   
    }

    if(positionObj.randomY != positionObj.initY){
      if(positionObj.randomY<positionObj.initY){
        positionObj.randomY+=positionObj.deltaY*deltaTime;
      }
      if(positionObj.randomY>positionObj.initY){
        positionObj.randomY-=positionObj.deltaY*deltaTime;
      }   
    }
    
    if(positionObj.randomZ != positionObj.initZ){
      if(positionObj.randomZ<positionObj.initZ){
        positionObj.randomZ+=positionObj.deltaZ*deltaTime;
      }
      if(positionObj.randomZ>positionObj.initZ){
        positionObj.randomZ-=positionObj.deltaZ*deltaTime;
      }   
    }

  }

  //Here goes temporal delete**

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
