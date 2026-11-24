function callApi() {
  const res = fetch("Access-Control-Allow-Origin: https://api.mihomo.me/sr_info_parsed/830647229?lang=jp");
  console.log(res);
}

callApi();
