// @name: Tiktok
// @description: 检测 Tiktok 是否可用
// @regions: global
// @tags: social

const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';

const T_UNL = '解锁';
const T_FAIL = '失败';
const M_NETWORK = '网络';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";
const SEC_CH_UA = 'Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129';

function handler() {
    const response = fetch("https://www.tiktok.com/explore", {
        method: "GET",
        headers: {
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "en",
            "sec-ch-ua": SEC_CH_UA,
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "User-Agent": UA_WINDOWS,
        },
        noRedir: false,
        retry: 3,
        timeout: 15000,
    });
    if (!response || response.statusCode !== 200) {
        return {
            text: `${T_FAIL}(${M_NETWORK})`,
            background: C_FAIL,
        };
    }
    const body = response.body;
    if (body.includes("https://www.tiktok.com/hk/notfound")) {
        return {
            text: T_FAIL,
            background: C_FAIL,
        };
    }
    const match = body.match(/"region":"(\w+)"/);
    const region = match && match[1] ? match[1] : "";
    if (region) {
        return {
            text: `${T_UNL}(${region})`,
            background: C_UNL,
        };
    }
    else {
        return {
            text: T_FAIL,
            background: C_FAIL,
        };
    }
}

module.exports = handler;
