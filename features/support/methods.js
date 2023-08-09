const {assert, expect} = require('chai')

exports.ElementNotVisible = async function(Element){
    try {
        assert.equal(await this.driver.findElement(By.id(Element)).isDisplayed(), true)
    }
    catch {
        return false  
    }
}