// @name: HBO Go Asia
// @description: 检测 HBO Go Asia 解锁状态
// @regions: tw, hk
// @tags: stream, video, movie, anime

const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';

const T_NA = 'N/A';
const T_UNL = '解锁';
const T_FAIL = '失败';
const M_NETWORK = '网络';
const M_PARSE = '解析';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

function handler() {
    const response = fetch("https://api2.hbogoasia.com/v1/geog?lang=undefined&version=0&bundleId=www.hbogoasia.com", {
        method: "GET",
        headers: {
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
    else if (response.statusCode === 200) {
        const content = response.body;
        const data = safeParse(content);
        if (!data) {
            return {
                text: `${T_FAIL}(${M_PARSE})`,
                background: C_FAIL,
            };
        }
        const territory = data.territory;
        const region = data.country;
        if (!territory) {
            return {
                text: `${T_FAIL}`,
                background: C_FAIL,
            };
        }
        if (region) {
            return {
                text: `${T_UNL}(${region})`,
                background: C_UNL,
            };
        }
        else {
            return {
                text: `${T_FAIL}`,
                background: C_FAIL,
            };
        }
    }
    else {
        return {
            text: T_NA,
            background: C_UNK,
        };
    }
}

module.exports = handler;
