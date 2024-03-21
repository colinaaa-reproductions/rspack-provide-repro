const Client =
  typeof __webpack_dev_server_client__ !== "undefined"
    ? typeof __webpack_dev_server_client__.default !== "undefined"
      ? __webpack_dev_server_client__.default
      : __webpack_dev_server_client__
    : null;

export default function () {
  let client = new Client();
  return client;
}
