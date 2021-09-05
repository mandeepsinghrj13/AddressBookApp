window.addEventListener("DOMContentLoaded", (event) => {
  const name = document.querySelector("#name");
  const textError = document.querySelector(".name-error");
  name.addEventListener("input", function () {
    let names = document.querySelector("#name").value.split(" ");
    if (names[0].length == 0) {
      textError.textContent = "";
      return;
    }
    if (names.length == 2) {
      let nameRegex = RegExp("^[A-Z][a-z]{2,}$");
      if (!nameRegex.test(names[0]))
        textError.textContent = "First Name Invalid";
      if (!nameRegex.test(names[1]))
        textError.textContent = "Last Name Invalid";
      if (nameRegex.test(names[0]) && nameRegex.test(names[1]))
        textError.textContent = "";
    } else {
      let nameRegex = RegExp("^[A-Z][a-z]{2,}$");
      if (!nameRegex.test(names[0]))
        textError.textContent = "First Name Invalid";
      else textError.textContent = "";
    }
  });

  const addressElement = document.querySelector("#address");
  const addressError = document.querySelector(".address-error");
  addressElement.addEventListener("input", function () {
    let address = document.querySelector("#address").value;
    let words = address.split(" ");
    if (words.length > 1) {
      let addressRegex = RegExp("^[A-Za-z,.0-9]{3,}$");
      for (word of words) {
        if (!addressRegex.test(word))
          addressError.textContent = "Each word should be atleast 3 letters";
        else addressError.textContent = "";
      }
    } else {
      addressError.textContent = "Address should have multiple words";
    }
  });

  const phoneElement = document.querySelector("#phone");
  const phoneError = document.querySelector(".phone-error");
  phoneElement.addEventListener("input", function () {
    let phone = document.querySelector("#phone").value;
    let phoneRegex1 = RegExp("^[1-9][0-9]{9}$");
    let phoneRegex2 = RegExp("^[0-9]{2}[1-9][0-9]{9}$");
    let phoneRegex3 = RegExp("^[+][0-9]{2}[1-9][0-9]{9}$");
    if (
      phoneRegex1.test(phone) ||
      phoneRegex2.test(phone) ||
      phoneRegex3.test(phone)
    )
      phoneError.textContent = "";
    else phoneError.textContent = "Phone Number Invalid";
  });

  const emailElement = document.querySelector("#email");
  const emailError = document.querySelector(".email-error");
  emailElement.addEventListener("input", function () {
    let email = document.querySelector("#email").value;
    let emailRegex = RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
    if (emailRegex.test(email)) emailError.textContent = "";
    else emailError.textContent = "Email Invalid";
  });
});

const save = (event) => {
  event.preventDefault();
  let contactData = createContact();
  let jsonObject = JSON.stringify(contactData);
  alert(jsonObject);
};

const createContact = () => {
  let contactData = new Contact();
  let names = getInputValueById("#name").split(" ");
  contactData.firstName = names[0];
  contactData.lastName = names[1];
  contactData.address = getInputValueById("#address");
  contactData.city = getInputValueById("#city");
  contactData.state = getInputValueById("#state");
  contactData.zip = getInputValueById("#zip");
  contactData.phone = getInputValueById("#phone");
  contactData.email = getInputValueById("#email");
  return contactData;
};

const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
};

const resetForm = () => {};
