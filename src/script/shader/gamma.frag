precision highp float;

uniform vec2 resolution;
uniform sampler2D texture;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  gl_FragColor = vec4(
    pow( texture2D( texture, uv ).xyz, vec3( 1.0 / 2.2 ) ),
    1.0
  );
}
