

import Slider from "./slider";

export default class MainSlider extends Slider {
   constructor (btns) {
      super(btns)
   }

   showSlides(n) {

      if (n > this.slides.length) {
         this.slideIndex = 1;
      } else if (n < 1) {
         this.slideIndex = this.slides.length;
      } else {
         this.slideIndex = n;
      };

      this.slides.forEach(slide => {
         slide.style.display = "none"
      });

      this.slides[this.slideIndex - 1].style.display = "block";
   
   }

   addHansonSlider() {
      try {

         this.timerBlock = document.querySelector(".hanson");
         this.timerBlock.style.opacity = "0";

         if (this.slideIndex == 3) {
            setTimeout(() => {
               this.timerBlock.classList.add("animated");
               this.timerBlock.classList.add("slideInUp");
               this.timerBlock.style.opacity = "1";
            }, 3000)
         } else {
            this.timerBlock.classList.remove("slideInUp");
            this.timerBlock.style.opacity = "0";
         }

      } catch(e) {};
   }

   
   addAdditionalTriggers() {

      if (document.querySelector(".prev > .prevmodule")) {
         
         document.querySelectorAll(".module__info-controls > .prev").forEach(item => {
            item.addEventListener("click", (e) => {
               e.stopPropagation();
               e.preventDefault();
               this.plusSlide(-1);
            })
         })
      };

      if (document.querySelector(".next > .nextmodule")) {
         
         document.querySelectorAll(".module__info-controls > .next").forEach(item => {
            item.addEventListener("click", (e) => {
               e.stopPropagation();
               e.preventDefault();
               this.plusSlide(1);
            })
         })
      }
   }



   plusSlide(i) {
      this.showSlides(this.slideIndex += i)
   }




   init() {

      if (this.container) {
         this.btns.forEach(btn => {
            btn.addEventListener("click", () => {
               this.plusSlide(1);
            })
   
            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
               e.preventDefault();
               this.slideIndex = 1;
               this.showSlides(this.slideIndex);
           });
         })
   
         this.addAdditionalTriggers();
         this.showSlides(this.slideIndex);
         this.addHansonSlider();
      } 
   }
}