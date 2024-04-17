const {Given, When, Then} = require('@cucumber/cucumber');
const {assert, expect} = require('chai')
const configs = require('../support/configs.js')
const selectors = require('../support/selectors.js')
const HelperMethods = require('../support/methods.js')
const DriverMethods = require('../support/driver.js')

Given('I confirm that the footer is {string}', async function(visibleStatus){
    if (visibleStatus == "not visible") {
        assert.equal(await DriverMethods.ElementVisibleOrNot("className", selectors.Footer), true)
    }
    else {
        assert.equal(await DriverMethods.ElementVisibleOrNot("className", selectors.Footer), false)
    }
})

Then('I click on the {string} icon in the footer', async function(footerIcon){
    switch(footerIcon){
        case "Twitter":
            await DriverMethods.ClickButton("className", selectors.Footer_Twitter)
            break
        case "Facebook":
            await DriverMethods.ClickButton("className", selectors.Footer_FB)
            break
        case "LinkedIn":
            await DriverMethods.ClickButton("className", selectors.Footer_Linkedin)
            break
        default :
            throw new IllegalStateException     
    }
})

Then('I should see the {string} page opened with the URL as {string}', async function(redirectPage, redirectURL){
    switch(redirectPage){
        case "Twitter":
            await DriverMethods.SwitchBetweenTabs(1);
            assert.equal(await DriverMethods.GetTheCurrentURL(), redirectURL);
            await DriverMethods.SwitchBetweenTabs(0);
            break
        case "Facebook":
            await DriverMethods.SwitchBetweenTabs(2);
            assert.equal(await DriverMethods.GetTheCurrentURL(), redirectURL);
            await DriverMethods.SwitchBetweenTabs(0);
            break
        case "LinkedIn":
            await DriverMethods.SwitchBetweenTabs(3);
            assert.equal(await DriverMethods.GetTheCurrentURL(), redirectURL);
            await DriverMethods.SwitchBetweenTabs(0);
            break
        default :
            throw new IllegalStateException     
    }
})