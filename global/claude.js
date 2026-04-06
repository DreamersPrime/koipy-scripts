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
    if (!response) {
        return {
            text: T_NA,
            background: C_NA,
        };
    }
    else if (response.statusCode == 307) {
        return {
            text: T_FAIL,
            background: C_FAIL,
        };
    }
    else if (response.statusCode == 200) {
        return {
            text: T_UNL,
            background: C_UNL,
        };
    }
    else {
        return {
            text: T_UNK,
            background: C_UNK,
        };
    }
}

module.exports = handler;
