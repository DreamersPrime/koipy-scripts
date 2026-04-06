// @name: Meta.AI
// @description: 检测 Meta AI 在当前地区是否可用
// @regions: global
// @tags: ai

const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';

const T_NA = 'N/A';
const T_UNL = '解锁';
const T_FAIL = '失败';
const M_NETWORK = '网络';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";
const SEC_CH_UA = 'Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129';

function handler() {
    const response = fetch("https://www.meta.ai/", {
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
            text: `${T_FAIL}(${response.statusCode})`,
            background: C_FAIL,
        };
    }
    else if (response.statusCode === 200) {
        const content = response.body;
        println(content);
        const isBlocked = content.indexOf("AbraGeoBlockedErrorRoot") > -1;
        const isOK = content.indexOf("AbraHomeRootConversationQuery") > -1;
        if (!isBlocked && !isOK) {
            return {
                text: T_FAIL,
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
            const regionMatch = content.match(/"code"\s*:\s*"([^"]+)/);
            const region = regionMatch ? regionMatch[1].split("_")[1] : "Unknown";
            return {
                text: `${T_UNL}(${region})`,
                background: C_UNL,
            };
        }
    }
    else {
        return {
            text: T_NA,
            background: C_NA,
        };
    }
}

module.exports = handler;
