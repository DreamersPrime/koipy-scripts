// @name: MyVideo
// @description: 检测 MyVideo 线上影音 解锁状态
// @regions: tw
// @tags: stream, video, movie, anime

const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';

const T_UNL = '解锁';
const T_FAIL = '失败';
const M_NETWORK = '网络';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

function handler() {
    const response = fetch("https://www.myvideo.net.tw/login.do", {
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
    if (body.indexOf("serviceAreaBlock") > -1) {
        return {
            text: T_FAIL,
            background: C_FAIL,
        };
    }
    else {
        return {
            text: T_UNL,
            background: C_UNL,
        };
    }
}

module.exports = handler;
