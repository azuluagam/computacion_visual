class Cylinder extends Primitive {

	constructor(id, type, radius) {
		super(id, type);
		this.radius = radius;
	};

	initialize(gl) {

		var y = 0;
		var segments = 35;
		var theta = (Math.PI/180) * (360/segments);
		  
		const sidePositions = [];
		const sideTextureCoordinates = [];
		const topPositions = [];
		const topTextureCoordinates = [];
		const bottomPositions = [];
		
		for (var i = 0; i <= segments; i++) {

			var x =  Math.cos(theta*i);
			var z =  Math.sin(theta*i);

			bottomPositions.push(x, y, z); //Bottomvertices
			sidePositions.push(x, y, z); //Sidevertices along the bottom
			sidePositions.push(x, y+5, z); //Sidevertices along the top with y = 2

			sideTextureCoordinates.push(1-(i/segments), 1);
			sideTextureCoordinates.push(1-(i/segments),0);

			topPositions.push(x, y+5, z); //Topvertices with y = 2
			var cy= (y-(-1))/(2);
			var cz= (z-(-1))/(2);
			topTextureCoordinates.push(cz,cy);
		}

		//Cylinder buffers
		const cylinderTopBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, cylinderTopBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(topPositions), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		
		const cylinderBottomBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, cylinderBottomBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bottomPositions), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		
		const topTextureBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, topTextureBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(topTextureCoordinates), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		
		const cylinderSideBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, cylinderSideBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sidePositions), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		
		const sideTextureBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, sideTextureBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sideTextureCoordinates), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
  		
  		return {
			cylinderTopBuffer: cylinderTopBuffer,
		    cylinderTopIndicesNum: topPositions.length/3,
		    cylinderBottomBuffer: cylinderBottomBuffer,
		    cylinderBottomIndicesNum: bottomPositions.length/3,
		    cylinderSideBuffer: cylinderSideBuffer,
		    cylinderSideIndicesNum: sidePositions.length/3,
		    sideTexture: sideTextureBuffer,
		    sideTextureItemSize: 2,
		    sideTextureNumVerts : sideTextureCoordinates.length/2,
		    topTexture: topTextureBuffer,
		    topTextureItemSize: 2,
		    topTextureNumVerts: topTextureCoordinates.length/2,
		};
	}

	draw(gl, programInfo, modelViewMatrix, buffers, deltaTime, vecTranslate, textures) {
		this.drawCylinderSide(gl, programInfo, modelViewMatrix, buffers, deltaTime, vecTranslate, textures);
		this.drawCylinderTop(gl, programInfo,modelViewMatrix, buffers, deltaTime, vecTranslate, textures);
		this.drawCylinderBottom(gl, programInfo, modelViewMatrix, buffers, deltaTime, vecTranslate, textures);
	}

	drawCylinderTop(gl, programInfo, modelViewMatrix, buffers, deltaTime, vecTranslate, textures) {
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

	drawCylinderBottom(gl, programInfo, modelViewMatrix, buffers, deltaTime, vecTranslate, textures) {
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

	drawCylinderSide(gl, programInfo, modelViewMatrix, buffers, deltaTime, vecTranslate, textures) {
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
}
