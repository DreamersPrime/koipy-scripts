// @name: KKTV
// @description: 检测 KKTV 解锁状态
// @regions: tw
// @tags: stream, video, live

const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';

const T_UNL = '解锁';
const T_FAIL = '失败';
const M_NETWORK = '网络';
const M_PARSE = '解析';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

function handler() {
    const response = fetch("https://api.kktv.me/v3/ipcheck", {
        method: "GET",
        headers: {
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
    const data = safeParse(body);
    if (!body || !data) {
        return {
            text: `${T_FAIL}(${M_PARSE})`,
            background: C_FAIL,
        };
    }
    const country = data.data.country;
    const isAllowed = data.data.is_allowed;
    if (isAllowed) {
        return {
            text: `${T_UNL}(${country})`,
            background: C_UNL,
        };
    }
    else {
        return {
            text: `${T_FAIL}(${country})`,
            background: C_FAIL,
        };
    }
}

module.exports = handler;
