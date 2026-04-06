// @name: Abema
// @description: 检测 Abema TV 网络电视解锁状态
// @regions: jp
// @tags: stream, video, live

const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_WARN = "253,109,20";

const T_UNL = '解锁';
const T_FAIL = '失败';
const T_OVERSEAS = '仅海外';
const M_NETWORK = '网络';
const M_RESPONSE = '响应';

const UA_ANDROID = "Mozilla/5.0 (Linux; Android 12; SM-G991U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Mobile Safari/537.36";

function handler() {
    const response = fetch("https://api.abema.io/v1/ip/check?device=android", {
        method: "GET",
        headers: { "user-agent": UA_ANDROID },
        noRedir: true,
        retry: 3,
        timeout: 5000,
    });
    if (!response || response.statusCode !== 200) {
        return {
            text: `${T_FAIL}(${M_NETWORK})`,
            background: C_FAIL,
        };
    }
    const content = response.body;
    const data = safeParse(content);
    if (!data) {
        return {
            text: `${T_FAIL}(${M_RESPONSE})`,
            background: C_FAIL,
        };
    }
    const region = data.isoCountryCode;
    if (!region) {
        return {
            text: T_FAIL,
            background: C_FAIL,
        };
    }
    if (region === "JP") {
        return {
            text: `${T_UNL}(${region})`,
            background: C_UNL,
        };
    }
    else {
        return {
            text: `${T_OVERSEAS}(${region})`,
            background: C_WARN,
        };
    }
}

module.exports = handler;
