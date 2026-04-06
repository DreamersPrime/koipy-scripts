// @name: CatchPlay+
// @description: 检测 CatchPlay+ 解锁状态
// @regions: tw
// @tags: stream, video, movie

const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';

const T_UNL = '解锁';
const T_FAIL = '失败';
const M_NETWORK = '网络';
const M_STATUS = '状态';
const M_PARSE = '解析';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

const AUTHORIZATION_HEADER = "Basic NTQ3MzM0NDgtYTU3Yi00MjU2LWE4MTEtMzdlYzNkNjJmM2E0Ok90QzR3elJRR2hLQ01sSDc2VEoy";
function handler() {
    const response = fetch("https://sunapi.catchplay.com/geo", {
        method: "GET",
        headers: {
            authorization: AUTHORIZATION_HEADER,
            "user-agent": UA_WINDOWS,
        },
        noRedir: true,
        retry: 3,
        timeout: 5000,
    });
    if (!response) {
        return {
            text: `${T_FAIL}(${M_NETWORK})`,
            background: C_FAIL,
        };
    }
    else if (response.statusCode === 200) {
        const content = response.body;
        const data = safeParse(content);
        if (!data) {
            return {
                text: `${T_FAIL}(${M_PARSE})`,
                background: C_FAIL,
            };
        }
        const resultCode = data.code;
        if (!resultCode) {
            return {
                text: `${T_FAIL}(${M_STATUS})`,
                background: C_UNK,
            };
        }
        switch (resultCode) {
            case "0":
                return {
                    text: T_UNL,
                    background: C_UNL,
                };
            case "100016":
                return {
                    text: T_FAIL,
                    background: C_FAIL,
                };
            default:
                return {
                    text: `${T_FAIL}(${resultCode})`,
                    background: C_FAIL,
                };
        }
    }
    else {
        return {
            text: `${T_FAIL}(${response.statusCode})`,
            background: C_FAIL,
        };
    }
}

module.exports = handler;
