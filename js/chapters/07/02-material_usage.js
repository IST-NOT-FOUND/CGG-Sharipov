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
