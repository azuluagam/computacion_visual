// Temporal delete

  var matriz = mat4.create();
  mat4.copy(matriz, modelViewMatrix);
  /*.translate( modelViewMatrix,  modelViewMatrix, [0.0, 0.0, -16.0]);
  sphereV.draw(gl, programInfo, modelViewMatrix, projectionMatrix, buffers.sp, deltaTime, [0.0,0.0,-16.0], textures);
  mat4.translate( modelViewMatrix,  modelViewMatrix, [0.0, -2.0, -16.0]);
  sphereV.draw(gl, programInfo, modelViewMatrix, projectionMatrix, buffers.sp, deltaTime, [0.0,0.0,-16.0], textures);
  */
  mat4.translate( modelViewMatrix,  modelViewMatrix, [posX, posY, posZ]);
  sphereO.draw(gl, programInfo, modelViewMatrix, projectionMatrix, buffers.spo, deltaTime, [0.0,0.0,-16.0], textures);
  mat4.translate( matriz,  matriz, [posX2, posY2, posZ2]);
  sphereV.draw(gl, programInfo, matriz, projectionMatrix, buffers.spv, deltaTime, [0.0,0.0,-16.0], textures);
  
  /*for (var i = 5; i > -5; i--) {
    //console.log(i);
    mat4.translate( modelViewMatrix,  modelViewMatrix, [0.0, i, -16.0]);
    //sphereV.draw(gl, programInfo, modelViewMatrix, projectionMatrix, buffers.sp, deltaTime, [0.0, 5, -16.0], textures);  
  }*/
  //sphereV.draw(gl, programInfo, modelViewMatrix, projectionMatrix, buffers.sp, deltaTime, [0.0, -5, -16.0], textures);
  //sphereO.draw(gl, programInfo, matriz, projectionMatrix, buffers.sp, deltaTime, [0.0, 0.0, -16.0], textures);
  
  //mat4.rotate(modelViewMatrix, modelViewMatrix, 3.14,[0, 0, 1]);
  //mat4.translate( modelViewMatrix,  modelViewMatrix, [3, -6.0, -4.0]);
  //cylinderO.draw(gl, programInfo, modelViewMatrix, projectionMatrix, buffers.cy, deltaTime, [-2.0, 0.0, -6.0], textures);
  //cubeO.draw(gl, programInfo, modelViewMatrix, buffers.cu, deltaTime, [-2.0, 0.0, -6.0]);
  //sphereO.draw(gl, programInfo, modelViewMatrix, projectionMatrix, buffers, deltaTime, [2.0, 0.0, -6.0], textures);
  
  //drawSphere(gl, programInfo, modelViewMatrix, projectionMatrix, buffers, deltaTime, [0, 0.0, -6.0], textures);
  
  // Update the rotation for the next draw

  cubeRotation += deltaTime;

  var collision = false;
  var collision2 = false;
  var distance = 9999;
  collision = ((posX >=1.0 || posX <= -1.0) || (posY >=1.0 || posY <= -1.0) || (posZ >=1.0 || posZ <= -10.0));
  collision2 = ((posX2 >=1.0 || posX2 <= -1.0) || (posY2 >=1.0 || posY2 <= -1.0) || (posZ2 >=1.0 || posZ2 <= -10.0));

  var collisionBetween = false;

  distance = Math.sqrt( ((posX-posX2)*(posX-posX2)) + ((posY-posY2)*(posY-posY2)) + ((posZ-posZ2)*(posZ-posZ2)) );
  //console.log(distance);

  collisionBetween = (distance<0.1*2);
  //console.log(collisionBetween);

  if (collisionBetween) {

    console.log("COLLISION BETWEEN SPHERES");

    mouseXclick = (Math.random() * -1.5) + 1.5;//(2/width)*(event.clientX-width)+1;
    mouseYclick = (Math.random() * -1.5) + 1.5;//-((2/height)*(event.clientY-height)+1);
    mouseZclick = (Math.random() * -10) + 1;

    //console.log("Vars: "+mouseXclick+","+mouseYclick+","+mouseZclick);

    var catetoY = Math.abs(mouseYclick-posY);
    var catetoX = Math.abs(mouseXclick-posX);
    var catetoZ = Math.abs(mouseZclick-posZ);
    var hipote = Math.sqrt((catetoX*catetoX)+(catetoY*catetoY)+(catetoZ*catetoZ))
    deltaX = catetoX/hipote;
    deltaY = catetoY/hipote;
    deltaZ = catetoZ/hipote;

    /*console.log("Hipote: "+hipote);
    console.log("Catetos: "+catetoX+","+catetoY+","+catetoZ);
    console.log("Deltas: "+deltaX+","+deltaY+","+deltaZ);*/

    mouseXclick2 = (Math.random() * -1.5) + 1.5;//(2/width)*(event.clientX-width)+1;
    mouseYclick2 = (Math.random() * -1.5) + 1.5;//-((2/height)*(event.clientY-height)+1);
    mouseZclick2 = (Math.random() * -10) + 1;

    //console.log("Vars: "+mouseXclick2+","+mouseYclick2+","+mouseZclick2);

    var catetoY2 = Math.abs(mouseYclick2-posY2);
    var catetoX2 = Math.abs(mouseXclick2-posX2);
    var catetoZ2 = Math.abs(mouseZclick2-posZ2);
    var hipote2 = Math.sqrt((catetoX2*catetoX2)+(catetoY2*catetoY2)+(catetoZ2*catetoZ2))
    deltaX2 = catetoX2/hipote2;
    deltaY2 = catetoY2/hipote2;
    deltaZ2 = catetoZ2/hipote2;

    /*console.log("Hipote: "+hipote2);
    console.log("Catetos: "+catetoX2+","+catetoY2+","+catetoZ2);
    console.log("Deltas: "+deltaX2+","+deltaY2+","+deltaZ2);*/



  }

  if (collision) {

    mouseXclick = (Math.random() * -1.5) + 1.5;//(2/width)*(event.clientX-width)+1;
    mouseYclick = (Math.random() * -1.5) + 1.5;//-((2/height)*(event.clientY-height)+1);
    mouseZclick = (Math.random() * -10) + 1;

    //console.log("Vars: "+mouseXclick+","+mouseYclick+","+mouseZclick);

    var catetoY = Math.abs(mouseYclick-posY);
    var catetoX = Math.abs(mouseXclick-posX);
    var catetoZ = Math.abs(mouseZclick-posZ);
    var hipote = Math.sqrt((catetoX*catetoX)+(catetoY*catetoY)+(catetoZ*catetoZ))
    deltaX = catetoX/hipote;
    deltaY = catetoY/hipote;
    deltaZ = catetoZ/hipote;

    /*console.log("Hipote: "+hipote);
    console.log("Catetos: "+catetoX+","+catetoY+","+catetoZ);
    console.log("Deltas: "+deltaX+","+deltaY+","+deltaZ);*/

  }

  if(posX != mouseXclick){
    if(posX<mouseXclick){
      posX+=deltaX*deltaTime;
    }
    if(posX>mouseXclick){
      posX-=deltaX*deltaTime;
    }   
  }
  if(posY != mouseYclick){
    if(posY<mouseYclick){
      posY+=deltaY*deltaTime;
    }
    if(posY>mouseYclick){
      posY-=deltaY*deltaTime;
    }   
  }
  if(posZ != mouseZclick){
    if(posZ<mouseZclick){
      posZ+=deltaZ*deltaTime;
    }
    if(posZ>mouseZclick){
      posZ-=deltaZ*deltaTime;
    }   
  }

  if (collision2) {

    mouseXclick2 = (Math.random() * -1.5) + 1.5;//(2/width)*(event.clientX-width)+1;
    mouseYclick2 = (Math.random() * -1.5) + 1.5;//-((2/height)*(event.clientY-height)+1);
    mouseZclick2 = (Math.random() * -10) + 1;

    //console.log("Vars: "+mouseXclick2+","+mouseYclick2+","+mouseZclick2);

    var catetoY2 = Math.abs(mouseYclick2-posY2);
    var catetoX2 = Math.abs(mouseXclick2-posX2);
    var catetoZ2 = Math.abs(mouseZclick2-posZ2);
    var hipote2 = Math.sqrt((catetoX2*catetoX2)+(catetoY2*catetoY2)+(catetoZ2*catetoZ2))
    deltaX2 = catetoX2/hipote2;
    deltaY2 = catetoY2/hipote2;
    deltaZ2 = catetoZ2/hipote2;

    /*console.log("Hipote: "+hipote2);
    console.log("Catetos: "+catetoX2+","+catetoY2+","+catetoZ2);
    console.log("Deltas: "+deltaX2+","+deltaY2+","+deltaZ2);*/

  }

  if(posX2 != mouseXclick2){
    if(posX2<mouseXclick2){
      posX2+=deltaX2*deltaTime;
    }
    if(posX2>mouseXclick2){
      posX2-=deltaX2*deltaTime;
    }   
  }
  if(posY2 != mouseYclick2){
    if(posY2<mouseYclick2){
      posY2+=deltaY2*deltaTime;
    }
    if(posY2>mouseYclick2){
      posY2-=deltaY2*deltaTime;
    }   
  }
  if(posZ2 != mouseZclick2){
    if(posZ2<mouseZclick2){
      posZ2+=deltaZ2*deltaTime;
    }
    if(posZ2>mouseZclick2){
      posZ2-=deltaZ2*deltaTime;
    }   
  }
