const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36';
const chars = '1234567890QWERTYUIOpqwertyuiopASDFGHJKLasdfghjklZXCVBNMzxcvbnm';

function randomHead(x) {
    let s = '';
    for (let i = 0; i < x; i++) {
        s += chars[Math.floor(chars.length * Math.random())];
    }
    return s;
}

const na = {
    text: 'N/A',
    background: '142,140,142',
};

function handler() {
    const dnsServer = fetch(`http://${randomHead(32)}.edns.ip-api.com/json`, {
        headers: {
            'User-Agent': UA,
        },
        retry: 3,
        timeout: 5000,
    });
    const dnsqRet = safeParse(get(dnsServer, "body"));
    const dnsqLoc = get(dnsqRet, "dns.ip");
    if (!dnsqLoc) {
        return na;
    }

    const dnsqInfo = fetch(`http://ip-api.com/json/${dnsqLoc}?lang=en-US&fields=status,message,countryCode,as,asname,query`, {
        headers: {
            'User-Agent': UA,
        },
    });

    const dnsRet = safeParse(get(dnsqInfo, "body"));
    const dnscountry = get(dnsRet, "countryCode", "");
    const dnsasnorg = get(dnsRet, "as", "").split(" ").shift();

    if (!dnscountry) {
        return na;
    }
  
    return `${dnsasnorg} (${dnscountry})`;
}