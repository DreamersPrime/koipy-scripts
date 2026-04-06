// @name: Dazn
// @description: 检测 Dazn 在当前地区是否可用
// @regions: global
// @tags: stream, video

const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';

const T_NA = 'N/A';
const T_UNL = '解锁';
const T_FAIL = '失败';
const T_UNK = '未知';
const M_NETWORK = '网络';
const M_RESPONSE = '响应';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

function handler() {
    const response = fetch("https://startup.core.indazn.com/misl/v5/Startup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "User-Agent": UA_WINDOWS,
        },
        body: JSON.stringify({
            LandingPageKey: "generic",
            languages: "en-US,en",
            Platform: "web",
            PlatformAttributes: {},
            Manufacturer: "",
            PromoCode: "",
            Version: "2",
        }),
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
        const data = safeParse(response.body);
        if (!data) {
            return {
                text: `${T_FAIL}(${M_RESPONSE})`,
                background: C_FAIL,
            };
        }
        const isAllowed = data.Region.isAllowed;
        const region = data.Region.GeolocatedCountry.toUpperCase();
        if (isAllowed) {
            return {
                text: `${T_UNL}(${region})`,
                background: C_UNL,
            };
        }
        else {
            return {
                text: T_NA,
                background: C_NA,
            };
        }
    }
    else {
        return {
            text: `${T_UNK}(${response.statusCode})`,
            background: C_FAIL,
        };
    }
}

module.exports = handler;
