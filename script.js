function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".wrapper"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".wrapper" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".wrapper", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".wrapper").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
loco();

function firstPageAmim(){
    gsap.from("nav",{
        y:'-15',
        opacity:0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

    gsap.to(".anim-1",{
        y:'0',
        duration: 1.5,
        ease: Expo.easeInOut,
        stagger:.1
    })

    gsap.to(".anim-2",{
        y:'0',
        duration: 1.3,
        ease: Expo.easeInOut,
        delay:0.5,
    })
}

function circleMouseFollower(xScale,yscale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector("#circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xScale},${yscale})`;
    })
}

var timeOut;
function circleSkew(){
    var xScale = 1;
    var yscale = 1;

    var xPrev = 0;
    var yPrev = 0;

    window.addEventListener("mousemove",function (dets){
        clearTimeout(timeOut);
        xScale = gsap.utils.clamp(.8,1.2,dets.clientX - xPrev);
        yscale = gsap.utils.clamp(.8,1.2,dets.clientY - yPrev);

        xPrev = dets.clientX;
        yPrev = dets.clientY;

        circleMouseFollower(xScale,yscale);

        timeOut = setTimeout(function (){
            document.querySelector("#circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        }, 100);
    })

}

circleSkew();
circleMouseFollower();
firstPageAmim();

var elem = document.querySelectorAll(".elem").forEach(function (elem){
    var rotate = 0;
    var diffRot = 0;
    elem.addEventListener("mousemove",function (dets){
        diffRot = dets.clientX - rotate;
        rotate = dets.clientX;
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease:Power3,
            top:diff,
            left:dets.clientX,
            rotate: gsap.utils.clamp(-20,20,diffRot*.8),
            
        })
    })
})

var elem = document.querySelectorAll(".elem").forEach(function (elem){
    elem.addEventListener("mouseleave",function (dets){
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease:Power1,
            duration:.5            
        })
    })
})
