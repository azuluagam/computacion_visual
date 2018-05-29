class Cube extends Primitive {
	constructor(id, type) {
		super(id, type);
	};

	initialize(gl) {
		
		// Now create an array of positions for the cube.
  		  const positions = [    
		    // Front face
		    -1.0, -1.0,  1.0,
		     1.0, -1.0,  1.0,
		     1.0,  1.0,  1.0,
		    -1.0,  1.0,  1.0,

		    // Back face
		    -1.0, -1.0, -1.0,
		    -1.0,  1.0, -1.0,
		     1.0,  1.0, -1.0,
		     1.0, -1.0, -1.0,

		    // Top face
		    -1.0,  1.0, -1.0,
		    -1.0,  1.0,  1.0,
		     1.0,  1.0,  1.0,
		     1.0,  1.0, -1.0,

		    // Bottom face
		    -1.0, -1.0, -1.0,
		     1.0, -1.0, -1.0,
		     1.0, -1.0,  1.0,
		    -1.0, -1.0,  1.0,

		    // Right face
		     1.0, -1.0, -1.0,
		     1.0,  1.0, -1.0,
		     1.0,  1.0,  1.0,
		     1.0, -1.0,  1.0,

		    // Left face
		    -1.0, -1.0, -1.0,
		    -1.0, -1.0,  1.0,
		    -1.0,  1.0,  1.0,
		    -1.0,  1.0, -1.0,
		  ];
		  
		  // Now set up the colors for the faces. We'll use solid colors
		  // for each face. 

		  // Convert the array of colors into a table for all the vertices.
		    
		  var colors = [];
		  
		  const faceColors = [
		    [1.0,  1.0,  1.0,  1.0],    // Front face: white
		    [1.0,  0.0,  0.0,  1.0],    // Back face: red
		    [0.0,  1.0,  0.0,  1.0],    // Top face: green
		    [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
		    [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
		    [1.0,  0.0,  1.0,  1.0],    // Left face: purple
		  ];

		  for (var j = 0; j < faceColors.length; ++j) {
		    const c = faceColors[j];

		    // Repeat each color four times for the four vertices of the face
		    colors = colors.concat(c, c, c, c);
		  }
		  
		  // This array defines each face as two triangles, using the
		  // indices into the vertex array to specify each triangle's
		  // position.
		  
		  const indices = [
		    0,  1,  2,      0,  2,  3,    // front
		    4,  5,  6,      4,  6,  7,    // back
		    8,  9,  10,     8,  10, 11,   // top
		    12, 13, 14,     12, 14, 15,   // bottom
		    16, 17, 18,     16, 18, 19,   // right
		    20, 21, 22,     20, 22, 23,   // left
		  ];

		  const squarePositionBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, squarePositionBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
			  
			const squareColorBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, squareColorBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
			  
			const squareIndexBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

			return {
				squarePositionBuffer: squarePositionBuffer,
			    squareColorBuffer: squareColorBuffer,
			    squareIndexBuffer: squareIndexBuffer,
			};
	}

	draw(gl, programInfo, modelViewMatrix, buffers, deltaTime, vecTranslate) {
		//console.log(buffers);

		mat4.translate(modelViewMatrix,     // destination matrix
                 modelViewMatrix,     // matrix to translate
                 vecTranslate);  // amount to translate
    
		  // Tell WebGL how to pull out the positions from the position
		  // buffer into the vertexPosition attribute
		  {
		    const numComponents = 3;
		    const type = gl.FLOAT;
		    const normalize = false;
		    const stride = 0;
		    const offset = 0;
		    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.squarePositionBuffer);
		    gl.vertexAttribPointer(
		        programInfo.attribLocations.vertexPosition,
		        numComponents,
		        type,
		        normalize,
		        stride,
		        offset);
		    gl.enableVertexAttribArray(
		        programInfo.attribLocations.vertexPosition);
		  }

		  // Tell WebGL how to pull out the colors from the color buffer
		  // into the vertexColor attribute.
		  {
		    const numComponents = 4;
		    const type = gl.FLOAT;
		    const normalize = false;
		    const stride = 0;
		    const offset = 0;
		    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.squareColorBuffer);
		    gl.vertexAttribPointer(
		        programInfo.attribLocations.vertexColor,
		        numComponents,
		        type,
		        normalize,
		        stride,
		        offset);
		    gl.enableVertexAttribArray(
		        programInfo.attribLocations.vertexColor);
		  }

		  // Tell WebGL which indices to use to index the vertices
		  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.squareIndexBuffer);

		  // Tell WebGL to use our program when drawing

		  gl.useProgram(programInfo.program);

		  // Set the shader uniforms

		  gl.uniformMatrix4fv(
		      programInfo.uniformLocations.modelViewMatrix,
		      false,
		      modelViewMatrix);

		  {
		    const vertexCount = 36;
		    const type = gl.UNSIGNED_SHORT;
		    const offset = 0;
		    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
		  }

	}
}
