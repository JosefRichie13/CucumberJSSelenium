const {By} = require('selenium-webdriver')

class DriverMethods{
    constructor(){

    }

    async LoadAUrl(url){
        await browser.get(url)
    }

    async TypeText(locator, element, text){
        await browser.findElement(By[locator](element)).sendKeys(text)
    }

    async ClickButton(locator, element){
        await browser.findElement(By[locator](element)).click()
    }

    async GetTextFromElement(locator, element){
        return await browser.findElement(By[locator](element)).getText()
    }


    async GetListOfElements(locator, element){
        return await browser.findElements(By[locator](element))
    }


    // Checks if an element is present in the DOM or not
    // Returns TRUE if element is NOT visible, which means the size will be 0
    // Returns FALSE if element is visible, which means the size will be greater than 0
    async ElementVisibleOrNot(locator, element){
        const status = await browser.findElements(By[locator](element))
        if (Object.keys(status).length == 0){
            return true
        }
        else{
            return false 
        }
    }
}

module.exports = new DriverMethods()








