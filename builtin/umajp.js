// @name: umajp
// @description: 检测 ウマ娘 プリティーダービー 解锁
// @regions: jp
// @tags: game

const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';

const T_NA = 'N/A';
const T_UNL = '解锁';
const T_FAIL = '失败';
const T_UNK = '未知';

const UA_Android = "Dalvik/2.1.0 (Linux; U; Android 9; ALP-AL00 Build/HUAWEIALP-AL00)";

function handler() {
    const response = fetch("https://api-umamusume.cygames.jp/", {
        method: "GET",
        headers: {
            "User-Agent": UA_Android,
        },
        noRedir: false,
        retry: 3,
        timeout: 15000,
    });
    if (!response) {
        return {
            text: T_NA,
            background: C_NA,
        };
    }
    if (response.statusCode == 404) {
        return {
            text: T_UNL,
            background: C_UNL,
        };
    }
	else if (response.statusCode == 403) {
        return {
            text: T_FAIL,
            background: C_FAIL,
        };
    }
    else {
        return {
            text: T_UNK,
            background: C_UNK,
        };
    }
}
