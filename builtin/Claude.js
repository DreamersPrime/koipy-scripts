// @name: Claude
// @description: 检测 Anthropic Claude 在当前地区是否可用
// @regions: global
// @tags: ai

const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';

const T_NA = 'N/A';
const T_UNL = '解锁';
const T_FAIL = '失败';
const T_UNK = '未知';
const claudeSupportedRegions = {"AL": "🇦🇱", "DZ": "🇩🇿", "AD": "🇦🇩", "AO": "🇦🇴", "AG": "🇦🇬", "AR": "🇦🇷", "AM": "🇦🇲", "AU": "🇦🇺", "AT": "🇦🇹", "AZ": "🇦🇿", "BS": "🇧🇸", "BH": "🇧🇭", "BD": "🇧🇩", "BB": "🇧🇧", "BE": "🇧🇪", "BZ": "🇧🇿", "BJ": "🇧🇯", "BT": "🇧🇹", "BO": "🇧🇴", "BA": "🇧🇦", "BW": "🇧🇼", "BR": "🇧🇷", "BN": "🇧🇳", "BG": "🇧🇬", "BF": "🇧🇫", "BI": "🇧🇮", "KH": "🇰🇭", "CM": "🇨🇲", "CA": "🇨🇦", "CV": "🇨🇻", "TD": "🇹🇩", "CL": "🇨🇱", "CO": "🇨🇴", "KM": "🇰🇲", "CG": "🇨🇬", "CR": "🇨🇷", "HR": "🇭🇷", "CZ": "🇨🇿", "DK": "🇩🇰", "DJ": "🇩🇯", "DM": "🇩🇲", "DO": "🇩🇴", "TL": "🇹🇱", "EC": "🇪🇨", "EG": "🇪🇬", "SV": "🇸🇻", "GQ": "🇬🇶", "EE": "🇪🇪", "SZ": "🇸🇿", "FJ": "🇫🇯", "FI": "🇫🇮", "FR": "🇫🇷", "GA": "🇬🇦", "GM": "🇬🇲", "GE": "🇬🇪", "DE": "🇩🇪", "GH": "🇬🇭", "GR": "🇬🇷", "GD": "🇬🇩", "GT": "🇬🇹", "GN": "🇬🇳", "GW": "🇬🇼", "GY": "🇬🇾", "HT": "🇭🇹", "HN": "🇭🇳", "HU": "🇭🇺", "IS": "🇮🇸", "IN": "🇮🇳", "ID": "🇮🇩", "IQ": "🇮🇶", "IE": "🇮🇪", "IL": "🇮🇱", "IT": "🇮🇹", "CI": "🇨🇮", "JM": "🇯🇲", "JP": "🇯🇵", "JO": "🇯🇴", "KZ": "🇰🇿", "KE": "🇰🇪", "KI": "🇰🇮", "KW": "🇰🇼", "KG": "🇰🇬", "LA": "🇱🇦", "LV": "🇱🇻", "LB": "🇱🇧", "LS": "🇱🇸", "LR": "🇱🇷", "LI": "🇱🇮", "LT": "🇱🇹", "LU": "🇱🇺", "MG": "🇲🇬", "MW": "🇲🇼", "MY": "🇲🇾", "MV": "🇲🇻", "MT": "🇲🇹", "MP": "🇲🇵", "MH": "🇲🇭", "MR": "🇲🇷", "MU": "🇲🇺", "MX": "🇲🇽", "FM": "🇫🇲", "MD": "🇲🇩", "MC": "🇲🇨", "MN": "🇲🇳", "ME": "🇲🇪", "MA": "🇲🇦", "MZ": "🇲🇿", "NA": "🇳🇦", "NR": "🇳🇷", "NP": "🇳🇵", "NL": "🇳🇱", "NZ": "🇳🇿", "NE": "🇳🇪", "NG": "🇳🇬", "NO": "🇳🇴", "OM": "🇴🇲", "PK": "🇵🇰", "PW": "🇵🇼", "PS": "🇵🇸", "PA": "🇵🇦", "PG": "🇵🇬", "PY": "🇵🇾", "PE": "🇵🇪", "PH": "🇵🇭", "PL": "🇵🇱", "PT": "🇵🇹", "QA": "🇶🇦", "CY": "🇨🇾", "RO": "🇷🇴", "RW": "🇷🇼", "KN": "🇰🇳", "LC": "🇱🇨", "VC": "🇻🇨", "AS": "🇦🇸", "SM": "🇸🇲", "ST": "🇸🇹", "SA": "🇸🇦", "SN": "🇸🇳", "RS": "🇷🇸", "SC": "🇸🇨", "SL": "🇸🇱", "SG": "🇸🇬", "SK": "🇸🇰", "SI": "🇸🇮", "SB": "🇸🇧", "ZA": "🇿🇦", "KR": "🇰🇷", "ES": "🇪🇸", "LK": "🇱🇰", "SR": "🇸🇷", "SE": "🇸🇪", "CH": "🇨🇭", "TW": "🇹🇼", "TJ": "🇹🇯", "TZ": "🇹🇿", "TH": "🇹🇭", "TG": "🇹🇬", "TO": "🇹🇴", "TT": "🇹🇹", "TN": "🇹🇳", "TR": "🇹🇷", "TM": "🇹🇲", "TV": "🇹🇻", "UG": "🇺🇬", "UA": "🇺🇦", "AE": "🇦🇪", "GB": "🇬🇧", "UM": "🇺🇲", "UY": "🇺🇾", "UZ": "🇺🇿", "US": "🇺🇸", "VU": "🇻🇺", "VA": "🇻🇦", "VN": "🇻🇳", "ZM": "🇿🇲", "ZW": "🇿🇼"};
const UA_ANDROID = "Mozilla/5.0 (Linux; Android 12; SM-G991U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Mobile Safari/537.36";

function handler() {
    const response = fetch("https://claude.ai/login", {
        headers: {
            "User-Agent": UA_ANDROID,
        },
        noRedir: true,
        retry: 3,
        timeout: 5000,
    });
    const resp2 = fetch("https://claude.ai/cdn-cgi/trace", {
        headers: {
            "User-Agent": UA_ANDROID,
        },
        noRedir: true,
        retry: 1,
        timeout: 5000,
    });
    if (!response && !resp2) {
        return {
            text: T_NA,
            background: C_NA,
        };
    }
    else if (response.statusCode >= 300 && response.statusCode < 400) {
        return {
            text: T_FAIL,
            background: C_FAIL,
        };
    }else if (response.statusCode == 200) {
        const body = response.body;
        let region = "";
        region = body.match(/\\\"ipCountry\\\":\\\"([A-Z]{2})\\\"/)[1].toUpperCase();
        if (region && region in claudeSupportedRegions){
            region = claudeSupportedRegions[region];
        }else{
            const cf_content = resp2.body;
            const region = (cf_content.match(/loc=(\S+)/)?.[1] || '').trim().toUpperCase();
            if (region && region in claudeSupportedRegions) {
                region = claudeSupportedRegions[region];
            }
        }

        return {
            text: `${T_UNL} ${region}`,
            background: C_UNL,
        };
    }else if (response.statusCode == 403) {
        const cf_content = resp2.body;
        print(cf_content);
        const region = (cf_content.match(/loc=(\S+)/)?.[1] || '').trim().toUpperCase();
        if (region && region in claudeSupportedRegions) {
            return {
                text: `${T_UNL} ${claudeSupportedRegions[region]}`,
                background: C_UNL,
            }
        }else{
            return {
                text: T_UNL,
                background: C_UNL,
            }
        }
    }
    return {
        text: T_UNK,
        background: C_UNK,
    };
}