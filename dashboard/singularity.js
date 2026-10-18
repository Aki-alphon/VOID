/**
 * PROJECT VOID OS // QUANTUM DOT-MATRIX SINGULARITY ENGINE
 * 100% Dot-Matrix Relativistic Black Hole:
 * - Grok AI Diagonal Slash Orientation (~36.5°)
 * - High-Resolution Quantum Dot-Matrix Rasterizer (Every photon is a glowing phosphor dot)
 * - Pitch-Black Schwarzschild Event Horizon Void
 * - Razor-Sharp Incandescent White Einstein Photon Ring Dots
 * - Fiery Golden Amber & Electric Crimson Red (#FF2035) Accretion Streamers
 * - Concentric Nothing OS 3D Audio Glyph Rings & Radial Equalizer Dots
 * - Real-Time I2S Voice Audio Reactivity (Dots pulse & breathe with sound)
 * - Interactive 3D Touch/Mouse Inertial Orbit
 */

window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('singularityContainer');
  const canvas = document.getElementById('singularityCanvas');
  if (!container || !canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 8.2;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  let audioEnergy = 0.0;
  let smoothedAudio = 0.0;

  // Grok Diagonal Orientation (~36.5 deg base tilt)
  let targetRot = { x: 0.0, y: 0.0 };
  let currentRot = { x: 0.0, y: 0.0 };
  let isDragging = false;
  let lastPointer = { x: 0, y: 0 };

  window.addEventListener('pointerdown', (e) => {
    if (e.target === canvas || e.target.closest('#singularityContainer')) {
      isDragging = true;
      lastPointer = { x: e.clientX, y: e.clientY };
    }
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dx = (e.clientX - lastPointer.x) * 0.004;
    const dy = (e.clientY - lastPointer.y) * 0.004;
    targetRot.y += dx;
    targetRot.x = Math.max(-0.4, Math.min(0.4, targetRot.x + dy));
    lastPointer = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('pointerup', () => { isDragging = false; });
  window.addEventListener('pointercancel', () => { isDragging = false; });

  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  const drawingSize = new THREE.Vector2();
  renderer.getDrawingBufferSize(drawingSize);

  // ==================== 1. QUANTUM DOT-MATRIX GARGANTUA SHADER ====================
  const gargantuaMaterial = new THREE.ShaderMaterial({
    uniforms: {
      iResolution: { value: drawingSize },
      uPixelRatio: { value: renderer.getPixelRatio() },
      uScale: { value: 1.0 },
      iTime: { value: 0 },
      iAudio: { value: 0 },
      iRot: { value: new THREE.Vector2(0.0, 0.0) }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec2 iResolution;
      uniform float uPixelRatio;
      uniform float uScale;
      uniform float iTime;
      uniform float iAudio;
      uniform vec2 iRot;

      #define N_STEPS 64
      #define B_CRIT 2.5980762

      // High-precision smooth hash & value noise
      float hash(vec2 p) {
        vec3 p3 = fract(vec3(p.xyx) * 0.1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        mat2 rot = mat2(cos(0.55), sin(0.55), -sin(0.55), cos(0.55));
        for (int i = 0; i < 4; i++) {
          v += a * noise(p);
          p = rot * p * 2.02 + vec2(100.0);
          a *= 0.5;
        }
        return v;
      }

      vec2 rot2D(vec2 v, float a) {
        float c = cos(a), s = sin(a);
        return vec2(c * v.x - s * v.y, s * v.x + c * v.y);
      }

      // Grok + Interstellar Thermal Palette:
      // White-Hot Grok Beam Core -> Fiery Golden Amber -> Electric Crimson Red (#FF2035) -> Smoky Deep Charcoal
      vec3 grokPlasmaColor(float heat) {
        heat = clamp(heat, 0.0, 1.0);
        
        vec3 cCharcoal = vec3(0.38, 0.04, 0.06);   // Smoky deep charcoal crimson
        vec3 cCrimson  = vec3(1.00, 0.16, 0.22);   // Electric crimson red (#FF2035)
        vec3 cAmber    = vec3(1.00, 0.72, 0.32);   // Fiery golden amber
        vec3 cWhite    = vec3(1.00, 0.98, 0.94);   // Incandescent white-hot core

        if (heat > 0.72) {
          return mix(cAmber, cWhite, (heat - 0.72) / 0.28);
        } else if (heat > 0.35) {
          return mix(cCrimson, cAmber, (heat - 0.35) / 0.37);
        } else {
          return mix(cCharcoal, cCrimson, heat / 0.35);
        }
      }

      // Physics Raytracer: Evaluates radiance at any given screen coordinate uv
      vec4 traceBlackHole(vec2 uv) {
        float rh = 0.168; // Schwarzschild shadow radius (prominent event horizon)
        float W = B_CRIT / max(rh, 1e-4);

        // Iconic ~36.5 deg Grok Diagonal Orientation
        float grokAngle = 0.638 + iRot.y * 0.22;
        vec2 pr = rot2D(uv, grokAngle) * W;

        float rin = 2.0;   // ISCO boundary
        float rout = 8.5;  // Outer disk boundary
        
        // Relativistic edge-on viewing inclination (~85 deg)
        float diskIncl = 1.48 + iRot.x * 0.45;
        float ci = cos(diskIncl), si = sin(diskIncl);
        vec3 n = vec3(0.0, si, ci);
        vec3 e2 = vec3(0.0, ci, -si);

        float Z0 = 15.0; // Observer distance
        vec3 x = vec3(pr, Z0);
        vec3 v = vec3(0.0, 0.0, -1.0);
        float h2 = dot(pr, pr);

        vec3 emitc = vec3(0.0);
        float trans = 1.0;
        bool captured = false;

        float sPrev = dot(x, n);
        vec3 xPrev = x;

        // Binet-form Schwarzschild Geodesic Ray Integration
        for (int i = 0; i < N_STEPS; i++) {
          float r2 = dot(x, x);
          if (r2 < 1.0) { captured = true; break; } // Entered Schwarzschild event horizon
          if (x.z < -Z0 && v.z < 0.0) break;         // Escaped behind hole
          if (r2 > 4.0 * Z0 * Z0) break;             // Deflected far sideways

          float r = sqrt(r2);
          float dt = clamp(0.14 * r, 0.025, 0.75);

          vec3 a = -1.5 * h2 * x / (r2 * r2 * r);
          v += a * (0.5 * dt);
          x += v * dt;
          r2 = dot(x, x);
          r = sqrt(r2);
          a = -1.5 * h2 * x / (r2 * r2 * r);
          v += a * (0.5 * dt);

          // Accretion disk plane intersection
          float s = dot(x, n);
          if (s * sPrev < 0.0 && trans > 0.02) {
            float tc = sPrev / (sPrev - s);
            vec3 xc = mix(xPrev, x, tc);
            float rc = length(xc);

            if (rc > rin && rc < rout) {
              float radialEnvelope = smoothstep(rin, rin + 0.45, rc) * pow(1.0 - (rc - rin) / (rout - rin), 1.4);
              float phi = atan(dot(xc, e2), xc.x);
              float kepSpeed = 0.45 / sqrt(rc);
              float gloc = sqrt(max(1.0 - 1.5 / rc, 0.02));
              float swirl = phi + iTime * kepSpeed * 0.7 * gloc;

              vec2 plasmaCoord = vec2(cos(swirl), sin(swirl)) * (rc * 1.6);
              float plasma = fbm(plasmaCoord);
              plasma = smoothstep(0.18, 0.82, plasma);

              vec3 gasdir = normalize(cross(n, xc));
              float beta = clamp(inversesqrt(max(2.0 * (rc - 1.0), 0.2)), 0.0, 0.99);
              float g = gloc / max(1.0 + beta * dot(gasdir, normalize(v)), 0.05);
              g = mix(1.0, g, 0.50);

              float xpr = max(1.0 - sqrt(rin / rc), 0.0);
              float tprof = pow(rin / rc, 0.75) * pow(xpr, 0.25) / 0.488;
              float boost = pow(g, 2.5);

              float heat = clamp(tprof * g * (0.85 + 0.35 * plasma), 0.0, 1.0);
              vec3 cColor = grokPlasmaColor(heat);

              float lum = radialEnvelope * (0.55 + 0.55 * plasma) * (1.0 + iAudio * 0.4);
              emitc += trans * cColor * (2.8 * lum * tprof * tprof * boost);
              trans *= 1.0 - clamp(0.92 * lum, 0.0, 1.0);
            }
          }

          sPrev = s;
          xPrev = x;
        }

        if (!captured && dot(x, x) < 3.8) captured = true;

        // Razor-sharp Einstein photon ring hugging the event horizon — incandescent white dots
        float rScreen = length(uv);
        float rPhoton = rh * 1.045;
        float photonHalo = exp(-abs(rScreen - rPhoton) * 165.0) * 2.2;
        emitc += vec3(1.00, 0.98, 0.94) * photonHalo; // Incandescent white photon ring

        // Soft electric crimson atmospheric corona
        float corona = exp(-abs(rScreen - rh) * 22.0) * 0.36;
        emitc += vec3(1.00, 0.16, 0.22) * corona; // Electric crimson corona

        vec3 tonemapped = vec3(1.0) - exp(-emitc * 1.48);
        return vec4(tonemapped, captured ? 1.0 : 0.0);
      }

      void main() {
        vec2 res = iResolution.xy;
        float minDim = min(res.x, res.y);
        
        // ==================== NOTHING OS QUANTUM DOT-MATRIX RASTERIZER ====================
        // Pitch: 6.2 CSS pixels scaled by pixel ratio for crisp Nothing OS dot matrix
        float dotPitch = 6.2 * uPixelRatio;
        vec2 dotGrid = gl_FragCoord.xy / dotPitch;
        vec2 cell = floor(dotGrid);
        vec2 local = fract(dotGrid) - 0.5;
        float d = length(local);

        // Sample black hole physics at the center of this matrix cell
        vec2 cellCenterFrag = (cell + 0.5) * dotPitch;
        vec2 cellUV = ((cellCenterFrag - 0.5 * res) / minDim) / uScale;

        // Skip computation outside outer black hole boundary
        if (length(cellUV) > 0.85) {
          gl_FragColor = vec4(0.0);
          return;
        }

        vec4 bhSample = traceBlackHole(cellUV);
        vec3 col = bhSample.rgb;
        bool isCaptured = bhSample.a > 0.5;

        float luminance = dot(col, vec3(0.299, 0.587, 0.114));

        // Inside the event horizon void: pitch-black empty dots
        if (isCaptured && luminance < 0.08) {
          gl_FragColor = vec4(0.0);
          return;
        }

        // Dot radius modulated by relativistic energy & audio pulse
        float audioPulse = 1.0 + iAudio * 0.25;
        float dotRadius = clamp(sqrt(luminance) * 0.44 * audioPulse, 0.0, 0.46);

        // Circular dot shape with anti-aliased edge (pure clean round dot, no bloom haze)
        float dotMask = 0.0;
        if (dotRadius > 0.02) {
          dotMask = smoothstep(dotRadius, max(0.0, dotRadius - 0.06), d);
        }

        vec3 finalDotColor = col * (dotMask * 1.35);
        float alpha = clamp(dotMask, 0.0, 1.0);

        gl_FragColor = vec4(finalDotColor, alpha);
      }
    `,
    transparent: true,
    depthWrite: false
  });

  const gargantuaQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), gargantuaMaterial);
  const orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
  const orthoScene = new THREE.Scene();
  orthoScene.add(gargantuaQuad);

  // Responsive scaling
  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;

    const pr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(pr);
    renderer.setSize(width, height);

    renderer.getDrawingBufferSize(drawingSize);
    gargantuaMaterial.uniforms.iResolution.value.copy(drawingSize);
    gargantuaMaterial.uniforms.uPixelRatio.value = pr;

    const minDim = Math.min(width, height);
    let scale = 0.96;
    if (minDim < 320) {
      scale = 0.88;
    } else if (minDim > 600) {
      scale = 1.05;
    }
    gargantuaMaterial.uniforms.uScale.value = scale;
  }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('load', resize);
  requestAnimationFrame(resize);

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    smoothedAudio += (audioEnergy - smoothedAudio) * 0.12;
    const voiceEnergy = Math.max(smoothedAudio, 0.0);

    // Smooth inertia
    currentRot.x += (targetRot.x - currentRot.x) * 0.08;
    currentRot.y += (targetRot.y - currentRot.y) * 0.08;

    // Update Grok Gargantua shader uniforms
    gargantuaMaterial.uniforms.iTime.value = elapsedTime;
    gargantuaMaterial.uniforms.iAudio.value = voiceEnergy;
    gargantuaMaterial.uniforms.iRot.value.set(currentRot.x, currentRot.y);

    renderer.render(orthoScene, orthoCamera);
  }

  animate();

  window.singularityEngine = {
    setAudioEnergy: (val) => {
      audioEnergy = val;
    }
  };
});
