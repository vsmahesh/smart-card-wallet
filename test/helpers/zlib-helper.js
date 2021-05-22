const zlib = require("zlib");
export const ZlibHelper = {
  inflateFn: (payload) => {
    return zlib.inflateRawSync(Buffer.from(payload));
  },
};
