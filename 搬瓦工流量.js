const veid = "12345";
const api_key = "private_xxxxx";

let url =
  "https://api.64clouds.com/v1/getServiceInfo?veid="+veid+"&api_key="+api_key;
$http.request({
  method: "GET",
  url: url,
  handler: function (resp) {
    let html = resp.data;
    let datacounter = html["data_counter"];
    let data_next_reset = html["data_next_reset"];
    let data = (datacounter / (1024 * 1024 * 1024)).toFixed(2);
    let reset = redate(data_next_reset);
    $ui.success("已用" + data + "/500G重置时间：" + reset);
  }
});
function redate(datein) {
  let da = new Date(datein * 1000);
  let year = da.getFullYear();
  let month = da.getMonth() + 1;
  let date = da.getDate();
  return [year, month, date].join("-");
}
