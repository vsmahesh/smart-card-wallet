export const StaticData = {
  QR: "shc:/5676290952432060346029243740446031222959532654603460292540772804336028702864716745222809286455634440083032600304360463624506280455627537524332755540086952274507390512613725373136030422390371233327592342256260573601064131316171672024357441042770045772036458241129373267234037366764047460237034076138565259774077336722415077031220057505674441315362255475630455434143552376225458746752107771434545633977356642645737717667647143444510676168293160335861754438032970266872290432387043004376566750341005743626237140237334252656127510682707004072080572063706647568107754681164265754446606522276455533593874397020573458745535122230376922337533406159724555042745775724772307766734303341691145710844573741282356236828712524354143086955001174720823500952416359380936293521435567655953242510077256040431232160317773384207060403215257220538417428764275274543362027705809113954385065553858305400097254203457272211375776361004590740745940543867663662356560692242335565312441200066361076573959735476595741282169566652126765214467255737712144537561356520436004572533220064453610616431766669696072107235777629046573655737576958646105255920003354522576453461297440747212614053547443634067107262395341762558116629290308404255110521322161080436086132440405322206386438303055216077676656086666583677657344056344354556682233252636066574454403506272733361265477114535537331072276413071392542593731294533745326095341746542387556384368116310042660456527747469593456536558625537556031355031263273250837596550754461505457752374014369251076122806267403081222127669316138211140092911043074233943703571696121327053653920632863731024687522106611443856284224063261201066396768214407646276672009755950563620",
  JWS: "eyJ6aXAiOiJERUYiLCJhbGciOiJFUzI1NiIsImtpZCI6ImdlYU5KMi01Q1lkZ3I1dkxRaXMxdU5raHZ4T29jRFRLQ01CT0tDNHhDWFkifQ.3VLLjtpAEPwV1Hs1fu0mgE8JRMpDURQpm1wiDsO4jSeahzUzNpCV_z09A2x2pYVLbkFcxl1dXVXdDyCcgwpa7ztXZZlTzPoWmfRtypmtXYZ7pjqJLiNgjxYS0JsGquJ1MSsX-Xyep_O72wQGDtUDvOFGe9x7qH4-Uu52u3R3mxq7zcq8mGfcYo3aCyZdNhSwTsAfOgwdP9CKRrCNxNUjhuZd1HZzfEzD4ypOKNVr8Zt5YfRVIDeDqItFEPVX5rd-8wu5D_6aVlhS6QJPBXdpnhbEF74ue11LDBiLzvSW4310BafC2SVwIyWxHZXQAHsg68TcS_ndSgKc-6ucAOfHC8RfyQ71h4UwhUcSpoQkPnirCWNdnLEVA-oQ7yfThvcyhfVIBreoa9pnBYpFfRtBYbxjPnAXi1fFNC-mZQ7jmLyorriu7uPzyJ1nvnfRfrgmj2FhA-NcaFyZOjJwUwu9jUbcwXlUp7ukTbVyFg8oJJ05UWd82BMBj51Q5jMY12MC3SmSKKdBizpoe5oogQznvY2lYPZeqCNFGQ3nwZY0_kuvNjGcz8ZPbvL4CyVKtTFWhRLJZNwbG6bVwnWSxeSXq8l71GiZnHwwrhOebngkdRdiLP_LGMvF5Rhn_xYj_cfxDw.XrF7y9I3Gw059C9yrLjSB8U6J81KwDTXsPtrjBMsbnTAlIlv7EqxC7o8YSeIWE3MjA7oTpqBY4mkypA6xh_eQA",
  SHC: {
    iss: "https://smarthealth.cards/examples/issuer",
    nbf: 1617290880.843,
    type: "VerifiableCredential",
    resourceType: "Bundle",
  },
  jwks: {
    keys: [
      {
        kty: "EC",
        kid: "3Kfdg-XwP-7gXyywtUfUADwBumDOPKMQx-iELL11W9s",
        use: "sig",
        alg: "ES256",
        crv: "P-256",
        x: "11XvRWy1I2S0EyJlyf_bWfw_TQ5CJJNLw78bHXNxcgw",
        y: "eZXwxvO1hvCY0KucrPfKo7yAyMT6Ajc3N7OkAB6VYy8",
      },
      {
        kty: "EC",
        kid: "bVKTnRwVq4YU9oLwwShYELnRtKop_MsCAjNklowYemg",
        use: "sig",
        alg: "ES256",
        x5c: [
          "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",
        ],
        crv: "P-256",
        x: "f6GJiCnbnBaIm2jDaH_3UPC7Yl-x5yBAi5ddZ8v3Y_w",
        y: "jKcqirFw4G9v9gWTDCqAjvcCRQpbIK76bWqKBtseFzQ",
      },
    ],
  },
};

export const FHIRResources = {
  containedDiagnosticReport: {
    fullUrl: "urn:uuid:88e8f2e2-16f6-49b0-b206-3130fcef46a0",
    resource: {
      resourceType: "DiagnosticReport",
      id: "88e8f2e2-16f6-49b0-b206-3130fcef46a0",
      meta: {
        versionId: "3bc7c103-ab0f-45d7-b24f-d13aa9bd7aa0",
        lastUpdated: "2021-05-24T12:21:04.068+05:30",
      },
      contained: [
        {
          resourceType: "Observation",
          id: "obse8077482-b901-40bc-bba6-9a5e07a0cbf4",
          status: "unknown",
          code: {
            text: "COVID-19 Test",
          },
          performer: [
            {
              reference: "#organization-054c0ec9-9d70-4f2b-bbb6-42989fb30dfd",
              display: "MILLENNIUM-LIS",
            },
          ],
          related: [
            {
              type: "derived-from",
              target: {
                reference: "#resultObs322ce142-39c5-4c96-9fe8-6e648e711d1f",
              },
            },
          ],
        },
        {
          resourceType: "Organization",
          id: "organization-054c0ec9-9d70-4f2b-bbb6-42989fb30dfd",
          type: [
            {
              text: "MB",
            },
          ],
          name: "MILLENNIUM-LIS",
        },
        {
          resourceType: "Observation",
          id: "resultObs322ce142-39c5-4c96-9fe8-6e648e711d1f",
          extension: [
            {
              url: "https://fhir.chbase.com/fhir/stu3/StructuredDefinition/lab-test-result-name",
              valueString: "COVID-19 Test",
            },
          ],
          status: "unknown",
          code: {
            coding: [
              {
                system:
                  "https://fhir.chbase.com/fhir/stu3/ValueSet/Lab-Test-Results/AHSLabTestResults",
                version: "2017-02-23",
                code: "XAB2004452-2",
              },
            ],
            text: "COVID-19 Test",
          },
          effectiveDateTime: "2021-05-07T16:07:00+05:30",
          valueString: "Negative",
          specimen: {
            reference: "#specimen2b240372-9a76-4386-8674-0e14f976af61",
          },
        },
        {
          resourceType: "Specimen",
          id: "specimen2b240372-9a76-4386-8674-0e14f976af61",
          type: {
            text: "1",
          },
        },
        {
          resourceType: "Organization",
          id: "org0289fde6-73bb-4013-8e8d-c60f50455d80",
          type: [
            {
              text: "Diagnostic and Scientific Centre",
            },
          ],
          name: "UNKNOWN, PHYSICIAN",
        },
      ],
      extension: [
        {
          url: "https://fhir.chbase.com/fhir/stu3/StructuredDefinition/thing-flags",
          valueString: "ReadOnly",
        },
        {
          url: "https://fhir.chbase.com/fhir/stu3/StructuredDefinition/thing-state",
          valueString: "Active",
        },
        {
          url: "https://fhir.chbase.com/fhir/stu3/StructuredDefinition/source",
          valueString: "Netcare Connector",
        },
      ],
      status: "unknown",
      category: {
        coding: [
          {
            system: "http://hl7.org/fhir/DiagnosticReport-category",
            code: "LAB",
          },
        ],
      },
      code: {
        coding: [
          {
            system:
              "https://fhir.chbase.com/fhir/stu3/ValueSet/wc/chbase-datatypes",
            version: "1",
            code: "labtestresult",
            display: "Lab Test Result",
          },
        ],
      },
      effectiveDateTime: "2021-05-07T16:07:00+05:30",
      issued: "2021-05-07T16:07:00+05:30",
      performer: [
        {
          actor: {
            reference: "#org0289fde6-73bb-4013-8e8d-c60f50455d80",
            display: "UNKNOWN, PHYSICIAN",
          },
        },
      ],
      result: [
        {
          reference: "#obse8077482-b901-40bc-bba6-9a5e07a0cbf4",
        },
      ],
    },
  },
  patientResource: {
    fullUrl: "resource:0",
    resource: {
      resourceType: "Patient",
      name: [
        {
          family: "Anyperson",
          given: ["John", "B."],
        },
      ],
      birthDate: "1951-01-20",
      gender: "M",
    },
  },
};
