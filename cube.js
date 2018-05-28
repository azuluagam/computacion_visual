class Cube {
	static initializeCube() {
		
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
		  
		  return {
			  squarePositions: positions, 
			  squareColors: colors, 
			  squareIndices: indices
		  };
	}

	static initBuffers(gl, squarePositions, squareColors, squareIndices) {
		const squarePositionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, squarePositionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squarePositions), gl.STATIC_DRAW);
		  
		const squareColorBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, squareColorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squareColors), gl.STATIC_DRAW);
		  
		const squareIndexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(squareIndices), gl.STATIC_DRAW);

		return {
			squarePositionBuffer: squarePositionBuffer,
		    squareColorBuffer: squareColorBuffer,
		    squareIndexBuffer: squareIndexBuffer,
		};
	}
}
