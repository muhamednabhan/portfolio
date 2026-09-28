import * as THREE from 'three';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
const compactViewport = innerWidth <= 1024;
const lenis = new Lenis({ duration: compactViewport ? .95 : 1.32, smoothWheel: !coarsePointer, syncTouch: false, wheelMultiplier: .96, touchMultiplier: 1, infinite: false });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(1000, 16);

// Minimal WebGL layer: depth, not decoration overload.
const container = document.querySelector('#webgl');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, .1, 100);
camera.position.z = 8;
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
const renderScale = compactViewport ? 1 : 1.35; renderer.setPixelRatio(Math.min(devicePixelRatio, renderScale)); renderer.setSize(innerWidth, innerHeight); renderer.outputColorSpace = THREE.SRGBColorSpace; container.appendChild(renderer.domElement);
const group = new THREE.Group(); scene.add(group);
const count = innerWidth <= 600 ? 220 : (compactViewport ? 360 : 720), positions = new Float32Array(count * 3);
for(let i=0;i<count;i++){const r=4.5*Math.pow(Math.random(),.55), t=Math.random()*Math.PI*2, p=Math.acos(2*Math.random()-1);positions[i*3]=r*Math.sin(p)*Math.cos(t);positions[i*3+1]=r*Math.cos(p);positions[i*3+2]=r*Math.sin(p)*Math.sin(t)}
const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(positions,3));
const stars=new THREE.Points(geo,new THREE.PointsMaterial({color:0x111111,size:.018,transparent:true,opacity:.36,depthWrite:false}));group.add(stars);
const globe=new THREE.Mesh(new THREE.IcosahedronGeometry(1.15,2),new THREE.MeshBasicMaterial({color:0x111111,wireframe:true,transparent:true,opacity:.075}));globe.position.set(2.5,-.6,-1.4);group.add(globe);
const ring=new THREE.Mesh(new THREE.TorusGeometry(1.55,.008,8,160),new THREE.MeshBasicMaterial({color:0x111111,transparent:true,opacity:.10}));ring.rotation.x=.7;ring.rotation.z=-.35;ring.position.copy(globe.position);group.add(ring);
const clock=new THREE.Clock();
function render(){const t=clock.getElapsedTime();stars.rotation.y=t*.012;stars.rotation.x=Math.sin(t*.07)*.025;globe.rotation.y=t*.08;ring.rotation.z=-.35+t*.025;renderer.render(scene,camera);requestAnimationFrame(render)}render();
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio, compactViewport ? 1 : 1.35));renderer.setSize(innerWidth,innerHeight);ScrollTrigger.refresh()},{passive:true});

// Cursor / pointer field.
const cursor=document.querySelector('.cursor'), field=document.querySelector('.pointer-field'); let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;field?.style.setProperty('--mx',`${mx}px`);field?.style.setProperty('--my',`${my}px`)},{passive:true});
(function loop(){cx+=(mx-cx)*.16;cy+=(my-cy)*.16;cursor.style.transform=`translate3d(${cx}px,${cy}px,0)`;requestAnimationFrame(loop)})();

document.querySelectorAll('a,.project-card,.stack-item,.credential-row,.magnetic-card').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('is-active'));el.addEventListener('mouseleave',()=>cursor.classList.remove('is-active'))});

document.querySelectorAll('.reveal').forEach((el,i)=>{
  gsap.fromTo(el,
    {y:58, opacity:0, filter:'blur(7px)', clipPath:'inset(0 0 12% 0)'},
    {y:0, opacity:1, filter:'blur(0px)', clipPath:'inset(0 0 0% 0)', duration:1.05, delay:(i%3)*.035, ease:'power3.out', scrollTrigger:{trigger:el,start:'top 91%',end:'top 67%',toggleActions:'play none none reverse',once:false}}
  );
});

// Stronger scroll choreography: sections breathe, headlines drift, and supporting layers move at different speeds.
document.querySelectorAll('.section').forEach((section, i)=>{
  const index = section.querySelector('.section-index');
  const label = index?.textContent?.split('/')[1]?.trim() || '';
  if(index) gsap.fromTo(index,{x:-24,opacity:.15},{x:0,opacity:1,duration:.8,ease:'power3.out',scrollTrigger:{trigger:section,start:'top 82%',end:'top 45%',scrub:.35}});
  const display = section.querySelector('.display');
  if(display && !section.classList.contains('hero')) gsap.fromTo(display,{y:70,rotateX:7,transformOrigin:'50% 100%'},{y:-18,rotateX:0,ease:'none',scrollTrigger:{trigger:section,start:'top bottom',end:'bottom top',scrub:.7}});
  const heads = section.querySelectorAll('.eyebrow,.small,.large,.skills-head p,.projects-note,.research-card,.edu-details,.contact-links');
  heads.forEach((el,j)=>gsap.fromTo(el,{y:35,opacity:.35},{y:-12,opacity:1,ease:'none',scrollTrigger:{trigger:section,start:'top 90%',end:'bottom 15%',scrub:.8}}));
});

// Scroll progress + current section indicator.
const scrollProgress = document.querySelector('.scroll-progress span');
const scrollSectionLabel = document.querySelector('.scroll-section-label span');
const scrollSections = gsap.utils.toArray('main > section');
if(scrollProgress){
  ScrollTrigger.create({start:0,end:'max',onUpdate:self=>{scrollProgress.style.transform=`scaleY(${self.progress})`;}});
}
if(scrollSectionLabel && scrollSections.length){
  const updateSection = () => {
    const mid = innerHeight * .42;
    let active = 0;
    scrollSections.forEach((sec,i)=>{if(sec.getBoundingClientRect().top <= mid) active=i;});
    scrollSectionLabel.textContent = String(active+1).padStart(2,'0');
  };
  addEventListener('scroll',updateSection,{passive:true});
  updateSection();
}

// Gentle image/card depth as the page moves.
document.querySelectorAll('.project-card,.research-card,.credential-list,.edu-details').forEach(el=>{
  gsap.to(el,{y:-32,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:1.1}});
});

// Hero depth.
gsap.to('.hero-orbit',{y:100,rotation:14,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
gsap.to('.hero-title',{yPercent:-16,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});

// Experience: vertical page scroll only. The section pins; cards turn, never horizontally scroll the page.
const expSection=document.querySelector('.experience'), expCards=gsap.utils.toArray('.experience-card'), expProgress=document.querySelector('.experience-progress span');
if(expSection&&expCards.length){const distance=()=>Math.max(1800,expCards.length*760);const tl=gsap.timeline({scrollTrigger:{trigger:expSection,start:'top top',end:()=>`+=${distance()}`,pin:true,scrub:.72,anticipatePin:1,invalidateOnRefresh:true}});
 expCards.forEach((card,i)=>{gsap.set(card,{zIndex:expCards.length-i,transformOrigin:'100% 50%',x:0,y:0,rotateY:0,rotateZ:0,scale:1,opacity:i===0?1:0});if(i>0)gsap.set(card,{x:35,scale:.965})});
 expCards.forEach((card,i)=>{if(i===0)return;const prev=expCards[i-1],at=i-1;tl.to(prev,{x:470,y:-28,rotateY:-27,rotateZ:-1.5,scale:.92,opacity:0,duration:.74,ease:'power2.inOut'},at).to(card,{x:0,y:0,rotateY:0,rotateZ:0,scale:1,opacity:1,duration:.74,ease:'power3.out'},at+.10).to({}, {duration:.34},at+.86)});
 ScrollTrigger.create({trigger:expSection,start:'top top',end:()=>`+=${distance()}`,onUpdate:s=>{if(expProgress)expProgress.style.transform=`scaleX(${s.progress})`;const active=Math.min(expCards.length-1,Math.floor(s.progress*expCards.length));expCards.forEach((c,i)=>c.classList.toggle('is-current',i===active))}})}

document.querySelectorAll('.experience-card').forEach(card=>card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--cx',`${((e.clientX-r.left)/r.width)*100}%`);card.style.setProperty('--cy',`${((e.clientY-r.top)/r.height)*100}%`)}));

// Projects: large horizontal cinematic sequence controlled by normal vertical scrolling.
const wrap=document.querySelector('.project-track-wrap'),track=document.querySelector('.project-track');
if(wrap&&track&&innerWidth>1024){const getDistance=()=>Math.max(0,track.scrollWidth-(innerWidth-innerWidth*.07));gsap.to(track,{x:()=>-getDistance(),ease:'none',scrollTrigger:{trigger:wrap,start:'top top',end:()=>`+=${Math.max(getDistance(),innerHeight*1.2)}`,scrub:.72,pin:true,anticipatePin:1,invalidateOnRefresh:true}})}

// Project hover: actual pointer-following light + controlled tilt + cursor label.
document.querySelectorAll('.project-card').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*100,y=(e.clientY-r.top)/r.height*100;card.style.setProperty('--mx',`${x}%`);card.style.setProperty('--my',`${y}%`);if(innerWidth>900&&!reduceMotion){const rx=((e.clientX-r.left)/r.width-.5)*3.8,ry=-((e.clientY-r.top)/r.height-.5)*3.8;gsap.to(card,{rotateY:rx,rotateX:ry,transformPerspective:1200,duration:.28,overwrite:true,ease:'power2.out'})}});card.addEventListener('mouseenter',()=>{const b=card.dataset.cursor||'VIEW';if(cursor.querySelector('b'))cursor.querySelector('b').textContent=b});card.addEventListener('pointerleave',()=>{gsap.to(card,{rotateY:0,rotateX:0,duration:.55,ease:'power3.out'})})});

// Stack / credential pointer fields.
document.querySelectorAll('.stack-item,.credential-row').forEach(item=>item.addEventListener('pointermove',e=>{const r=item.getBoundingClientRect();item.style.setProperty('--mx',`${e.clientX-r.left}px`);item.style.setProperty('--my',`${e.clientY-r.top}px`)}));

// Magnetic links.
document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();gsap.to(el,{x:(e.clientX-(r.left+r.width/2))*.12,y:(e.clientY-(r.top+r.height/2))*.12,duration:.35,ease:'power3.out',overwrite:true})});el.addEventListener('pointerleave',()=>gsap.to(el,{x:0,y:0,duration:.6,ease:'elastic.out(1,.4)'}))});

// Subtle text line reveal: keep typography minimal, make it feel alive.
document.querySelectorAll('.split-text').forEach(el=>{const text=el.textContent;el.innerHTML='';[...text].forEach(ch=>{const s=document.createElement('span');s.textContent=ch===' '?'\u00a0':ch;s.style.display='inline-block';s.style.transform='translateY(110%)';s.style.opacity='0';el.appendChild(s)});gsap.to(el.children,{y:0,opacity:1,duration:.85,stagger:.035,ease:'power4.out',delay:el.classList.contains('display')?.25:.05})});

addEventListener('load',()=>ScrollTrigger.refresh());

// V5 folder stack: text cards lift out and form a layered, tactile stack.
const techFolders = document.querySelectorAll('.tech-folder');
techFolders.forEach(folder => {
  const cards = folder.querySelectorAll('.tech-card');
  const enter = () => {
    if (reduceMotion) return;
    gsap.killTweensOf(cards);
    cards.forEach((card, i) => {
      const style = getComputedStyle(card);
      gsap.to(card, {
        opacity: 1,
        x: `calc(-50% + ${style.getPropertyValue('--x')})`,
        y: style.getPropertyValue('--y'),
        scale: style.getPropertyValue('--s') || 1,
        rotation: parseFloat(style.getPropertyValue('--r')) || 0,
        duration: .72 + i * .035,
        delay: i * .055,
        ease: 'power3.out',
        overwrite: true
      });
    });
  };
  const leave = () => {
    if (reduceMotion) return;
    gsap.killTweensOf(cards);
    gsap.to(cards, {opacity:0,x:'-50%',y:14,scale:.76,rotation:0,duration:.42,stagger:.025,ease:'power2.in',overwrite:true});
  };
  folder.addEventListener('mouseenter', enter);
  folder.addEventListener('mouseleave', leave);
  folder.addEventListener('focus', enter);
  folder.addEventListener('blur', leave);
  folder.addEventListener('mouseenter',()=>{ if(cursor?.querySelector('b')) cursor.querySelector('b').textContent='OPEN' });
});

// Touch-friendly folder interaction: tap to open/close the same layered stack used by hover.
if (coarsePointer) {
  techFolders.forEach(folder => {
    folder.addEventListener('click', e => {
      if (e.target.closest('a')) return;
      const wasOpen = folder.classList.contains('is-open');
      techFolders.forEach(other => {
        if (other !== folder) other.classList.remove('is-open');
      });
      folder.classList.toggle('is-open', !wasOpen);
      const cards = folder.querySelectorAll('.tech-card');
      if (!wasOpen && !reduceMotion) {
        cards.forEach((card, i) => {
          const style = getComputedStyle(card);
          gsap.killTweensOf(card);
          gsap.to(card, { opacity:1, x:`calc(-50% + ${style.getPropertyValue('--x')})`, y:style.getPropertyValue('--y'), scale:style.getPropertyValue('--s') || 1, rotation:parseFloat(style.getPropertyValue('--r')) || 0, duration:.62+i*.025, delay:i*.035, ease:'power3.out', overwrite:true });
        });
      } else if (reduceMotion) {
        cards.forEach(card => card.style.opacity = wasOpen ? '0' : '1');
      } else {
        gsap.to(cards,{opacity:0,x:'-50%',y:14,scale:.76,rotation:0,duration:.35,stagger:.02,ease:'power2.in',overwrite:true});
      }
    });
  });
}

// Lightweight global cursor particle trail and click ripples. Kept separate from the WebGL atmosphere.
const cursorCanvas = document.querySelector('#cursor-fx');
if (cursorCanvas && !reduceMotion && innerWidth > 900) {
  const ctx = cursorCanvas.getContext('2d');
  let dpr = Math.min(devicePixelRatio || 1, 1.5), w = 0, h = 0;
  const pointer = {x: innerWidth/2, y: innerHeight/2, px: innerWidth/2, py: innerHeight/2, active:false};
  const particles = [], ripples = [];
  const resizeCursorCanvas = () => {
    dpr = Math.min(devicePixelRatio || 1, 1.5); w = innerWidth; h = innerHeight;
    cursorCanvas.width = Math.floor(w*dpr); cursorCanvas.height = Math.floor(h*dpr);
    cursorCanvas.style.width = `${w}px`; cursorCanvas.style.height = `${h}px`;
    ctx.setTransform(dpr,0,0,dpr,0,0);
  };
  resizeCursorCanvas();
  addEventListener('resize', resizeCursorCanvas, {passive:true});
  addEventListener('pointermove', e => {
    pointer.px = pointer.x; pointer.py = pointer.y; pointer.x = e.clientX; pointer.y = e.clientY; pointer.active = true;
    const speed = Math.hypot(pointer.x-pointer.px, pointer.y-pointer.py);
    if (speed > 2) {
      particles.push({x:pointer.x,y:pointer.y,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,life:1,size:Math.random()*1.7+.7});
      if (particles.length > 42) particles.shift();
    }
  }, {passive:true});
  addEventListener('pointerdown', e => {
    ripples.push({x:e.clientX,y:e.clientY,r:4,life:1});
    if (ripples.length > 7) ripples.shift();
  }, {passive:true});
  const drawCursorFx = () => {
    ctx.clearRect(0,0,w,h);
    for (let i=particles.length-1;i>=0;i--) {
      const p=particles[i]; p.life-=.025; p.x+=p.vx; p.y+=p.vy;
      if(p.life<=0){particles.splice(i,1);continue}
      ctx.beginPath(); ctx.arc(p.x,p.y,p.size*p.life,0,Math.PI*2);
      ctx.fillStyle=`rgba(17,17,17,${p.life*.22})`; ctx.fill();
    }
    for (let i=ripples.length-1;i>=0;i--) {
      const r=ripples[i]; r.r+=3.7; r.life-=.035;
      if(r.life<=0){ripples.splice(i,1);continue}
      ctx.beginPath(); ctx.arc(r.x,r.y,r.r,0,Math.PI*2);
      ctx.strokeStyle=`rgba(17,17,17,${r.life*.28})`; ctx.lineWidth=1; ctx.stroke();
      if(r.r>24){ctx.beginPath();ctx.arc(r.x,r.y,r.r*.58,0,Math.PI*2);ctx.strokeStyle=`rgba(17,17,17,${r.life*.11})`;ctx.stroke()}
    }
    requestAnimationFrame(drawCursorFx);
  };
  drawCursorFx();
}
