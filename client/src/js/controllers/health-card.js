"use strict";
import { ContextStore } from "../libs/context-store.js";
import { JWSHelper } from "../libs/jws-helper.js";
import { ResourceTypes } from "../libs/fhir/fhir-resource-types.js";
import { ImmunizationCodeHelper } from "../libs/fhir/immunization-codes.js";
import { DateUtils } from "../libs/date-utils.js";
import { HealthCardStore } from "../libs/health-card-store.js";
import { PersonalDetailsComponentFactory } from "../components/personal-details.js";
import { TagNames } from "../components/tagnames.js";
import { PatientResourceParser } from "../libs/fhir/patient-resource-parser.js";
import { QRCodeComponentFactory } from "../components/qr-code.js";
(() => {
  PersonalDetailsComponentFactory.register();
  QRCodeComponentFactory.register();
  document.addEventListener("DOMContentLoaded", () => {
    // read card from context
    const card = new ContextStore().getCard();

    if (!card) {
      window.location.href = "/";
      return;
    }

    const jwsHelper = new JWSHelper();
    const decoded = jwsHelper.decode(card.data);

    if (!card.verifiedOn && !card.verificationFailed) {
      // new card; try verifying it
      verifyCard(card, decoded);
    }

    bindMeta(card, decoded);
    bindTitle(card, decoded);
    bindPatientUI(card.verifiedOn, decoded);
    generateQRCode(card);

    const immunizations =
      decoded?.vc?.credentialSubject?.fhirBundle?.entry.filter(
        (entry) => entry.resource.resourceType == ResourceTypes.Immunization
      );
    bindImmunizationDataTable(immunizations);
  });

  function bindTitle(card, decoded) {
    card.title = getCardTitle(decoded);
    document.querySelector("#cardTitle").innerHTML = card.title;
    new HealthCardStore().saveCard(card);
  }

  function getCardTitle(decoded) {
    let result = "Health";
    const types = decoded?.vc?.type;
    if (types?.find((type) => type.endsWith("#immunization"))) {
      result = "Vaccination";
    } else if (types?.find((type) => type.endsWith("#laboratory"))) {
      result = "Laboratory";
    }

    return `${result} Card`;
  }

  function bindMeta(card, decoded) {
    document.querySelector("#createdOn").innerHTML = card.createdOn;
    const verifyLink = document.querySelector("#lnkVerify");
    if (card.verifiedOn) {
      document.querySelector("#verifiedOn").innerHTML = card.verifiedOn;
    } else {
      verifyLink.innerHTML = "Verify";
    }
    verifyLink.addEventListener("click", (_) => {
      verifyCard(card, decoded);
    });

    document.querySelector("#lnkDelete").addEventListener("click", () => {
      removeCard(card);
    });
  }

  function removeCard(card) {
    if (confirm("Are you sure to delete the health card?")) {
      new HealthCardStore().deleteCard(card.id);
      window.location.href = "/";
    }
  }

  function verifyCard(card, decoded) {
    fetch("/verify", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ healthcard: card.data }),
    })
      .then((response) => {
        if (!response.ok) {
          card.verificationFailed = 1;
          new HealthCardStore().saveCard(card);
          alert("Unable to verify the card");
        } else {
          card.verifiedOn = new DateUtils().toLocaleDateTimeString(new Date());
          new HealthCardStore().saveCard(card);
          bindPatientUI(card.verifiedOn, decoded);
          document.querySelector("#verifiedOn").innerHTML = card.verifiedOn;
        }
      })
      .catch((err) => {
        card.verificationFailed = 1;
        new HealthCardStore().saveCard(card);
        alert("Unable to verify the card");
      });
  }

  function bindImmunizationDataTable(immunizations) {
    const tableContainer = document.querySelector("#tableContainer");
    let index = 1;
    immunizations.map((immunization) => {
      const rowElement = document.createElement("div");
      rowElement.classList.add("row");
      rowElement.innerHTML = `
        <div class="col-sm-1">${index++}</div>
        <div class="col-sm-6">
          <div>${parseVaccineCode(
            getDataByPath(immunization, "resource/vaccineCode")
          )}</div>
          <small>${getDataByPath(immunization, "resource/lotNumber")}</small>
        </div>
        <div class="col-sm-5">
          <div>${getDataByPath(
            immunization,
            "resource/occurrenceDateTime"
          )}</div>
          <small>${getDataByPath(
            immunization,
            "resource/performer/0/actor/display"
          )}</small>
        </div>`;

      tableContainer.appendChild(rowElement);
    });
  }

  function parseVaccineCode(code) {
    if (code.text) {
      return code.text;
    }

    if (code.coding) {
      if (code.coding.display) {
        return code.coding.display;
      }

      return new ImmunizationCodeHelper().getDisplayString(code.coding);
    }
  }

  function bindPatientUI(verifiedOn, decoded) {
    const patientResource =
      decoded?.vc?.credentialSubject?.fhirBundle?.entry.find(
        (entry) => entry.resource.resourceType == ResourceTypes.Patient
      );

    const container = document.querySelector("#personDetails");
    if (patientResource) {
      container.classList.remove("hidden");
      const personalDetailsElement = document.querySelector(
        TagNames.personalDetails
      );
      personalDetailsElement.setDetails(
        PatientResourceParser.parse(patientResource),
        verifiedOn
      );
    } else {
      container.classList.add("hidden");
    }
  }

  function getDataByPath(data, path) {
    if (!path) {
      return data;
    }
    path = path.split("/");
    for (const p in path) {
      if (!path[p]) {
        continue;
      }
      data = data[path[p]];
      if (!data) {
        return data;
      }
    }
    return data;
  }

  function generateQRCode(card) {
    const qrElement = document.querySelector("healthcard-qr");
    qrElement.setData(card.data);
  }
})();
