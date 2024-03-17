const {By} = require('selenium-webdriver')

class DriverMethods{
    constructor(){

    }

    async LoadAUrl(url){
        await browser.get(url)
    }

    async TypeText(locator, element, text){
        switch(locator){
            case "id": 
                await browser.findElement(By.id(element)).sendKeys(text)
                break
            case "css": 
                await browser.findElement(By.css(element)).sendKeys(text)
                break
            case "classname": 
                await browser.findElement(By.className(element)).sendKeys(text)
                break
            default:
                console.log("Unsupported Locator")
        }
    }

    async ClickButton(locator, element, text){
        switch(locator){
            case "id": 
                await browser.findElement(By.id(element)).click()
                break
            case "css": 
                await browser.findElement(By.css(element)).click()
                break
            case "classname": 
                await browser.findElement(By.className(element)).click()
                break
            default:
                console.log("Unsupported Locator")
        }
    }

    async GetTextFromElement(locator, element){
        switch(locator){
            case "id": 
                return await browser.findElement(By.id(element)).getText()
            case "css": 
                return await browser.findElement(By.css(element)).getText()
            case "classname": 
                return await browser.findElement(By.className(element)).getText()
            default:
                console.log("Unsupported Locator")
        }
    }

    async GetListOfElements(locator, element){
        switch(locator){
            case "id":
                return await browser.findElements(By.id(element))
            case "css":
                return await browser.findElements(By.css(element))
            case "classname":
                return await browser.findElements(By.className(element))    
            default:
                console.log("Unsupported Locator")            
        }
    }

    // Checks if an element is present in the DOM or not
    // Returns TRUE if element is NOT visible, which means the size will be 0
    // Returns FALSE if element is visible, which means the size will be greater than 0
    async ElementVisibleOrNot(element){
        const status = await browser.findElements(By.id(element))
        if (Object.keys(status).length == 0){
            return true
        }
        else{
            return false 
        }
    }
}

module.exports = new DriverMethods()








