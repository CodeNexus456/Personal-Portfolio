
let menuBtn = document.querySelector(".menu-btn");
let navLinks = document.querySelector("#navLinks");

menuBtn.addEventListener("click",()=> {
  navLinks.classList.toggle("active");
});


// emailjs

(function(){
  emailjs.init("4uNB190iSrEY1qN_U"); // EmailJS se milega
})();

document.getElementById("conatctForm").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.send("service_gtan7tc", "template_uy1k4ps", {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  })
  .then(() => {
    alert("Message sent successfully 🚀");
  })
  .catch(() => {
    alert("Failed to send message ❌");
  });

  this.reset();
});

