const form = document.querySelector(".content-form");

function updateDomWithMessage(message, success = false) {
  const messageElement = document.createElement("p");
  const messageClass = success
    ? "access-request-success-message"
    : "access-request-error-message";

  messageElement.classList.add(messageClass);
  messageElement.innerText = message;
  form.innerHTML = "";
  form.appendChild(messageElement);
}

function formSent(response) {
  const message = response.ok
    ? "Access request sent. We will contact you shortly. We usually reply within 24 hours."
    : "Error sending access request. You can send it directly to our e-mail address: contact@podcasts.com";

  updateDomWithMessage(message, response.ok);
}

function validateEmail(emailField) {
  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailFormat.test(emailField);
}

function showErrorMessage(errorMessageField) {
  errorMessageField.classList.add("visible");
}

function hideErrorMessage(errorMessageField) {
  errorMessageField.classList.remove("visible");
}

function disableButton(button) {
  button.disabled = true;
  button.innerText = "sending...";
}

function sendForm(event) {
  event.preventDefault();

  const emailField = document.querySelector("#email").value;
  const errorMessageField = document.querySelector(".form-email-error-message");

  if (!validateEmail(emailField)) {
    showErrorMessage(errorMessageField);
    return;
  } else {
    hideErrorMessage(errorMessageField);
  }

  const button = document.querySelector(".content-form button");

  disableButton(button);

  const data = new FormData(form);

  fakeFetch("./enviar.php", {
    method: "POST",
    body: data,
    delayTime: 2000,
    simulateSuccess: true,
  }).then(formSent);
}

form.addEventListener("submit", sendForm);
