const API = "https://api.ipapi.is";

const TYPE_MAP = {
    isp: "家宽",
    business: "商宽",
    hosting: "机房",
    mobile: "移动网络",
	cdn: "CDN",
	education: "教育网",
	government: "政府",
    unknown: "未知"
};

function getRiskLabel(data) {
    if (data.is_bogon) return "非法IP";
    if (data.is_tor) return "Tor匿名";
    if (data.is_abuser) return "滥用IP";
    if (data.is_vpn) return "VPN";
    if (data.is_proxy) return "代理";
    if (data.is_crawler) return "爬虫";
    if (data.is_satellite) return "卫星";
    if (data.is_datacenter) return "机房";
    if (data.is_mobile) return "移动";
    return "✨原生";
}

function handler() {
    const response = fetch(API, {
        method: "GET",
        timeout: 10000,
    });

    if (!response || response.statusCode !== 200) {
        return {
            text: "失败(网络)",
            background: '239,107,115',
        };
    }

    let data;
    try {
        data = JSON.parse(response.body);
    } catch (e) {
        return {
            text: "解析失败",
            background: '239,107,115',
        };
    }

	const abuser_score = data.company?.abuser_score || "未知分数";

    const rawType = (data.company?.type || "unknown").toLowerCase();
    const typeCN = TYPE_MAP[rawType] || rawType;

    const risk = getRiskLabel(data);

    let riskFlag = "";
    if (data.is_bogon) riskFlag += "⛔ ";
    if (data.is_abuser) riskFlag += "🚫 ";
    if (data.is_tor) riskFlag += "🧅 ";
    if (data.is_proxy || data.is_vpn) riskFlag += "🌐 ";
	if (data.is_crawler) riskFlag += "🐛 ";
	if (data.is_mobile) riskFlag += "📱 ";
    if (data.is_datacenter) riskFlag += "🏢 ";
    if (data.is_satellite) riskFlag += "📡 ";

    return {
        text: ` ${typeCN} | ${riskFlag}${risk} | 风险：${abuser_score}`,
        background: '186,230,126',
    };
}

module.exports = handler;