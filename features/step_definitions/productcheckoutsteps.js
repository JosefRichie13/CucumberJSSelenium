const {When, Then} = require('@cucumber/cucumber');
const {assert} = require('chai')
const selectors = require('../support/selectors')
const DriverMethods = require('../support/driver.js');

When('I add {string} to the cart', async function(Product){
    addOrRemoveFromCart(Product)
})

When('I remove {string} from the cart', async function(Product){
    addOrRemoveFromCart(Product)
})

function addOrRemoveFromCart(Product){
    switch(Product){
        case "Sauce Labs Backpack":
            DriverMethods.ClickButton("css", selectors.ProductBackpack)
            break
        case "Sauce Labs Bike Light":
            DriverMethods.ClickButton("css", selectors.ProductBikelight)
            break
        case "Sauce Labs Bolt T-Shirt":
            DriverMethods.ClickButton("css", selectors.ProductTshirt)
            break
        case "Sauce Labs Fleece Jacket":
            DriverMethods.ClickButton("css", selectors.ProductJacket)
            break
        case "Sauce Labs Onesie":       
            DriverMethods.ClickButton("css", selectors.ProductOnesie)
            break
        case "Test.allTheThings() T-Shirt (Red)":
            DriverMethods.ClickButton("css", selectors.ProductTshirtRed)
            break
        default :
            throw new IllegalStateException     
    }

}

When('I click on the cart', async function(){
    await DriverMethods.ClickButton("className", selectors.Cart)
})

When('I checkout', async function(){
    await DriverMethods.ClickButton("id", selectors.Checkout)
})

When('I enter my information to continue', async function(table){

    const UserDetails = table.hashes()

    await DriverMethods.TypeText("id", selectors.FirstName, UserDetails[0]['FirstName'])
    await DriverMethods.TypeText("id", selectors.LastName, UserDetails[0]['LastName'])
    await DriverMethods.TypeText("id", selectors.ZipCode, UserDetails[0]['Zip'])

    await DriverMethods.ClickButton("id", selectors.ContinueButton)
})

When('I confirm my order', async function(){
    await DriverMethods.ClickButton("id", selectors.FinishButton)
})

Then('I should see {string} after the order is placed', async function(Message){
    assert.equal(await DriverMethods.GetTextFromElement("className", selectors.CheckoutBanner), Message)
})

/*
We get the Tax shown in the UI, extract the number, convert it into float and store it in a variable, taxCalculatedByAPP
We get the non taxed sum shown in the UI, extract the number, convert into float, multiple it by 0.08 (8%), round the result off to 2 and store it in a variable, taxCalculatedByCODE
Then we check if both taxCalculatedByAPP and taxCalculatedByCODE are equal

We get the total shown in the UI, extract the number, convert it into float and store it in a variable, totalCalculatedByAPP
We get the non tax added total shown in the UI, extract the number, convert into float, add the tax calculated (taxCalculatedByCODE) and store it in a variable, totalCalculatedByCODE
Then we check if both totalCalculatedByAPP and totalCalculatedByCODE are equal
*/
Then('I should see the tax calculated at 8 percent', async function() {

    taxCalculatedByAPP = parseFloat((await DriverMethods.GetTextFromElement("className", selectors.TaxCalculated)).replace(/[^0-9\-+\.]/g, "")).toFixed(2)
    taxCalculatedByCODE = ((parseFloat((await DriverMethods.GetTextFromElement("className", selectors.Subtotal)).replace(/[^0-9\-+\.]/g, "")).toFixed(2))*0.08).toFixed(2)
    assert.equal(taxCalculatedByAPP, taxCalculatedByCODE)

    totalCalculatedByAPP = parseFloat((await DriverMethods.GetTextFromElement("css", selectors.FullTotal)).replace(/[^0-9\-+\.]/g, ""))
    totalCalculatedByCODE = parseFloat((await DriverMethods.GetTextFromElement("className", selectors.Subtotal)).replace(/[^0-9\-+\.]/g, "")) + parseFloat(taxCalculatedByCODE)
    assert.equal(totalCalculatedByAPP, totalCalculatedByCODE)

})

Then('I should see the individual items total correctly', async function() {
    individualPrices = await DriverMethods.GetTextFromListOfElements("className", selectors.PriceList)
    individualPricesInFloatWithoutSign = individualPrices.map(price => parseFloat(price.substring(1)));
    sumCalculatedByCODE = individualPricesInFloatWithoutSign.reduce((partialSum, a) => partialSum + a, 0);

    sumCalculatedByAPP = parseFloat((await DriverMethods.GetTextFromElement("className", selectors.Subtotal)).replace(/[^0-9\-+\.]/g, ""))

    assert.equal(sumCalculatedByCODE, sumCalculatedByAPP)
})