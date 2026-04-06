// @name: IP质量(V6)
// @description: 检测出口节点的 IPv6 质量
// @regions: global
// @tags: ip, quality, tool

const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';

const T_FAIL = '失败';
const M_NETWORK = '网络';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";
const UA_CURL = "curl/7.88.1";
const SEC_CH_UA = 'Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129';

const IPV4_ENDPOINT = "http://ipv4.ip.sb";
const IPV6_ENDPOINT = "http://ipv6.ip.sb";
const ISP_TYPE = {
    COM: "商宽",
    DCH: "机房",
    EDU: "教育",
    GOV: "政府",
    ORG: "机构",
    MIL: "军队",
    LIB: "学术",
    CDN: "CDN",
    ISP: "家宽",
    MOB: "移动",
    SES: "爬虫",
    RSV: "保留",
    UNK: "未知",
};
function getPublicIp(protocol = "4") {
    const response = fetch(protocol === "6" ? IPV6_ENDPOINT : IPV4_ENDPOINT, {
        method: "GET",
        headers: {
            "User-Agent": UA_CURL,
        },
        noRedir: false,
        retry: 3,
        timeout: 15000,
    });
    if (!response || response.statusCode !== 200) {
        return null;
    }
    return response.body.replace(/(\n|\r)/gm, '').trim();
}
function handler() {
    const ipv6 = getPublicIp("6");
    if (!ipv6) {
        return {
            text: `无IPv6`,
            background: C_NA,
        };
    }
    const ip2locationUrl = `https://www.ip2location.io/${ipv6}`;
    const response = fetch(ip2locationUrl, {
        method: "GET",
        headers: {
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
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
    if (!response || response.statusCode !== 200) {
        return {
            text: `${T_FAIL}(${M_NETWORK})`,
            background: C_FAIL,
        };
    }
    const codeRegex = /<code[^>]*>([\s\S]*?)<\/code>/g;
    const body = response.body;
    const codeMatches = body.match(codeRegex);
    const codeBody = codeMatches
        ? codeMatches[0].replace(/<\/?code[^>]*>/g, "").trim()
        : "{}";
    const data = safeParse(codeBody);
    const country_code = data.country_code;
    const city_name = data.city_name;
    const asn = data.asn;
    const isp = data.isp;
    const usage_type = data.usage_type;
    const usage_types = usage_type && usage_type.length > 0 ? usage_type.split("/") : ['UNK'];
    const usage_type_text = usage_types
        .map((type) => ISP_TYPE[type] || type)
        .join("/");
    return {
        text: `${isp} (AS${asn}) - ${city_name}, ${country_code} - ${usage_type_text}`,
        background: C_UNL,
    };
}

module.exports = handler;
