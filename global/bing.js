// @name: Bing
// @description: 检测 Bing 是否为国际版
// @regions: global
// @tags: search-engine, ai

const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';

const T_UNL = '解锁';
const T_FAIL = '失败';
const T_UNK = '未知';
const M_NETWORK = '网络';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";
const SEC_CH_UA = 'Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129';

function handler() {
    const response = fetch("https://www.bing.com/", {
        method: "GET",
        headers: {
            Accept: "*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Accept-Language": "en-US,en;q=0.9",
            "Sec-CH-UA": SEC_CH_UA,
            "Sec-CH-UA-Mobile": "?0",
            "Sec-CH-UA-Platform": '"Windows"',
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-User": "?1",
            "Upgrade-Insecure-Requests": "1",
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
    const match = body.match(/Region:"([^"]*)"/);
    const region = match && match[1] ? match[1] : "";
    if (region === "CN") {
        return {
            text: `${T_FAIL}(CN)`,
            background: C_FAIL,
        };
    }
    else if (body.indexOf("cn.bing.com") > -1) {
        return {
            text: `${T_FAIL}(CN)`,
            background: C_FAIL,
        };
    }
    else if (region) {
        return {
            text: `${T_UNL}(${region})`,
            background: C_UNL,
        };
    }
    else {
        return {
            text: T_UNK,
            background: C_UNK,
        };
    }
}

module.exports = handler;
