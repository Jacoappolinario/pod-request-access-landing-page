const form = document.querySelector(".content-form");

function formSent(response) {
  if (response.ok) {
    form.innerHTML =
      "<p class='access-request-success-message'><span>Access request sent.</span> We will contact you shortly. We usually reply within 24 hours.</p>";
  } else {
    form.innerHTML =
      "<p class='access-request-error-message'><span>Error sending access request.</span> You can send it directly to our e-mail address: contato@podcasts.com</p>";
  }
}

function sendForm(event) {
  event.preventDefault();

  const emailField = document.querySelector("#email").value;
  const errorMessage = document.querySelector(".form-email-error-message");

  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!emailField.match(emailFormat)) {
    errorMessage.classList.add("visible");
    return;
  }

  const button = document.querySelector(".content-form button");

  button.disabled = true;
  button.innerText = "sending...";

  const data = new FormData(form);

  fakeFetch("./enviar.php", {
    method: "POST",
    body: data,
    delayTime: 2000,
    simulateSuccess: false,
  }).then(formSent);
}

form.addEventListener("submit", sendForm);
