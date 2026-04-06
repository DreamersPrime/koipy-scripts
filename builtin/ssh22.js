function handler(){
    const content = fetch("http://ip-api.com/json/", {
        headers: {
          "User-Agent": "curl/7.77.0",
        },
        noRedir: false,
        retry: 3,
        timeout: 2500,
      });
    if (!content) {
        return {
          text: 'N/A',
        };
    }
    jsondata = safeParse(content.body);
    ip = jsondata.query;
    if (ip == null || ip == "") {
        return {
          text: '未知',
        };
    }
    var ret = netcat('tcp://' + ip + ':' + '22', "\0", { timeout: 5000 });
    // print("22端口检测结果：" +ret.data);
    if (ret.data == null || ret.data == ""){
        return {text: '失败'};
    }
    if (ret.data.toLowerCase().includes('ssh')) {
        return {
            text: "允许SSH"
        };
    }else {
        return {
            text: '允许'
        };
    }
}