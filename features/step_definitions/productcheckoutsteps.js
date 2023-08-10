const {Given, When, Then} = require('@cucumber/cucumber');
const {assert, expect} = require('chai')
const selectors = require('../support/selectors')
const HelperMethods = require('../support/methods.js')
const {By, until} = require('selenium-webdriver');

When('I add {string} to the cart', async function(Product){
    Names = await this.driver.findElements(By.className(selectors.ProductList))
    NamesFromUI = await HelperMethods.NamesFromList(Names)

    Index = NamesFromUI.indexOf(Product)
    const ElementToBeClicked = await this.driver.findElements(By.css(selectors.AddToCart))
    const IndexOfElement = await ElementToBeClicked[Index]
    IndexOfElement.click()
})

When('I click on the cart', async function(){
    await this.driver.findElement(By.className(selectors.Cart)).click()
})

When('I checkout', async function(){
    await this.driver.findElement(By.id(selectors.Checkout)).click()
})

When('I enter my information to continue', async function(table){

    const UserDetails = table.hashes()

    await this.driver.findElement(By.id(selectors.FirstName)).sendKeys(UserDetails[0]['FirstName'])
    await this.driver.findElement(By.id(selectors.LastName)).sendKeys(UserDetails[0]['LastName'])
    await this.driver.findElement(By.id(selectors.ZipCode)).sendKeys(UserDetails[0]['Zip'])

    await this.driver.findElement(By.id(selectors.ContinueButton)).click()

})

When('I confirm my order', async function(){
    await this.driver.findElement(By.id(selectors.FinishButton)).click()
})

Then('I should see {string} after the order is placed', async function(Message){
    assert.equal(await this.driver.findElement(By.className(selectors.CheckoutBanner)).getText(), Message)
})