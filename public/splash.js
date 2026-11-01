(function(){
  if(/bot|googlebot|crawler|spider|lighthouse|pagespeed|headless/i.test(navigator.userAgent||""))return;
  var s=document.createElement("style");
  s.textContent="#gat-sp{position:fixed;inset:0;width:100vw;height:100dvh;z-index:2147483647;background:#082548;display:flex;align-items:center;justify-content:center;overflow:hidden;transition:opacity .6s ease;user-select:none}#gat-sp.hide{opacity:0;pointer-events:none}#gat-txt{position:absolute;top:43%;left:50%;transform:translate(-50%,-50%);font-size:clamp(28px,6vw,42px);font-weight:800;color:#fff;white-space:nowrap;transition:opacity .4s,filter .5s,transform .5s;z-index:3;font-family:system-ui,-apple-system,sans-serif}#gat-txt span{color:#1994F5}#gat-txt.out{opacity:0;filter:blur(8px);transform:translate(-50%,-50%) scale(1.06)}";
  document.head.appendChild(s);
  s.textContent+="#gat-star{position:absolute;top:43%;left:50%;transform:translate(-50%,-50%);width:140px;height:140px;opacity:0;transition:opacity .45s ease;z-index:3;overflow:visible}#gat-star.in{opacity:1}#gat-tri-w{fill:none;stroke:#FFF;stroke-width:2.6;stroke-linejoin:round;filter:drop-shadow(0 0 10px rgba(255,255,255,.8))}#gat-tri-b{fill:none;stroke:#1994F5;stroke-width:2.6;stroke-linejoin:round;filter:drop-shadow(0 0 12px rgba(25,148,245,.95))}#gat-btn{position:absolute;top:66%;left:50%;transform:translate(-50%,10px);padding:15px 46px;border-radius:999px;border:1.5px solid rgba(255,255,255,.7);background:transparent;color:#fff;font:700 15px/1 system-ui,-apple-system,sans-serif;letter-spacing:2.4px;cursor:pointer;opacity:0;transition:all .55s ease;z-index:4}#gat-btn.in{opacity:1;transform:translate(-50%,0)}#gat-btn.glow{background:#fff;color:#082548;border-color:#fff;box-shadow:0 0 28px rgba(255,255,255,.85),0 0 50px rgba(25,148,245,.55)}";
  var d=document.createElement("div");d.id="gat-sp";
  d.innerHTML='<canvas id="gat-cv" style="position:absolute;inset:0;width:100%;height:100%;z-index:2;pointer-events:none"></canvas><div id="gat-txt">Giyur <span>Aliyah</span> Track</div><svg id="gat-star" viewBox="0 0 100 100"><polygon id="gat-tri-w" points="50,10 85,72 15,72"/><polygon id="gat-tri-b" points="50,90 85,28 15,28"/></svg><button id="gat-btn">ENTER SITE</button>';
  document.documentElement.appendChild(d);document.documentElement.classList.remove("gat-pre-curtain");
  var c=document.getElementById("gat-cv"),x=c.getContext("2d"),W=c.width=innerWidth,H=c.height=innerHeight,cx=W/2,cy=H*.43,S=1.4,pts=[],st=0,af;
  var wV=[[0,-40],[35,22],[-35,22]],bV=[[0,40],[35,-22],[-35,-22]];
  function ep(V,idx,tot){var s=tot/3,e=Math.floor(idx/s),t=(idx%s)/s,a=V[e],b=V[(e+1)%3];return[cx+(a[0]+(b[0]-a[0])*t)*S,cy+(a[1]+(b[1]-a[1])*t)*S];}
  for(var i=0;i<240;i++){var ex=i>=180,bl=i%2===0,rx=bl?(Math.random()-.5)*95:((i%4<2?1:-1)*(55+Math.random()*95)),tg=ex?[cx,cy]:ep(bl?bV:wV,Math.floor(i/2),90);pts.push({x:cx+rx,y:cy+(Math.random()-.5)*22,vx:(Math.random()-.5)*6,vy:(Math.random()-.5)*5,tx:tg[0],ty:tg[1],r:ex?Math.random()*2+.8:1.5,a:0,c:bl?"#1994F5":"#FFF",ex:ex});}
  setTimeout(function(){document.getElementById("gat-txt").classList.add("out");st=1;},850);
  setTimeout(function(){st=2;},1500);
  setTimeout(function(){document.getElementById("gat-star").classList.add("in");document.getElementById("gat-btn").classList.add("in");st=3;},2950);
  setTimeout(function(){document.getElementById("gat-btn").classList.add("glow");},3750);
  function loop(){x.clearRect(0,0,W,H);if(st>0){pts.forEach(function(p){if(st===1){p.a=Math.min(1,p.a+.1);p.x+=p.vx;p.y+=p.vy;p.vx*=.95;p.vy*=.95;}else if(st===2){if(p.ex){var dx=p.x-cx,dy=p.y-cy;p.x+=-dy*.06+dx*.02;p.y+=dx*.06+dy*.02;p.a=Math.max(0,p.a-.022);}else{var dx=p.tx-p.x,dy=p.ty-p.y;p.x+=dx*.11-dy*.06;p.y+=dy*.11+dx*.06;}}else if(st===3){p.x+=(p.tx-p.x)*.25;p.y+=(p.ty-p.y)*.25;p.a=Math.max(0,p.a-.06);}});pts.forEach(function(p){if(p.a>.01){x.globalAlpha=p.a;x.fillStyle=p.c;x.beginPath();x.arc(p.x,p.y,p.r,0,6.28);x.fill();}});}af=requestAnimationFrame(loop);}
  loop();
  d.onclick=function(){cancelAnimationFrame(af);d.classList.add("hide");setTimeout(function(){d.remove()},600);};
})();
