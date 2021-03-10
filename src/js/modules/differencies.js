

export default class Differencies {

   constructor(officerOld, officerNew, items) {
      
      try {
         this.officerNew = document.querySelector(officerNew);
         this.itemsNew = this.officerNew.querySelectorAll(items);
         this.officerOld = document.querySelector(officerOld);
         this.itemsOld = this.officerOld.querySelectorAll(items);
   
         this.counterNew = 0;
         this.counterOld = 0;
      } catch (e) {};

   }

   hideContent(items) {
      items.forEach((item, i, arr) => {
         if (i !== arr.length - 1) {
            item.style.display = "none";
         } 
      })
   }

   addTriggers(container, items, counter) {
      container.querySelector(".plus").addEventListener("click", () => {
         if (counter !== items.length - 2) {
            items[counter].style.display = "flex";
            counter++;
         } else {
            items[counter].style.display = "flex";
            items[items.length - 1].remove();
         }
      })
   }

   init() {

      try {
         this.hideContent(this.itemsNew);
         this.hideContent(this.itemsOld);
   
         this.addTriggers(this.officerNew, this.itemsNew, this.counterNew);
         this.addTriggers(this.officerOld, this.itemsOld, this.counterOld);
      } catch(e) {};

   }

}