// @name: 香港開電視
// @description: 检测 HoyTV / 香港開電視 解锁状态
// @regions: hk
// @tags: stream, video

const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';

const T_NA = 'N/A';
const T_UNL = '解锁';
const T_FAIL = '失败';
const M_NETWORK = '网络';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

function handler() {
    const response = fetch("https://hoytv-live-stream.hoy.tv/ch78/index-fhd.m3u8", {
        method: "GET",
        headers: {
            "User-Agent": UA_WINDOWS,
        },
        noRedir: false,
        retry: 3,
        timeout: 15000,
    });
    if (!response) {
        return {
            text: `${T_FAIL}(${M_NETWORK})`,
            background: C_FAIL,
        };
    }
    if (response.statusCode === 403) {
        return {
            text: T_FAIL,
            background: C_FAIL,
        };
    }
    else if (response.statusCode === 200) {
        return {
            text: T_UNL,
            background: C_UNL,
        };
    }
    else {
        return {
            text: T_NA,
            background: C_NA,
        };
    }
}

module.exports = handler;
