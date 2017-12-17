// (function() {
//     var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
//     function(callback) {
//         window.setTimeout(callback, 1000 / 60);
//     };
//     window.requestAnimationFrame = requestAnimationFrame;
// })();



// var flakes = [],
//     bodyHeight = getDocHeight(),
//     bodyWidth = document.body.scrollWidth;


// function snow() {
//     for (var i = 0; i < 100; i++) {
//         var flake = flakes[i];

//         flake.y += flake.velY;

//         if (flake.y > bodyHeight - (flake.size + 6)) {
//             flake.y = 0;
//         }

//         flake.step += flake.stepSize;
//         flake.velX = Math.cos(flake.step);

//         flake.x += flake.velX;
        
//         if (flake.x > bodyWidth - 40 || flake.x < 30) {
//             flake.y = 0;
//         }
        
//         flake.el.style.top = flake.y + 'px';
//         flake.el.style.left = ~~flake.x + 'px';
//     }
//     requestAnimationFrame(snow);
// };


// function init() {
//     var docFrag = document.createDocumentFragment();
//     for (var i = 0; i < 100 ; i++) {
//         var flake = document.createElement("div"),
//             x = Math.floor(Math.random() * bodyWidth),
//             y = Math.floor(Math.random() * bodyHeight),
//             size = (Math.random() * 5) + 2,
//             speed = (Math.random() * 1) + 0.5;

//         flake.style.width = size + 'px';
//         flake.style.height = size + 'px';
//         flake.style.background = "#fff";

//         flake.style.left = x + 'px';
//         flake.style.top = y;
//         flake.classList.add("flake");

//         flakes.push({
//             el: flake,
//             speed: speed,
//             velY: speed,
//             velX: 0,
//             x: x,
//             y: y,
//             size: 2,
//             stepSize: (Math.random() * 5) / 100,
//             step: 0
//         });
//         docFrag.appendChild(flake);
//     }

//     document.body.appendChild(docFrag);
//     snow();
// };

// document.addEventListener("mousemove", function(e) {
//     var x = e.clientX,
//         y = e.clientY,
//         minDist = 150;

//     for (var i = 0; i < flakes.length; i++) {
//         var x2 = flakes[i].x,
//             y2 = flakes[i].y;

//         var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y));

//         if (dist < minDist) {
//             rad = Math.atan2(y2, x2), angle = rad / Math.PI * 180;

//             flakes[i].velX = (x2 / dist) * 0.2;
//             flakes[i].velY = (y2 / dist) * 0.2;

//             flakes[i].x += flakes[i].velX;
//             flakes[i].y += flakes[i].velY;
//         } else {
//             flakes[i].velY *= 0.9;
//             flakes[i].velX
//             if (flakes[i].velY <= flakes[i].speed) {
//                 flakes[i].velY = flakes[i].speed;
//             }
//         }
//     }
// });

// init();

// function getDocHeight() {
//     return Math.max(
//     Math.max(document.body.scrollHeight, document.documentElement.scrollHeight), Math.max(document.body.offsetHeight, document.documentElement.offsetHeight), Math.max(document.body.clientHeight, document.documentElement.clientHeight));
// }

var ringer = {
    countdown_to: "6/9/2016",
    rings: {
      'DAYS': { 
        s: 86400000, // mseconds in a day,
        max: 14
      },
      'HOURS': {
        s: 3600000, // mseconds per hour,
        max: 24
      },
      'MINUTES': {
        s: 60000, // mseconds per minute
        max: 60
      },
      'SECONDS': {
        s: 1000,
        max: 60
      },
      'MICROSEC': {
        s: 10,
        max: 100
      }
     },
    r_count: 4,
    r_spacing: 13, // px
    r_size: 80, // px
    r_thickness: 3, // px
    update_interval: 100, // ms
      
      
    init: function(){
     
      $r = ringer;
      $r.cvs = document.createElement('canvas'); 
      
      $r.size = { 
        w: ($r.r_size + $r.r_thickness) * $r.r_count + ($r.r_spacing*($r.r_count-1)), 
        h: ($r.r_size + $r.r_thickness) 
      };
      
  
      //added devicePixelRatio for retina screens
      $r.cvs.setAttribute('width',$r.size.w * window.devicePixelRatio);         
      $r.cvs.setAttribute('height',$r.size.h * window.devicePixelRatio);
      
      
      $r.ctx = $r.cvs.getContext('2d');
      
      //*1 multiply for non-retinas
      $r.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      
      $('#canvastimer').append($r.cvs);
      $r.cvs = $($r.cvs);    
      $r.ctx.textAlign = 'center';
      $r.actual_size = $r.r_size + $r.r_thickness;
      $r.countdown_to_time = new Date($r.countdown_to).getTime();
      $r.cvs.css({ width: $r.size.w+"px", height: $r.size.h+"px" });
      $r.go();
      
      
      
    },
    ctx: null,
    go: function(){
      var idx=0;
      
      $r.time = (new Date().getTime()) - $r.countdown_to_time;
      
      
      for(var r_key in $r.rings) $r.unit(idx++,r_key,$r.rings[r_key]);      
      
      setTimeout($r.go,$r.update_interval);
    },
    unit: function(idx,label,ring) {
      var x,y, value, ring_secs = ring.s;
      value = parseFloat($r.time/ring_secs);
      $r.time-=Math.round(parseInt(value)) * ring_secs;
      value = Math.abs(value);
      
      x = ($r.r_size*.5 + $r.r_thickness*.5);
      x +=+(idx*($r.r_size+$r.r_spacing+$r.r_thickness));
      y = $r.r_size*.5;
      y += $r.r_thickness*.5;
  
      
      // calculate arc end angle
      var degrees = 270-(value / ring.max) * 360.0;
      var endAngle = degrees * (Math.PI / 180);
      
      $r.ctx.save();
  
      $r.ctx.translate(x,y);
      $r.ctx.clearRect($r.actual_size*-0.5,$r.actual_size*-0.5,$r.actual_size,$r.actual_size);
  
      // first circle
      $r.ctx.strokeStyle = "#efefef";
      $r.ctx.beginPath();
      $r.ctx.arc(0,0,$r.r_size/2,1.5*Math.PI,-0.5*Math.PI, 1);
      $r.ctx.lineWidth =$r.r_thickness;
      $r.ctx.stroke();
     
      // second circle
      $r.ctx.strokeStyle = "#cc0000";
      $r.ctx.beginPath();
      $r.ctx.arc(0,0,$r.r_size/2,1.5*Math.PI,endAngle, 1);
      $r.ctx.lineWidth =$r.r_thickness;
      $r.ctx.stroke();
      
      // label
      $r.ctx.fillStyle = "#aaa";
     
      $r.ctx.font = '200 10px sans-serif';
      $r.ctx.fillText(label, 0, 20);  
      
      $r.ctx.font = '200 32px sans-serif';
      $r.ctx.fillStyle = "#000";
      $r.ctx.fillText(Math.floor(value), 0, 5);
      
      $r.ctx.restore();
    }
  }
  
  ringer.init();