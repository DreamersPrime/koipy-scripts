const API = "https://api.ipapi.is";

const TYPE_MAP = {
    isp: 5,
    business: 4,
    hosting: 3,
    mobile: 5,
    cdn: 3,
    education: 5,
    government: 5,
    unknown: 2
};

const score = {
    "Very Low": 5,
    "Low": 4,
    "Elevated": 3,
    "High": 2,
    "Very High": 1
};

function getRiskLabel(data) {
    if (data.is_bogon) return 1;
    if (data.is_tor) return 1;
    if (data.is_abuser) return 1;
    if (data.is_vpn) return 2;
    if (data.is_proxy) return 2;
    if (data.is_crawler) return 2;
    if (data.is_datacenter) return 3;
    if (data.is_satellite) return 3;
    if (data.is_mobile) return 4;
    return 5;
}

function isFakeResidential(data) {
    const type = (data.company?.type || "").toLowerCase();
    const name = (data.company?.name || "").toLowerCase();

    const looksResidential = ["isp", "mobile"].includes(type);
    const suspiciousCompany = /cloud|hosting|server|data|amazon|google|microsoft|azure|digitalocean|vultr/i.test(name);

    return looksResidential && suspiciousCompany;
}

function getASNScore(data) {
    const name = (data.company?.name || "").toLowerCase();

    if (/amazon|google|microsoft|azure|oracle|alibaba|tencent|huawei/i.test(name)) return 2;
    if (/cloud|hosting|vps|server|network[s]?|telecom|transit|backbone|peering|ix|internet exchange/i.test(name)) return 3;
	if (/vpn|proxy|anonymi[sz]|privacy|tor |tunnel|shield|secure|cyber/i.test(name)) return 2;
    return 5;
}

function getLabel(score) {
    if (score <= 1) return "差";
    if (score === 2) return "较差";
    if (score === 3) return "一般";
    if (score === 4) return "良好";
    return "优秀";
}

const flagMap = {
    1: "⭐",
    2: "⭐⭐",
    3: "⭐⭐⭐",
    4: "⭐⭐⭐⭐",
    5: "⭐⭐⭐⭐⭐"
};

function getColor(score) {
    if (score === 1) return "213,204,255";
	if (score === 2) return "255,214,241";
    if (score === 3) return "255,204,207";
	if (score === 4) return "255,236,204";
    return "205,255,179";
}

function handler() {
    const response = fetch(API, {
        method: "GET",
        timeout: 3000,
    });

    if (!response || response.statusCode !== 200) {
        return {
            text: "失败(网络)",
            background: "255,255,255",
        };
    }

    let data;
    try {
        data = JSON.parse(response.body);
    } catch (e) {
        return {
            text: "失败",
            background: "255,255,255",
        };
    }

    const rawScore = data.company?.abuser_score || "";
    const match = rawScore.match(/\((.*?)\)/);
    const level = match ? match[1].trim() : "High";
    const ip_score = score[level] ?? 2;
    const rawType = (data.company?.type || "unknown").toLowerCase();
    const type_new = TYPE_MAP[rawType] ?? 2;
    const risk = getRiskLabel(data);
    const asn_score = getASNScore(data);
    const min_score = Math.min(ip_score, type_new, risk);

    const weighted_score =
        ip_score * 0.5 +
        type_new * 0.2 +
        risk * 0.2 +
        asn_score * 0.1;

    let final_score = Math.min(
        Math.round(weighted_score),
        min_score + 1
    );

    if (data.is_tor || data.is_bogon) {
        final_score = 1;
    }

    if (isFakeResidential(data)) {
        final_score = Math.min(final_score, 2);
    }

    if (data.is_datacenter && data.is_vpn) {
        final_score = Math.min(final_score, 2);
    }

    const label = getLabel(final_score);
    const flag = flagMap[final_score] || "";
    const color = getColor(final_score);

    return {
        text: `${flag} | ${label}       `,
        background: color,
    };
}

module.exports = handler;