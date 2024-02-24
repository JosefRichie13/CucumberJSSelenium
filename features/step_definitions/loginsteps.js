const {Given, When, Then} = require('@cucumber/cucumber');
const {assert, expect} = require('chai')
const configs = require('../support/configs.js')
const selectors = require('../support/selectors.js')
const HelperMethods = require('../support/methods.js')
const DriverMethods = require('../support/driver.js')

Given('I open the web page', async function(){
    await DriverMethods.LoadAUrl(this.driver, configs.MainURL)
})

When('I login as a {string} user', async function(UserType){
    switch(UserType){
        case "standard":
            await DriverMethods.TypeText(this.driver, "id", selectors.UserName, configs.ValidUser)
            await DriverMethods.TypeText(this.driver, "id", selectors.Password, configs.Password)
            break
        case "locked":
            await DriverMethods.TypeText(this.driver, "id", selectors.UserName, configs.LockedUser)
            await DriverMethods.TypeText(this.driver, "id", selectors.Password, configs.Password)
            break
        case "no_username":
            await DriverMethods.TypeText(this.driver, "id", selectors.Password, configs.Password)
            break
        case "no_password":
            await DriverMethods.TypeText(this.driver, "id", selectors.UserName, configs.ValidUser)
            break
        case "wrong_username":       
            await DriverMethods.TypeText(this.driver, "id", selectors.UserName, configs.WrongUser)
            await DriverMethods.TypeText(this.driver, "id", selectors.Password, configs.Password)
            break
        case "wrong_password":
            await DriverMethods.TypeText(this.driver, "id", selectors.UserName, configs.ValidUser)
            await DriverMethods.TypeText(this.driver, "id", selectors.Password, configs.WrongPassword)
            break
        default :
            console.log("Incorrect Usertype")       
    }
    await DriverMethods.ClickButton(this.driver, "id", selectors.LoginButton)
})

Then('I should see {string} in the {string}', async function(Message, Page){
    switch(Page){
        case "homepage":
            assert.equal(await DriverMethods.GetTextFromElement(this.driver, "classname", selectors.HomePageTitle), Message)
            assert.equal(await DriverMethods.ElementVisibleOrNot(this.driver, selectors.LoginButton), true)
            break;
        case "loginpage":
            assert.equal(await DriverMethods.GetTextFromElement(this.driver, "classname", selectors.LoginPageTitle), Message)
            assert.equal(await DriverMethods.ElementVisibleOrNot(this.driver, selectors.LoginButton), false)
            break
        default : 
            console.log("Incorrect page")    
    }
})

Then('I should see the login error message {string}', async function(Message){
    expect(await DriverMethods.GetTextFromElement(this.driver, "css", selectors.ErrorMessage)).to.contain(Message)
})

Then('I logout of the webpage', async function(){
    await DriverMethods.ClickButton(this.driver, "id", selectors.Menu)
    await HelperMethods.WaitForFewSeconds(5000)
    await DriverMethods.ClickButton(this.driver, "id", selectors.LogoutButton)
})