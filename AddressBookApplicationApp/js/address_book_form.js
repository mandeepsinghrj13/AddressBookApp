let isUpdate = false;
let contactObj = {};

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

  checkForUpdate();
});

const save = (event) => {
  event.preventDefault();
  event.stopPropagation();
  try {
    setContactObject();
    createAndUpdateStorage();
    resetForm();
    window.location.replace(siteproperties.home_page);
  } catch (e) {
    console.log(e);
    return;
  }
};

const setContactObject = () => {
  let names = getInputValueById("#name").split(" ");
  contactObj._firstName = names[0];
  contactObj._lastName = names[1];
  contactObj._address = getInputValueById("#address");
  contactObj._city = getInputValueById("#city");
  contactObj._state = getInputValueById("#state");
  contactObj._zip = getInputValueById("#zip");
  contactObj._phone = getInputValueById("#phone");
  contactObj._email = getInputValueById("#email");
};

const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
};

const createAndUpdateStorage = () => {
  let contactList = JSON.parse(localStorage.getItem("ContactList"));
  if (contactList) {
    let contactData = contactList.find(
      (contact) => contact._id == contactObj._id
    );
    if (!contactData) contactList.push(createContactData());
    else {
      const index = contactList.map((cnt) => cnt._id).indexOf(contactData._id);
      contactList.splice(index, 1, createContactData(contactData._id));
    }
  } else {
    contactList = [createContactData()];
  }
  localStorage.setItem("ContactList", JSON.stringify(contactList));
};

const createContactData = (id) => {
  let contactData = new Contact();
  if (!id) contactData.id = createNewContactId();
  else contactData.id = id;
  setContactData(contactData);
  return contactData;
};

const createNewContactId = () => {
  let cntID = localStorage.getItem("ContactID");
  cntID = !cntID ? 1 : (parseInt(cntID) + 1).toString();
  localStorage.setItem("ContactID", cntID);
  return cntID;
};

const setContactData = (contactData) => {
  try {
    contactData.firstName = contactObj._firstName;
  } catch (e) {
    setTextValue(".name-error", e);
  }

  try {
    contactData.lastName = contactObj._lastName;
  } catch (e) {
    setTextValue(".name-error", e);
  }

  try {
    contactData.address = contactObj._address;
  } catch (e) {
    setTextValue(".address-error", e);
  }

  contactData.city = contactObj._city;
  contactData.state = contactObj._state;
  contactData.zip = contactObj._zip;

  try {
    contactData.phone = contactObj._phone;
  } catch (e) {
    setTextValue(".phone-error", e);
  }

  try {
    contactData.email = contactObj._email;
  } catch (e) {
    setTextValue(".email-error", e);
  }

  alert(contactData.toString());
};

const setTextValue = (id, value) => {
  const element = document.querySelector(id);
  element.textContent = value;
};

const resetForm = () => {
  setValue("#name", "");
  setValue("#address", "");
  setSelectedIndex("#city", 0);
  setSelectedIndex("#state", 0);
  setValue("#zip", "");
  setValue("#phone", "");
  setValue("#email", "");
};

const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
};

const setSelectedIndex = (id, index) => {
  const element = document.querySelector(id);
  element.selectedIndex = index;
};

const checkForUpdate = () => {
  const contactJson = localStorage.getItem("editContact");
  isUpdate = contactJson ? true : false;
  if (!isUpdate) return;
  contactObj = JSON.parse(contactJson);
  setForm();
};

const setForm = () => {
  setValue("#name", contactObj._firstName + " " + contactObj._lastName);
  setValue("#address", contactObj._address);
  setValue("#city", contactObj._city);
  setValue("#state", contactObj._state);
  setValue("#zip", contactObj._zip);
  setValue("#phone", contactObj._phone);
  setValue("#email", contactObj._email);
};
