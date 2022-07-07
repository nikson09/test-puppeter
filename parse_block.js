const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    {name: 'url', alias: 'u', type: String}
];
const screenArguments = commandLineArgs(optionDefinitions);
setTimeout(function () {
    process.exit();
}, 120000);

async function parse(target_url) {
    const arguments = [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        '--lang="en-US"'
    ];
    const options = {
        args: arguments,
        headless: true,
        ignoreHTTPSErrors: true,
    };
    try {
        const browser = await puppeteer.launch(options);
        const page = await browser.newPage();

        page.on('response', async(response) => {
            if (response.request().resourceType() == 'xhr' && response.request().url() == 'https://dev.amidstyle.com/api.php') {
                const text = await response.text();
                console.log(text);
                browser.close()
                process.exit();
            }
        })

        await page.goto(target_url, {waitUntil: ['networkidle2', 'domcontentloaded'], timeout: 60000});

        setTimeout(function () {
            browser.close()
            process.exit();
        }, 10000);

    } catch (e) {
        console.log(e);
        process.exit();
    }
}

parse(screenArguments.url);
