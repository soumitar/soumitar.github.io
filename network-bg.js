/* ============================================================================
   Interactive network background — vanilla Canvas, no dependencies.
   Reads var(--color-accent) and auto-recolors when [data-theme] flips.

   Include on pages that should have it (e.g. your landing page):
     <canvas id="net-bg"></canvas>            <- first element in <body>
     <script src="network-bg.js" defer></script>   <- before </body>
   Plus the #net-bg CSS (see integration notes).
   ========================================================================= */

const CONFIG = {
  density:      7,      // nodes per ~100k px² (higher = busier). Try 5–9.
  linkDist:     130,    // px: draw a line between nodes closer than this
  speed:        0.16,   // ambient drift speed
  mouseRadius:  170,    // px: cursor influence radius (0 = ignore cursor)
  mouseRepel:   0.55,   // how firmly the web parts around the cursor
  nodeRadius:   1.6,
  nodeAlpha:    0.55,   // 0–1
  lineAlpha:    0.16,   // 0–1  (base line opacity — keep low, 0.12–0.18)
  mouseLineAlpha:0.30,  // 0–1  (lines drawn to the cursor)
  useAccent:    true,   // true = use --color-accent; false = neutral --ink
  minNodes:     22,
  maxNodes:     90
};

const canvas = document.getElementById('net-bg');
const ctx = canvas.getContext('2d');
let W, H, dpr, nodes = [], rgb = [79,109,122];
const mouse = { x:null, y:null };
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function parseColor(c){
  if(!c) return null;
  c = c.trim();
  if(c[0] === '#'){
    let h = c.slice(1);
    if(h.length === 3) h = h.split('').map(x=>x+x).join('');
    const n = parseInt(h,16);
    return [(n>>16)&255,(n>>8)&255,n&255];
  }
  const m = c.match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
  return m ? [+m[1],+m[2],+m[3]] : null;
}
function readColor(){
  const cs = getComputedStyle(document.documentElement);
  const v = CONFIG.useAccent ? cs.getPropertyValue('--color-accent')
                             : cs.getPropertyValue('--color-text');
  rgb = parseColor(v) || rgb;
  if(reduce) frame();   // repaint once when motion is reduced
}
const line = a => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;

function resize(){
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth; H = window.innerHeight;
  canvas.width = W*dpr; canvas.height = H*dpr;
  canvas.style.width = W+'px'; canvas.style.height = H+'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);
  build();
}
function build(){
  const target = Math.round((W*H/100000) * CONFIG.density);
  const count = Math.max(CONFIG.minNodes, Math.min(CONFIG.maxNodes, target));
  nodes = Array.from({length:count}, () => ({
    x: Math.random()*W, y: Math.random()*H,
    vx:(Math.random()-.5)*CONFIG.speed, vy:(Math.random()-.5)*CONFIG.speed
  }));
}
function frame(){
  ctx.clearRect(0,0,W,H);
  const N = nodes.length, L2 = CONFIG.linkDist**2, M2 = CONFIG.mouseRadius**2;
  for(let i=0;i<N;i++){
    const p = nodes[i];
    if(!reduce){
      p.x += p.vx; p.y += p.vy;
      if(p.x<0) p.x+=W; else if(p.x>W) p.x-=W;
      if(p.y<0) p.y+=H; else if(p.y>H) p.y-=H;
      if(mouse.x!==null && CONFIG.mouseRadius>0){
        const dx=p.x-mouse.x, dy=p.y-mouse.y, d2=dx*dx+dy*dy;
        if(d2<M2 && d2>0.01){
          const d=Math.sqrt(d2), f=(1-d/CONFIG.mouseRadius)*CONFIG.mouseRepel;
          p.x += (dx/d)*f; p.y += (dy/d)*f;
        }
      }
    }
    ctx.beginPath();
    ctx.arc(p.x,p.y,CONFIG.nodeRadius,0,Math.PI*2);
    ctx.fillStyle = line(CONFIG.nodeAlpha); ctx.fill();
    for(let j=i+1;j<N;j++){
      const q=nodes[j], dx=p.x-q.x, dy=p.y-q.y, d2=dx*dx+dy*dy;
      if(d2<L2){
        ctx.strokeStyle = line((1 - d2/L2) * CONFIG.lineAlpha);
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke();
      }
    }
    if(mouse.x!==null && CONFIG.mouseRadius>0){
      const dx=p.x-mouse.x, dy=p.y-mouse.y, d2=dx*dx+dy*dy;
      if(d2<M2){
        ctx.strokeStyle = line((1 - d2/M2) * CONFIG.mouseLineAlpha);
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(mouse.x,mouse.y); ctx.stroke();
      }
    }
  }
  if(!reduce) requestAnimationFrame(frame);
}

window.addEventListener('mousemove', e => { mouse.x=e.clientX; mouse.y=e.clientY; });
window.addEventListener('mouseleave', () => { mouse.x=mouse.y=null; });
window.addEventListener('resize', () => { clearTimeout(window._nt); window._nt=setTimeout(resize,150); });

/* auto-recolor when YOUR theme toggle flips the data-theme attribute */
new MutationObserver(readColor)
  .observe(document.documentElement, { attributes:true, attributeFilter:['data-theme'] });

readColor(); resize(); frame();
