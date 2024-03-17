
(function(){

    const formInput = document.querySelectorAll('.connect__form--text');

    console.log(formInput);

    formInput.forEach((input, id) => {
      input.addEventListener('focusout', checkVal);
    });

    function checkVal(){
      if(this.value != ''){
        this.classList.add('input-filled');
      }
    }
})();

  window.addEventListener("DOMContentLoaded", function() {

    // get the form elements defined in your form HTML above

    var form = document.getElementById("my-form");
    var button = document.getElementById("my-form-button");
    var status = document.getElementById("my-form-status");

    // Success and Error functions for after the form is submitted

    function success() {
      form.reset();
      button.style = "display: none ";
      status.innerHTML = "Thanks! your request has been submitted, I will be in touch as soon as possible";
      status.style = "display: block;"
    }

    function error() {
      status.innerHTML = "Oops! There was a problem. <br /> Please make sure your email address is correct and try again. <br /> If the problem persists please email me <a href=\"mailto:firstdancethame@gmail.com\">firstdancethame@gmail.com</a>";
    }

    // handle the form submission event

    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });
  });

  // helper function for sending an AJAX request

  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }
