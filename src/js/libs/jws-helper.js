export function JWSHelper() {
  function decode(jws) {
    if (typeof jws !== "string") {
      throw new Error("Invalid Token");
    }
    try {
      let header, jwsPayload;
      [header, jwsPayload] = jws
        .split(".")
        .splice(0, 2)
        .map((value) => base64_url_decode(value));
      const charData = jwsPayload.split("").map((e) => e.charCodeAt(0));
      const binaryInput = new Uint8Array(charData);
      const inflate = new Zlib.RawInflate(binaryInput);
      const binaryResult = inflate.decompress();
      const result = String.fromCharCode.apply(
        null,
        new Uint16Array(binaryResult)
      );
      return {
        payload: JSON.parse(result),
        header: JSON.parse(header),
      };
    } catch (e) {
      throw new Error("Invalid Token", e);
    }
  }

  function base64_url_decode(str) {
    let output = str.replace(/-/g, "+").replace(/_/g, "/");
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += "==";
        break;
      case 3:
        output += "=";
        break;
      default:
        throw "Illegal base64url string!";
    }

    try {
      return b64DecodeUnicode(output);
    } catch (err) {
      return atob(output);
    }
  }

  function b64DecodeUnicode(str) {
    return decodeURIComponent(
      atob(str).replace(/(.)/g, function (m, p) {
        var code = p.charCodeAt(0).toString(16).toUpperCase();
        if (code.length < 2) {
          code = "0" + code;
        }
        return "%" + code;
      })
    );
  }

  return Object.freeze({ decode });
}
