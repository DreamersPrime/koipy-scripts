// 测速劫持检测脚本，需要miaospeed版本至少 4.6.3 以上
const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';
const MS_MATRIX_ENTRY = {
    name: "TEST_HIJACK_DETECTION", // MatrixType 数据矩阵名称，对应的macro会自动被调用
    params: "劫持检测", // 可能的参数
}
// 提取 matrix 数据，macroResult是对应的macro运行结果，其数据结构参阅源码，或者你可以用js遍历出来它的属性
function matrix_extract(macroResult) {
    // 检查 macroResult 是否为对象
    if (!macroResult || typeof macroResult !== "object") {
        return {
            text: "无效数据",
            background: C_NA
        };
    }
    // 提取 speedIP 和 realIP（防止 null / undefined）
    var speedIP = macroResult.SpeedIP;
    //print("speedIP: " + speedIP);
    var realIP = macroResult.RealIP;
    //print("realIP: " + realIP);
    if (!speedIP || !realIP || speedIP === undefined || realIP === undefined || speedIP === null || realIP === null) {
        return {
            text: "N/A",
            background: C_NA
        };
    }
    // 若不一致 → 被劫持
    if (speedIP !== realIP) {
        return {
            text: "❌被劫持",
            background: C_FAIL
        };
    }
    return {
        text: "✅未劫持",
        background: C_UNL
    };
}

//function matrix_extract(matrixResult) {
//    let retn = [matrixResult.SpeedIP, matrixResult.RealIP];
//    // print(retn.SpeedIP + " " + retn.RealIP); 想看看返回值就自己加上
//    if (retn[0] === "" || retn[1] === "") {
//        return {
//            text: "检测失败",
//            background: C_NA
//        };
//    }else{
//        if (retn[0] !== retn[1]) {
//            return {
//                text: "❌被劫持",
//                background: C_FAIL
//            };
//        }else{
//            return {
//                text: "✅未劫持",
//                background: C_UNL
//            };
//        }
//    }
//}