window.addEventListener("DOMContentLoaded", (event) => {
  createInnerHtml();
});

const createInnerHtml = () => {
  const headerHtml = ` 
      <th>Full Name</th>
      <th>Address</th>
      <th>City</th>
      <th>State</th>
      <th>Zip Code</th>
      <th>Phone Number</th>
      <th>Email</th>
    `;
  let contactList = createContactJSON();
  if (contactList.length == 0) return;
  document.querySelector(".person-count").textContent = contactList.length;
  let innerHtml = `${headerHtml}`;
  for (const contactData of contactList) {
    innerHtml = `${innerHtml}
    <tr>
        <td>${contactData._firstName}${contactData._lastName}</td>
        <td>${contactData._address}</td>
        <td>${contactData._city}</td>
        <td>${contactData._state}</td>
        <td>${contactData._zip}</td>
        <td>${contactData._phone}</td>
        <td>${contactData._email}</td>
        <td>
        <img name="${contactData._id}" onclick="removie(this)" alt="delete" 
                src="../assets/images/delete-black-18dp.svg">
        <img name="${contactData._id}" alt="edit" onclick="update(this)"
                src="../assets/images/create-black-18dp.svg">
        </td>
    </tr>
    `;
  }
  document.querySelector("#table-display").innerHTML = innerHtml;
};

const createContactJSON = () => {
  let contactListLocal = [
    {
      _firstName: "Mandeep",
      _lastName: " Singh",
      _address: "Shriwardhan Raigad",
      _city: "Mumbai",
      _email: "mandeep@gmail.com",
      _phone: "9166677890",
      _state: "Maharashtra",
      _zip: "402110",
    },
    {
      _firstName: "Lakhvinder",
      _lastName: " Singh",
      _address: "Goregoan Mahad",
      _city: "Mumbai",
      _email: "lakhvinder@gmail.co.in",
      _phone: "1234567890",
      _state: "Maharashtra",
      _zip: "400400",
    },
  ];
  return contactListLocal;
};
