// @name: TVB
// @description: 检测 TVB 本地内容 解锁状态
// @regions: hk
// @tags: stream, video

const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';

const T_NA = 'N/A';
const T_UNL = '解锁';
const T_FAIL = '失败';
const T_UNK = '未知';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

function handler() {
    const response = fetch('https://www.mytvsuper.com/api/auth/getSession/self/', {
        headers: {
            'User-Agent': UA_WINDOWS,
        },
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
        const body = safeParse(response.body);
        const region = body.region;
        if (region === 1) {
            return {
                text: T_UNL,
                background: C_UNL,
            };
        }
        else {
            return {
                text: T_FAIL,
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
