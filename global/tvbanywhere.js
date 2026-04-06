// @name: TVB Anywhere
// @description: 检测 TVB Anywhere 解锁状态
// @regions: global
// @tags: stream, video

const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';

const T_UNL = '解锁';
const T_FAIL = '失败';
const T_UNK = '未知';

const UA_ANDROID = "Mozilla/5.0 (Linux; Android 12; SM-G991U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Mobile Safari/537.36";

function handler() {
    const response = fetch("https://uapisfm.tvbanywhere.com.sg/geoip/check/platform/android", {
        headers: {
            "User-Agent": UA_ANDROID,
        },
        noRedir: false,
        retry: 3,
        timeout: 15000,
    });
    if (!response) {
        return {
            text: "N/A",
            background: C_NA,
        };
    }
    else if (response.statusCode == 200) {
        const body = response.body;
        const result = safeParse(body);
        const region = result.country;
        if (result.allow_in_this_country) {
            return {
                text: `${T_UNL}(${region})`,
                background: C_UNL,
            };
        }
        else {
            return {
                text: `${T_FAIL}(${region})`,
                background: C_FAIL,
            };
        }
    }
    else {
        return {
            text: T_UNK,
            background: C_UNK,
        };
    }
}

module.exports = handler;
