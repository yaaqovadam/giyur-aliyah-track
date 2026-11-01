(function(){
  if(/bot|googlebot|crawler|spider|lighthouse|pagespeed|headless/i.test(navigator.userAgent||""))return;
  var s=document.createElement("style");
  s.textContent="#gat-sp{position:fixed;inset:0;width:100vw;height:100dvh;z-index:2147483647;background:#082548;display:flex;align-items:center;justify-content:center;overflow:hidden;transition:opacity .6s ease;user-select:none}#gat-sp.hide{opacity:0;pointer-events:none}#gat-txt{position:absolute;top:43%;left:50%;transform:translate(-50%,-50%);font-size:clamp(28px,6vw,42px);font-weight:800;color:#fff;white-space:nowrap;transition:opacity .5s,filter .6s,transform .6s;z-index:3}#gat-txt span{color:#1994F5}#gat-txt.out{opacity:0;filter:blur(8px);transform:translate(-50%,-50%) scale(1.06)}";
  document.head.appendChild(s);
  s.textContent+="#gat-star{position:absolute;top:43%;left:50%;transform:translate(-50%,-50%) scale(.75);width:126px;height:126px;opacity:0;transition:opacity .9s ease,transform 1s cubic-bezier(.16,1,.3,1);z-index:3;filter:drop-shadow(0 0 14px rgba(255,255,255,.6)) drop-shadow(0 0 28px rgba(25,148,245,.5))}#gat-star.in{opacity:1;transform:translate(-50%,-50%) scale(1)}#gat-btn{position:absolute;top:66%;left:50%;transform:translate(-50%,10px);padding:15px 46px;border-radius:999px;border:1.5px solid rgba(255,255,255,.7);background:transparent;color:#fff;font:700 15px/1 inherit;letter-spacing:2.4px;cursor:pointer;opacity:0;transition:all .55s ease;z-index:4}#gat-btn.in{opacity:1;transform:translate(-50%,0)}#gat-btn.glow{background:#fff;color:#082548;border-color:#fff;box-shadow:0 0 28px rgba(255,255,255,.85),0 0 50px rgba(25,148,245,.55)}";
  var d=document.createElement("div");d.id="gat-sp";
  d.innerHTML='<canvas id="gat-cv" style="position:absolute;inset:0;width:100%;height:100%;z-index:2;pointer-events:none"></canvas><div id="gat-txt">Giyur <span>Aliyah</span> Track</div><svg id="gat-star" viewBox="0 0 100 100"><polygon points="50,10 85,72 15,72" fill="none" stroke="#fff" stroke-width="2.6" stroke-linejoin="round"/><polygon points="50,90 85,28 15,28" fill="none" stroke="#fff" stroke-width="2.6" stroke-linejoin="round"/></svg><button id="gat-btn">ENTER SITE</button>';
  document.body.appendChild(d);
  var c=document.getElementById("gat-cv"),x=c.getContext("2d"),W=c.width= innerWidth,H=c.height=innerHeight,pts=[],st=0,af;
  for(var i=0;i<130;i++){var rx=(Math.random()-.5)*300;pts.push({x:W/2+rx,y:H*.43+(Math.random()-.5)*24,vx:(Math.random()-.5)*1.1,vy:(Math.random()-.5)*.5,r:Math.random()*2+.8,a:0,c:Math.abs(rx)<55?"#1994F5":"#FFF",p:Math.random()*6});}
  setTimeout(function(){document.getElementById("gat-txt").classList.add("out");st=1;},900);
  setTimeout(function(){document.getElementById("gat-star").classList.add("in");st=2;},2000);
  setTimeout(function(){document.getElementById("gat-btn").classList.add("in");},3100);
  setTimeout(function(){document.getElementById("gat-btn").classList.add("glow");st=3;},4100);
  function loop(){x.clearRect(0,0,W,H);if(st>0){pts.forEach(function(p){p.p+=.05;if(st===1){p.a=Math.min(1,p.a+.06);p.x+=p.vx;p.y+=p.vy;}else if(st===2){p.y+=(H*.46-p.y)*.03;p.x+=p.vx*.4;p.a=.6+.4*Math.sin(p.p);}else{p.a=Math.max(0,p.a-.015);}if(p.a>0.01){x.globalAlpha=p.a;x.fillStyle=p.c;x.beginPath();x.arc(p.x,p.y,p.r,0,6.28);x.fill();}});}af=requestAnimationFrame(loop);}
  loop();
  d.onclick=function(){cancelAnimationFrame(af);d.classList.add("hide");setTimeout(function(){d.remove()},600);};
})();
