
import MainSlider from "./modules/slider/slider-main";
import MiniSlider from "./modules/slider/slider-mini";
import VideoPlayer from "./modules/playVideo";
import Differencies from "./modules/differencies";
import Form from "./modules/forms";
import Tabs from "./modules/tabs";
import Download from "./modules/download";


window.addEventListener("DOMContentLoaded", () => {

   const slider = new MainSlider({
      btns: ".next",
      container: ".page",
   })
   slider.init();
   

   const modulesPageSlider = new MainSlider({
      container: ".moduleapp",
      btns: ".next",
   })
   modulesPageSlider.init();


   const showUpSlider = new MiniSlider({
      container: ".showup__content-slider",
      next: ".showup__next",
      prev: ".showup__prev",
      activeClass: "card-active",
      animate: true,
   });
   showUpSlider.init();


   const modulesSlider = new MiniSlider({
      container: ".modules__content-slider",
      next: ".modules__info-btns .slick-prev",
      prev: ".modules__info-btns .slick-next",
      activeClass: "card-active",
      animate: true,
      autoplay: true,
   });
   modulesSlider.init();


   const feedSlider = new MiniSlider({
      container: ".feed__slider",
      next: ".feed__slider .slick-prev",
      prev: ".feed__slider .slick-next",
      activeClass: "feed__item-active",
   });
   feedSlider.init();


   new VideoPlayer(".showup .play", ".overlay").init();
   new VideoPlayer(".module__video-item > .play", ".overlay").init();

   

   new Differencies(".officerold", ".officernew", ".officer__card-item").init();

   new Form("form").init();

   new Tabs(".plus__content").init();

   new Download(".download").init();
});