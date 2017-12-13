var gl;
var shaderProgram;
var vertexBuffer;
var indexBuffer;
var vertexNormalBuffer;
var texture;
var yAngle = 2.0;
var zTranslation = -2.0;
var xAngle = 0.1;
var mvMatrix = mat4.create();
var pMatrix = mat4.create();
var nMatrix = mat3.create();

function initShaders() {
    var fragmentShader = getShader(gl.FRAGMENT_SHADER, 'shader-fs');
    var vertexShader = getShader(gl.VERTEX_SHADER, 'shader-vs');
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Failed to install shaders");
    }
    gl.useProgram(shaderProgram);
    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
    shaderProgram.MVMatrix = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.ProjMatrix = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.NormalMatrix = gl.getUniformLocation(shaderProgram, "uNMatrix");
    shaderProgram.uniformLightPosition = gl.getUniformLocation(shaderProgram, "uLightPosition");
    shaderProgram.uniformAmbientLightColor = gl.getUniformLocation(shaderProgram, "uAmbientLightColor");
    shaderProgram.uniformDiffuseLightColor = gl.getUniformLocation(shaderProgram, "uDiffuseLightColor");
    shaderProgram.uniformSpecularLightColor = gl.getUniformLocation(shaderProgram, "uSpecularLightColor");
    shaderProgram.uniformAmbientMaterialColor = gl.getUniformLocation(shaderProgram, "uAmbientMaterialColor");
    shaderProgram.uniformDiffuseMaterialColor = gl.getUniformLocation(shaderProgram, "uDiffuseMaterialColor");
    shaderProgram.uniformSpecularMaterialColor = gl.getUniformLocation(shaderProgram, "uSpecularMaterialColor");
}

function setupLights() {
    gl.uniform3fv(shaderProgram.uniformLightPosition, [0.0, 10.0, 5.0]);
    gl.uniform3fv(shaderProgram.uniformAmbientLightColor, [0.1, 0.1, 0.1]);
    gl.uniform3fv(shaderProgram.uniformDiffuseLightColor, [0.7, 0.7, 0.7]);
    gl.uniform3fv(shaderProgram.uniformSpecularLightColor, [1.0, 1.0, 1.0]);
}

function setupMaterials() {
    gl.uniform3fv(shaderProgram.uniformAmbientMaterialColor, [0.0, 1.0, 0.0]);
    gl.uniform3fv(shaderProgram.uniformDiffuseMaterialColor, [0.7, 0.7, 0.7]);
    gl.uniform3fv(shaderProgram.uniformSpecularMaterialColor, [1.0, 1.0, 1.0]);
}

function setMatrixUniforms(){

    gl.uniformMatrix4fv(shaderProgram.ProjMatrix,false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.MVMatrix, false, mvMatrix);
    gl.uniformMatrix3fv(shaderProgram.NormalMatrix, false, nMatrix);
}

function getShader(type,id) {
    var source = document.getElementById(id).innerHTML;
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Shader compilation error: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function initBuffers() {
    var vertices = [
        -0.5, -0.5, 0.5,
        -0.5, 0.5, 0.5,
        0.5, 0.5, 0.5,
        0.5, -0.5, 0.5,
        -0.5, -0.5, -0.5,
        -0.5, 0.5, -0.5,
        0.5, 0.5, -0.5,
        0.5, -0.5, -0.5,
        -0.5, -0.5, 0.5,
        -0.5, 0.5, 0.5,
        -0.5, 0.5, -0.5,
        -0.5, -0.5, -0.5,
        0.5, -0.5, 0.5,
        0.5, 0.5, 0.5,
        0.5, 0.5, -0.5,
        0.5, -0.5, -0.5
    ];
    var indices = [
        0, 1, 2,
        2, 3, 0,
        4, 5, 6,
        6, 7, 4,
        8, 9, 10,
        10, 11, 8,
        12, 13, 14,
        14, 15, 12
    ];
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    vertexBuffer.itemSize = 3;
    indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    indexBuffer.numberOfItems = indices.length;

    var normals = [
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0
    ];
    vertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    vertexNormalBuffer.itemSize = 3;
}

function draw() {
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
        vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute,
        vertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.enable(gl.DEPTH_TEST);
    gl.drawElements(gl.TRIANGLES, indexBuffer.numberOfItems, gl.UNSIGNED_SHORT,0);

}

function setupWebGL() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    mat4.perspective(pMatrix, 1.04, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix,mvMatrix,[0, 0, zTranslation]);
    mat4.rotateX(mvMatrix,mvMatrix, xAngle);
    mat4.rotateY(mvMatrix,mvMatrix, yAngle);
    mat3.normalFromMat4(nMatrix, mvMatrix);
}

window.onload = function(){
    var canvas = document.getElementById("canvas3D");
    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch(e) {}
    if (!gl) {
        alert("Your browser doesn't support WebGL");
    } if(gl){
        document.addEventListener('keydown', handleKeyDown, false);
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
        initShaders();
        initBuffers();
        setupMaterials();
        setupLights();
        (function animloop(){
            setupWebGL();
            setMatrixUniforms();
            draw();
            requestAnimFrame(animloop, canvas);
        })();
    }
};

function handleKeyDown(e){
    switch(e.keyCode) {
        case 39:
            yAngle += 0.1;
            break;
        case 37:
            yAngle -= 0.1;
            break;
        case 40:
            xAngle += 0.1;
            break;
        case 38:
            xAngle -= 0.1;
            break;
        case 83:
            zTranslation += 0.1;
            break;
        case 87:
            zTranslation -= 0.1;
            break;
    }
}

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback, element) {
            return window.setTimeout(callback, 1000/60);
        };
})();
