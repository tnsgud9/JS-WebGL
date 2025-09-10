var gl;
var points;
window.onload = function init() {
  var canvas = document.getElementById("gl-canvas");
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }
  // Four Vertices
  var vertices = [
    vec2(-0.5, 0.5), // v0
    vec2(-0.5, -0.5), // v1
    vec2(0.5, 0.5), // v2
    vec2(0.5, -0.5), // v3
  ];
  var xPos=0;
  
  // Configure WebGL
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // Load shaders and initialize attribute buffers
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);
  // Load the data into the GPU
  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
  // Associate out shader variables with our data buffer
  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);


  var uOffset = gl.getUniformLocation(program, "uOffset");
  
  var driection = [1,1]; // 1:right, -1:left
  var speed = 0.1; // 1:right, -1:left
  var pos = [0,0];
  setInterval(()=>{
    if(pos[0]>1 || pos[0]<-1) driection[0]*=-1;
    if(pos[1]>1 || pos[1]<-1) driection[1]*=-1;
    pos[0]+=speed*driection[0];
    pos[1]+=speed*driection[1];

    gl.uniform4fv(uOffset, [...pos,0,0]);

  // gl.uniform4fv(uOffset, [1,1,0,0]);

  var uColor = gl.getUniformLocation(program, "uColor");
  gl.uniform4fv(uColor,[1,1,0,1]);
  render();
  },100);

};
function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); // 0, 1, 2, 2, 1, 3
}
