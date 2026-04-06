// @name: BBC iPlayer
// @description: 检测 BBC iPlayer 解锁状态
// @regions: uk
// @tags: stream, video, live

const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';

const T_UNL = '解锁';
const T_FAIL = '失败';
const T_UNK = '未知';
const M_NETWORK = '网络';

function handler() {
    const response = fetch("https://open.live.bbc.co.uk/mediaselector/6/select/version/2.0/mediaset/pc/vpid/bbc_one_london/format/json/jsfunc/JS_callbacks0", {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36",
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
    else if (response.statusCode === 200) {
        const content = response.body;
        const isBlocked = content.includes("geolocation");
        const isOK = content.includes("vs-hls-push-uk");
        if (!isBlocked && !isOK) {
            return {
                text: `${T_FAIL}(${M_NETWORK})`,
                background: C_FAIL,
            };
        }
        if (isBlocked) {
            return {
                text: T_FAIL,
                background: C_FAIL,
            };
        }
        if (isOK) {
            return {
                text: T_UNL,
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
            text: `${T_FAIL}(${response.statusCode})`,
            background: C_FAIL,
        };
    }
}

module.exports = handler;
