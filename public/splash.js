(function(){
  if(/bot|googlebot|crawler|spider|lighthouse|pagespeed|headless/i.test(navigator.userAgent||""))return;
  function mount(){
    if(document.getElementById("gat-splash"))return;
    var d=document.createElement("div");
    d.id="gat-splash";
    // Full bleed edge-to-edge backdrop matching exact navy
    d.style.cssText="position:fixed;inset:0;width:100vw;height:100dvh;z-index:2147483647;background:#042454;display:flex;align-items:center;justify-content:center;overflow:hidden;transition:opacity .65s ease";
    
    // Smooth transform scaling automatically crops UI without distorting aspect ratios
    d.innerHTML="<video src=\"/intro.mp4\" autoplay muted playsinline webkit-playsinline style=\"width:100%;height:100%;object-fit:cover;object-position:center 46%;transform:scale(1.22);pointer-events:none\"></video>";
    
    // Clicking anywhere on the viewport smoothly fades out the splash
    d.onclick=function(){
      d.style.opacity="0";
      setTimeout(function(){d.remove()},650);
    };
    document.body.appendChild(d);
    var v=d.querySelector("video");
    if(v){v.muted=true;var p=v.play();if(p&&p.catch)p.catch(function(){});}
  }
  if(document.body)mount(); else document.addEventListener("DOMContentLoaded",mount);
})();