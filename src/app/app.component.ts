import { Component } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'ngx-lottie/lib/symbols';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'adhya-portfolio';
  videoLoaded = false;

  video!: HTMLVideoElement;
  techStack1 = 'HTML CSS Javascript Angular React SCSS Vue';
  techStack2 = 'Python MySQL Webscraping Git Jira DJango Flask';

  options: AnimationOptions = {
    path: '../assets/loader.json',
  };

  constructor() {

  }

  ngAfterViewInit() {
    this.video = document.getElementById('waves') as HTMLVideoElement;
    this.video.addEventListener('loadeddata', () => {
      setTimeout(() => {
        this.videoLoaded = true;

        const loaderAndImage = gsap.timeline();
        const helloTitleTimeline = gsap.timeline();

        const sections = gsap.utils.toArray('section');
        const isMobile = window.innerWidth <= 500;

        const scrollTween = gsap.to(sections, {
          ease: 'none',
          scrollTrigger: {
            trigger: '.wrapper',
            scrub: 0.1,
            start: "top top",
            end: () => `+=${sections.length * 100}%`, // Each section has 100% height
            snap: 1 / (sections.length),
          }
        })

        loaderAndImage
          .to('.loader', {
            opacity: 0, duration: 0.5,
            ease: "power3.out",
            y: -1500
          })
          .fromTo('.img', {
            display: "none", duration: 0.2, scale: 1.5,
            ease: "none",
          }, {
            opacity: 0.8, display: 'block', duration: 0.5, scale: 1,
            ease: "power3.out",
          })

        helloTitleTimeline
          .to('.text-video-blend', {
            duration: 0.3, delay: 0.8,
            ease: "none", y: 0
          })
          .to('.subtitle', {
            duration: 0.3,
            ease: "none", y: 0
          })
          .to('.name', {
            duration: 0.3,
            ease: "none", y: 0
          })
          .to('.video', {
            duration: 0.3,
            opacity: 1,
            y: 0
          })
          .to('.text-video-blend', {
            delay: 0.5,
            mixBlendMode: 'multiply'
          })

        gsap.to('.hello-text', {
          scrollTrigger: {
            trigger: ".hello-text",
            start: "top top",
            end: 500,
            scrub: 0.25,
            markers: false
          },
          fontSize: '500px',
          yPercent: -200,
          opacity: 0,
        });

        gsap.to('.hero-text', {
          scrollTrigger: {
            trigger: ".hello-text",
            start: "top top",
            end: 1000,
            scrub: 0.25,
            markers: false
          },
          top: isMobile ? '1%' : '5%',
          x: isMobile ? 0 : -50,
          fontSize: isMobile ? '40px' : '120px',
          lineHeight: isMobile ? '40px' : '120px',
          color: '#fff',
        })

        gsap.to('.img', {
          scrollTrigger: {
            trigger: ".hello-text",
            start: 200,
            end: 500,
            scrub: 0.25,
            markers: false
          },
          opacity: 0.4,
          x: isMobile ? -20 : -30
        })

        gsap.from('.description', {
          opacity: 0,
          scale: 3,
          y: 100,
          x: 500,
          textAlign: 'left',
          marginTop: -100,
          duration: 0.3,
          scrollTrigger: {
            trigger: ".description-section",
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.1,
            markers: false
          },
        })

        gsap.to('.hero-text', {
          scrollTrigger: {
            trigger: ".skills",
            start: "top bottom",
            end: () => `top ${isMobile ? '300' : '700'}`,
            scrub: 0.1,
            markers: false
          },
          opacity: "0",
          y: isMobile ? -100 : -1000,
        })

        gsap.timeline({ repeat: -1 }).to('.techStack1',
          {
            duration: isMobile ? 30 : 45,
            xPercent: -50,
            ease: 'none'
          }
        ).set('.techStack1', { xPercent: 0 });

        gsap.timeline({ repeat: -1 }).to('.techStack2',
          {
            duration: isMobile ? 35 : 50,
            xPercent: -50,
            ease: 'none'
          }
        ).set('.techStack2', { xPercent: 0 });

        const skillsTimeline = gsap.timeline();

        skillsTimeline.from('.skills-heading', {
          opacity: 0,
          scale: 2,
          x: 500,
          zIndex: 20,
          textAlign: 'left',
          marginTop: -100,
          duration: 0.3,
          scrollTrigger: {
            trigger: ".skills",
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.1,
            markers: false
          },
        }).from('marquee-container', {
          opacity: 0,
        })

      }, 1000)

      ScrollTrigger.refresh()
    });
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  openLinkedIn(): void {
    console.log('clicked')
    window.open("https://www.linkedin.com/in/adhyasbhat/", "_blank");
  }
}
