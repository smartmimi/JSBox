const veid = "12345";
const api_key = "private_xxxxx";

let url =
  "https://api.64clouds.com/v1/getServiceInfo?veid="+veid+"&api_key="+api_key;
$http.request({
  method: "GET",
  url: url,
  handler: function (resp) {
    var html = resp.data;

    var datacounter = html["data_counter"];
    var data_next_reset = html["data_next_reset"];
    var data = (datacounter / (12024 * 1024 * 1024)).toFixed(2);
    var reset = redate(data_next_reset);
    $ui.success("已用" + data + "/500G重置时间：" + reset);
  }
});
function redate(datein) {
  var da = new Date(datein * 1000);
  var year = da.getFullYear();
  var month = da.getMonth() + 1;
  var date = da.getDate();
  return [year, month, date].join("-");
}