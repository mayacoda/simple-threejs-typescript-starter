#include "../shaders/lygia/color/palette/water.glsl"

varying vec2 vUv;

void main() {
    gl_FragColor = vec4(water(vUv.y), 1.0);
}
