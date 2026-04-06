// @name: Line TV
// @description: 检测 Line TV 解锁状态
// @regions: tw
// @tags: stream, video, live

const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';

const T_UNL = '解锁';
const T_FAIL = '失败';
const M_NETWORK = '网络';
const M_PARSE = '解析';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

function handler() {
    const pageResponse = fetch("https://www.linetv.tw/", {
        method: "GET",
        headers: {
            "user-agent": UA_WINDOWS,
        },
        noRedir: false,
        retry: 3,
        timeout: 15000,
    });
    if (!pageResponse) {
        return {
            text: `${T_FAIL}(${M_NETWORK}1)`,
            background: C_FAIL,
        };
    }
    const pageContent = pageResponse.body;
    println(pageContent);
    const mainJsUrlMatch = pageContent.match(/src="([^"]+\/main-[a-z0-9]{8}[^"]*)"/);
    const mainJsUrl = mainJsUrlMatch ? mainJsUrlMatch[1] : null;
    if (!mainJsUrl) {
        return {
            text: `${T_FAIL}(${M_PARSE})`,
            background: C_FAIL,
        };
    }
    const mainJsResponse = fetch(mainJsUrl, {
        method: "GET",
        headers: {
            referer: "https://www.linetv.tw/",
            "user-agent": UA_WINDOWS,
        },
        noRedir: false,
        retry: 3,
        timeout: 15000,
    });
    if (!mainJsResponse) {
        return {
            text: `${T_FAIL}(JS)`,
            background: C_FAIL,
        };
    }
    const mainJsContent = mainJsResponse.body;
    println(mainJsContent);
    const appIdMatch = mainJsContent.match(/appId:"([^"]+)"/);
    const appId = appIdMatch ? appIdMatch[1] : null;
    const apiResponse = fetch(`https://www.linetv.tw/api/part/11829/eps/1/part?appId=${appId}&productType=FAST&version=10.38.0`, {
        method: "GET",
        headers: {
            "user-agent": UA_WINDOWS,
        },
        noRedir: false,
        retry: 3,
        timeout: 15000,
    });
    if (!apiResponse) {
        return {
            text: `${T_FAIL}(API)`,
            background: C_FAIL,
        };
    }
    const apiData = safeParse(apiResponse.body);
    if (!apiData) {
        return {
            text: `${T_FAIL}(${M_PARSE})`,
            background: C_FAIL,
        };
    }
    const countryCode = apiData.countryCode;
    if (countryCode === 228) {
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
