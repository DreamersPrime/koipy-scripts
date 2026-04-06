// @name: 哔哩国际
// @description: 检测 Bilibili 国际版 解锁状态
// @regions: tw, hk
// @tags: stream, video, anime

const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';

const T_NA = 'N/A';
const T_UNL = '解锁';
const T_FAIL = '失败';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

var REGIONS;
(function (REGIONS) {
    REGIONS["HKMO"] = "HKMO";
    REGIONS["TW"] = "TW";
})(REGIONS || (REGIONS = {}));
const REGION_URLs = {
    HKMO: "https://api.bilibili.com/pgc/player/web/playurl?avid=473502608&cid=845838026&qn=0&type=&otype=json&ep_id=678506&fourk=1&fnver=0&fnval=16&module=bangumi",
    TW: "https://api.bilibili.com/pgc/player/web/playurl?avid=50762638&cid=100279344&qn=0&type=&otype=json&ep_id=268176&fourk=1&fnver=0&fnval=16&module=bangumi",
};
function bilibiliTest(url) {
    var _a;
    const response = fetch(url, {
        method: "GET",
        headers: {
            "User-Agent": UA_WINDOWS,
        },
        retry: 3,
        timeout: 15000,
    });
    if (!response) {
        return null;
    }
    if (response.statusCode === 412)
        return false;
    println(response.body);
    const code = (_a = safeParse(response.body)) === null || _a === void 0 ? void 0 : _a.code;
    if (code === 0)
        return true;
    return false;
}
function handler() {
    const results = {
        HKMO: null,
        TW: null,
    };
    for (const regionCode in REGION_URLs) {
        results[regionCode] = bilibiliTest(REGION_URLs[regionCode]);
    }
    if (results.HKMO === true && results.TW === true) {
        return {
            text: `${T_UNL}(台港澳)`,
            background: C_UNL,
        };
    }
    else if (results.HKMO === true) {
        return {
            text: `${T_UNL}(港澳)`,
            background: C_UNL,
        };
    }
    else if (results.TW === true) {
        return {
            text: `${T_UNL}(台湾)`,
            background: C_UNL,
        };
    }
    else if (results.HKMO === false && results.TW === false) {
        return {
            text: T_FAIL,
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
