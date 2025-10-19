//* TwoGood website script 

//! Navbar logo change on scroll 
const locomotive_scrollTrigger = () => {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
locomotive_scrollTrigger();

const navBarAnimations = () => {
    gsap.to('#navItems1 img', {
        transform: "translateY(-100px)",
        scrollTrigger: {
            trigger: '#page1',
            scroller: '#main',
            // markers: true,
            start: 'top 0',
            end: 'top -5%',
            scrub: true,
        }
    })
    gsap.to('#navItems2 #link', {           //! not working : scroll up 
        transform: "translateY(-100px)",
        scrollTrigger: {
            trigger: '#page1',
            scroller: '#main',
            // markers: true,
            start: 'top 0',
            end: 'top -5%',
            scrub: false,
        }
    })
}
navBarAnimations();



//! Smooth scroll
// Smooth scroll and other scroll animations
// 1. Copy and link the locomotive JS & CSS
// 2. Go to locomotive CSS github, copy the script for smooth scroll and paste it
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

//! Navbar logo change on scroll using scroll trigger cdn

//! Page 1
//? Video Container 
const videoContainer = document.querySelector('#video-container');
const play = document.querySelector('#play');

const videoContainerAnimations = () => {
    videoContainer.addEventListener('mouseenter', () => {
        // play.style.opacity = 1;
        // play.style.scale = 1;
        // Using GSAP
        gsap.to(play, {
            scale: '1',
            opacity: '1',
        })
    })

    videoContainer.addEventListener('mouseout', () => {
        gsap.to(play, {
            scale: '0',
            opacity: '0',
        })
    })

    videoContainer.addEventListener('mousemove', (dets) => {
        gsap.to(play, {
            left: dets.x - 50,
            top: dets.y - 50,
        })
    })
}
videoContainerAnimations();

//? Page1 Loading Animations
const loadingAnimation = () => {
    gsap.from('#page1 h1', {
        y: 100,
        opacity: 0,
        delay: 0.5,
        duration: 0.5,
        stagger: 0.2,
    })
    gsap.from('#page1 #video-container', {
        // scale: 0.9,          // bug with play btn on hover
        opacity: 0,
        delay: 1.3,
        duration: 0.3,
    })
}
loadingAnimation();


//! Cursor on Page 3
const cursorAnimation = () => {
    document.addEventListener('mousemove', (details) => {
        gsap.to('.cursor', {
            top: details.y,
            left: details.x,
        })
    })

    // document.querySelector('#child1').addEventListener('mouseenter', () => {
    //     gsap.to('.cursor',{
    //         transform: `translate(-50%, -50%) scale(1)`,
    //     })
    // })
    // document.querySelector('#child1').addEventListener('mouseleave', () => {
    //     gsap.to('.cursor',{
    //         transform: `translate(-50%, -50%) scale(0)`,
    //     })
    // })
    // Using forEach() for the above task
    let childs = document.querySelectorAll('.child');
    childs.forEach((ch) => {
        ch.addEventListener('mouseenter', () => {
            gsap.to('.cursor', {
                transform: `translate(-50%, -50%) scale(1)`,
            })
        })

        ch.addEventListener('mouseleave', () => {
            gsap.to('.cursor', {
                transform: `translate(-50%, -50%) scale(0)`,
            })
        })
    })
}
cursorAnimation();