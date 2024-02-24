const {When, Then} = require('@cucumber/cucumber');
const {assert} = require('chai')
const selectors = require('../support/selectors')
const HelperMethods = require('../support/methods.js')
const DriverMethods = require('../support/driver.js')

When('I add {string} to the cart', async function(Product){
    Names = await DriverMethods.GetListOfElements(this.driver, "classname", selectors.ProductList)
    NamesFromUI = await HelperMethods.NamesFromList(Names)

    Index = NamesFromUI.indexOf(Product)
    const ElementToBeClicked = await DriverMethods.GetListOfElements(this.driver, "css", selectors.AddToCart)
    const IndexOfElement = await ElementToBeClicked[Index]
    IndexOfElement.click()
})

When('I click on the cart', async function(){
    await DriverMethods.ClickButton(this.driver, "classname", selectors.Cart)
})

When('I checkout', async function(){
    await DriverMethods.ClickButton(this.driver, "id", selectors.Checkout)
})

When('I enter my information to continue', async function(table){

    const UserDetails = table.hashes()

    await DriverMethods.TypeText(this.driver, "id", selectors.FirstName, UserDetails[0]['FirstName'])
    await DriverMethods.TypeText(this.driver, "id", selectors.LastName, UserDetails[0]['LastName'])
    await DriverMethods.TypeText(this.driver, "id", selectors.ZipCode, UserDetails[0]['Zip'])

    await DriverMethods.ClickButton(this.driver, "id", selectors.ContinueButton)
})

When('I confirm my order', async function(){
    await DriverMethods.ClickButton(this.driver, "id", selectors.FinishButton)
})

Then('I should see {string} after the order is placed', async function(Message){
    assert.equal(await DriverMethods.GetTextFromElement(this.driver, "classname", selectors.CheckoutBanner), Message)
})