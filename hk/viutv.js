// @name: ViuTV
// @description: 检测 ViuTV 本地内容 解锁状态
// @regions: hk
// @tags: stream, video

const T_UNL = '解锁';
const T_FAIL = '失败';
const M_NETWORK = '网络';
const M_STATUS = '状态';
const M_PARSE = '解析';

const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';

const UA_ANDROID = "Mozilla/5.0 (Linux; Android 12; SM-G991U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Mobile Safari/537.36";

function handler() {
    const response = fetch("https://api.viu.now.com/p8/3/getLiveURL", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "User-Agent": UA_ANDROID,
        },
        body: safeStringify({
            callerReferenceNo: "20210726112323",
            contentId: "099",
            contentType: "Channel",
            channelno: "099",
            mode: "prod",
            deviceId: "29b3cb117a635d5b56",
            deviceType: "ANDROID_WEB",
        }),
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
    else {
        const content = response.body;
        const data = safeParse(content);
        if (!data) {
            return {
                text: `${T_FAIL}(${M_PARSE})`,
                background: C_FAIL,
            };
        }
        const result = data.responseCode;
        switch (result) {
            case "GEO_CHECK_FAIL":
                return {
                    text: T_FAIL,
                    background: C_FAIL,
                };
            case "SUCCESS":
                return {
                    text: T_UNL,
                    background: C_UNL,
                };
            default:
                return {
                    text: T_FAIL,
                    background: C_FAIL,
                };
        }
    }
}

module.exports = handler;
