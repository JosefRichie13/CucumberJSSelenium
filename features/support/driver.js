const {By} = require('selenium-webdriver')

exports.LoadAUrl = async function(driver, url){
    await driver.get(url)
}

exports.TypeText = async function(driver, locator, element, text){
    switch(locator){
        case "id": 
            await driver.findElement(By.id(element)).sendKeys(text)
            break
        case "css": 
            await driver.findElement(By.css(element)).sendKeys(text)
            break
        case "classname": 
            await driver.findElement(By.className(element)).sendKeys(text)
            break
        default:
            console.log("Unsupported Locator")
    }
}

exports.ClickButton = async function(driver, locator, element){
    switch(locator){
        case "id": 
            await driver.findElement(By.id(element)).click()
            break
        case "css": 
            await driver.findElement(By.css(element)).click()
            break
        case "classname": 
            await driver.findElement(By.className(element)).click()
            break
        default:
            console.log("Unsupported Locator")
    }
}

exports.GetTextFromElement = async function(driver, locator, element){
    switch(locator){
        case "id": 
            return await driver.findElement(By.id(element)).getText()
        case "css": 
            return await driver.findElement(By.css(element)).getText()
        case "classname": 
            return await driver.findElement(By.className(element)).getText()
        default:
            console.log("Unsupported Locator")
    }
}

exports.GetListOfElements = async function(driver, locator, element){
    switch(locator){
        case "id":
            return await driver.findElements(By.id(element))
        case "css":
            return await driver.findElements(By.css(element))
        case "classname":
            return await driver.findElements(By.className(element))    
        default:
            console.log("Unsupported Locator")            
    }
}

// Checks if an element is present in the DOM or not
// If yes, it returns TRUE
// If no, it returns FALSE
exports.ElementVisibleOrNot = async function(driver, element){
    const status = await driver.findElements(By.id(element))
    if (Object.keys(status).length == 0){
        return true
    }
    else{
        return false 
    }
}