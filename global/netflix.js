// @name: Netflix
// @description: 检测 Netflix 可用性
// @regions: global
// @tags: stream, video

const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';
const C_WARN = "253,109,20";

const T_UNL = '解锁';
const T_FAIL = '失败';
const T_UNK = '未知';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";
const SEC_CH_UA = 'Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129';

const T_ORIGINAL_ONLY = "仅自制";
function handler() {
    const testUrls = [
        "https://www.netflix.com/title/81280792",
        "https://www.netflix.com/title/70143836",
        "https://www.netflix.com/title/80018499",
    ];
    const responses = testUrls.map((url) => fetch(url, {
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
        noRedir: true,
        retry: 3,
        timeout: 15000,
    }));
    const [resp1, resp2, resp3] = responses;
    if (resp1.statusCode === 404 && resp2.statusCode === 404) {
        return { text: T_ORIGINAL_ONLY, background: C_WARN };
    }
    if (resp1.statusCode === 403 && resp2.statusCode === 403) {
        return { text: T_FAIL, background: C_FAIL };
    }
    if (resp1.statusCode === 200 ||
        resp1.statusCode === 301 ||
        resp2.statusCode === 200 ||
        resp2.statusCode === 301) {
        const location = resp3.headers["location"];
        if (!location) {
            return { text: `${T_UNL}(US)`, background: C_UNL };
        }
        const match = location.match(/\/title\/[^\/]+\/([^\/]+)/);
        if (match && match[1]) {
            const region = match[1].split("-")[0];
            return { text: `${T_UNL}(${region})`, background: C_UNL };
        }
    }
    return { text: T_UNK, background: C_UNK };
}

module.exports = handler;
