const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';
const C_WAIT = '252,212,148';

function fetch_region(){
    const content3 = fetch('https://chat.openai.com/cdn-cgi/trace',
	{
		headers:
        {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) ' +
                          'Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0'
        },
		noRedir: false,
		retry: 3,
		timeout: 5000,
	});
    let region = ""
    const text3 = content3.body;
    if(!text3){
        return ""
    }

    const index2 = text3.indexOf("loc=");
    if (index2 > -1) {
        region = text3.substring(index2 + 4, index2 + 6);
    }
    if (region){
        region = "(" + region + ")"
    }
    return region
}
function handler()
{
	const content = fetch('https://api.openai.com/compliance/cookie_requirements',
	{
        headers: {
            'authority': 'api.openai.com',
            'accept': '*/*',
            'accept-language': 'zh-CN,zh;q=0.9',
            'authorization': 'Bearer null',
            'content-type': 'application/json',
            'origin': 'https://platform.openai.com',
            'referer': 'https://platform.openai.com/',
            'sec-ch-ua': '"Microsoft Edge";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0',

		},
		noRedir: false,
		retry: 3,
		timeout: 5000,
	});
	const content2 = fetch('https://ios.chat.openai.com/',
	{
		headers:
        {
            'authority': 'ios.chat.openai.com',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/' +
                      'signed-exchange;v=b3;q=0.7',
            'accept-language': 'zh-CN,zh;q=0.9',
            'sec-ch-ua': '"Microsoft Edge";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) ' +
                          'Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0'
        },
		noRedir: false,
		retry: 3,
		timeout: 5000,
	});

	if (!content || !content2)
	{
		return {
			text: 'N/A',
			background: C_NA,
		};
	}
    text1 = content.body
    text2 = content2.body
    if(!text1 || !text2){
        return {
			text: 'N/A',
			background: C_NA,
		};
    }
    const result1 = text1.includes("unsupported_country");
    const result2 = text2.includes("VPN");
    const region = fetch_region();
    if (!result2 && !result1 && text1 && text2) {
        return {
            text: '解锁' + region,
            background: C_UNL,
        };
    } else if (result2 && result1) {
        return {
            text: '失败',
            background: C_FAIL,
        };
    } else if (!result1 && result2 && text1) {
        return {
            text: '仅网页' + region,
            background: C_WAIT,
        };
    } else if (result1 && !result2) {
        return {
            text: '仅APP' + region,
            background: C_WAIT,
        };
    } else if (!text1 && result2) {
        return {
            text: '失败',
            background: C_FAIL,
        };
    } else {
        return {
            text: 'N/A',
            background: C_NA,
        };
    }
}