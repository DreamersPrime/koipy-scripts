// @name: Wikipedia 编辑权限
// @description: 检测 Wikipedia 编辑权限是否已解锁
// @regions: global
// @tags: scholar

const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';

const T_NA = 'N/A';
const T_UNK = '未知';
const T_ALLOW = '允许';
const T_BLOCK = '阻止';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

function handler() {
    var content = fetch("https://en.wikipedia.org/w/index.php?title=Wikipedia:WikiProject_on_open_proxies&action=edit", {
        headers: {
            UA_WINDOWS,
        },
        noRedir: false,
        retry: 3,
        timeout: 5000,
    });
    if (!content) {
        return {
            text: T_NA,
            background: C_NA,
        };
    }
    else if (content.statusCode === 200) {
        var resData = content.body;
        var index = resData.indexOf("This IP address has been");
        if (index > -1) {
            return {
                text: T_BLOCK,
                background: C_FAIL,
            };
        }
        else {
            return {
                text: T_ALLOW,
                background: C_UNL,
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
