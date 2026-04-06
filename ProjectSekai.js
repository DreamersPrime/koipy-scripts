// @name: ProjectSekai
// @description: 检测 Project Sekai 解锁
// @regions: jp
// @tags: game

const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';

const T_NA = 'N/A';
const T_UNL = '解锁';
const T_FAIL = '失败';
const T_UNK = '未知';


const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";
const SEC_CH_UA = 'Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129';

function handler() {
    const response = fetch("https://game-version.sekai.colorfulpalette.org", {
        method: "GET",
        headers: {
            Accept: "*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Accept-Language": "en-US,en;q=0.9",
            "Sec-CH-UA": SEC_CH_UA,
            "Sec-CH-UA-Mobile": "?0",
            "Sec-CH-UA-Platform": '"Windows"',
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-User": "?1",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent": UA_WINDOWS,
        },
        noRedir: false,
        retry: 3,
        timeout: 15000,
    });
    if (!response) {
        return {
            text: T_NA,
            background: C_NA,
        };
    }
    if (response.statusCode !== 403) {
        return {
            text: T_UNK,
            background: C_UNK,
        };
    }
    const body = response.body;
    if (body.includes("AccessDenied")) {
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