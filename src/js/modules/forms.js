

export default class Form {

   constructor(forms) {
      this.forms = document.querySelectorAll(forms);

      this.message = {
         loading: "Загрузка...",
         success: "Спасибо, мы скоро с вами свяжемся!",
         failure: "Что-то поло не так...",
      };
      this.path = "assets/question.php"
   }


   async postData(url, data) {

      let res = await fetch(url, {
         method: "POST",
         body: data,
      });

      return await res.text();
   }

   checkMailInputs() {

      const inputs = document.querySelectorAll("[type='email']");

      inputs.forEach(input => {
         input.addEventListener("keypress", (e) => {
            if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
               e.preventDefault();
            }
         });
      });

   }

   initMask() {

      let setCursorPosition = (pos, elem) => {
          elem.focus();
          
          if (elem.setSelectionRange) {
              elem.setSelectionRange(pos, pos);
          } else if (elem.createTextRange) {
              let range = elem.createTextRange();

              range.collapse(true);
              range.moveEnd('character', pos);
              range.moveStart('character', pos);
              range.select();
          }
      };

      function createMask(event) {
          let matrix = '+1 (___) ___-____',
              i = 0,
              def = matrix.replace(/\D/g, ''),
              val = this.value.replace(/\D/g, '');

          if (def.length >= val.length) {
              val = def;
          }

          this.value = matrix.replace(/./g, function(a) {
              return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
          });

          if (event.type === 'blur') {
              if (this.value.length == 2) {
                  this.value = '';
              }
          } else {
              setCursorPosition(this.value.length, this);
          }
      }

      let inputs = document.querySelectorAll('[name="phone"]');

      inputs.forEach(input => {
          input.addEventListener('input', createMask);
          input.addEventListener('focus', createMask);
          input.addEventListener('blur', createMask);
      });
  }


   init() {

      this.checkMailInputs();
      this.initMask();

      this.forms.forEach(form => {
         form.addEventListener("submit", (e) => {
            e.preventDefault();

            let statusMessage = document.createElement("div");
            statusMessage.style.cssText = `
               margin-top: 15px;
               font-size: 18px;
               color: grey;
            `;
            form.parentNode.appendChild(statusMessage);

            statusMessage.textContent = this.message.loading;

            const formData = new FormData(form);

            this.postData(this.path, formData)
               .then(res => {
                  console.log(res);

                  if (res.ok) {
                     statusMessage.textContent = this.message.success;
                  } else {
                     throw new Error("ОШИБКА POST ДАННЫХ")
                  }
               })
               .catch(() => {
                  statusMessage.textContent = this.message.failure;
               })
               .finally(() => {
                  form.reset();
                  setTimeout(() => {
                     statusMessage.remove();
                  }, 4000)
               });

         });
      });

   }

}