// @name: LiTV
// @description: 检测 LiTV 解锁状态
// @regions: tw
// @tags: stream, video, live

const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';

const T_UNL = '解锁';
const T_FAIL = '失败';
const M_NETWORK = '网络';

const UA_WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

function handler() {
    const response = fetch("https://www.litv.tv/api/get-urls-no-auth", {
        method: "POST",
        body: JSON.stringify({
            AssetId: "vod71211-000001M001_1500K",
            MediaType: "vod",
            puid: "d66267c2-9c52-4b32-91b4-3e482943fe7e",
        }),
        headers: {
            "Content-Type": "application/json",
            Origin: "https://www.litv.tv",
            Referer: "https://www.litv.tv/drama/watch/VOD00331042",
            Priority: "u=1, i",
            "User-Agent": UA_WINDOWS,
        },
        cookies: {
            PUID: "34eb9a17-8834-4f83-855c-69382fd656fa",
            L_PUID: "34eb9a17-8834-4f83-855c-69382fd656fa",
            "device-id": "f4d7faefc54f476bb2e7e27b7482469a",
        },
        noRedir: false,
        retry: 3,
        timeout: 15000,
    });
    if (!response || response.statusCode !== 200) {
        return {
            text: `${T_FAIL}(${M_NETWORK})`,
            background: C_FAIL,
        };
    }
    const body = response.body;
    if (body.indexOf("OutsideRegionError") > -1) {
        return {
            text: T_FAIL,
            background: C_FAIL,
        };
    }
    else {
        return {
            text: T_UNL,
            background: C_UNL,
        };
    }
}

module.exports = handler;
