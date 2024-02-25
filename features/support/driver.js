const {By} = require('selenium-webdriver')

class DriverMethods{
    constructor(){

    }

    async LoadAUrl(driver, url){
        await driver.get(url)
    }

    async TypeText(driver, locator, element, text){
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

    async ClickButton(driver, locator, element, text){
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

    async GetTextFromElement(driver, locator, element){
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

    async GetListOfElements(driver, locator, element){
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
    async ElementVisibleOrNot(driver, element){
        const status = await driver.findElements(By.id(element))
        if (Object.keys(status).length == 0){
            return true
        }
        else{
            return false 
        }
    }
}

module.exports = new DriverMethods()








