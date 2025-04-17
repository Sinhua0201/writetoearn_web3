import { create as ipfsHttpClient } from "ipfs-http-client";

export const ipfs = ipfsHttpClient({ url: "http://127.0.0.1:5001/api/v0" });
