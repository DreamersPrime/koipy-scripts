// @name: Netflix CDN
// @description: 检测 Netflix CDN 地理位置
// @regions: global
// @tags: stream, video

const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';

const T_NA = 'N/A';
const T_UNL = '解锁';
const T_FAIL = '失败';
const T_UNK = '未知';
const M_STATUS = '状态';
const M_IP_BLOCK = 'IP阻止';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";
const SEC_CH_UA = 'Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129';

function handler() {
    var _a, _b, _c;
    const response = fetch("https://api.fast.com/netflix/speedtest/v2?https=true&token=YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm&urlCount=5", {
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
    });
    if (!response) {
        return {
            text: T_NA,
            background: C_NA,
        };
    }
    if (response.statusCode === 403) {
        return {
            text: `${T_FAIL}(${M_IP_BLOCK})`,
            background: C_FAIL,
        };
    }
    const body = response.body;
    const result = safeParse(body);
    if (!result) {
        return {
            text: `${T_FAIL}(${M_STATUS})`,
            background: C_FAIL,
        };
    }
    const country = (_c = (_b = (_a = result === null || result === void 0 ? void 0 : result.targets) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.location) === null || _c === void 0 ? void 0 : _c.country;
    if (country) {
        return {
            text: `${T_UNL}(${country})`,
            background: C_UNL,
        };
    }
    return {
        text: T_UNK,
        background: C_UNK,
    };
}

module.exports = handler;
