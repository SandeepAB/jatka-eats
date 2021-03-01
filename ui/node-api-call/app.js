const rp = require('request-promise')

function make_api_call(id) {
    return rp({
        url: `https://c0hbs142.caspio.com/rest/v2/tables/loadtable/records`,
        method: 'POST',
        json: true,
        headers: {
            'Authorization': 'Bearer SfTN-gBKW6ZoooLqC0_2OrsBiHI9W8axTICkEehO3_ZarG-KH0JoAizyohPfKf3pIoTof8xAi4I2g0S97ubcdHwjZFDc9WTRheZdQPGYlemNgeg--d3LJX4h7y7O0xRmFmTBRUdCqF2wbM-AkbRRf8lzImJFMsJt6D2UGGNNVmhkTq2xIMIhLaLZdLaWtZDqg40JKSRcq4K03CfGX5JQJIiIr23dwwaEftnlw_ZYTJ-QH9zZnDufjMHQ2RqxIzSOY20NdmGBIMOpoiN-BIn-WDFdE-2k0W5eDlk5kdrrCHLZTsXyoHlvYBOqy2z0McQkSPTzLnLbZdUWGJm3yBhMKvRF07yb4XDd2DtwHtA2xdTrPp4UbD5LW-CCL0hEc6fh'
        },
        body: { "userid": "abc" + id, "sentitmems": 123, "insertedtimems": 123 }
    })
}

async function processUsers() {
    try {
        for (let i = 812; i < 1000; i++) {
            result = await make_api_call(i);
            console.log(result)
        }
    }
    catch (err) {
        console.log(err)
    }
}

processUsers();