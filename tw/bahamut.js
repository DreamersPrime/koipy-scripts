// @name: 動畫瘋
// @description: 检测 Bahamut / 動畫瘋 解锁状态
// @regions: tw
// @tags: stream, video, anime

const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';

const T_NA = 'N/A';
const T_UNL = '解锁';
const T_FAIL = '失败';
const M_NETWORK = '网络';
const M_DEVICE = '设备';
const M_TOKEN = '令牌';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";
const SEC_CH_UA = 'Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129';

function parseCookies(cookieArray) {
    var cookieMap = {};
    cookieArray.forEach(function (cookieObj) {
        var key = cookieObj.Name;
        var value = cookieObj.Value;
        cookieMap[key] = value;
    });
    return cookieMap;
}

function handler() {
    var _a;
    const deviceIdResponse = fetch("https://ani.gamer.com.tw/ajax/getdeviceid.php", {
        method: "GET",
        headers: {
            "User-Agent": UA_WINDOWS,
        },
        noRedir: false,
        retry: 3,
        timeout: 15000,
    });
    if (!deviceIdResponse || deviceIdResponse.statusCode !== 200) {
        return {
            text: `${T_FAIL}(${M_NETWORK}1)`,
            background: C_FAIL,
        };
    }
    let cookies = parseCookies(deviceIdResponse.cookies);
    const deviceIdContent = deviceIdResponse.body;
    const deviceIdJSON = safeParse(deviceIdContent);
    const deviceId = deviceIdJSON.deviceid;
    if (!deviceId) {
        return {
            text: `$${T_FAIL}(${M_DEVICE})`,
            background: C_FAIL,
        };
    }
    const sn = "37783";
    const tokenResponse = fetch(`https://ani.gamer.com.tw/ajax/token.php?adID=89422&sn=${sn}&device=${deviceId}`, {
        method: "GET",
        headers: {
            "User-Agent": UA_WINDOWS,
        },
        cookies: cookies,
        noRedir: false,
        retry: 3,
        timeout: 15000,
    });
    if (!tokenResponse || tokenResponse.statusCode !== 200) {
        return {
            text: `${T_FAIL}(${M_NETWORK}2)`,
            background: C_FAIL,
        };
    }
    cookies = parseCookies(tokenResponse.cookies);
    const tokenContent = tokenResponse.body;
    const tokenData = safeParse(tokenContent);
    const animeSn = tokenData.animeSn;
    if (!animeSn) {
        return {
            text: `${T_FAIL}(${M_TOKEN})`,
            background: C_NA,
        };
    }
    const regionResponse = fetch("https://ani.gamer.com.tw/", {
        method: "GET",
        headers: {
            "User-Agent": UA_WINDOWS,
            accept: "*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "zh-TW,zh;q=0.9",
            "sec-ch-ua": SEC_CH_UA,
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-model": '""',
            "sec-ch-ua-platform": '"Windows"',
            "sec-ch-ua-platform-version": '"15.0.0"',
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
        },
        cookies: cookies,
        noRedir: false,
        retry: 3,
        timeout: 15000,
    });
    if (!regionResponse || regionResponse.statusCode !== 200) {
        return {
            text: `${T_FAIL}(${M_NETWORK}3)`,
            background: C_FAIL,
        };
    }
    const regionContent = regionResponse.body;
    const region = (_a = regionContent.match(/data-geo="([^"]+)/)) === null || _a === void 0 ? void 0 : _a[1];
    if (region) {
        return {
            text: `${T_UNL}(${region})`,
            background: C_UNL,
        };
    }
    return {
        text: T_NA,
        background: C_NA,
    };
}

module.exports = handler;
