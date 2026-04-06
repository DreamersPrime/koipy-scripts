const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';

const url = 'https://spclient.wg.spotify.com/signup/public/v1/account';
handler();
function handler() {
  const content = fetch(url, {
    method: 'POST',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
      'Accept-Language': 'en',
    },
    body: 'birth_day=23&birth_month=11&birth_year=2000&collect_personal_info=undefined&creation_flow=&creation_point=https%253A%252F%252Fwww.spotify.com%252Fhk-en%252F&displayname=Gay%2520Lord&gender=male&iagree=1&key=a1e486e2729f46d6bb368d6b2bcda326&platform=www&referrer=&send-email=0&thirdpartyemail=0&identifier_token=AgE6YTvEzkReHNfJpO114514',
    noRedir: false,
    retry: 3,
    timeout: 5000,
  });

  if (!content) {
    return {
      text: 'N/A',
      background: C_NA,
    };
  } else if (content.statusCode == 200) {
    let res = JSON.parse(content.body);
    const status = res.status;
    const country = res.country;
    const is_country_launched = res.is_country_launched;
    if (status === 320 || status === 120) {
      return {
        text: '禁止注册',
        background: C_FAIL,
      };
    } else if (status === 311 && is_country_launched) {
      return {
        text: '允许注册 (' + country + ')',
        background: C_UNL,
      };
    } else {
      return {
        text: '失败',
        background: C_FAIL,
      };
    }
  } else {
    return {
      text: '未知',
      background: C_UNK,
    };
  }
}
