// This function will accept a bunch of elements (Names), then puts them into a list and returns it

exports.NamesFromList = async function(Names){

    RawNames = []
    
    i = 0
    while(i < Names.length){
        RawNames.push(await Names[i].getText())
        i = i+1
        }
    
        return RawNames    
    }

exports.WaitForFewSeconds = async function(TimeToWait){
    await new Promise(r => setTimeout(() => r(), TimeToWait))
}    