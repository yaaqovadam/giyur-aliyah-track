(function(){
  if(/bot|googlebot|crawler|spider|lighthouse|pagespeed|headless/i.test(navigator.userAgent||""))return;
  function mount(){
    if(document.getElementById("gat-splash"))return;
    var s=document.createElement("style");
    s.textContent="#gat-splash video::-webkit-media-controls,#gat-splash video::-webkit-media-controls-start-playback-button,#gat-splash video::-webkit-media-controls-panel{display:none!important;-webkit-appearance:none!important;opacity:0!important;pointer-events:none!important}";
    document.head.appendChild(s);

    var d=document.createElement("div");
    d.id="gat-splash";
    d.style.cssText="position:fixed;inset:0;width:100vw;height:100dvh;z-index:2147483647;background:#032352;display:flex;align-items:center;justify-content:center;overflow:hidden;transition:opacity .55s ease";
    d.innerHTML="<button id=\"gat-skip\" style=\"position:absolute;top:18px;right:18px;z-index:9;padding:7px 14px;border-radius:99px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.28);color:#fff;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;cursor:pointer\">Skip →</button><div style=\"width:100%;max-width:460px;height:100%;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#032352\"><video id=\"gat-vid\" src=\"/intro.mp4\" preload=\"auto\" autoplay muted playsinline webkit-playsinline style=\"width:100%;height:122%;object-fit:cover;object-position:center 48%;pointer-events:none\"></video></div>";
    document.body.appendChild(d);

    var v=document.getElementById("gat-vid");
    var skip=document.getElementById("gat-skip");
    function closeSplash(){
      d.style.opacity="0";
      if(v)try{v.pause();}catch(e){}
      setTimeout(function(){d.remove()},550);
    }
    skip.onclick=function(e){e.stopPropagation();closeSplash();};

    if(v){
      v.muted=true;
      v.setAttribute("muted","");
      v.setAttribute("playsinline","");
      var p=v.play();
      if(p&&p.catch)p.catch(function(){});
    }

    // Smart Tap: If Low Power Mode paused the video at 0s, first tap plays the video! Otherwise closes splash when Enter Site is tapped.
    d.onclick=function(){
      if(v && v.paused && v.currentTime < 1.5){
        v.muted=true;
        v.play().catch(function(){closeSplash();});
      } else {
        closeSplash();
      }
    };
  }
  if(document.body)mount(); else document.addEventListener("DOMContentLoaded",mount);
})();