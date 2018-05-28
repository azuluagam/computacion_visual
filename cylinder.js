class Cylinder {

	static initializeCylinder() {

		  y=0;
		  theta = (Math.PI/180) * (360/35);
		  
		  const sidePositions = [];
		  const sideTextureCoordinates = [];
		  const topPositions = [];
		  const topTextureCoordinates = [];
		  const bottomPositions = [];
		  
		  for (i =0;i<=35;i++) {

		    x =  Math.cos(theta*i);
		    z =  Math.sin(theta*i);

		    bottomPositions.push(x, y, z); //Bottomvertices

		    sidePositions.push(x, y, z); //Sidevertices along the bottom
		    sidePositions.push(x, y+5, z); //Sidevertices along the top with y = 2

		    sideTextureCoordinates.push(1-(i/35), 1);
		    sideTextureCoordinates.push(1-(i/35),0);

		    topPositions.push(x, y+5, z); //Topvertices with y = 2
		    var cy= (y-(-1))/(2);
		    var cz= (z-(-1))/(2);
		    topTextureCoordinates.push(cz,cy);
		   }	  
				  
		return {
			cylinderTop: topPositions, 
			cylinderBottom: bottomPositions, 
			cylinderSide: sidePositions, 
			sideTextureCoordinates: sideTextureCoordinates,
			topTextureCoordinates : topTextureCoordinates
		};
		  
	}

	static initBuffers(gl, cylinderTop, cylinderBottom, topTextureCoordinates, cylinderSide, sideTextureCoordinates) {
		const cylinderTopBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, cylinderTopBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cylinderTop), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		const cylinderBottomBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, cylinderBottomBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cylinderBottom), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		const topTextureBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, topTextureBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(topTextureCoordinates), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		const cylinderSideBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, cylinderSideBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cylinderSide), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		const sideTextureBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, sideTextureBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sideTextureCoordinates), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);

		return {
	    	cylinderTopBuffer: cylinderTopBuffer,
		    cylinderTopIndicesNum: cylinderInfo.cylinderTop.length/7,
		    cylinderBottomBuffer: cylinderBottomBuffer,
		    cylinderBottomIndicesNum: cylinderInfo.cylinderBottom.length/7,
		    cylinderSideBuffer: cylinderSideBuffer,
		    cylinderSideIndicesNum: cylinderInfo.cylinderSide.length/7,
		};
	}

	function drawCylinderTop(gl, programInfo, modelViewMatrix, buffers, deltaTime, vecTranslate, textures) {  
  
	  {
	    const numComponents = 3;
	    const type = gl.FLOAT;
	    const normalize = false;
	    const stride = (3)*4;
	    const offset = 0;
	    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.cylinderTopBuffer);
	    gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition,numComponents,type,normalize,stride,offset);
	    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
	  }
	  {
	    //gl.activeTexture(gl.TEXTURE0);
	    gl.bindTexture(gl.TEXTURE_2D, textures.cylinderTop);
	    gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
	    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.topTexture);
	    gl.vertexAttribPointer(programInfo.attribLocations.vertexTexture, 2, gl.FLOAT, false, 0, 0);
	    gl.enableVertexAttribArray(programInfo.attribLocations.vertexTexture);
	  }
	  
	  gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix,false,modelViewMatrix);

	  {
	    const vertexCount = buffers.cylinderTopIndicesNum;
	    const type = gl.UNSIGNED_SHORT;
	    const offset = 0;
	    gl.drawArrays(gl.TRIANGLE_FAN, 0, vertexCount);
	  }
	  
	}

	function drawCylinderBottom(gl, programInfo, modelViewMatrix, buffers, deltaTime, vecTranslate, textures) {
	  
	  {
	    const numComponents = 3;
	    const type = gl.FLOAT;
	    const normalize = false;
	    const stride = (3)*4;
	    const offset = 0;
	    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.cylinderBottomBuffer);
	    gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition,numComponents,type,normalize,stride,offset);
	    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
	  }
	  {
	    //gl.activeTexture(gl.TEXTURE0);
	    gl.bindTexture(gl.TEXTURE_2D, textures.cylinderTop);
	    gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
	    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.topTexture);
	    gl.vertexAttribPointer(programInfo.attribLocations.vertexTexture, 2, gl.FLOAT, false, 0, 0);
	    gl.enableVertexAttribArray(programInfo.attribLocations.vertexTexture);
	  }

	  gl.useProgram(programInfo.program);
	  gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix,false,modelViewMatrix);

	  {
	    const vertexCount = buffers.cylinderBottomIndicesNum;
	    const type = gl.UNSIGNED_SHORT;
	    const offset = 0;
	    gl.drawArrays(gl.TRIANGLE_FAN, 0, vertexCount);
	  }
	 
	}

	function drawCylinderSide(gl, programInfo, modelViewMatrix, buffers, deltaTime, vecTranslate, textures) {

	  {
	    const numComponents = 3;
	    const type = gl.FLOAT;
	    const normalize = false;
	    const stride = (3)*4;
	    const offset = 0;
	    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.cylinderSideBuffer);
	    gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition,numComponents,type,normalize,stride,offset);
	    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
	  }
	  {
	    //gl.activeTexture(gl.TEXTURE0);
	    gl.bindTexture(gl.TEXTURE_2D, textures.cylinder);
	    gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
	    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.sideTexture);
	    gl.vertexAttribPointer(programInfo.attribLocations.vertexTexture, 2, gl.FLOAT, false, 0, 0);
	    gl.enableVertexAttribArray(programInfo.attribLocations.vertexTexture);
	  }

	  gl.useProgram(programInfo.program);
	  gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix,false,modelViewMatrix);

	  {
	    const vertexCount = buffers.cylinderSideIndicesNum;
	    const type = gl.UNSIGNED_SHORT;
	    const offset = 0;
	    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexCount);
	  }
	 
	}

	static draw(gl, programInfo, modelViewMatrix, buffers, deltaTime, vecTranslate, textures) {
		drawCylinderSide(gl, programInfo, modelViewMatrix, buffers, deltaTime, vecTranslate, textures);
		  drawCylinderTop(gl, programInfo,modelViewMatrix, buffers, deltaTime, vecTranslate, textures);
		  drawCylinderBottom(gl, programInfo, modelViewMatrix, buffers, deltaTime, vecTranslate, textures);
	}
}
