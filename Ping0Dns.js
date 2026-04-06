const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36';

const failed = {
    text: '失败',
    background: '239,107,115',
};

const successBackground = '186,230,126';

function handler() {
    const response = fetch('https://ping0.cc/geo', {
        headers: {
            'User-Agent': UA,
        },
    });

    if (!response || response.statusCode !== 200) {
        return failed;
    }

    const data = response.body.split('\n');
    const asLine = data.find(line => line.startsWith('AS'));

    if (asLine) {
        return {
            text: asLine.trim(),
            background: successBackground,
        };
    } else {
        return failed;
    }
}
