# Health Card Wallet

This is a PoC wallet application for demonstration. Actor of the application is an individual who can scan Health Cards and store it in their wallet. She can also use the application for presenting a health card.

### Running the application

```
npm install
```

### Testing the application

```
npm test
```

The application supports the following:

1. Scan a health card QR code
2. Verify a health card
3. Present health card

Features yet to be implemented:

1. Upload a health card file. See https://smarthealth.cards/#via-file-download
2. Get health card from a FHIR server. See https://smarthealth.cards/#via-fhir-health-cards-issue-operation
3. Support for chunked health cards. See https://smarthealth.cards/#chunking
4. Print health card
5. Trust Registery
