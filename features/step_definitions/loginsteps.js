const {Given, When, Then} = require('@cucumber/cucumber');
const {assert, expect} = require('chai')
const {By} = require('selenium-webdriver')
const configs = require('../support/configs.js')
const selectors = require('../support/selectors.js')
const HelperMethods = require('../support/methods.js')

Given('I open the web page', async function(){
    await this.driver.get(configs.MainURL)
})

When('I login as a {string} user', async function(UserType){
    switch(UserType){
        case "standard":
            await this.driver.findElement(By.id(selectors.UserName)).sendKeys(configs.ValidUser)
            await this.driver.findElement(By.id(selectors.Password)).sendKeys(configs.Password)
            break
        case "locked":
            await this.driver.findElement(By.id(selectors.UserName)).sendKeys(configs.LockedUser)
            await this.driver.findElement(By.id(selectors.Password)).sendKeys(configs.Password)
            break
        case "no_username":
            await this.driver.findElement(By.id(selectors.Password)).sendKeys(configs.Password)
            break
        case "no_password":
            await this.driver.findElement(By.id(selectors.UserName)).sendKeys(configs.ValidUser)
            break
        case "wrong_username":       
            await this.driver.findElement(By.id(selectors.UserName)).sendKeys(configs.WrongUser)
            await this.driver.findElement(By.id(selectors.Password)).sendKeys(configs.Password)
            break
        case "wrong_password":
            await this.driver.findElement(By.id(selectors.UserName)).sendKeys(configs.ValidUser)
            await this.driver.findElement(By.id(selectors.Password)).sendKeys(configs.WrongPassword)
            break
        default :
            console.log("Incorrect Usertype")       
    }
    await this.driver.findElement(By.id(selectors.LoginButton)).click()
})

Then('I should see {string} in the {string}', async function(Message, Page){
    switch(Page){
        case "homepage":
            assert.equal(await this.driver.findElement(By.className(selectors.HomePageTitle)).getText(), Message)
            assert.equal(await HelperMethods.ElementNotVisible(selectors.LoginButton), false)
            break;
        case "loginpage":
            assert.equal(await this.driver.findElement(By.className(selectors.LoginPageTitle)).getText(), Message)
            assert.equal(await this.driver.findElement(By.id(selectors.LoginButton)).isDisplayed(), true)
            break
        default : 
            console.log("Incorrect page")    
    }
})

Then('I should see the login error message {string}', async function(Message){
    expect(await this.driver.findElement(By.css(selectors.ErrorMessage)).getText()).to.contain(Message)
})

Then('I logout of the webpage', async function(){
    await this.driver.findElement(By.id(selectors.Menu)).click()
    // Sleeps for 2 seconds
    await new Promise(r => setTimeout(() => r(), 2000))
    await this.driver.findElement(By.id(selectors.LogoutButton)).click()
})