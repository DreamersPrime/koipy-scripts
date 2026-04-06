const cookie = 'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Atoken-exchange&latitude=0&longitude=0&platform=browser&subject_token=DISNEYASSERTION&subject_token_type=urn%3Abamtech%3Aparams%3Aoauth%3Atoken-type%3Adevice';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36';
const gql = '{"query":"mutation refreshToken($input: RefreshTokenInput!) {refreshToken(refreshToken: $input) {activeSession {sessionId}}}","variables":{"input":{"refreshToken":"ILOVEDISNEY"}}}';

const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_WAIT = '255,213,128';
const C_UNK = '92,207,230';


function handler() {
    const UA_BROWSER = UA;

    try {
        // First request
        const deviceResponse = fetch('https://disney.api.edge.bamgrid.com/devices', {
            method: 'POST',
            headers: {
                'authorization': 'Bearer ZGlzbmV5JmJyb3dzZXImMS4wLjA.Cu56AgSfBTDag5NiRA81oLHkDZfu5L3CKadnefEAY84',
                'content-type': 'application/json; charset=UTF-8',
                'user-agent': UA_BROWSER
            },
            body: JSON.stringify({
                deviceFamily: "browser",
                applicationRuntime: "chrome",
                deviceProfile: "windows",
                attributes: {}
            }),
            noRedir: true,
            retry: 3,
            timeout: 5000
        });

        if (!deviceResponse) {
            return {
                text: 'N/A1',
                background: C_NA,
            };
        }
        if (deviceResponse.statusCode === 403 || deviceResponse.body.includes("403 ERROR")) {
            return {
                text: '失败(IP阻止)',
                background: C_FAIL,
            };
        }

        const deviceData = safeParse(deviceResponse.body);
        const assertion = deviceData.assertion || "";
        const assertionCookie = cookie.replace('DISNEYASSERTION', assertion);
        if (!assertion) {
            return {
                text: 'N/A2',
                background: C_NA,
            };
        }

        // Second request (token)
        const tokenResponse = fetch('https://disney.api.edge.bamgrid.com/token', {
            method: 'POST',
            headers: {
                'authorization': 'Bearer ZGlzbmV5JmJyb3dzZXImMS4wLjA.Cu56AgSfBTDag5NiRA81oLHkDZfu5L3CKadnefEAY84',
                'user-agent': UA_BROWSER,
                'content-type': 'application/x-www-form-urlencoded'
            },
            noRedir: true,
            retry: 3,
            timeout: 5000,
            body: assertionCookie,
        });

        if (!tokenResponse || tokenResponse.statusCode === 403 || tokenResponse.body.includes('forbidden-location')) {
            return {
                text: '失败(IP阻止)',
                background: C_FAIL,
            };
        }

        const tokenData = safeParse(tokenResponse.body);
        const refreshToken = tokenData.refresh_token || "";
        if (!refreshToken){
            return {
                text: 'N/A3',
                background: C_NA,
            };
        }
        // Third request (graph)
        const payload = gql.replace('ILOVEDISNEY', refreshToken);
        const graphResponse = fetch('https://disney.api.edge.bamgrid.com/graph/v1/device/graphql', {
            method: 'POST',
            headers: {
                'User-Agent': UA,
                'Authorization': 'ZGlzbmV5JmJyb3dzZXImMS4wLjA.Cu56AgSfBTDag5NiRA81oLHkDZfu5L3CKadnefEAY84',
            },
            body: payload,
            noRedir: true,
            retry: 3,
            timeout: 5000,
        });
        if (!graphResponse) {
            return {
                text: 'N/A4',
                background: C_NA,
            };
        }

        const graphData = safeParse(graphResponse.body) || {};
        var region = (get(graphData, 'extensions.sdk.session.location.countryCode') || '').toLocaleUpperCase();
        const inSupportedLocation = get(graphData, 'extensions.sdk.session.inSupportedLocation');
//        print("region:", region, "  inSupportedLocation: ", inSupportedLocation)

        // Preview check
        const previewResponse = fetch('https://disneyplus.com', {
            method: 'GET',
            headers: { 'user-agent': UA_BROWSER },
            retry: 2,
            timeout: 5000,
        });
        finalUrl = "https://disneyplus.com"
        try{
            const finalUrl = previewResponse.redirects.pop();
        }catch (error) {
            const finalUrl = "https://disneyplus.com";
        }
        const isUnavailable = finalUrl.includes('preview') || finalUrl.includes('unavailable');

        if (!region) {
            return {
                text: '失败1',
                background: C_FAIL,
            };
        }
        if (region) {
            region = "(" + region + ")"
        }
        if (isUnavailable) {
            return {
                text: '失败2',
                background: C_FAIL,
            };
        }
        if (inSupportedLocation === false) {
            return {
                text: '待解锁' + region,
                background: C_WAIT,
            };
        }
        if (inSupportedLocation === true) {
            return {
                text: '解锁' + region,
                background: C_UNL,
            };
        }

        return {
            text: 'N/A5',
            background: C_NA,
        };

    } catch (error) {
        print('Error:', error);
        return {
            text: '脚本出错',
            background: C_NA,
        };
    }
}