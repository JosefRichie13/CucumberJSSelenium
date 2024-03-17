const {Before, After} = require('@cucumber/cucumber')
const webdriver = require('selenium-webdriver')

// Increases the default timeout to 1 min, default is 30 sec
var {setDefaultTimeout} = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000);

Before(async function () {
    browser = await new webdriver.Builder().withCapabilities(webdriver.Capabilities.edge()).build()
})


After(async function () {

    // For taking a screenshot after scenario execution 
    var buffer = await browser.takeScreenshot()
    var world = this
    world.attach(buffer, "base64:image/png")
    
    browser.quit()
})