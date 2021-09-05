window.addEventListener("DOMContentLoaded", (event) => {
  const name = document.querySelector("#name");
  const textError = document.querySelector(".name-error");
  name.addEventListener("input", function () {
    let names = document.querySelector("#name").value.split(" ");
    if (name.value.length == 0) {
      textError.textContent = "";
      return;
    }
    try {
      new Contact().firstName = names[0];
      new Contact().lastName = names[1];
      textError.textContent = "";
    } catch (e) {
      textError.textContent = e;
    }
  });

  const addressElement = document.querySelector("#address");
  const addressError = document.querySelector(".address-error");
  addressElement.addEventListener("input", function () {
    let address = document.querySelector("#address").value;
    try {
      new Contact().address = address;
      addressError.textContent = "";
    } catch (e) {
      addressError.textContent = e;
    }
  });

  const phoneElement = document.querySelector("#phone");
  const phoneError = document.querySelector(".phone-error");
  phoneElement.addEventListener("input", function () {
    let phone = document.querySelector("#phone").value;
    try {
      new Contact().phone = phone;
      phoneError.textContent = "";
    } catch (e) {
      phoneError.textContent = e;
    }
  });

  const emailElement = document.querySelector("#email");
  const emailError = document.querySelector(".email-error");
  emailElement.addEventListener("input", function () {
    let email = document.querySelector("#email").value;
    try {
      new Contact().email = email;
      emailError.textContent = "";
    } catch (e) {
      emailError.textContent = e;
    }
  });
});

const save = (event) => {
  event.preventDefault();
  event.stopPropagation();
  let contactData = createContact();
  createAndUpdateStorage(contactData);
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

function createAndUpdateStorage(contactData) {
  let contactList = JSON.parse(localStorage.getItem("ContactList"));

  if (contactList != undefined) {
    contactList.push(contactData);
  } else {
    contactList = [contactData];
  }
  alert(contactList.toString());
  localStorage.setItem("ContactList", JSON.stringify(contactList));
}

const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
};

const resetForm = () => {};
