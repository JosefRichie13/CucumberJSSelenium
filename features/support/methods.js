class HelperMethods{
    constructor(){

    }

    async WaitForFewSeconds(TimeToWait){
        await new Promise(r => setTimeout(() => r(), TimeToWait))
    }

    async NamesFromList(Names){
        var RawNames = []
        var i = 0
        while(i < Names.length){
            RawNames.push(await Names[i].getText())
            i = i+1
            }
        return RawNames    
    }
}

module.exports = new HelperMethods()