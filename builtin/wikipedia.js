const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';

function handler() {
  var content = fetch('https://en.wikipedia.org/w/index.php?title=Wikipedia:WikiProject_on_open_proxies&action=edit', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
    },
    noRedir: false,
    retry: 3,
    timeout: 5000,
  });

  if (!content) {
    return {
      text: 'N/A',
      background: C_NA,
    };
  } else if (content.statusCode === 200) {
    var resData = content.body; // 假设您可以同步获取响应体
    var index = resData.indexOf('This IP address has been'); // 使用indexOf来检查字符串
    if (index > -1) {
      return {
        text: '禁止编辑',
        background: C_FAIL,
      };
    } else {
      return {
        text: '允许编辑',
        background: C_UNL,
      };
    }
  } else {
    return {
      text: '未知',
      background: C_UNK,
    };
  }
}