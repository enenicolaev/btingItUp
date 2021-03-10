import Slider from "./slider";

export default class MiniSlider extends Slider {

   constructor(container, next, prev, activeClass, animate, autoplay) {
      super(container, next, prev, activeClass, animate, autoplay);
   }


   decorizeSlides() {
      this.slides.forEach(slide => {
         slide.classList.remove(this.activeClass);
         if (this.animate) {
            slide.querySelector(".card__title").style.opacity = ".4";
            slide.querySelector(".card__controls-arrow").style.opacity = "0";
         }
      });

      this.slides[0].classList.add(this.activeClass);

      if (this.animate) {
         this.slides[0].querySelector(".card__title").style.opacity = "1";
         this.slides[0].querySelector(".card__controls-arrow").style.opacity = "1";
      }
   }

   pushBtnsToEnd() {
      this.slides.forEach(slide => {
         if (slide.tagName = "BUTTON") {
            this.container.appendChild(slide);
            console.log("hi")
         }
      })
   }

   nextSlide() {

      for (let i = 1; i <= this.slides.length ; i++) {
         if (this.slides[i].tagName !== "BUTTON") {
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
            break;
         } else {
            this.container.appendChild(this.slides[i]);
            i--;
         }
      }
   }

   prevSlide() {

      for (let i = this.slides.length - 1; i > 0; i--) {
         if (this.slides[i].tagName !== "BUTTON") {
            let activ = this.slides[i];

            this.container.insertBefore(activ, this.slides[0]);
            this.decorizeSlides();
            break;
         } 
      } 
   }

   addAutoPlay() {
      if (this.autoplay) {
         const autoPlayTime = setInterval(() => this.nextSlide(), 3000);


         this.container.addEventListener("mouseenter", () => {
            clearInterval(autoPlayTime);
         })

         this.container.addEventListener("mouseleave", () => {
            this.addAutoPlay();
         })
      }

   }

   bindTriggers() {
      this.next.addEventListener("click", () => this.nextSlide())

      this.prev.addEventListener("click", () => this.prevSlide())
   }

   init() {
      try{
         this.container.style.cssText = `
         display: flex;
         flex-wrap: wrap;
         overflow: hidden;
         align-items: flex-start;
         `;

         this.bindTriggers();
         this.decorizeSlides();
         this.addAutoPlay();
      } catch(e) {};
   }
}