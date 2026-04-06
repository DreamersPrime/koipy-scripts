// @name: 爱奇艺国际版
// @description: 检测 iQiyi Global 在当前地区是否可用
// @regions: global
// @tags: stream, video

const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_UNK = '92,207,230';

const T_NA = 'N/A';
const T_UNL = '解锁';
const T_UNK = '未知';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

function handler() {
    const response = fetch("https://www.iq.com/?lang=en_us", {
        headers: {
            "User-Agent": UA_WINDOWS,
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
        let info = response.body;
        var index = info.indexOf("intlPageInfo.pbInfos = {");
        if (index > 0) {
            var sinfo = info.substring(index, index + 110);
            var index2 = sinfo.indexOf("mod:");
            var sinfo2 = sinfo.substring(index2 + 98);
            var r = sinfo2.split('"');
            var region = r[0] ? r[0] : "NOT FOUND";
            if (region == "ntw") {
                region = "TW";
            }
            else if (region == "intl") {
                region = "国际";
            }
            else {
                region = region.toUpperCase();
            }
            return {
                text: `${T_UNL}(${region})`,
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
    else {
        return {
            text: T_UNK,
            background: C_UNK,
        };
    }
}

module.exports = handler;
