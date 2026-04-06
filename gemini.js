// @name: Google Gemini
// @description: 检测 Google Gemini 在当前地区是否可用
// @regions: global
// @tags: ai

const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';

const T_UNL = '解锁';
const T_FAIL = '失败';
const M_NETWORK = '网络';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

function handler() {
    const response = fetch("https://gemini.google.com", {
        method: "GET",
        headers: {
            "User-Agent": UA_WINDOWS,
        },
        noRedir: false,
        retry: 3,
        timeout: 5000,
    });
    if (!response || response.statusCode !== 200) {
        return {
            text: `${T_FAIL}(${M_NETWORK})`,
            background: C_FAIL,
        };
    }
    const tmpResult = response.body;
    println(tmpResult);
    const isUnlocked = tmpResult.includes("45631641,null,true");
    const countryMatch = tmpResult.match(/,2,1,200,"([A-Z]{3})"/);
    const countryCode = countryMatch ? countryMatch[1] : "";
    if (isUnlocked && countryCode) {
        return {
            text: `${T_UNL}(${countryCode})`,
            background: C_UNL,
        };
    }
    else if (isUnlocked) {
        return {
            text: T_UNL,
            background: C_UNL,
        };
    }
    else {
        return {
            text: T_FAIL,
            background: C_FAIL,
        };
    }
}

module.exports = handler;
