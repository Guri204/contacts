'use strict';

class Contact {
  #name;
  #city;
  #email;

  constructor(name, city, email) {
    this.#name = name;
    this.#city = city;
    this.#email = email;
  }

  get name() {
    return this.#name;
  }
  get city() {
    return this.#city;
  }
  get email() {
    return this.#email;
  }
}

const contacts = [];

const addContact = () => {
  const name = document.getElementById('nameInput').value.trim();
  const city = document.getElementById('cityInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  const error = document.getElementById('error');
  error.textContent = '';

  if (!name || !city || !email) {
    error.textContent = 'All fields are required.';
    return;
  }

  if (!validateEmail(email)) {
    error.textContent = 'Please enter a valid email.';
    return;
  }

  contacts.unshift(new Contact(name, city, email));
  document.getElementById('nameInput').value = '';
  document.getElementById('cityInput').value = '';
  document.getElementById('emailInput').value = '';
  displayContacts();
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const displayContacts = () => {
  const contactsList = document.getElementById('contactsList');
  contactsList.innerHTML = contacts.map((contact, index) => `
    <div class="contact ${index === 0 ? 'recent' : ''}">
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>City:</strong> ${contact.city}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p class="delete" onclick="deleteContact(${index})">Click to delete</p>
    </div>
  `).join('');

  document.getElementById('contactCount').textContent = `Total contacts: ${contacts.length}`;
};

const deleteContact = (index) => {
  contacts.splice(index, 1);
  displayContacts();
};
