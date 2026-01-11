import { BaseElement } from "../Elements/BaseElement";

export class GetElement {
  #baseElement;
  page;                

  constructor(page) {
    this.page = page;  
    this.#baseElement = new BaseElement(page);
  }
  
  get signUpBtn() {
    return this.#baseElement.getElement('.hero-descriptor_btn.btn.btn-primary');
  }

  get hillelBtn() {
    return this.#baseElement.getElement('.contacts_link.display-4');
  }

  get registrationName() {
    return this.#baseElement.getElement('#signupName');
  }

  get outClick() {
    return this.#baseElement.getElement('.modal-title');
  }

  get registrationLastName() {
    return this.#baseElement.getElement('#signupLastName');
  }

  get registrationEmail() {
    return this.#baseElement.getElement('#signupEmail');
  }

  get registrationPassword() {
    return this.#baseElement.getElement('#signupPassword');
  }

  get registrationReenterPassword() {
    return this.#baseElement.getElement('#signupRepeatPassword');
  }

  get registerBtn() {
    return this.page.getByRole('button', { name: 'Register' });
  }

  get signInBtn() {
    return this.#baseElement.getElement('.btn.btn-outline-white.header_signin');
  }

  get signInEmail() {
    return this.#baseElement.getElement('#signinEmail');
  }

  get signInPassword() {
    return this.#baseElement.getElement('#signinPassword');
  }

  get loginBtn() {
    return this.page.getByRole('button', { name: 'Login' });

  }
}