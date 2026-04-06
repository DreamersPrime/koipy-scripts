// @name: Steam 货币
// @description: 检测 Steam 货币
// @regions: global
// @tags: game

const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';

const T_NA = 'N/A';
const T_UNL = '解锁';
const T_FAIL = '失败';
const M_NETWORK = '网络';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

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
    const steamResponse = fetch("https://store.steampowered.com", {
        method: "GET",
        headers: {
            "User-Agent": UA_WINDOWS,
        },
        noRedir: false,
        retry: 3,
        timeout: 15000,
    });
    if (!steamResponse || steamResponse.statusCode !== 200) {
        return {
            text: `${T_FAIL}(${M_NETWORK})`,
            background: C_FAIL,
        };
    }
    const cookies = parseCookies(steamResponse.cookies);
    if (cookies["steamCountry"]) {
        const steamCountryValue = cookies["steamCountry"];
        const regionIndex = steamCountryValue.indexOf("%");
        if (regionIndex === -1) {
            return {
                text: T_FAIL,
                background: C_FAIL,
            };
        }
        const region = steamCountryValue.substring(0, regionIndex).toUpperCase();
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
