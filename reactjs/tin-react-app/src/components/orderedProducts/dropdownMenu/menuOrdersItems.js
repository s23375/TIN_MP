export const menuOrdersItems = (array) => {

    let arr = []
    for(let i=0; i<array.length; i++) {
        let tempArr =
            {
                value: array[i].IDorder,
                label: array[i].IDorder + " - " + array[i].clientContactInfo
            }
        arr.push(tempArr)
    }

    return arr
}

