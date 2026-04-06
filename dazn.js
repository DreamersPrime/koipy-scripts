const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';
const C_WAIT = '255,213,128';

function handler() {
    const content = fetch('https://startup.core.indazn.com/misl/v5/Startup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "LandingPageKey": "generic", "Languages": "zh-CN,zh,en", "Platform": "web", "PlatformAttributes": {}, "Manufacturer": "", "PromoCode": "", "Version": "2" }),
        noRedir: false,
        retry: 3,
        timeout: 5000,
    });

    if (!content) {
        return {
            text: 'N/A',
            background: C_NA,
        };
    } else if (get(content, "body").indexOf('breached') !== -1) {
        return {
            text: '失败(IP)',
            background: C_FAIL,
        };
    } else if (content.statusCode == 200) {
        let res = get(get(safeParse(get(content, "body")), "Region", {}), "isAllowed", "")
        if (res === true) {
            return {
                text: '解锁(' + get(get(safeParse(get(content, "body")), "Region", {}), "GeolocatedCountry", "").toUpperCase() + ')',
                background: C_UNL,
            };
        } else if (res === false) {
            return {
                text: '失败',
                background: C_FAIL,
            };
        } else {
            return {
                text: '待解锁',
                background: C_WAIT,
            };
        }
    } else {
        return {
            text: '失败',
            background: C_FAIL,
        };
    }
}
