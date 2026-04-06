// @name: Tving
// @description: 检测 Tving 的解锁状态
// @regions: kr
// @tags: stream, ott

const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';

const T_NA = 'N/A';
const T_UNL = '解锁';
const T_FAIL = '失败';
const M_NETWORK = '网络';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

function handler() {
    const response = fetch("https://api.tving.com/v2a/media/stream/info?apiKey=1e7952d0917d6aab1f0293a063697610&mediaCode=RV60891248", {
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
    if (data && data.body && data.body.result && data.body.result.code) {
        const code = data.body.result.code;
        if (code === "000") {
            return {
                text: T_UNL,
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
    else {
        return {
            text: T_NA,
            background: C_NA,
        };
    }
}

module.exports = handler;
