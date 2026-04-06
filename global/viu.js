// @name: Viu+
// @description: 检测 Viu+ 解锁状态
// @regions: global
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
    const response = fetch("https://www.viu.com", {
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
    const location = response.redirects[0];
    println(response.redirects);
    if (location) {
        const region = location.split("/")[4];
        if (region === "no-service") {
            return {
                text: T_FAIL,
                background: C_FAIL,
            };
        }
        else {
            return {
                text: `${T_UNL}(${region.toUpperCase()})`,
                background: C_UNL,
            };
        }
    }
    return {
        text: T_NA,
        background: C_NA,
    };
}

module.exports = handler;
