// =============================================================
// PERIODNI SUSTAV 3D
// Dva Three.js renderera:
//   1. main  — periodni sustav (uvijek vidljiv)
//   2. chamber — atom / spoj prikaz u kocki
// =============================================================

// ── Main renderer ────────────────────────────────────────────
let scene, camera, renderer, controls;
let raycaster, pointer;
let clock = new THREE.Clock();
let currentObject = null;
let hoveredCard   = null;
let canvasEl, canvasWrap;

// ── Chamber renderer ─────────────────────────────────────────
let chamberScene, chamberCamera, chamberRenderer;
let chamberObject = null;
let chamberMode   = 'empty';

// ── Interaction state ────────────────────────────────────────
let dragState  = null;
let isDragging = false;
let panState   = null;

// ── Mixer ────────────────────────────────────────────────────
let mixer = [];

// ── Mobile ───────────────────────────────────────────────────
let isMobile = false;
let chamberState = 'standard';
let activeCategory = null;
let chamberTranslateY = 0; // px, 0 = fully expanded
let periodScanEl = null;

const SPACING   = 1.65;
const CARD_SIZE = 1.45;

// =============================================================
// INIT
// =============================================================
function init() {
  canvasEl   = document.getElementById('canvas');
  canvasWrap = document.querySelector('.canvas-wrap');

  checkMobile();
  periodScanEl = document.getElementById('period-scan');

  // ── Glavna scena ──────────────────────────────────────────
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x06081a);
  scene.fog = new THREE.Fog(0x06081a, 35, 110);

  const w = canvasEl.clientWidth, h = canvasEl.clientHeight;
  camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 1000);
  camera.position.set(0, 2, 24);

  renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h, false);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  addDirLight(scene, 0xffffff, 0.9, 8, 12, 10);
  addDirLight(scene, 0xc0a8ff, 0.4, -10, -8, 6); // rim light za glass
  addPointLight(scene, 0x00d4ff, 1.4, 60, 0, 0, 10);
  addPointLight(scene, 0xff6090, 0.8, 60, -12, -5, 5);
  addPointLight(scene, 0xffffff, 0.5, 50, 15, 10, 8);

  // Environment map za staklene refleksije
  scene.environment = createGradientEnvMap();

  addStars();

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.enableRotate  = false; controls.enablePan = false;
  controls.zoomSpeed = 1.2; controls.maxDistance = 80; controls.minDistance = 4;

  raycaster = new THREE.Raycaster();
  pointer   = new THREE.Vector2(-9999, -9999);

  buildTable();
  initChamberRenderer();
  setupUI();
  setupListeners();
  setupChamberSwipe();
  initMagicChamber();
  initChamberTransform();
  animate();
  hideLoading();
  if (isMobile) initOnboarding();
}

function addDirLight(sc, color, intensity, x, y, z) {
  const l = new THREE.DirectionalLight(color, intensity);
  l.position.set(x, y, z); sc.add(l);
}
function addPointLight(sc, color, intensity, distance, x, y, z) {
  const l = new THREE.PointLight(color, intensity, distance);
  l.position.set(x, y, z); sc.add(l);
}

function addStars() {
  const geo = new THREE.BufferGeometry();
  const pos = [];
  for (let i = 0; i < 600; i++)
    pos.push((Math.random()-.5)*220, (Math.random()-.5)*220, (Math.random()-.5)*220);
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  scene.add(new THREE.Points(geo,
    new THREE.PointsMaterial({ color:0xffffff, size:.14, transparent:true, opacity:.55 })));
}

function hideLoading() {
  const l = document.getElementById('loading');
  if (l) l.style.display = 'none';
}

// =============================================================
// MOBILNA DETEKCIJA
// =============================================================
function checkMobile() {
  const wasMobile = isMobile;
  isMobile = window.innerWidth <= 900;

  const panel = document.querySelector('.right-panel');
  if (!panel) return;
  if (isMobile && !wasMobile) {
    chamberTranslateY = snapYForState(chamberState);
    panel.style.transform = `translateY(${chamberTranslateY}px)`;
  } else if (!isMobile && wasMobile) {
    panel.style.transform = '';
  }
}

function snapYForState(state) {
  const panelH = window.innerHeight * 0.9;
  if (state === 'mini')     return panelH - 64;
  if (state === 'full')     return 0;
  return Math.max(0, panelH - window.innerWidth * 0.46);
}

function initChamberTransform() {
  if (!isMobile) return;
  const panel = document.querySelector('.right-panel');
  if (!panel) return;
  chamberTranslateY = snapYForState(chamberState);
  panel.style.transform = `translateY(${chamberTranslateY}px)`;
}

// =============================================================
// HAPTIC FEEDBACK
// =============================================================
function haptic(type = 'light') {
  if (!navigator.vibrate) return;
  const patterns = { light: 10, medium: 25, heavy: [40, 20, 40] };
  navigator.vibrate(patterns[type] || 10);
}

// =============================================================
// CHAMBER RENDERER
// =============================================================
function initChamberRenderer() {
  const cc = document.getElementById('chamber-canvas');
  if (!cc) return;

  chamberScene = new THREE.Scene();

  const cw = cc.clientWidth  || 282;
  const ch = cc.clientHeight || 282;
  chamberCamera = new THREE.PerspectiveCamera(52, cw / ch, 0.1, 100);
  chamberCamera.position.set(0, 0, 12);

  chamberRenderer = new THREE.WebGLRenderer({ canvas: cc, antialias: true, alpha: true });
  chamberRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  chamberRenderer.setSize(cw, ch, false);
  chamberRenderer.outputEncoding = THREE.sRGBEncoding;

  chamberScene.add(new THREE.AmbientLight(0xffffff, 0.55));
  addDirLight(chamberScene, 0xffffff, 0.9, 5, 8, 7);
  addPointLight(chamberScene, 0x00d4ff, 1.3, 25, 0, 0, 8);
  addPointLight(chamberScene, 0xa855f7, 0.8, 20, -5, -3, 3);
}

function clearChamberScene() {
  if (chamberObject) {
    chamberScene.remove(chamberObject);
    disposeGroup(chamberObject);
    chamberObject = null;
  }
  chamberMode = 'empty';
  setChamberLabel('', '');
}

function setChamberLabel(formula, name) {
  const el = document.getElementById('chamber-label');
  if (!el) return;
  if (!formula) { el.classList.remove('visible'); el.innerHTML = ''; return; }
  el.innerHTML = `<span class="chamber-label-formula">${formula}</span><span class="chamber-label-name">${name}</span>`;
  el.classList.add('visible');
}

// =============================================================
// GLASS GEOMETRY — zaobljeni ekstrudirani box (smooth silueta)
// =============================================================
let _sharedGlassGeo = null;
function getGlassGeometry() {
  if (_sharedGlassGeo) return _sharedGlassGeo;
  const w = CARD_SIZE, h = CARD_SIZE, d = 0.18, r = 0.18;
  const shape = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: d,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 4,
    curveSegments: 10
  });
  geo.translate(0, 0, -d / 2 - 0.025); // centar na Z osi
  _sharedGlassGeo = geo;
  return geo;
}

// =============================================================
// GLASS MATERIAL — vibrant neon iridescent crystal
// Pune boje, jaki emissive glow, oštri clearcoat
// =============================================================
function makeGlassMaterial(catKey) {
  const cat = window.CATEGORIES[catKey] || window.CATEGORIES.nonmetal;
  const fullColor = new THREE.Color(cat.color);
  // Boost saturacije: u HSL prostoru
  const hsl = { h:0, s:0, l:0 }; fullColor.getHSL(hsl);
  fullColor.setHSL(hsl.h, Math.min(1, hsl.s * 1.3), Math.min(0.65, hsl.l * 1.1));

  return new THREE.MeshPhysicalMaterial({
    color: fullColor,
    emissive: fullColor.clone().multiplyScalar(0.85),
    emissiveIntensity: 0.55,    // unutarnji neon glow
    transparent: true,
    opacity: 0.55,              // dovoljno da boja udari, ali još uvijek prozirno
    roughness: 0.02,            // mirror-smooth
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,   // britki highlight rubovi
    side: THREE.DoubleSide,
    depthWrite: true,
    envMapIntensity: 2.2,       // jake refleksije iz neon env mape
    ior: 1.5,
    reflectivity: 0.55
  });
}

// =============================================================
// ENVIRONMENT MAP — vibrant neon gradient (iridescent reflections)
// =============================================================
function createGradientEnvMap() {
  const cv = document.createElement('canvas');
  cv.width = 1024; cv.height = 512;
  const ctx = cv.getContext('2d');

  // Tamna baza (crna) — tako da neonske mrlje sjaje na crnom
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 1024, 512);

  // Neonske svjetiljke razbacane oko sfere — odražavaju se kao iridescentni hotspots
  const lights = [
    { x:120,  y:90,  r:180, c:'rgba(255, 60,200,0.95)' }, // hot pink
    { x:380,  y:140, r:160, c:'rgba(0, 230,255,0.90)'  }, // cyan
    { x:640,  y:80,  r:170, c:'rgba(255,220, 60,0.85)' }, // yellow
    { x:880,  y:130, r:180, c:'rgba(160, 80,255,0.92)' }, // magenta-violet
    { x:240,  y:340, r:150, c:'rgba(0, 255,160,0.85)'  }, // neon green
    { x:520,  y:380, r:180, c:'rgba(255,100,100,0.90)' }, // hot red
    { x:780,  y:360, r:160, c:'rgba(120,200,255,0.85)' }, // ice blue
  ];
  lights.forEach(l => {
    const g = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, l.r);
    g.addColorStop(0,    l.c);
    g.addColorStop(0.45, l.c.replace(/,[\d.]+\)$/, ',0.35)'));
    g.addColorStop(1,    'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 1024, 512);
  });

  // Gornja "horizon" linija — daje refleksiji vertikalnu strukturu
  const hor = ctx.createLinearGradient(0, 220, 0, 280);
  hor.addColorStop(0, 'rgba(0,0,0,0)');
  hor.addColorStop(0.5, 'rgba(255,255,255,0.18)');
  hor.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = hor;
  ctx.fillRect(0, 220, 1024, 60);

  const tex = new THREE.CanvasTexture(cv);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.encoding = THREE.sRGBEncoding;
  return tex;
}

// =============================================================
// TEXT OVERLAY — embossed/etched stil (4 sloja: shadow, stroke, highlight, fill)
// Tekst izgleda kao izrezbaren u staklu (3D bevel)
// =============================================================
function makeTextOverlayTexture(el) {
  const cv = document.createElement('canvas');
  cv.width = 512; cv.height = 512;
  const ctx = cv.getContext('2d');
  ctx.clearRect(0, 0, 512, 512);

  // Helper: 4-slojni embossed tekst
  function drawEmbossed(text, x, y, fontStr, opts) {
    const o = Object.assign({ shadowOffset: 4, strokeWidth: 5, mainAlpha: 0.97, hiAlpha: 0.45 }, opts || {});
    ctx.font = fontStr;

    // 1. Duboka sjenka (kao da se tekst utisnut u staklo)
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowBlur  = o.shadowOffset * 1.2;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = o.shadowOffset;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillText(text, x, y);

    // Reset sjenke za ostale slojeve
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur  = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // 2. Tamni outline (definira slova)
    ctx.lineJoin   = 'round';
    ctx.miterLimit = 2;
    ctx.strokeStyle = 'rgba(0,0,0,0.55)';
    ctx.lineWidth   = o.strokeWidth;
    ctx.strokeText(text, x, y);

    // 3. Gornji highlight (kao da svjetlo udara na izdignuti rub)
    ctx.fillStyle = `rgba(255,255,255,${o.hiAlpha})`;
    ctx.fillText(text, x, y - 1.2);

    // 4. Glavni fill (čisto bijela)
    ctx.fillStyle = `rgba(255,255,255,${o.mainAlpha})`;
    ctx.fillText(text, x, y);
  }

  // === Atomski broj — gore lijevo ===
  ctx.textAlign = 'left'; ctx.textBaseline = 'top';
  drawEmbossed(el.n.toString(), 38, 38,
    '500 44px "JetBrains Mono", "Consolas", monospace',
    { shadowOffset: 2, strokeWidth: 3, mainAlpha: 0.92, hiAlpha: 0.35 });

  // === Simbol — veliko, centrirano ===
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  drawEmbossed(el.s, 256, 256,
    '700 210px "Sora", "Segoe UI", sans-serif',
    { shadowOffset: 7, strokeWidth: 7, mainAlpha: 0.98, hiAlpha: 0.5 });

  // === Naziv — ispod simbola ===
  ctx.textBaseline = 'alphabetic';
  const nSz = el.name.length > 9 ? 32 : el.name.length > 6 ? 38 : 42;
  drawEmbossed(el.name, 256, 410,
    `600 ${nSz}px "Sora", "Segoe UI", sans-serif`,
    { shadowOffset: 3, strokeWidth: 4, mainAlpha: 0.95, hiAlpha: 0.4 });

  // === Atomska masa — dno ===
  drawEmbossed(el.m.toString(), 256, 466,
    '400 28px "JetBrains Mono", "Consolas", monospace',
    { shadowOffset: 2, strokeWidth: 2, mainAlpha: 0.78, hiAlpha: 0.3 });

  const tex = new THREE.CanvasTexture(cv);
  tex.encoding   = THREE.sRGBEncoding;
  tex.anisotropy = 8;
  tex.minFilter  = THREE.LinearMipmapLinearFilter;
  tex.magFilter  = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

function makeTextMesh(el) {
  const tex = makeTextOverlayTexture(el);
  const mat = new THREE.MeshBasicMaterial({
    map: tex, transparent: true,
    depthWrite: false, depthTest: true,
    side: THREE.FrontSide
  });
  const geo = new THREE.PlaneGeometry(CARD_SIZE * 0.96, CARD_SIZE * 0.96);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.z = 0.115; // ispred staklene plohe
  return mesh;
}

// =============================================================
// CARD DIM HELPER — koristi se u filter funkcijama
// =============================================================
function setCardDim(card, dimmed) {
  const glass = card.material;
  const text = card.userData.textMat;
  if (glass) {
    glass.opacity = dimmed ? 0.06 : 0.55;
    glass.emissiveIntensity = dimmed ? 0.05 : 0.55;
    glass.transparent = true;
  }
  if (text) {
    text.opacity = dimmed ? 0.12 : 1.0;
  }
}

function roundRect(ctx,x,y,w,h,r) {
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r);
  ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath();
}

function shade(hex, lum) {
  let c=parseInt(hex.slice(1),16), r=(c>>16)&255, g=(c>>8)&255, b=c&255;
  if (lum>0) { r=Math.min(255,Math.round(r+(255-r)*lum)); g=Math.min(255,Math.round(g+(255-g)*lum)); b=Math.min(255,Math.round(b+(255-b)*lum)); }
  else       { r=Math.max(0,Math.round(r*(1+lum))); g=Math.max(0,Math.round(g*(1+lum))); b=Math.max(0,Math.round(b*(1+lum))); }
  return '#'+((r<<16)|(g<<8)|b).toString(16).padStart(6,'0');
}

// =============================================================
// BUILD TABLE — staklene kartice s tekstom kao zasebnim slojem
// =============================================================
function buildTable() {
  const grp = new THREE.Group(); grp.name = 'tableGroup';
  const glassGeo = getGlassGeometry();

  window.ELEMENTS.forEach(el => {
    const glassMat = makeGlassMaterial(el.cat);
    const card = new THREE.Mesh(glassGeo, glassMat);

    // Tekst kao child — automatski prati transformacije roditelja (hover, drag)
    const textMesh = makeTextMesh(el);
    card.add(textMesh);

    const x = (el.col - 9.5) * SPACING;
    let   y = -(el.row - 4.5) * SPACING;
    if (el.row === 9)  y -= 0.6;
    if (el.row === 10) y -= 0.6;
    card.position.set(x, y, 0);

    card.userData.element  = el;
    card.userData.isCard   = true;
    card.userData.basePos  = card.position.clone();
    card.userData.textMat  = textMesh.material;
    card.userData.textMesh = textMesh;

    grp.add(card);
  });
  scene.add(grp); currentObject = grp;
}

// =============================================================
// ATOM — prikazuje se u chamber sceni
// =============================================================
function showAtom(element) {
  clearChamberScene(); chamberMode = 'atom';

  const grp = new THREE.Group(); grp.name = 'atomGroup';
  const nr  = Math.max(.55, Math.log(element.n + 1) * .32);

  const nucleus = new THREE.Mesh(
    new THREE.IcosahedronGeometry(nr, 3),
    new THREE.MeshStandardMaterial({ color:0xff5566, emissive:0xff2233, emissiveIntensity:.55, roughness:.25, metalness:.3 })
  );
  grp.add(nucleus);
  grp.add(new THREE.Mesh(
    new THREE.SphereGeometry(nr*1.45,32,32),
    new THREE.MeshBasicMaterial({ color:0xff6677, transparent:true, opacity:.18, side:THREE.BackSide })
  ));

  const shells = window.getBohrShells(element.n);
  const shellGroups = [];
  shells.forEach((count, si) => {
    const R  = nr + 1.6 + si * 1.4;
    const sg = new THREE.Group();
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(R, .022, 8, 96),
      new THREE.MeshBasicMaterial({ color:0x00d4ff, transparent:true, opacity:.28 })
    );
    ring.rotation.x = Math.PI / 2; sg.add(ring);
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const e = new THREE.Mesh(
        new THREE.SphereGeometry(.13,16,16),
        new THREE.MeshStandardMaterial({ color:0x00e5ff, emissive:0x00d4ff, emissiveIntensity:1.3 })
      );
      e.position.set(Math.cos(a)*R, 0, Math.sin(a)*R);
      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(.24,16,16),
        new THREE.MeshBasicMaterial({ color:0x00d4ff, transparent:true, opacity:.28 })
      );
      glow.position.copy(e.position); sg.add(e); sg.add(glow);
    }
    sg.rotation.x = si*.5-.3; sg.rotation.z = si*.4;
    sg.userData.rotSpeed = .7 - si*.08;
    grp.add(sg); shellGroups.push(sg);
  });

  grp.userData.shells  = shellGroups;
  grp.userData.nucleus = nucleus;
  grp.userData.isAtom  = true;
  grp.userData.element = element;

  chamberScene.add(grp); chamberObject = grp;

  const camDist = Math.max(8, 4.5 + shells.length * 2.2);
  chamberCamera.position.set(0, 0, camDist);
  chamberCamera.lookAt(0, 0, 0);

  setChamberLabel(element.s, element.name);
  updateInfoPanelAtom(element);

  // Na mobu: kratka obavijest jer je info panel skriven
  if (isMobile) showMessage(`⚛ ${element.s} · ${element.name}`, 'info');
}

// =============================================================
// SPOJ
// =============================================================
function showCompound(compound) {
  clearChamberScene(); chamberMode = 'compound';

  const grp = new THREE.Group(); grp.name = 'compoundGroup';
  grp.userData.isCompound = true;

  const atomMeshes = [];
  compound.atoms.forEach(a => {
    const ed = window.ELEMENTS.find(e => e.s === a.el);
    const ar = Math.max(.32, Math.log((ed?.n || 1)+1)*.22);
    const ac = ed?.color || 0xffffff;
    const atom = new THREE.Mesh(
      new THREE.SphereGeometry(ar,32,32),
      new THREE.MeshStandardMaterial({ color:ac, roughness:.3, metalness:.5, emissive:ac, emissiveIntensity:.22 })
    );
    atom.position.fromArray(a.pos);
    atom.add(new THREE.Mesh(
      new THREE.SphereGeometry(ar*1.38,32,32),
      new THREE.MeshBasicMaterial({ color:ac, transparent:true, opacity:.14, side:THREE.BackSide })
    ));
    grp.add(atom); atomMeshes.push(atom);
    const sp = makeTextSprite(a.el, .5);
    sp.position.copy(atom.position); sp.position.y += ar + .35;
    grp.add(sp);
    const mini = createMiniElectrons(ed, ar);
    mini.position.copy(atom.position); grp.add(mini);
    (grp.userData.miniAtoms = grp.userData.miniAtoms || []).push(mini);
  });

  compound.bonds.forEach(b => {
    const a1 = atomMeshes[b.from], a2 = atomMeshes[b.to];
    if (a1 && a2) drawBond(grp, a1.position, a2.position, b.type);
  });

  chamberScene.add(grp); chamberObject = grp;
  chamberCamera.position.set(0, 1, 9);
  chamberCamera.lookAt(0, 0, 0);

  setChamberLabel(compound.formula, compound.name);
  updateInfoPanelCompound(compound);
}

function createMiniElectrons(elData, ar) {
  const g = new THREE.Group(); if (!elData) return g;
  const v = window.getValenceElectrons(elData.n), R = ar * 1.8;
  for (let i = 0; i < Math.min(v, 8); i++) {
    const a = (i / Math.min(v,8)) * Math.PI * 2;
    const e = new THREE.Mesh(new THREE.SphereGeometry(.06,8,8), new THREE.MeshBasicMaterial({ color:0x00e5ff }));
    e.position.set(Math.cos(a)*R, 0, Math.sin(a)*R); g.add(e);
  }
  g.userData.rotSpeed = 1.5 + Math.random()*.5;
  g.rotation.x = Math.random()*.5; g.rotation.z = Math.random()*.5;
  g.userData.isMiniAtom = true; return g;
}

function drawBond(parent, p1, p2, type) {
  const dir = new THREE.Vector3().subVectors(p2,p1);
  const len = dir.length(), mid = new THREE.Vector3().addVectors(p1,p2).multiplyScalar(.5);
  const ax  = dir.clone().normalize();
  let perp  = new THREE.Vector3().crossVectors(ax, new THREE.Vector3(0,1,0));
  if (perp.lengthSq() < .01) perp = new THREE.Vector3().crossVectors(ax, new THREE.Vector3(1,0,0));
  perp.normalize();
  (type===1?[0]:type===2?[-.18,.18]:[-.22,0,.22]).forEach(off => {
    const cyl = new THREE.Mesh(
      new THREE.CylinderGeometry(.07,.07,len,12),
      new THREE.MeshStandardMaterial({ color:0xccddee, roughness:.35, metalness:.4, emissive:0x667788, emissiveIntensity:.15 })
    );
    cyl.position.copy(mid).add(perp.clone().multiplyScalar(off));
    cyl.lookAt(p2.clone().add(perp.clone().multiplyScalar(off)));
    cyl.rotateX(Math.PI/2); parent.add(cyl);
  });
}

function makeTextSprite(text, scale=1) {
  const cv=document.createElement('canvas'); cv.width=512; cv.height=128;
  const ctx=cv.getContext('2d');
  ctx.fillStyle='rgba(8,10,26,.72)'; ctx.fillRect(0,0,512,128);
  ctx.strokeStyle='rgba(0,212,255,.5)'; ctx.lineWidth=3; ctx.strokeRect(2,2,508,124);
  ctx.font='bold 54px sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillStyle='#e6f6ff'; ctx.fillText(text,256,64);
  const tex=new THREE.CanvasTexture(cv); tex.encoding=THREE.sRGBEncoding;
  const s=new THREE.Sprite(new THREE.SpriteMaterial({ map:tex, transparent:true }));
  s.scale.set(scale*4,scale,1); return s;
}

// =============================================================
// CLEAR CHAMBER
// =============================================================
function clearChamber() {
  clearChamberScene();
  clearMixer();
  updateInfoPanelDefault();
}

// =============================================================
// DISPOSE
// =============================================================
function disposeGroup(g) {
  g.traverse(o => {
    if (o.geometry) o.geometry.dispose();
    if (o.material) (Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{if(m.map)m.map.dispose();m.dispose();});
  });
}

// =============================================================
// MAIN LOOP
// =============================================================
let camTgtPos=null, camTgtLook=null, camAnimStart=0;
const CAM_DUR=1.0;

function animateCameraTo(pos,look) {
  camTgtPos={from:camera.position.clone(),to:pos.clone()};
  camTgtLook={from:controls.target.clone(),to:look.clone()};
  camAnimStart=clock.getElapsedTime();
}
function updateCameraAnim() {
  if (!camTgtPos) return;
  const t=Math.min((clock.getElapsedTime()-camAnimStart)/CAM_DUR,1);
  const e=1-Math.pow(1-t,3);
  camera.position.lerpVectors(camTgtPos.from,camTgtPos.to,e);
  controls.target.lerpVectors(camTgtLook.from,camTgtLook.to,e);
  if (t>=1){camTgtPos=null;camTgtLook=null;}
}

function animate() {
  requestAnimationFrame(animate);
  const dt=clock.getDelta(), t=clock.getElapsedTime();
  updateCameraAnim();
  updateHover();
  controls.update();
  renderer.render(scene, camera);

  if (chamberObject?.userData.isAtom) {
    chamberObject.userData.shells?.forEach(s=>{s.rotation.y+=dt*(s.userData.rotSpeed||.5);});
    if (chamberObject.userData.nucleus) chamberObject.userData.nucleus.rotation.y+=dt*.3;
  }
  if (chamberObject?.userData.isCompound) {
    chamberObject.rotation.y+=dt*.28;
    (chamberObject.userData.miniAtoms||[]).forEach(m=>{m.rotation.y+=dt*(m.userData.rotSpeed||1);});
  }
  if (chamberRenderer) chamberRenderer.render(chamberScene, chamberCamera);
}

// =============================================================
// HOVER
// =============================================================
function updateHover() {
  if (!currentObject || isDragging) return;
  raycaster.setFromCamera(pointer, camera);
  const cards = currentObject.children.filter(c=>c.userData.isCard);
  const hits  = raycaster.intersectObjects(cards, false);

  if (hoveredCard && hoveredCard !== hits[0]?.object) {
    hoveredCard.position.z = hoveredCard.userData.basePos.z;
    hoveredCard.scale.setScalar(1); hoveredCard = null;
    canvasEl.style.cursor = 'grab';
  }
  if (hits[0] && hoveredCard !== hits[0].object) {
    hoveredCard = hits[0].object;
    hoveredCard.position.z = hoveredCard.userData.basePos.z + .55;
    hoveredCard.scale.setScalar(1.13);
    canvasEl.style.cursor = 'pointer';
    showHoverTooltip(hoveredCard.userData.element);
  } else if (!hits[0]) { hideHoverTooltip(); }
}

// =============================================================
// PAN
// =============================================================
function startPan(x,y) {
  panState={x,y,camX:camera.position.x,camY:camera.position.y,tX:controls.target.x,tY:controls.target.y};
}
function updatePan(x,y) {
  if (!panState) return;
  const dist  = camera.position.distanceTo(controls.target);
  const px    = (2*Math.tan(camera.fov*.5*Math.PI/180)*dist)/canvasEl.clientHeight;
  const dx    = (x-panState.x)*px, dy = (y-panState.y)*px;
  camera.position.x   = panState.camX-dx; camera.position.y   = panState.camY+dy;
  controls.target.x   = panState.tX  -dx; controls.target.y   = panState.tY  +dy;
  controls.update();
}
function endPan() { panState=null; }

// =============================================================
// DRAG & DROP
// =============================================================
function getCardAtPointer(cx,cy) {
  if (!currentObject) return null;
  const rect = canvasEl.getBoundingClientRect();
  raycaster.setFromCamera(
    new THREE.Vector2(((cx-rect.left)/rect.width)*2-1, -((cy-rect.top)/rect.height)*2+1),
    camera
  );
  const hits = raycaster.intersectObjects(currentObject.children.filter(c=>c.userData.isCard), false);
  return hits.length ? hits[0].object.userData.element : null;
}

// Projekcija 3D kartice na 2D ekran
function getCardScreenPos(element) {
  if (!currentObject || !canvasEl) return null;
  const card = currentObject.children.find(c => c.userData.element?.n === element.n);
  if (!card) return null;
  const v = new THREE.Vector3();
  v.setFromMatrixPosition(card.matrixWorld);
  v.project(camera);
  const rect = canvasEl.getBoundingClientRect();
  const x = (v.x + 1) / 2 * rect.width + rect.left;
  const y = -(v.y - 1) / 2 * rect.height + rect.top;
  if (x > rect.left - 50 && x < rect.right + 50 && y > rect.top - 50 && y < rect.bottom + 50) return { x, y };
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 3 };
}

function onPointerDown(e) {
  if (e.button!==undefined && e.button!==0) return;
  const cx = e.touches?e.touches[0].clientX:e.clientX;
  const cy = e.touches?e.touches[0].clientY:e.clientY;
  const el = getCardAtPointer(cx,cy);
  if (el) {
    controls.enabled = false;
    dragState = { element:el, startX:cx, startY:cy, initiated:false };
    if (isMobile) startLongPress(cx, cy, el);
  } else {
    startPan(cx,cy);
  }
}

function initiateDrag(cx,cy) {
  if (!dragState) return;
  clearLongPress();
  isDragging = true; dragState.initiated = true;
  canvasWrap.classList.add('dragging-element');

  const el  = dragState.element;
  const cat = window.CATEGORIES[el.cat];
  const hex = '#'+cat.color.toString(16).padStart(6,'0');

  const ghost = document.getElementById('drag-ghost');
  ghost.style.borderColor = hex;
  ghost.style.background  = hex+'22';
  ghost.style.boxShadow   = `0 0 22px ${hex}cc,0 0 44px rgba(168,85,247,.35)`;
  ghost.innerHTML = `<span class="ghost-sym">${el.s}</span><span class="ghost-name">${el.name}</span>`;
  ghost.classList.add('active');
  moveGhost(cx,cy);

  document.getElementById('mixer-drop-zone')?.classList.add('active-drop');
  showDragHints(el.s, cx, cy);
}

function moveGhost(x,y) {
  const g = document.getElementById('drag-ghost');
  g.style.left=x+'px'; g.style.top=y+'px';
}

function onPointerMove(e) {
  const cx = e.touches?e.touches[0].clientX:e.clientX;
  const cy = e.touches?e.touches[0].clientY:e.clientY;

  const rect = canvasEl.getBoundingClientRect();
  pointer.x = ((cx-rect.left)/rect.width)*2-1;
  pointer.y = -((cy-rect.top)/rect.height)*2+1;

  if (panState && !dragState) { updatePan(cx,cy); return; }
  if (!dragState) return;

  if (!dragState.initiated) {
    const dx=cx-dragState.startX, dy=cy-dragState.startY;
    if (Math.sqrt(dx*dx+dy*dy)>7) {
      clearLongPress();
      initiateDrag(cx,cy);
    }
    return;
  }
  moveGhost(cx,cy);
}

function onPointerUp(e) {
  clearLongPress();
  if (panState) endPan();
  if (!dragState) { controls.enabled=true; return; }

  const cx = e.changedTouches?e.changedTouches[0].clientX:e.clientX;
  const cy = e.changedTouches?e.changedTouches[0].clientY:e.clientY;

  const wasInitiated = dragState.initiated;
  const el = dragState.element;

  dragState=null; isDragging=false; controls.enabled=true;
  canvasWrap.classList.remove('dragging-element');
  document.getElementById('drag-ghost')?.classList.remove('active');
  document.getElementById('mixer-drop-zone')?.classList.remove('active-drop');
  hideDragHints();

  if (!wasInitiated) {
    // Tap — na mobu prikaži action sheet, na desktopu odmah atom
    if (isMobile) {
      showTapSpotlight(cx, cy, el);
      showActionSheet(el);
    } else {
      showAtom(el);
    }
    return;
  }

  const mixerEl = document.getElementById('mixer-section');
  if (!mixerEl) return;
  const rect = mixerEl.getBoundingClientRect();
  if (cx>=rect.left && cx<=rect.right && cy>=rect.top && cy<=rect.bottom) {
    animateDrop(el, cx, cy, ()=>{ addToMixerInternal(el.s); });
  }
}

function cancelDrag() {
  clearLongPress();
  if (dragState) dragState=null;
  if (panState)  panState=null;
  isDragging=false; controls.enabled=true;
  canvasWrap?.classList.remove('dragging-element');
  document.getElementById('drag-ghost')?.classList.remove('active');
  document.getElementById('mixer-drop-zone')?.classList.remove('active-drop');
  hideDragHints();
}

// =============================================================
// LONG-PRESS LUPA
// =============================================================
let longPressTimer = null;
let longPressActive = false;

function startLongPress(cx, cy, element) {
  clearLongPress();
  longPressTimer = setTimeout(() => {
    longPressActive = true;
    haptic('medium');
    showMagnifier(cx, cy, element);
  }, 500);
}

function clearLongPress() {
  if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
  if (longPressActive) { hideMagnifier(); longPressActive = false; }
}

function showMagnifier(cx, cy, element) {
  const mag = document.getElementById('magnifier');
  if (!mag) return;
  const cat = window.CATEGORIES[element.cat];
  const hex = '#' + cat.color.toString(16).padStart(6, '0');

  // Pozicioniraj iznad prsta, stegni na ekran
  const mR = 75;
  const mx = Math.max(mR, Math.min(window.innerWidth  - mR, cx));
  const my = Math.max(mR + 10, Math.min(window.innerHeight - mR, cy - mR - 20));

  mag.style.left = mx + 'px';
  mag.style.top  = my + 'px';
  mag.style.borderColor = hex;
  mag.style.boxShadow   = `0 0 0 1px rgba(0,212,255,.3),0 0 30px ${hex}88,0 0 60px rgba(0,212,255,.2),inset 0 0 20px rgba(168,85,247,.08)`;
  mag.innerHTML = `
    <div class="mag-num">${element.n}</div>
    <div class="mag-sym" style="color:${hex}">${element.s}</div>
    <div class="mag-name">${element.name}</div>
    <div class="mag-cat" style="color:${hex}">${cat.name}</div>
    <div class="mag-mass">${element.m} u</div>
  `;
  mag.classList.add('visible');
}

function hideMagnifier() {
  document.getElementById('magnifier')?.classList.remove('visible');
}

// =============================================================
// MOBILNI ACTION SHEET (tap na element)
// =============================================================
let _actionSheetElement = null;

function showActionSheet(element) {
  haptic('light');
  _actionSheetElement = element;

  const cat = window.CATEGORIES[element.cat];
  const hex = '#' + cat.color.toString(16).padStart(6, '0');
  const shells = window.getBohrShells(element.n);

  const hints = getDragHints(element.s);
  let hintsHtml = '';
  if (hints.length > 0) {
    hintsHtml = '<div class="as-hint-title">Mogući spojevi</div>';
    hints.slice(0, 5).forEach(h => {
      const missingStr = Object.entries(h.missing)
        .map(([s,n]) => n > 1 ? `${n}× ${s}` : s).join(' + ');
      const badge = h.totalMissing === 0
        ? `<span class="hint-badge match">✓ Spreman!</span>`
        : `<span class="hint-badge missing">+ ${missingStr}</span>`;

      const missingJson = JSON.stringify(h.missing).replace(/"/g, '&quot;');
      const isReady  = h.totalMissing === 0;
      const tappable = !isReady && h.totalMissing <= 3;
      const escapedFormula = h.compound.formula.replace(/'/g, "\\'");
      hintsHtml += `
        <div class="as-hint-row tappable"
             onclick="${isReady
               ? `showCompoundByFormula('${escapedFormula}','${element.s}')`
               : tappable ? `sheetAddMissing('${missingJson}')` : ''}">
          <span class="as-hint-formula" style="color:${hex}">${h.compound.formula}</span>
          <span class="as-hint-name">${h.compound.name}</span>
          ${badge}
        </div>`;
    });
  }

  const content = document.getElementById('action-sheet-content');
  if (content) {
    content.innerHTML = `
      <div class="as-element" style="border-color:${hex}88;background:${hex}0d">
        <div class="as-sym" style="color:${hex}">${element.s}</div>
        <div class="as-info">
          <div class="as-name">${element.name}</div>
          <div class="as-meta">${element.n} · ${cat.name} · ${element.m} u</div>
          <div class="as-shells">${shells.join(' · ')}</div>
        </div>
      </div>
      <div class="as-actions">
        <button class="as-btn-secondary" onclick="sheetAddToChamber()">✦ Dodaj u komoru</button>
        <button class="as-btn-primary"  onclick="sheetShowAtom()">⚛ Prikaži atom</button>
      </div>
      ${hintsHtml}
    `;
  }

  // Proširi komoru ako je mini
  if (chamberState === 'mini') setChamberState('standard');

  document.getElementById('mobile-action-sheet')?.classList.add('active');
}

window.hideActionSheet = function() {
  document.getElementById('mobile-action-sheet')?.classList.remove('active');
};

window.sheetShowAtom = function() {
  const el = _actionSheetElement;
  window.hideActionSheet();
  if (!el) return;
  if (chamberState === 'mini') setChamberState('standard');
  showAtom(el);
};

window.sheetAddToChamber = function() {
  const el = _actionSheetElement;
  window.hideActionSheet();
  if (!el) return;
  if (chamberState === 'mini') setChamberState('standard');

  // Fly animacija iz pozicije kartice na ekranu
  const screenPos = getCardScreenPos(el);
  const fromX = screenPos?.x ?? window.innerWidth / 2;
  const fromY = screenPos?.y ?? window.innerHeight * 0.3;

  haptic('medium');
  animateDrop(el, fromX, fromY, () => addToMixerInternal(el.s));
};

window.sheetAddMissing = function(missingJson) {
  window.hideActionSheet();
  const pendingSym = _actionSheetElement?.s;
  try {
    const missing = JSON.parse(missingJson.replace(/&quot;/g, '"'));
    if (pendingSym) addToMixerInternal(pendingSym);
    Object.entries(missing).forEach(([sym, count]) => {
      for (let i = 0; i < count; i++) addToMixerInternal(sym);
    });
    haptic('medium');
  } catch(err) { /* ignore parse errors */ }
};

// =============================================================
// PERIOD QUICK-JUMP
// =============================================================
window.jumpToPeriod = function(p) {
  if (!currentObject) return;
  haptic('light');

  const periodCards = currentObject.children.filter(c => c.userData.isCard && c.userData.element?.per === p);
  if (!periodCards.length) return;

  const avgY = periodCards.reduce((s, c) => s + c.position.y, 0) / periodCards.length;
  const dist  = camera.position.distanceTo(controls.target);

  animateCameraTo(
    new THREE.Vector3(0, avgY, dist),
    new THREE.Vector3(0, avgY, 0)
  );

  // Highlight period pill u control railu
  document.querySelectorAll('.period-pill').forEach((btn, i) => {
    btn.classList.toggle('active', i + 1 === p);
  });
  setTimeout(() => document.querySelectorAll('.period-pill').forEach(b => b.classList.remove('active')), 1400);

  // Scan-line efekt: projectira Y poziciju perioda na ekran
  if (periodScanEl && canvasEl) {
    const v = new THREE.Vector3(0, avgY, 0);
    v.project(camera);
    const rect = canvasEl.getBoundingClientRect();
    const screenY = -(v.y - 1) / 2 * rect.height;
    periodScanEl.style.top = Math.round(screenY) + 'px';
    periodScanEl.classList.remove('flash');
    void periodScanEl.offsetWidth;
    periodScanEl.classList.add('flash');
    setTimeout(() => periodScanEl.classList.remove('flash'), 950);
  }

  // Kratko istakni period, ostatak priguši
  if (currentObject) {
    currentObject.children.forEach(card => {
      if (!card.userData.isCard) return;
      const inPeriod = card.userData.element?.per === p;
      setCardDim(card, !inPeriod);
    });
    setTimeout(() => {
      currentObject.children.forEach(card => {
        if (!card.userData.isCard) return;
        setCardDim(card, false);
      });
    }, 1200);
  }
};

// =============================================================
// UNIFIED CONTROL RAIL (kategorije + periodi)
// =============================================================
function buildControlRail() {
  const el = document.getElementById('control-rail');
  if (!el) return;

  const catPills = Object.entries(window.CATEGORIES).map(([k, v]) => {
    const hex = '#' + v.color.toString(16).padStart(6, '0');
    const label = v.name.length > 12 ? v.name.split(' ')[0] : v.name;
    return `<button class="cat-pill" data-cat="${k}" onclick="toggleCategory('${k}')" style="--cat-color:${hex}">
      <span class="cat-dot" style="background:${hex}"></span>${label}
    </button>`;
  }).join('');

  const periodPills = [1,2,3,4,5,6,7].map(p =>
    `<button class="period-pill" id="pp-${p}" onclick="jumpToPeriod(${p})">${p}</button>`
  ).join('');

  el.innerHTML = catPills + '<span class="rail-sep"></span>' + periodPills;
}

window.toggleCategory = function(cat) {
  haptic('light');
  activeCategory = activeCategory === cat ? null : cat;

  document.querySelectorAll('.cat-pill').forEach(p => {
    p.classList.toggle('active', p.dataset.cat === activeCategory);
  });

  applyCardFilter();
};

function applyCardFilter() {
  if (!currentObject) return;
  currentObject.children.forEach(card => {
    if (!card.userData.isCard) return;
    const match = !activeCategory || card.userData.element.cat === activeCategory;
    setCardDim(card, !match);
    card.scale.setScalar(match ? 1 : 0.9);
  });
}

// =============================================================
// CHAMBER STANJA (mini / standard / full)
// =============================================================
window.setChamberState = function(state) {
  chamberState = state;
  const panel = document.querySelector('.right-panel');
  if (!panel) return;
  panel.className = panel.className.replace(/\bchamber-\S+/g, '').trim();
  panel.classList.add('chamber-' + state);

  if (isMobile) {
    chamberTranslateY = snapYForState(state);
    panel.style.transform = `translateY(${chamberTranslateY}px)`;
    // Chamber canvas resize samo nakon animacije
    setTimeout(() => {
      const cc = document.getElementById('chamber-canvas');
      if (cc && chamberRenderer) {
        const cw = cc.clientWidth, ch = cc.clientHeight;
        if (cw > 0 && ch > 0) {
          chamberCamera.aspect = cw / ch; chamberCamera.updateProjectionMatrix();
          chamberRenderer.setSize(cw, ch, false);
        }
      }
      resizeMistCanvas();
    }, 340);
  } else {
    setTimeout(onResize, 340);
  }
  haptic('light');
};

// Swipe ručka — transform-based (ne mijenja layout, 60fps)
function setupChamberSwipe() {
  const handle = document.getElementById('chamber-handle');
  if (!handle) return;
  let touchStartY = 0, startTranslate = 0;

  handle.addEventListener('touchstart', e => {
    if (!isMobile) return;
    touchStartY = e.touches[0].clientY;
    startTranslate = chamberTranslateY;
    // Isključi transition za live drag
    const panel = document.querySelector('.right-panel');
    if (panel) panel.style.transition = 'none';
    e.preventDefault();
  }, { passive: false });

  handle.addEventListener('touchmove', e => {
    if (!isMobile) return;
    const dy = e.touches[0].clientY - touchStartY;
    const panelH = window.innerHeight * 0.9;
    chamberTranslateY = Math.max(0, Math.min(panelH - 64, startTranslate + dy));
    const panel = document.querySelector('.right-panel');
    if (panel) panel.style.transform = `translateY(${chamberTranslateY}px)`;
    e.preventDefault();
  }, { passive: false });

  handle.addEventListener('touchend', () => {
    if (!isMobile) return;
    const panel = document.querySelector('.right-panel');
    // Vrati transition za snap animaciju
    if (panel) panel.style.transition = '';

    const panelH = window.innerHeight * 0.9;
    const visible = panelH - chamberTranslateY;

    if (visible < panelH * 0.18)      window.setChamberState('mini');
    else if (visible < panelH * 0.60) window.setChamberState('standard');
    else                               window.setChamberState('full');
  });
}

// =============================================================
// DRAG HINTS — mogući spojevi (s tappable redovima)
// =============================================================
function getDragHints(symbol) {
  const hypo = {};
  mixer.forEach(s=>{ hypo[s]=(hypo[s]||0)+1; });
  hypo[symbol] = (hypo[symbol]||0)+1;

  const results = [];
  window.COMPOUNDS.forEach(c => {
    if (!(symbol in c.ingredients)) return;

    const hasExcess = Object.keys(hypo).some(s => (c.ingredients[s]||0) < hypo[s]);

    const missing = {};
    let totalMissing = 0;
    Object.entries(c.ingredients).forEach(([s,need]) => {
      const have = hypo[s]||0;
      if (have < need) { missing[s]=need-have; totalMissing+=need-have; }
    });

    if (!hasExcess && totalMissing <= 3) {
      results.push({ compound:c, missing, totalMissing });
    }
  });

  return results.sort((a,b)=>a.totalMissing-b.totalMissing).slice(0,6);
}

function showDragHints(symbol, cx, cy) {
  const hints = getDragHints(symbol);
  const box   = document.getElementById('drag-hints');
  if (!box) return;

  if (hints.length === 0) { box.classList.remove('visible'); return; }

  let html = `<div class="hint-title">Mogući spojevi s ${symbol}</div>`;
  hints.forEach(h => {
    const missingStr = Object.entries(h.missing)
      .map(([s,n]) => n>1 ? `${n}× ${s}` : s).join(', ');
    const badge = h.totalMissing === 0
      ? `<span class="hint-badge match">✓ Spreman!</span>`
      : missingStr
        ? `<span class="hint-badge missing">+ ${missingStr}</span>`
        : '';

    const isReady    = h.totalMissing === 0;
    const tappable   = !isReady && h.totalMissing <= 3;
    const missingJson = JSON.stringify(h.missing).replace(/"/g, '&quot;');
    const escapedFormula = h.compound.formula.replace(/'/g, "\\'");
    html += `<div class="hint-row hint-tappable"
      onclick="${isReady
        ? `showCompoundByFormula('${escapedFormula}','${symbol}')`
        : tappable ? `addMissingFromHint('${missingJson}','${symbol}')` : ''}">
      <span class="hint-formula">${h.compound.formula}</span>
      <span class="hint-name">${h.compound.name}</span>
      ${badge}
    </div>`;
  });
  box.innerHTML = html;

  const mixerRect = document.getElementById('mixer-section')?.getBoundingClientRect();
  if (mixerRect) {
    box.style.display = 'block';
    const bh = box.offsetHeight;
    box.style.display = '';
    box.style.left  = mixerRect.left + 'px';
    box.style.top   = (mixerRect.top - bh - 8) + 'px';
    box.style.width = mixerRect.width + 'px';
  }
  box.classList.add('visible');
}

function hideDragHints() {
  document.getElementById('drag-hints')?.classList.remove('visible');
}

// Klik na gotov spoj u listi → prikaži ga u komori
// pendingSymbol = element koji je tapnut/vučen ali još NIJE u mixeru
window.showCompoundByFormula = function(formula, pendingSymbol) {
  const c = window.COMPOUNDS.find(x => x.formula === formula);
  if (!c) return;
  hideDragHints();
  window.hideActionSheet?.();

  // Otkaži aktivni drag da ne doda element još jednom
  if (dragState) {
    dragState = null; isDragging = false; controls.enabled = true;
    canvasWrap?.classList.remove('dragging-element');
    document.getElementById('drag-ghost')?.classList.remove('active');
    document.getElementById('mixer-drop-zone')?.classList.remove('active-drop');
  }

  // Dodaj tappani/vučeni element u mixer (on je "Spreman!" samo s njim)
  if (pendingSymbol) addToMixerInternal(pendingSymbol);

  if (isMobile && chamberState === 'mini') setChamberState('standard');
  triggerCompoundEffect(() => {
    showCompound(c);
    showMessage('✨ ' + c.formula + ' – ' + c.name, 'magic');
  });
};

// Tappable hint u drag-hint boxu — dodaj nedostajuće atome
window.addMissingFromHint = function(missingJson, pendingSymbol) {
  try {
    const missing = JSON.parse(missingJson.replace(/&quot;/g, '"'));
    if (pendingSymbol) {
      addToMixerInternal(pendingSymbol);
      if (dragState) {
        dragState = null; isDragging = false; controls.enabled = true;
        document.getElementById('drag-ghost')?.classList.remove('active');
        canvasWrap?.classList.remove('dragging-element');
        document.getElementById('mixer-drop-zone')?.classList.remove('active-drop');
      }
    }
    Object.entries(missing).forEach(([sym, count]) => {
      for (let i = 0; i < count; i++) addToMixerInternal(sym);
    });
    haptic('medium');
    hideDragHints();
  } catch(err) { /* ignore */ }
};

// =============================================================
// DROP ANIMACIJA (luk + pad u komoru)
// =============================================================
function animateDrop(element, fromX, fromY, onComplete) {
  const mixerEl = document.getElementById('mixer-section');
  const rect    = mixerEl.getBoundingClientRect();
  const targetX = rect.left + rect.width  * .5;
  const targetY = rect.top  + rect.height * .45;

  const cat = window.CATEGORIES[element.cat];
  const hex = '#' + cat.color.toString(16).padStart(6,'0');
  const r=(cat.color>>16)&255, g=(cat.color>>8)&255, b=cat.color&255;

  const orb = document.createElement('div');
  orb.className = 'drop-orb';
  orb.textContent = element.s;
  orb.style.cssText=`width:58px;height:58px;left:${fromX}px;top:${fromY}px;font-size:22px;color:#fff;
    background:radial-gradient(circle at 35% 32%,rgba(255,255,255,.9) 0%,${hex} 38%,rgba(${Math.max(r-80,0)},${Math.max(g-80,0)},${Math.max(b-80,0)},1) 100%);
    border:2px solid rgba(255,255,255,.55);
    box-shadow:0 0 22px ${hex},0 0 44px ${hex}88,inset 0 0 12px rgba(255,255,255,.2);`;
  document.body.appendChild(orb);

  const trails = Array.from({length:5},(_,i)=>{
    const t=document.createElement('div'); t.className='drop-trail';
    const sz=58*(.45-i*.055);
    t.style.cssText=`width:${sz}px;height:${sz}px;left:${fromX}px;top:${fromY}px;
      background:radial-gradient(circle at 40% 38%,${hex}cc 0%,${hex}44 60%,transparent 100%);
      box-shadow:0 0 10px ${hex}88;`;
    document.body.appendChild(t); return t;
  });

  const dx=targetX-fromX, dy=targetY-fromY;
  const arcX=fromX+dx*.4+(Math.random()-.5)*30;
  const arcY=fromY+Math.min(dy*.1,-50);
  const duration=Math.min(680,Math.max(400,Math.sqrt(dx*dx+dy*dy)*.7));
  const start=performance.now();

  (function tick(now) {
    const raw=Math.min((now-start)/duration,1);
    const bx=(1-raw)*(1-raw)*fromX+2*(1-raw)*raw*arcX+raw*raw*targetX;
    const by=(1-raw)*(1-raw)*fromY+2*(1-raw)*raw*arcY+raw*raw*targetY;
    const sc=raw<.7?1+raw*.15:Math.max(1.15-(raw-.7)/.3*1.3,.05);
    const op=raw<.8?1:1-(raw-.8)/.2;
    orb.style.left=bx+'px'; orb.style.top=by+'px';
    orb.style.transform=`translate(-50%,-50%) scale(${sc})`; orb.style.opacity=op;
    trails.forEach((tr,i)=>{
      const d=(i+1)/5*.25, tr2=Math.max(raw-d,0)/Math.max(1-d,.001);
      const t2=Math.min(tr2,1);
      const tbx=(1-t2)*(1-t2)*fromX+2*(1-t2)*t2*arcX+t2*t2*targetX;
      const tby=(1-t2)*(1-t2)*fromY+2*(1-t2)*t2*arcY+t2*t2*targetY;
      tr.style.left=tbx+'px'; tr.style.top=tby+'px';
      tr.style.transform=`translate(-50%,-50%) scale(${Math.max(1-i*.12-raw*.6,0)})`;
      tr.style.opacity=Math.max(1-raw*1.4,0);
    });
    if (raw<1) { requestAnimationFrame(tick); return; }
    orb.remove(); trails.forEach(t=>t.remove());
    const ring=document.createElement('div'); ring.className='burst-ring';
    ring.style.cssText=`left:${targetX}px;top:${targetY}px;width:36px;height:36px;border-color:${hex};`;
    document.body.appendChild(ring); setTimeout(()=>ring.remove(),700);
    triggerMistBurst(false);
    if (onComplete) onComplete();
  })(start);
}

// =============================================================
// MIXER
// =============================================================
function addToMixerInternal(symbol) {
  if (mixer.length>=12) { showMessage('Komora je puna! Max 12 atoma.','warn'); return; }
  mixer.push(symbol); renderMixer();
  updateElementGlowFilter();
  setTimeout(()=>autoTryFormCompound(),350);
}

function addToMixer(symbol) {
  if (mixer.length>=12) { showMessage('Komora je puna!','warn'); return; }
  mixer.push(symbol); renderMixer();
  triggerMistBurst(false);
  updateElementGlowFilter();
  setTimeout(()=>autoTryFormCompound(),300);
}

function removeFromMixer(index) {
  mixer.splice(index,1); renderMixer();
  updateElementGlowFilter();
}

function clearMixer() {
  mixer=[]; renderMixer(); hideResult();
  updateElementGlowFilter();
}

// =============================================================
// ELEMENT GLOW FILTER — zatamni elemente koji ne mogu u spoj
// =============================================================
function canElementContribute(symbol, mixerCounts) {
  const hypo = { ...mixerCounts };
  hypo[symbol] = (hypo[symbol] || 0) + 1;

  return window.COMPOUNDS.some(c => {
    if (!(symbol in c.ingredients)) return false;
    // nijdan element u hypo ne smije premašiti ono što spoj treba
    return !Object.keys(hypo).some(s => (c.ingredients[s] || 0) < hypo[s]);
  });
}

function updateElementGlowFilter() {
  if (!currentObject) return;

  if (mixer.length === 0) {
    // Mixer prazan → vrati sve na normalno
    currentObject.children.forEach(card => {
      if (!card.userData.isCard) return;
      setCardDim(card, false);
      card.scale.setScalar(1);
    });
    return;
  }

  const mixerCounts = {};
  mixer.forEach(s => { mixerCounts[s] = (mixerCounts[s] || 0) + 1; });

  currentObject.children.forEach(card => {
    if (!card.userData.isCard) return;
    const sym = card.userData.element.s;
    const can = canElementContribute(sym, mixerCounts);
    setCardDim(card, !can);
    card.scale.setScalar(can ? 1 : 0.88);
  });
}

function autoTryFormCompound() {
  if (mixer.length<2) return;
  const ingr={};
  mixer.forEach(s=>{ingr[s]=(ingr[s]||0)+1;});
  const match=window.COMPOUNDS.find(c=>{
    const k1=Object.keys(c.ingredients).sort(), k2=Object.keys(ingr).sort();
    if (k1.length!==k2.length||!k1.every((k,i)=>k===k2[i])) return false;
    return k1.every(k=>c.ingredients[k]===ingr[k]);
  });
  if (match) triggerCompoundEffect(()=>{
    showCompound(match);
    showMessage('✨ Spoj nastao: '+match.formula+' – '+match.name,'magic');
    if (isMobile) setChamberState('standard');
  });
}

function renderMixer() {
  const el=document.getElementById('mixer-items');
  const hint=document.getElementById('drop-hint');
  if (!el) return;
  if (mixer.length===0) { el.innerHTML=''; hint?.classList.remove('hidden'); return; }
  hint?.classList.add('hidden');
  el.innerHTML=mixer.map((s,i)=>{
    const ed=window.ELEMENTS.find(e=>e.s===s);
    const cat=window.CATEGORIES[ed?.cat||'nonmetal'];
    const c='#'+cat.color.toString(16).padStart(6,'0');
    return `<span class="mixer-chip" style="background:${c}22;border-color:${c}" onclick="removeFromMixer(${i})" title="Ukloni">${s}<small>×</small></span>`;
  }).join('');
}

// =============================================================
// EFEKTI
// =============================================================
function triggerCompoundEffect(callback) {
  const flash=document.createElement('div'); flash.className='magic-flash';
  document.body.appendChild(flash); setTimeout(()=>flash.remove(),800);
  const sec=document.getElementById('mixer-section');
  if (sec) {
    sec.style.transition='box-shadow .1s';
    sec.style.boxShadow='0 0 60px rgba(168,85,247,.95),0 0 100px rgba(0,212,255,.5)';
    setTimeout(()=>{sec.style.boxShadow='';},700);
  }
  triggerMistBurst(true);
  haptic('heavy');
  setTimeout(callback,480);
}

// =============================================================
// MAGIC CHAMBER — magla + tesla
// =============================================================
let mistCanvas,mistCtx,mistParticles=[],teslaTimer=0;

function initMagicChamber() {
  mistCanvas=document.getElementById('mist-canvas');
  if (!mistCanvas) return;
  resizeMistCanvas();
  for (let i=0;i<28;i++) mistParticles.push(newMistParticle(true));
  animateMagicChamber();
}
function resizeMistCanvas() {
  if (!mistCanvas) return;
  const r=mistCanvas.parentElement.getBoundingClientRect();
  mistCanvas.width=r.width||282; mistCanvas.height=r.height||282;
}
function newMistParticle(randomY=false) {
  const w=mistCanvas?.width||282, h=mistCanvas?.height||282;
  return { x:Math.random()*w, y:randomY?Math.random()*h:h+10, r:12+Math.random()*34,
    vx:(Math.random()-.5)*.32, vy:-(0.1+Math.random()*.3),
    opacity:.04+Math.random()*.08, hue:Math.random()<.6?276:192,
    life:0, maxLife:130+Math.random()*200 };
}
function animateMagicChamber() {
  requestAnimationFrame(animateMagicChamber);
  if (!mistCtx) { if (!mistCanvas) return; mistCtx=mistCanvas.getContext('2d'); }
  const w=mistCanvas.width, h=mistCanvas.height;
  mistCtx.clearRect(0,0,w,h);
  for (let i=mistParticles.length-1;i>=0;i--) {
    const p=mistParticles[i]; p.x+=p.vx; p.y+=p.vy; p.life++;
    const a=p.life<30?(p.life/30)*p.opacity:p.life>p.maxLife-30?((p.maxLife-p.life)/30)*p.opacity:p.opacity;
    const gr=mistCtx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
    gr.addColorStop(0,`hsla(${p.hue},80%,65%,${a})`); gr.addColorStop(1,`hsla(${p.hue},80%,65%,0)`);
    mistCtx.beginPath(); mistCtx.arc(p.x,p.y,p.r,0,Math.PI*2); mistCtx.fillStyle=gr; mistCtx.fill();
    if (p.life>=p.maxLife||p.y<-p.r) mistParticles[i]=newMistParticle(false);
  }
  teslaTimer++;
  if (teslaTimer%20===0) generateTeslaArc();
  if (teslaTimer%8===0)  fadeOldArcs();
}
function triggerMistBurst(intense=false) {
  const count=intense?20:9;
  for (let i=0;i<count;i++) {
    const p=newMistParticle(false);
    p.x=(mistCanvas?.width||282)*(.25+Math.random()*.5);
    p.r=intense?28+Math.random()*56:16+Math.random()*36;
    p.opacity=intense?.14+Math.random()*.14:.07+Math.random()*.09;
    p.vy=-(0.5+Math.random()*1.1);
    mistParticles.push(p);
  }
}
function generateTeslaArc() {
  const svg=document.getElementById('tesla-svg'), arcs=document.getElementById('tesla-arcs');
  if (!svg||!arcs||Math.random()<.42) return;
  const w=svg.clientWidth||282, h=svg.clientHeight||282;
  const path=document.createElementNS('http://www.w3.org/2000/svg','path');
  const edge=Math.floor(Math.random()*4); let x1,y1;
  switch(edge){case 0:x1=Math.random()*w;y1=0;break;case 1:x1=Math.random()*w;y1=h;break;case 2:x1=0;y1=Math.random()*h;break;default:x1=w;y1=Math.random()*h;}
  const x2=w*.3+Math.random()*w*.4, y2=h*.2+Math.random()*h*.6;
  let d=`M ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  const steps=4+Math.floor(Math.random()*5);
  for(let i=1;i<steps;i++){const t=i/steps;d+=` L ${(x1+(x2-x1)*t+(Math.random()-.5)*40).toFixed(1)} ${(y1+(y2-y1)*t+(Math.random()-.5)*24).toFixed(1)}`;}
  d+=` L ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  const hue=Math.random()<.6?183:272;
  path.setAttribute('d',d); path.setAttribute('stroke',`hsla(${hue},100%,76%,${.3+Math.random()*.58})`);
  path.setAttribute('stroke-width',(.7+Math.random()*1.6).toFixed(1));
  path.setAttribute('fill','none'); path.setAttribute('stroke-linecap','round');
  path.setAttribute('data-born',Date.now().toString()); arcs.appendChild(path);
}
function fadeOldArcs() {
  const arcs=document.getElementById('tesla-arcs'); if(!arcs) return;
  const now=Date.now();
  Array.from(arcs.children).forEach(a=>{
    const age=now-parseInt(a.getAttribute('data-born')||'0',10);
    if (age>200) a.remove(); else a.style.opacity=(1-age/200).toFixed(2);
  });
}

// =============================================================
// INFO PANELS
// =============================================================
let legendOpen=false;

function toggleLegend() {
  legendOpen=!legendOpen;
  document.getElementById('legend-panel')?.classList.toggle('open',legendOpen);
  document.getElementById('btn-legend')?.classList.toggle('open',legendOpen);
}

function updateInfoPanelDefault() {
  const el=document.getElementById('info-panel'); if(!el) return;
  el.innerHTML=`
    <h3>Periodni sustav 3D</h3>
    <p class="muted" style="margin-top:5px">Klikni element za 3D atom prikaz u komori.</p>
    <p class="muted">Povuci element u <strong style="color:#a855f7">komoru</strong> za stvaranje spoja.</p>
    <p class="muted" style="margin-top:3px">✥ Povlači pozadinu = pomak tablice</p>
    <button class="btn-legend" id="btn-legend" onclick="toggleLegend()">
      ☰ Legenda kategorija <span class="arrow">▼</span>
    </button>
    <div class="legend-panel${legendOpen?' open':''}" id="legend-panel">
      <div class="legend">
        ${Object.entries(window.CATEGORIES).map(([k,v])=>{
          const c='#'+v.color.toString(16).padStart(6,'0');
          return `<div class="legend-item"><span class="legend-dot" style="background:${c}"></span>${v.name}</div>`;
        }).join('')}
      </div>
    </div>`;
  if(legendOpen){document.getElementById('btn-legend')?.classList.add('open');}
}

function updateInfoPanelAtom(el) {
  const panel=document.getElementById('info-panel'); if(!panel) return;
  const cat=window.CATEGORIES[el.cat];
  const color='#'+cat.color.toString(16).padStart(6,'0');
  const shells=window.getBohrShells(el.n);

  // Mogući spojevi (isto kao u mobile action sheet)
  const hints = getDragHints(el.s);
  let hintsHtml = '';
  if (hints.length > 0) {
    const rows = hints.slice(0, 5).map(h => {
      const missingStr = Object.entries(h.missing)
        .map(([s,n]) => n>1 ? `${n}× ${s}` : s).join(' + ');
      const isReady    = h.totalMissing === 0;
      const tappable   = !isReady && h.totalMissing <= 3;
      const missingJson = JSON.stringify(h.missing).replace(/"/g, '&quot;');
      const escapedFormula = h.compound.formula.replace(/'/g, "\\'");
      const badge = isReady
        ? `<span class="hint-badge match">✓</span>`
        : `<span class="hint-badge missing">+ ${missingStr}</span>`;
      const onclickAttr = isReady
        ? `showCompoundByFormula('${escapedFormula}','${el.s}')`
        : tappable ? `addMissingFromHint('${missingJson}','${el.s}')` : '';
      return `<div class="ip-hint-row${onclickAttr ? ' tappable' : ''}" onclick="${onclickAttr}">
        <span class="ip-hint-formula" style="color:${color}">${h.compound.formula}</span>
        <span class="ip-hint-name">${h.compound.name}</span>
        ${badge}
      </div>`;
    }).join('');
    hintsHtml = `<div class="info-block"><label>Mogući spojevi</label><div class="ip-hints">${rows}</div></div>`;
  }

  panel.innerHTML=`
    <div class="info-header" style="border-color:${color}">
      <div class="el-symbol-big" style="background:${color}22;border-color:${color}">
        <span class="num">${el.n}</span><span class="sym">${el.s}</span>
      </div>
      <div><h3>${el.name}</h3><p class="muted">${cat.name} · ${el.phase}</p></div>
    </div>
    <div class="info-grid">
      <div><label>Atomska masa</label><span>${el.m}</span></div>
      <div><label>Skupina / Per.</label><span>${el.grp} / ${el.per}</span></div>
      <div><label>Talište</label><span>${el.mp??'—'}${el.mp!=null?' °C':''}</span></div>
      <div><label>Vrelište</label><span>${el.bp??'—'}${el.bp!=null?' °C':''}</span></div>
    </div>
    <div class="info-block"><label>El. konfiguracija</label><code>${el.ec}</code></div>
    <div class="info-block"><label>Ljuske (Bohr)</label><code>${shells.join(' · ')}</code></div>
    <div class="info-block"><label>Otkriće</label><p>${el.disc}</p></div>
    <div class="info-block"><label>Primjena</label><p>${el.use}</p></div>
    ${hintsHtml}
    <div class="info-actions">
      <button onclick="addToMixer('${el.s}')">✦ Dodaj u komoru</button>
      <button onclick="clearChamber()" class="secondary">← Natrag</button>
    </div>`;
}

function updateInfoPanelCompound(c) {
  const panel=document.getElementById('info-panel'); if(!panel) return;
  panel.innerHTML=`
    <div class="info-header" style="border-color:#a855f7">
      <div class="el-symbol-big" style="background:#a855f722;border-color:#a855f7">
        <span class="formula">${c.formula}</span>
      </div>
      <div><h3>${c.name}</h3><p class="muted">Kemijski spoj</p></div>
    </div>
    <div class="info-grid">
      <div><label>Vrsta veze</label><span>${c.bondType}</span></div>
      <div><label>Geometrija</label><span>${c.geometry}</span></div>
    </div>
    <div class="info-block"><label>Sastojci</label>
      <code>${Object.entries(c.ingredients).map(([k,v])=>v>1?k+v:k).join(' + ')}</code>
    </div>
    <div class="info-block"><label>Opis</label><p>${c.description}</p></div>
    <div class="info-block"><label>Primjena</label><p>${c.uses}</p></div>
    <div class="info-actions">
      <button onclick="clearChamber()" class="secondary">← Natrag / Očisti</button>
    </div>`;
}

function showHoverTooltip(el) {
  const t=document.getElementById('hover-tooltip'); if(!t||isMobile) return;
  t.style.display='block';
  t.innerHTML=`<strong>${el.s}</strong> · ${el.name} <small>(${el.n})</small>`;
}
function hideHoverTooltip() {
  const t=document.getElementById('hover-tooltip'); if(t) t.style.display='none';
}
function showMessage(msg,type='info') {
  const el=document.getElementById('message'); if(!el) return;
  el.textContent=msg; el.className='message-bar visible '+type;
  clearTimeout(el._t); el._t=setTimeout(()=>el.classList.remove('visible'),4000);
}
function hideResult() { document.getElementById('message')?.classList.remove('visible'); }

// =============================================================
// SETUP
// =============================================================
function setupUI() {
  updateInfoPanelDefault();
  renderMixer();
  buildControlRail();
}

function applySearchFilter(q) {
  currentObject?.children.forEach(card => {
    if (!card.userData.isCard) return;
    const el = card.userData.element;
    const match = !q || el.s.toLowerCase().includes(q) || el.name.toLowerCase().includes(q) || String(el.n) === q;
    setCardDim(card, !match);
    card.scale.setScalar(match ? 1 : .92);
  });
}

function setupListeners() {
  canvasEl.addEventListener('pointerdown', onPointerDown, {passive:false});
  canvasEl.addEventListener('pointermove', onPointerMove, {passive:true});
  canvasEl.addEventListener('pointerup',   onPointerUp,   {passive:true});
  canvasEl.addEventListener('pointercancel', cancelDrag,  {passive:true});
  canvasEl.addEventListener('touchstart',  onPointerDown, {passive:false});
  canvasEl.addEventListener('touchmove',   onPointerMove, {passive:true});
  canvasEl.addEventListener('touchend',    onPointerUp,   {passive:true});
  window.addEventListener('pointerup', e=>{ if(dragState||panState) onPointerUp(e); }, {passive:true});
  window.addEventListener('resize', onResize);
  document.getElementById('btn-clear-chamber')?.addEventListener('click', clearChamber);

  // Desktop search
  const search = document.getElementById('search');
  if (search) search.addEventListener('input', e => applySearchFilter(e.target.value.trim().toLowerCase()));

  // Mobile search overlay
  const overlayInput = document.getElementById('search-overlay-input');
  if (overlayInput) overlayInput.addEventListener('input', e => applySearchFilter(e.target.value.trim().toLowerCase()));
}

window.toggleMobileSearch = function() {
  const overlay = document.getElementById('search-overlay');
  if (!overlay) return;
  const isActive = overlay.classList.toggle('active');
  if (isActive) {
    const input = document.getElementById('search-overlay-input');
    setTimeout(() => input?.focus(), 80);
  } else {
    // Zatvori overlay i očisti filter
    const input = document.getElementById('search-overlay-input');
    if (input) { input.value = ''; applySearchFilter(''); }
  }
};

function onResize() {
  checkMobile();
  const w=canvasEl.clientWidth, h=canvasEl.clientHeight;
  camera.aspect=w/h; camera.updateProjectionMatrix();
  renderer.setSize(w,h,false);

  if (isMobile) {
    // Recalculate transform on resize (orientation change)
    const panel = document.querySelector('.right-panel');
    if (panel) {
      chamberTranslateY = snapYForState(chamberState);
      panel.style.transform = `translateY(${chamberTranslateY}px)`;
    }
  }

  const cc=document.getElementById('chamber-canvas');
  if (cc&&chamberRenderer) {
    const cw=cc.clientWidth, ch=cc.clientHeight;
    if (cw>0&&ch>0) {
      chamberCamera.aspect=cw/ch; chamberCamera.updateProjectionMatrix();
      chamberRenderer.setSize(cw,ch,false);
    }
  }
  resizeMistCanvas();
}

// =============================================================
// ONBOARDING (prikazuje se samo prvi put na mobu)
// =============================================================
function initOnboarding() {
  if (!isMobile) return;
  if (localStorage.getItem('pn3d.tour') === 'done') return;
  const overlay = document.getElementById('onboarding');
  if (overlay) overlay.classList.add('active');
}

window.dismissOnboarding = function() {
  localStorage.setItem('pn3d.tour', 'done');
  const overlay = document.getElementById('onboarding');
  if (!overlay) return;
  overlay.style.transition = 'opacity 0.3s ease';
  overlay.style.opacity = '0';
  setTimeout(() => { overlay.classList.remove('active'); overlay.style.opacity = ''; }, 320);
};

// =============================================================
// SPOTLIGHT TAP EFEKT (kratki radijalni sjaj na poziciji tapa)
// =============================================================
function showTapSpotlight(cx, cy, element) {
  const cat = window.CATEGORIES[element.cat];
  const hex = '#' + cat.color.toString(16).padStart(6, '0');
  const spot = document.createElement('div');
  spot.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9100;
    left: ${cx}px; top: ${cy}px;
    width: 80px; height: 80px;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: radial-gradient(circle, ${hex}66 0%, ${hex}22 40%, transparent 70%);
    border: 1.5px solid ${hex}88;
    animation: tap-spotlight 0.45s ease-out forwards;
  `;
  document.body.appendChild(spot);
  setTimeout(() => spot.remove(), 500);
}

// CSS keyframes for spotlight (injected once)
(function injectSpotlightCSS() {
  if (document.getElementById('spotlight-style')) return;
  const s = document.createElement('style');
  s.id = 'spotlight-style';
  s.textContent = `@keyframes tap-spotlight {
    0%   { transform: translate(-50%,-50%) scale(0); opacity: 1; }
    60%  { transform: translate(-50%,-50%) scale(1.4); opacity: 0.8; }
    100% { transform: translate(-50%,-50%) scale(2.2); opacity: 0; }
  }`;
  document.head.appendChild(s);
})();

// =============================================================
// EXPORTS
// =============================================================
window.addToMixer      = addToMixer;
window.removeFromMixer = removeFromMixer;
window.clearMixer      = clearMixer;
window.clearChamber    = clearChamber;
window.toggleLegend    = toggleLegend;

window.addEventListener('load', ()=>{
  if (typeof THREE==='undefined') {
    document.getElementById('loading').textContent='Greška: Three.js se ne učitava.';
    return;
  }
  // Pričekaj Google Fonts prije buildanja teksture (Sora + JetBrains Mono)
  const ready = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  ready.then(init).catch(() => init());
});
