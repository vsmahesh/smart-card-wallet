# Health Card Wallet

This is a PoC wallet application for demonstration. Actor of the application is an individual who can scan Health Cards and store it in their wallet. She can also use the application for presenting a health card.

### Running the application

Deploy the `src` folder in any web server.

A good option would be to host this in the azure static website.

> This is what I have deployed - https://purple-desert-09bb23310.azurestaticapps.net. Open in mobile browser so that you can scan.

### Perpare Dev Env

```
npm install
```

> This is a pure html/javascript application that run completely in the browser and do not require any build process

### Testing the application

```
npm test
```

The application supports the following:

1. Scan a health card QR code (Using - https://github.com/mebjas/html5-qrcode)
2. Verify a health card
3. Present health card

Features yet to be implemented:

1. Upload a health card file. See https://smarthealth.cards/#via-file-download
2. Get health card from a FHIR server. See https://smarthealth.cards/#via-fhir-health-cards-issue-operation
3. Support for chunked health cards. See https://smarthealth.cards/#chunking
4. Print health card
5. Trust Registery
6. Support for DiagnosticReport - https://www.hl7.org/fhir/diagnosticreport.html

### Credits
The QR Code scanner used is from https://github.com/mebjas/html5-qrcode
