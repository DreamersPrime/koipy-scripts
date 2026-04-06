// @name: Spotify
// @description: 检测 Spotify 在当前地区是否可注册
// @regions: global
// @tags: stream, music

const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';

const T_NA = 'N/A';
const T_FAIL = '失败';
const T_UNK = '未知';
const T_ALLOW = '允许';
const T_DENY = '拒绝';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

function handler() {
    const response = fetch("https://spclient.wg.spotify.com/signup/public/v1/account", {
        method: "POST",
        headers: {
            "User-Agent": UA_WINDOWS,
            "Accept-Language": "en",
        },
        body: "birth_day=23&birth_month=11&birth_year=2000&collect_personal_info=undefined&creation_flow=&creation_point=https%253A%252F%252Fwww.spotify.com%252Fhk-en%252F&displayname=Gay%2520Lord&gender=male&iagree=1&key=a1e486e2729f46d6bb368d6b2bcda326&platform=www&referrer=&send-email=0&thirdpartyemail=0&identifier_token=AgE6YTvEzkReHNfJpO114514",
        noRedir: false,
        retry: 3,
        timeout: 5000,
    });
    if (!response) {
        return {
            text: T_NA,
            background: C_NA,
        };
    }
    else if (response.statusCode == 200) {
        const body = response.body;
        let data = safeParse(body);
        const status = data.status;
        const country = data.country;
        const is_country_launched = data.is_country_launched;
        if (status === 320 || status === 120) {
            return {
                text: T_FAIL,
                background: C_FAIL,
            };
        }
        else if (status === 311 && is_country_launched) {
            return {
                text: `${T_ALLOW}(${country})`,
                background: C_UNL,
            };
        }
        else {
            return {
                text: T_DENY,
                background: C_FAIL,
            };
        }
    }
    else {
        return {
            text: T_UNK,
            background: C_UNK,
        };
    }
}

module.exports = handler;
