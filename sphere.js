class Sphere {
	
	static initializeSphere() {
		const radius = 2;
		const latitudeBands = 30;
		const longitudeBands = 30;
		const indices = [];
		const positions = [];
		const textureCoordinates = [];

		for (var lat=0; lat <= latitudeBands; lat++) {
			var theta = lat * Math.PI / latitudeBands;
			var sinTheta = Math.sin(theta);
			var cosTheta = Math.cos(theta);
			
			for (var log =0; log<= longitudeBands; log++) {
				var phi = log *2*Math.PI/longitudeBands;
				var sinPhi = Math.sin(phi);
				var cosPhi = Math.cos(phi);
				
				var x=cosPhi*sinTheta;
				var y=cosTheta;
				var z=sinPhi*sinTheta;
	      		var u= 1 - (log/longitudeBands);
	      		var v= 1 - (lat/latitudeBands);
				
				positions.push(x*radius);
				positions.push(y*radius);
				positions.push(z*radius);
			  	//textureCoordinates.push(u);
				//textureCoordinates.push(v);
				var r = 0.0;
				var g = 0.0;
				var b = 0.0;
				var a = 0.0;
	      		positions.push(r);
				positions.push(g);
				positions.push(b);
				positions.push(a);
			}
		}

		for (var lat=0; lat<latitudeBands; lat++) {
			for (var log=0; log<longitudeBands; log++) {
				var first = (lat*(longitudeBands+1))+log;
				var second = first + longitudeBands + 1;
				indices.push(first);
				indices.push(second);
				indices.push(first+1);
				
				indices.push(second);
				indices.push(second+1);
				indices.push(first+1);
			}
		}

		return {
			spherePositions: positions, 
			sphereIndices: indices,
			numIndices : indices.length, 
			//textureCoords: textureCoordinates
		};
	}

	static initBuffers(gl, positionData, indexData) {
		
		/*const normalBuffer = gl.createBuffer();
	    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
	    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
	    normalBuffer.itemSize = 3;
	    normalBuffer.numItems = normalData.length / 3;*/

	    /*const textureCoordBuffer = gl.createBuffer();
	    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
	    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordData), gl.STATIC_DRAW);
	    textureCoordBuffer.itemSize = 2;
	    textureCoordBuffer.numItems = textureCoordData.length / 2;*/

	    const positionBuffer = gl.createBuffer();
	    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionData), gl.STATIC_DRAW);
	    positionBuffer.itemSize = 3;
	    positionBuffer.numItems = positionData.length / 3;

	    const indexBuffer = gl.createBuffer();
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
	    indexBuffer.itemSize = 1;
	    indexBuffer.numItems = indexData.length;

	    const faceColors = [
		    [1.0,  1.0,  1.0,  1.0],    // Front face: white
		    [1.0,  0.0,  0.0,  1.0],    // Back face: red
		    [0.0,  1.0,  0.0,  1.0],    // Top face: green
		    [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
		    [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
		    [1.0,  0.0,  1.0,  1.0],    // Left face: purple
		  ];

	    var colors = [];

		  for (var j = 0; j < faceColors.length; ++j) {
		    const c = faceColors[j];

		    // Repeat each color four times for the four vertices of the face
		    colors = colors.concat(c, c, c, c);
		  }

		  const colorBuffer = gl.createBuffer();
		  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
		  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

		return {
	    	position: positionBuffer,
	    	//textureCoord: textureCoordBuffer,
	    	indices: indexBuffer,
	    	//normal: normalBuffer,
	    	color: colorBuffer, 
		};
	}

	static draw(gl, programInfo, modelViewMatrix, projectionMatrix, buffers, deltaTime, vecTranslate, textures) {

		mat4.translate(modelViewMatrix, modelViewMatrix, vecTranslate);  // amount to translate
		  mat4.rotate(modelViewMatrix,  modelViewMatrix,   cubeRotation*.7, [0, 1, 0]);
		  
		  {
		    const numComponents = 3;
		    const type = gl.FLOAT;
		    const normalize = false;
		    const stride = 0;
		    const offset = 0;
		    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
		    gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition,numComponents,type,normalize,stride,offset);
		    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
		  }

		  /*{
		    gl.activeTexture(gl.TEXTURE0);
		    gl.bindTexture(gl.TEXTURE_2D, textures.sphere);
		    gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
		    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.sphereTexture);
		    gl.vertexAttribPointer(programInfo.attribLocations.vertexTexture, 2, gl.FLOAT, false, 0, 0);
		    gl.enableVertexAttribArray(programInfo.attribLocations.vertexTexture);
		  }*/
		  
		  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

		  // Tell WebGL to use our program when drawing

		  gl.useProgram(programInfo.program);

		  // Set the shader uniforms

		  gl.uniformMatrix4fv(
		      programInfo.uniformLocations.projectionMatrix,
		      false,
		      projectionMatrix);
		  gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix,false,modelViewMatrix);
		  
		  
		  {
		    const vertexCount = buffers.numIndices;
		    const type = gl.UNSIGNED_SHORT;
		    const offset = 0;
		    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
		  }

	}
}
