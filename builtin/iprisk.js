const C_NA = '142,140,142';

function handler() {
  var ipResponse = fetch('http://ip-api.com/json', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
    },
    noRedir: false,
    retry: 3,
    timeout: 5000,
  });

  if (!ipResponse || ipResponse.statusCode !== 200) {
    return {
      text: 'N/A',
      background: C_NA,
    };
  }

  var ipData = JSON.parse(ipResponse.body);
  var ip = ipData.query;
  if (!ip) {
    return {
      text: 'N/A',
      background: C_NA,
    };
  }

  var scamalyticsResponse = fetch('https://scamalytics.com/ip/' + ip, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
    },
    noRedir: false,
    retry: 3,
    timeout: 5000,
  });

  if (!scamalyticsResponse || scamalyticsResponse.statusCode !== 200) {
    return {
      text: 'N/A',
      background: C_NA,
    };
  }

  // 假设您可以同步获取响应体
  var fraudScoreRegex = /Fraud Score:\s*(\d+)/;
  var matches = scamalyticsResponse.body.match(fraudScoreRegex);
  var score = matches && matches[1] ? matches[1] : '未知';

  let riskLevel;
  let color;

  if (score === 0) {
    riskLevel = 'No Risk';
    color = '255,255,255'; // 白色
  } else if (score <= 20) {
    riskLevel = 'Low';
    color = '186,230,126'; // 浅绿色
  } else if (score <= 40) {
    riskLevel = 'Medium';
    color = '255,215,0'; // 黄色
  } else if (score <= 60) {
    riskLevel = 'High';
    color = '255,165,0'; // 橙色
  } else {
    riskLevel = 'Very High';
    color = '239,107,115'; // 红色
  }
  var riskText = score !== null ? `${riskLevel}(${score})` : 'Unknown';

  
  return {
    text: riskText, // 这里你可能需要进一步处理score来提取具体的风险信息
    background: color, // 这里使用了一个假设的背景颜色
  };
}
