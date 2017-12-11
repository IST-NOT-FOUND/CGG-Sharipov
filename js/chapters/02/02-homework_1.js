var gl;
var shaderProgram;
var vertexBuffer;
var indexBuffer;

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
}

function getShader(type, id) {
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
    vertices = [
        -0.2, 0.5, 0.0,
        -0.2, -0.5, 0.0,
        0.2, 0.5, 0.0,
        0.2, -0.5, 0.0,
        
        -0.7, -0.5, 0.0,
        -0.7, 0.5, 0.0,
        -0.3, 0.5, 0.0,
        
        0.6, 0.5, 0.0,
        0.3, 0.5, 0.0,
        0.3, -0.5, 0.0,
        0.6, -0.5, 0.0
    ];
    
    indices1 = [0, 1, 1, 2, 2, 3];
    indices2 = [4, 5, 5, 6];
    indices3 = [7, 8, 8, 9, 9, 10];

    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    vertexBuffer.itemSize = 3;
    indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices1), gl.STATIC_DRAW);
    indexBuffer.numberOfItems = indices1.length;
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    draw();
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices2), gl.STATIC_DRAW);
    indexBuffer.numberOfItems = indices2.length;
    draw();
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices3), gl.STATIC_DRAW);
    indexBuffer.numberOfItems = indices3.length;
    draw();
}

function draw() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
            vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.drawElements(gl.LINES, indexBuffer.numberOfItems, gl.UNSIGNED_SHORT, 0);
}
