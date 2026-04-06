// @name: ChatGPT
// @description: 检测 ChatGPT 在当前地区是否可用
// @regions: global
// @tags: ai

const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';

const T_NA = 'N/A';
const T_UNL = '解锁';
const T_FAIL = '失败';
const T_UNK = '未知';
const M_NETWORK = '网络';
const M_PARSE = '解析';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";
const UA_ANDROID = "Mozilla/5.0 (Linux; Android 12; SM-G991U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Mobile Safari/537.36";
const SEC_CH_UA = 'Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129';

const GPT_SUPPORT_COUNTRY = [
    "AL",
    "DZ",
    "AD",
    "AO",
    "AG",
    "AR",
    "AM",
    "AU",
    "AT",
    "AZ",
    "BS",
    "BD",
    "BB",
    "BE",
    "BZ",
    "BJ",
    "BT",
    "BA",
    "BW",
    "BR",
    "BG",
    "BF",
    "CV",
    "CA",
    "CL",
    "CO",
    "KM",
    "CR",
    "HR",
    "CY",
    "DK",
    "DJ",
    "DM",
    "DO",
    "EC",
    "SV",
    "EE",
    "FJ",
    "FI",
    "FR",
    "GA",
    "GM",
    "GE",
    "DE",
    "GH",
    "GR",
    "GD",
    "GT",
    "GN",
    "GW",
    "GY",
    "HT",
    "HN",
    "HU",
    "IS",
    "IN",
    "ID",
    "IQ",
    "IE",
    "IL",
    "IT",
    "JM",
    "JP",
    "JO",
    "KZ",
    "KE",
    "KI",
    "KW",
    "KG",
    "LV",
    "LB",
    "LS",
    "LR",
    "LI",
    "LT",
    "LU",
    "MG",
    "MW",
    "MY",
    "MV",
    "ML",
    "MT",
    "MH",
    "MR",
    "MU",
    "MX",
    "MC",
    "MN",
    "ME",
    "MA",
    "MZ",
    "MM",
    "NA",
    "NR",
    "NP",
    "NL",
    "NZ",
    "NI",
    "NE",
    "NG",
    "MK",
    "NO",
    "OM",
    "PK",
    "PW",
    "PA",
    "PG",
    "PE",
    "PH",
    "PL",
    "PT",
    "QA",
    "RO",
    "RW",
    "KN",
    "LC",
    "VC",
    "WS",
    "SM",
    "ST",
    "SN",
    "RS",
    "SC",
    "SL",
    "SG",
    "SK",
    "SI",
    "SB",
    "ZA",
    "ES",
    "LK",
    "SR",
    "SE",
    "CH",
    "TH",
    "TG",
    "TO",
    "TT",
    "TN",
    "TR",
    "TV",
    "UG",
    "AE",
    "US",
    "UY",
    "VU",
    "ZM",
    "BO",
    "BN",
    "CG",
    "CZ",
    "VA",
    "FM",
    "MD",
    "PS",
    "KR",
    "TW",
    "TZ",
    "TL",
    "GB",
];
const T_APP_ONLY = "仅App";
const T_WEB_ONLY = "仅网页";
function handler() {
    const traceResponse = fetch("https://chatgpt.com/cdn-cgi/trace", {
        method: "GET",
        headers: {
            "User-Agent": UA_WINDOWS,
        },
        noRedir: false,
        retry: 3,
        timeout: 15000,
    });
    if (!traceResponse || traceResponse.statusCode !== 200) {
        return {
            text: `${T_FAIL}(${M_NETWORK}1)`,
            background: C_FAIL,
        };
    }
    const traceContent = traceResponse.body;
    const locMatch = traceContent.match(/loc=([A-Z]{2})/);
    if (!locMatch) {
        return {
            text: `${T_UNK}(${M_PARSE})`,
            background: C_UNK,
        };
    }
    const region = locMatch[1];
    if (GPT_SUPPORT_COUNTRY.indexOf(region) < 0) {
        return {
            text: `${T_FAIL}(${region})`,
            background: C_FAIL,
        };
    }
    const mainResponse = fetch("https://api.openai.com/compliance/cookie_requirements", {
        headers: {
            authority: "api.openai.com",
            accept: "*/*",
            "accept-language": "zh-CN,zh;q=0.9",
            authorization: "Bearer null",
            "response-type": "application/json",
            origin: "https://platform.openai.com",
            referer: "https://platform.openai.com/",
            "sec-ch-ua": SEC_CH_UA,
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "user-agent": UA_WINDOWS,
        },
        noRedir: false,
        retry: 3,
        timeout: 5000,
    });
    const appResponse = fetch("https://android.chat.openai.com/", {
        headers: {
            authority: "android.chat.openai.com",
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/" +
                "signed-exchange;v=b3;q=0.7",
            "accept-language": "zh-CN,zh;q=0.9",
            "sec-ch-ua": SEC_CH_UA,
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Android"',
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "user-agent": UA_ANDROID,
        },
        noRedir: false,
        retry: 3,
        timeout: 5000,
    });
    if (!mainResponse || !appResponse) {
        return {
            text: T_NA,
            background: C_NA,
        };
    }
    const mainBody = mainResponse.body;
    const appBody = appResponse.body;
    if (!mainBody || !appBody) {
        return {
            text: T_NA,
            background: C_NA,
        };
    }
    const unsupported_country = mainBody.includes("unsupported_country");
    const vpn_detected = appBody.includes("VPN");
    if (!unsupported_country && !vpn_detected && mainBody && appBody) {
        return {
            text: `${T_UNL}(${region})`,
            background: C_UNL,
        };
    }
    else if (vpn_detected && unsupported_country) {
        return {
            text: `${T_FAIL}(${region})`,
            background: C_FAIL,
        };
    }
    else if (!unsupported_country && vpn_detected && mainBody) {
        return {
            text: `${T_WEB_ONLY}(${region})`,
            background: C_FAIL,
        };
    }
    else if (unsupported_country && !vpn_detected) {
        return {
            text: `${T_APP_ONLY}(${region})`,
            background: C_FAIL,
        };
    }
    else if (!unsupported_country && appBody) {
        return {
            text: `${T_FAIL}(${region})`,
            background: C_FAIL,
        };
    }
    else {
        return {
            text: T_NA,
            background: C_NA,
        };
    }
}

module.exports = handler;
