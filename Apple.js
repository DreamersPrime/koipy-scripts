const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';

function twoToThreeCode(code) {
    const countryCodes = {
        "AD": "AND", "AE": "ARE", "AF": "AFG", "AG": "ATG", "AI": "AIA", "AL": "ALB", "AM": "ARM", "AO": "AGO", "AQ": "ATA", "AR": "ARG",
        "AS": "ASM", "AT": "AUT", "AU": "AUS", "AW": "ABW", "AX": "ALA", "AZ": "AZE", "BA": "BIH", "BB": "BRB", "BD": "BGD", "BE": "BEL",
        "BF": "BFA", "BG": "BGR", "BH": "BHR", "BI": "BDI", "BJ": "BEN", "BL": "BLM", "BM": "BMU", "BN": "BRN", "BO": "BOL", "BQ": "BES",
        "BR": "BRA", "BS": "BHS", "BT": "BTN", "BV": "BVT", "BW": "BWA", "BY": "BLR", "BZ": "BLZ", "CA": "CAN", "CC": "CCK", "CD": "COD",
        "CF": "CAF", "CG": "COG", "CH": "CHE", "CI": "CIV", "CK": "COK", "CL": "CHL", "CM": "CMR", "CN": "CHN", "CO": "COL", "CR": "CRI",
        "CU": "CUB", "CV": "CPV", "CW": "CUW", "CX": "CXR", "CY": "CYP", "CZ": "CZE", "DE": "DEU", "DJ": "DJI", "DK": "DNK", "DM": "DMA",
        "DO": "DOM", "DZ": "DZA", "EC": "ECU", "EE": "EST", "EG": "EGY", "EH": "ESH", "ER": "ERI", "ES": "ESP", "ET": "ETH", "FI": "FIN",
        "FJ": "FJI", "FK": "FLK", "FM": "FSM", "FO": "FRO", "FR": "FRA", "GA": "GAB", "GB": "GBR", "GD": "GRD", "GE": "GEO", "GF": "GUF",
        "GG": "GGY", "GH": "GHA", "GI": "GIB", "GL": "GRL", "GM": "GMB", "GN": "GIN", "GP": "GLP", "GQ": "GNQ", "GR": "GRC", "GS": "SGS",
        "GT": "GTM", "GU": "GUM", "GW": "GNB", "GY": "GUY", "HK": "HKG", "HM": "HMD", "HN": "HND", "HR": "HRV", "HT": "HTI", "HU": "HUN",
        "ID": "IDN", "IE": "IRL", "IL": "ISR", "IM": "IMN", "IN": "IND", "IO": "IOT", "IQ": "IRQ", "IR": "IRN", "IS": "ISL", "IT": "ITA",
        "JE": "JEY", "JM": "JAM", "JO": "JOR", "JP": "JPN", "KE": "KEN", "KG": "KGZ", "KH": "KHM", "KI": "KIR", "KM": "COM", "KN": "KNA",
        "KP": "PRK", "KR": "KOR", "KW": "KWT", "KY": "CYM", "KZ": "KAZ", "LA": "LAO", "LB": "LBN", "LC": "LCA", "LI": "LIE", "LK": "LKA",
        "LR": "LBR", "LS": "LSO", "LT": "LTU", "LU": "LUX", "LV": "LVA", "LY": "LBY", "MA": "MAR", "MC": "MCO", "MD": "MDA", "ME": "MNE",
        "MF": "MAF", "MG": "MDG", "MH": "MHL", "MK": "MKD", "ML": "MLI", "MM": "MMR", "MN": "MNG", "MO": "MAC", "MP": "MNP", "MQ": "MTQ",
        "MR": "MRT", "MS": "MSR", "MT": "MLT", "MU": "MUS", "MV": "MDV", "MW": "MWI", "MX": "MEX", "MY": "MYS", "MZ": "MOZ", "NA": "NAM",
        "NC": "NCL", "NE": "NER", "NF": "NFK", "NG": "NGA", "NI": "NIC", "NL": "NLD", "NO": "NOR", "NP": "NPL", "NR": "NRU", "NU": "NIU",
        "NZ": "NZL", "OM": "OMN", "PA": "PAN", "PE": "PER", "PF": "PYF", "PG": "PNG", "PH": "PHL", "PK": "PAK", "PL": "POL", "PM": "SPM",
        "PN": "PCN", "PR": "PRI", "PS": "PSE", "PT": "PRT", "PW": "PLW", "PY": "PRY", "QA": "QAT", "RE": "REU", "RO": "ROU", "RS": "SRB",
        "RU": "RUS", "RW": "RWA", "SA": "SAU", "SB": "SLB", "SC": "SYC", "SD": "SDN", "SE": "SWE", "SG": "SGP", "SH": "SHN", "SI": "SVN",
        "SJ": "SJM", "SK": "SVK", "SL": "SLE", "SM": "SMR", "SN": "SEN", "SO": "SOM", "SR": "SUR", "SS": "SSD", "ST": "STP", "SV": "SLV",
        "SX": "SXM", "SY": "SYR", "SZ": "SWZ", "TC": "TCA", "TD": "TCD", "TF": "ATF", "TG": "TGO", "TH": "THA", "TJ": "TJK", "TK": "TKL",
        "TL": "TLS", "TM": "TKM", "TN": "TUN", "TO": "TON", "TR": "TUR", "TT": "TTO", "TV": "TUV", "TW": "TWN", "TZ": "TZA", "UA": "UKR",
        "UG": "UGA", "UM": "UMI", "US": "USA", "UY": "URY", "UZ": "UZB", "VA": "VAT", "VC": "VCT", "VE": "VEN", "VG": "VGB", "VI": "VIR",
        "VN": "VNM", "VU": "VUT", "WF": "WLF", "WS": "WSM", "YE": "YEM", "YT": "MYT", "ZA": "ZAF", "ZM": "ZMB", "ZW": "ZWE"
    };

    return countryCodes[code.toUpperCase()];
}


const SUPPORT_COUNTRY = [
    "ALB", "DZA", "AFG", "ARG", "ARE", "ABW", "OMN", "AZE", "EGY", "ETH", "IRL", "EST", "AND", "AGO", "AIA", "ATG",
    "AUT", "ALA", "AUS", "MAC", "BRB", "PNG", "BHS", "PAK", "PRY", "PSE", "BHR", "PAN", "BRA", "BLR", "BMU", "BGR",
    "MNP", "MKD", "BEN", "BEL", "ISL", "BOL", "PRI", "POL", "BIH", "BWA", "BLZ", "BTN", "BFA", "BDI", "BVT", "IOT",
    "GNQ", "DNK", "DEU", "TLS", "TGO", "DOM", "DMA", "RUS", "ECU", "ERI", "FRA", "FRO", "PYF", "GUF", "ATF", "PHL",
    "FIN", "CPV", "FLK", "GMB", "COG", "COD", "COL", "CRI", "GRD", "GRL", "GEO", "GGY", "GLP", "GUM", "GUY", "KAZ",
    "HTI", "KOR", "NLD", "BES", "SXM", "HMD", "MNE", "HND", "KIR", "DJI", "KGZ", "GIN", "GNB", "CAN", "GHA", "GAB",
    "KHM", "CZE", "ZWE", "CMR", "QAT", "CYM", "CCK", "COM", "XKS", "CIV", "KWT", "HRV", "KEN", "COK", "CUW", "LVA",
    "LSO", "LAO", "LBN", "LBR", "LBY", "LTU", "LIE", "REU", "LUX", "RWA", "ROU", "MDG", "MLT", "MDV", "MWI", "MYS",
    "MLI", "MHL", "MTQ", "MYT", "IMN", "MUS", "MRT", "USA", "UMI", "ASM", "VIR", "MNG", "MSR", "BGD", "PER", "FSM",
    "MMR", "MDA", "MAR", "MCO", "MOZ", "MEX", "NAM", "ZAF", "ATA", "SGS", "SSD", "NPL", "NIC", "NER", "NGA", "NIU",
    "NOR", "NFK", "PLW", "PCN", "PRT", "JPN", "SWE", "CHE", "SLV", "WSM", "SRB", "SLE", "SEN", "CYP", "SYC", "SAU",
    "BLM", "CXR", "STP", "SHN", "KNA", "LCA", "MAF", "SMR", "SPM", "VCT", "LKA", "SVK", "SVN", "SJM", "SWZ", "SDN",
    "SUR", "SOM", "SLB", "TJK", "TWN", "THA", "TZA", "TON", "TCA", "TTO", "TUN", "TUV", "TUR", "TKM", "TKL", "WLF",
    "VUT", "GTM", "VEN", "BRN", "UGA", "UKR", "URY", "UZB", "ESP", "ESH", "GRC", "HKG", "SGP", "NCL", "NZL", "HUN",
    "JAM", "ARM", "YEM", "IRQ", "ISR", "ITA", "IND", "IDN", "GBR", "VGB", "JOR", "VNM", "ZMB", "JEY", "TCD", "GIB",
    "CHL", "CAF", "CHN", "NRU", "VAT", "FJI",
];

function handler() {
    const content = fetch('https://gspe1-ssl.ls.apple.com/pep/gcc', {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
        },
        noRedir: false,
        retry: 3,
        timeout: 5000,
    });
    if (!content) {
        return {
            text: 'N/A',
            background: C_NA,
        };
    }
    else if (SUPPORT_COUNTRY.includes(twoToThreeCode(get(content, "body")))) {
        return {
            text: '解锁(' + get(content, "body") + ')',
            background: C_UNL,
        };
    }
    else {
        return {
            text: '失败(' + get(content, "body") + ')',
            background: C_FAIL,
        };
    }
}