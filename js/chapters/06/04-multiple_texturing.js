var gl;
var shaderProgram;
var wallVertexBuffer;
var wallIndexBuffer;
var roofVertexBuffer;
var roofIndexBuffer;
var wallTextureCoordsBuffer;
var roofTextureCoordsBuffer;
var wallTexture;
var roofTexture;
var angle = 2.0;
var zTranslation = -2.0;
var mvMatrix = mat4.create();
var pMatrix = mat4.create();

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
    shaderProgram.vertexTextureAttribute = gl.getAttribLocation(shaderProgram, "aVertexTextureCoords");
    gl.enableVertexAttribArray(shaderProgram.vertexTextureAttribute);
    shaderProgram.MVMatrix = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.ProjMatrix = gl.getUniformLocation(shaderProgram, "uPMatrix");
}

function setMatrixUniforms(){
    gl.uniformMatrix4fv(shaderProgram.ProjMatrix,false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.MVMatrix, false, mvMatrix);
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

function initWallBuffers() {
    var vertices = [
        -0.8, -0.5, 0.5,
        -0.8, 0.5, 0.5,
        -0.4, 0.5, 0.5,
        -0.4, -0.5, 0.5,
        -0.8, -0.5, 0.0,
        -0.8, 0.5, 0.0,
        -0.4, 0.5, 0.0,
        -0.4, -0.5, 0.0,
        -0.8, -0.5, 0.5,
        -0.8, 0.5, 0.5,
        -0.8, 0.5, 0.0,
        -0.8, -0.5, 0.0,
        -0.4, -0.5, 0.5,
        -0.4, 0.5, 0.5,
        -0.4, 0.5, 0.0,
        -0.4, -0.5, 0.0,
        0.8, -0.5, 0.5,
        0.8, 0.5, 0.5,
        0.4, 0.5, 0.5,
        0.4, -0.5, 0.5,
        0.8, -0.5, 0.0,
        0.8, 0.5, 0.0,
        0.4, 0.5, 0.0,
        0.4, -0.5, 0.0,
        0.8, -0.5, 0.5,
        0.8, 0.5, 0.5,
        0.8, 0.5, 0.0,
        0.8, -0.5, 0.0,
        0.4, -0.5, 0.5,
        0.4, 0.5, 0.5,
        0.4, 0.5, 0.0,
        0.4, -0.5, 0.0
    ];
    var indices = [
        0, 1, 2,
        2, 3, 0,
        4, 5, 6,
        6, 7, 4,
        8, 9, 10,
        10, 11, 8,
        12, 13, 14,
        14, 15, 12,
        16, 17, 18,
        18, 19, 16,
        20, 21, 22,
        22, 23, 20,
        24, 25, 26,
        26, 27, 24,
        28, 29, 30,
        30, 31, 28
    ];
    wallVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, wallVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    wallVertexBuffer.itemSize = 3;
    wallIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, wallIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    wallIndexBuffer.numberOfItems = indices.length;
    var textureCoords = [];
    for (var i=0; i<8; i++) {
        textureCoords.push(0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0);
    }
    wallTextureCoordsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, wallTextureCoordsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    wallTextureCoordsBuffer.itemSize=2;
}

function initRoofBuffers() {
    var vertices = [
        -1.0, 0.5, 0.5,
        -1.0, 0.8, 0.5,
        1.0, 0.8, 0.5,
        1.0, 0.5, 0.5,
        -1.0, 0.5, 0.0,
        -1.0, 0.8, 0.0,
        1.0, 0.8, 0.0,
        1.0, 0.5, 0.0,
        -1.0, 0.5, 0.5,
        -1.0, 0.8, 0.5,
        -1.0, 0.8, 0.0,
        -1.0, 0.5, 0.0,
        1.0, 0.5, 0.5,
        1.0, 0.8, 0.5,
        1.0, 0.8, 0.0,
        1.0, 0.5, 0.0,
        -1.0, 0.5, 0.5,
        -1.0, 0.5, 0.0,
        1.0, 0.5, 0.0,
        1.0, 0.5, 0.5,
        -1.0, 0.8, 0.5,
        -1.0, 0.8, 0.0,
        1.0, 0.8, 0.0,
        1.0, 0.8, 0.5
    ];
    var indices = [
        0, 1, 2,
        2, 3, 0,
        4, 5, 6,
        6, 7, 4,
        8, 9, 10,
        10, 11, 8,
        12, 13, 14,
        14, 15, 12,
        16, 17, 18,
        18, 19, 16,
        20, 21, 22,
        22, 23, 20
    ];
    roofVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, roofVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    roofVertexBuffer.itemSize = 3;
    roofIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, roofIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    roofIndexBuffer.numberOfItems = indices.length;
    var textureCoords = [];
    for (var i=0; i<6; i++) {
        textureCoords.push(0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0);
    }
    roofTextureCoordsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, roofTextureCoordsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    roofTextureCoordsBuffer.itemSize=2;
}

function wallDraw() {

    gl.bindBuffer(gl.ARRAY_BUFFER, wallVertexBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
        wallVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, wallTextureCoordsBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexTextureAttribute,
        wallTextureCoordsBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, wallTexture);
    gl.enable(gl.DEPTH_TEST);
    gl.drawElements(gl.TRIANGLES, wallIndexBuffer.numberOfItems, gl.UNSIGNED_SHORT,0);
}

function roofDraw() {
    gl.bindBuffer(gl.ARRAY_BUFFER, roofVertexBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
        roofVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, roofTextureCoordsBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexTextureAttribute,
        roofTextureCoordsBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, roofTexture);
    gl.enable(gl.DEPTH_TEST);
    gl.drawElements(gl.TRIANGLES, roofIndexBuffer.numberOfItems, gl.UNSIGNED_SHORT,0);
}

function setupWebGL() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    mat4.perspective(pMatrix, 1.04, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix,mvMatrix,[0, 0, zTranslation]);
    mat4.rotate(mvMatrix,mvMatrix, angle, [0, 1, 0]);
}

function setupTextures() {
    wallTexture = gl.createTexture();
    setTexture("../../src/images/texture/lead.png", wallTexture);
    roofTexture = gl.createTexture();
    setTexture("../../src/images/texture/red.png", roofTexture);
}

function setTexture(url, texture){
    gl.bindTexture(gl.TEXTURE_2D, texture);
    var image = new Image();
    image.onload = function() {
        handleTextureLoaded(image, texture);
    };
    image.src = url;
    shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    gl.uniform1i(shaderProgram.samplerUniform, 0);
}

function handleTextureLoaded(image, texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
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
        initRoofBuffers();
        initWallBuffers();
        setupTextures();
        (function animloop(){
            setupWebGL();
            setMatrixUniforms();
            wallDraw();
            roofDraw();
            requestAnimFrame(animloop, canvas);
        })();
    }
};

function handleKeyDown(e){
    switch(e.keyCode) {
        case 39:
            angle+=0.1;
            break;
        case 37:
            angle-=0.1;
            break;
        case 40:
            zTranslation+=0.1;
            break;
        case 38:
            zTranslation-=0.1;
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
