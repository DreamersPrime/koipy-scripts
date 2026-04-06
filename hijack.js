// 测速劫持检测脚本，需要 miaospeed 版本至少 4.6.3 以上
const C_NA   = '142,140,142';
const C_UNL  = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK  = '92,207,230';

const MS_MATRIX_ENTRY = {
    name: "TEST_HIJACK_DETECTION",
    params: "劫持检测",
};

function matrix_extract(macroResult) {
    if (!macroResult || typeof macroResult !== "object") {
        return { text: "N/A", background: C_NA };
    }

    var speedIP = macroResult.SpeedIP;
    var realIP  = macroResult.RealIP;

    if (!speedIP || !realIP ||
        typeof speedIP !== "string" || typeof realIP !== "string" ||
        speedIP.length === 0 || realIP.length === 0) {
        return { text: "N/A", background: C_NA };
    }

    speedIP = speedIP.trim().toLowerCase();
    realIP  = realIP.trim().toLowerCase();

    // 判断是否是 IPv6
    function isIPv6(ip) {
        return ip.indexOf(':') !== -1;
    }

    // 标准化 IPv6：展开缩写，统一格式
    function normalizeIPv6(ip) {
        // 去掉 IPv6 映射 IPv4 前缀 ::ffff:
        if (ip.indexOf('::ffff:') === 0) {
            return ip.slice(7); // 还原为 IPv4
        }
        // 展开 :: 缩写
        var halves = ip.split('::');
        var left  = halves[0] ? halves[0].split(':') : [];
        var right = halves.length > 1 && halves[1] ? halves[1].split(':') : [];
        var missing = 8 - left.length - right.length;
        var middle = [];
        for (var i = 0; i < missing; i++) middle.push('0000');
        var groups = left.concat(middle).concat(right);
        // 每段补齐4位
        for (var j = 0; j < groups.length; j++) {
            while (groups[j].length < 4) groups[j] = '0' + groups[j];
        }
        return groups.join(':');
    }

    // 标准化 IP（IPv4 直接返回，IPv6 展开）
    function normalizeIP(ip) {
        return isIPv6(ip) ? normalizeIPv6(ip) : ip;
    }

    var normSpeed = normalizeIP(speedIP);
    var normReal  = normalizeIP(realIP);

    // 协议族不同（一个 IPv4 一个 IPv6）→ 可能是双栈节点，标记为未知而非劫持
    if (isIPv6(speedIP) !== isIPv6(realIP)) {
        return { text: "⚠️双栈", background: C_UNK };
    }

    if (normSpeed !== normReal) {
        return { text: "❌被劫持到 " + speedIP, background: C_FAIL };
    }

    return { text: "✅未劫持", background: C_UNL };
}
