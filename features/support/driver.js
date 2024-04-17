const {By, Select} = require('selenium-webdriver')

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

    async SelectFromDropdownUsingText(locator, element, selectOptionInText){
        const selectElement = await browser.findElement(By[locator](element))
        const select = new Select(selectElement)
        await select.selectByVisibleText(selectOptionInText)
    }


    async GetTextFromListOfElements(locator, element){
        const listOfElements = await browser.findElements(By[locator](element))
        const listOfText = []
        let i = 0
        while (i < listOfElements.length){
            listOfText.push(await listOfElements[i].getText())
            i ++
        }
        return listOfText
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








