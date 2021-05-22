import { TagNames } from "./tagnames.js";

export const PersonalDetailsComponentFactory = {
  register: () =>
    customElements.define(TagNames.personalDetails, PersonalDetailsComponent),
};

class PersonalDetailsComponent extends HTMLElement {
  constructor() {
    super();
  }

  setDetails(personalDetails, verifiedOn) {
    this.innerHTML = `<div class="personal-details${
      verifiedOn ? " verified" : " rejected"
    }">
      <div>
        <span class="title">Surname/Nom/Appellidos</span>
        <h2>${personalDetails.surName}</h2>
      </div>
      <div>
        <span class="title">Given Names/Prénoms/Nmbres</span>
        <h2>${personalDetails.givenName}</h2>
      </div>
      <div>
        <span class="title"
          >Date of Birth/Date de naissance/Fecha de nacimiento</span
        >
        <h2>${personalDetails.dob}</h2>
      </div>
      <div>
        <span class="title">Sex/Sexe/Sexo</span>
        <h2>${personalDetails.sex}</h2>
      </div>
    </div>`;
  }
}
