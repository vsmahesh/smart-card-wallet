"use strict";
import { ContextStore } from "../libs/context-store.js";
import { JWSHelper } from "../libs/jws-helper.js";
import { ResourceTypes } from "../libs/fhir/fhir-resource-types.js";
import { ImmunizationCodeHelper } from "../libs/fhir/immunization-codes.js";
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    // read card from context
    const card = new ContextStore().getCard();

    if (!card) {
      window.location.href = "/";
      return;
    }

    const jwsHelper = new JWSHelper();
    const decoded = jwsHelper.decode(card.data);

    bindMeta(card, decoded);
    const patientResource =
      decoded?.vc?.credentialSubject?.fhirBundle?.entry.find(
        (entry) => entry.resource.resourceType == ResourceTypes.Patient
      );
    bindPatientUI(patientResource);
    generateQRCode(card);

    const immunizations =
      decoded?.vc?.credentialSubject?.fhirBundle?.entry.filter(
        (entry) => entry.resource.resourceType == ResourceTypes.Immunization
      );
    bindImmunizationDataTable(immunizations);
  });

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
  }

  function verifyCard(card, decode) {
    const issuerJwksUrl = `${decode.iss}/.well-known/jwks.json`;
    fetch(issuerJwksUrl)
      .then((response) => response.json())
      .then()
      .catch((e) => {
        alert("Unable to fetch issuer's public key");
        console.log("Error fetching JWKS", e);
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

  function bindPatientUI(patientResource) {
    const container = document.querySelector("#personDetails");
    if (patientResource) {
      container.classList.remove("hidden");
      const uiMapping = [
        { elementId: "surname", path: "resource/name/0/family" },
        {
          elementId: "givenName",
          path: "resource/name/0/given",
          fn: (value) => value.join(" "),
        },
        { elementId: "dob", path: "resource/birthDate" },
        {
          elementId: "sex",
          path: "resource/gender",
          fn: (value) => {
            if (value) {
              return ["male", "m"].includes(value.toLowerCase()) ? "M" : "F";
            }
            return "";
          },
        },
      ];

      uiMapping.map((mapping) => {
        const element = document.getElementById(mapping.elementId);
        const data = getDataByPath(patientResource, mapping.path);
        element.innerHTML = mapping.fn ? mapping.fn.call(null, data) : data;
      });
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
    const numericJws = card.data
      .split("")
      .map((c) => c.charCodeAt(0) - 45)
      .flatMap((c) => [Math.floor(c / 10), c % 10])
      .join("");

    const segments = [
      { data: "shc:/", mode: "byte" },
      { data: numericJws, mode: "numeric" },
    ];

    QRCode.toDataURL(segments, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }
      const qrCode = document.querySelector("#qr-code");
      qrCode.src = url;
    });
  }
})();