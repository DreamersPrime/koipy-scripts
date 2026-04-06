// @name: Amazon Prime Video
// @description: 检测 Amazon Prime Video 在当前地区是否可用
// @regions: global
// @tags: stream, video

const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';

const T_UNL = '解锁';
const T_FAIL = '失败';
const T_UNK = '未知';
const M_NETWORK = '网络';
const M_STATUS = '状态';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

function handler() {
    const response = fetch("https://www.primevideo.com", {
        method: "GET",
        headers: {
            "User-Agent": UA_WINDOWS,
        },
        noRedir: false,
        retry: 3,
        timeout: 5000,
    });
    if (!response) {
        return {
            text: `${T_FAIL}(${M_NETWORK})`,
            background: C_FAIL,
        };
    }
    else if (response.statusCode !== 200) {
        return {
            text: `${T_FAIL}(${M_STATUS})`,
            background: C_FAIL,
        };
    }
    else if (response.statusCode === 200) {
        const body = response.body;
        const isBlocked = body.includes("isServiceRestricted");
        const regionMatch = body.match(/"currentTerritory":"([^"]+)/);
        const region = regionMatch ? regionMatch[1] : null;
        if (isBlocked) {
            return {
                text: T_FAIL,
                background: C_FAIL,
            };
        }
        if (region) {
            return {
                text: `${T_UNL}(${region})`,
                background: C_UNL,
            };
        }
        return {
            text: T_UNK,
            background: C_UNK,
        };
    }
    else {
        return {
            text: C_UNK,
            background: C_UNK,
        };
    }
}

module.exports = handler;
