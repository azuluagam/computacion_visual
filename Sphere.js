class Sphere extends Primitive {
	
	constructor(id, type, velocity, radius) {
		super(id, type);
		this.velocity = velocity;
		this.radius = radius;
	};

	initialize(gl) {

		const indices = [];
		const normals = [];
		const textures = [];
		const positions = [];
		const latitudeBands = 30;
		const longitudeBands = 30;

		for (var lat = 0; lat <= latitudeBands; lat++) {
			
			var theta = lat * Math.PI / latitudeBands;
			var sinTheta = Math.sin(theta);
			var cosTheta = Math.cos(theta);

			for (var log = 0; log <= longitudeBands; log++) {
				
				var phi = log * 2 * Math.PI / longitudeBands;
				var sinPhi = Math.sin(phi);
				var cosPhi = Math.cos(phi);			
				var x = cosPhi * sinTheta;
				var y = cosTheta;
				var z = sinPhi * sinTheta;
	    		var u = 1 - (log/longitudeBands);
	    		var v = 1 - (lat/latitudeBands);			
				positions.push(x * this.radius);
				positions.push(y * this.radius);
				positions.push(z * this.radius);
				textures.push(u);
	    		textures.push(v);
		    	normals.push(x / this.radius);
		    	normals.push(y / this.radius);
		    	normals.push(z / this.radius);
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

		const spherePositionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, spherePositionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		
		const sphereTextureBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, sphereTextureBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textures), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		
		const sphereIndexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereIndexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW); 
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		
		// Set up the normals for the vertices, so that we can compute lighting.
		const sphereNormalBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, sphereNormalBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		  
		return {
			spherePositionBuffer: spherePositionBuffer,
			sphereIndexBuffer: sphereIndexBuffer,
			sphereIndexNum: indices.length,
			sphereTexture: sphereTextureBuffer,
			sphereTextureCoordsNum: textures.length/2,
			sphereNormal: sphereNormalBuffer,
		};
	}

	draw(gl, programInfo, modelViewMatrix, projectionMatrix, buffers, deltaTime, vecTranslate, textures) {
		//mat4.translate(modelViewMatrix, modelViewMatrix, vecTranslate);  // amount to translate
		//mat4.rotate(modelViewMatrix,  modelViewMatrix,   cubeRotation*.7, [0, 1, 0]);
		const normalMatrix = mat4.create();
		mat4.invert(normalMatrix, modelViewMatrix);
		mat4.transpose(normalMatrix, normalMatrix);
		 
		{
			const numComponents = 3;
			const type = gl.FLOAT;
			const normalize = false;
			const stride = 0;
			const offset = 0;
			gl.bindBuffer(gl.ARRAY_BUFFER, buffers.spherePositionBuffer);
			gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition,numComponents,type,normalize,stride,offset);
			gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
		}

		{
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, textures.sphere);
			gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
			gl.bindBuffer(gl.ARRAY_BUFFER, buffers.sphereTexture);
			gl.vertexAttribPointer(programInfo.attribLocations.vertexTexture, 2, gl.FLOAT, false, 0, 0);
			gl.enableVertexAttribArray(programInfo.attribLocations.vertexTexture);
		}
		
		// Tell WebGL how to pull out the normals from
		// the normal buffer into the vertexNormal attribute.
		{
			const numComponents = 3;
			const type = gl.FLOAT;
			const normalize = false;
			const stride = 0;
			const offset = 0;
			gl.bindBuffer(gl.ARRAY_BUFFER, buffers.sphereNormal);
			gl.vertexAttribPointer(programInfo.attribLocations.vertexNormal,numComponents,type,normalize,stride,offset);
			gl.enableVertexAttribArray(programInfo.attribLocations.vertexNormal);
		}

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.sphereIndexBuffer);

		// Tell WebGL to use our program when drawing

		gl.useProgram(programInfo.program);

		gl.uniform3f(programInfo.uniformLocations.ambientColorUniform, rAmbientLight, gAmbientLight, bAmbientLight);    
		var lightingDirection = directional;
		var adjustedLD = vec3.create();
		vec3.normalize(adjustedLD, lightingDirection);
		gl.uniform3fv(programInfo.uniformLocations.lightingDirectionUniform, adjustedLD);
		gl.uniform3f(programInfo.uniformLocations.directionalColorUniform, rDirectional, gDirectional, bDirectional);
		  
		   
		// Set the shader uniforms
		gl.uniformMatrix4fv( programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
		gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);
		gl.uniformMatrix4fv(programInfo.uniformLocations.normalMatrix, false, normalMatrix);
		 
		{
			const vertexCount = buffers.sphereIndexNum;
			const type = gl.UNSIGNED_SHORT;
			const offset = 0;
			gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
		}
	}
}
