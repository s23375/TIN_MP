export const menuProductsItems = (array) => {

    let arr = []
    for(let i=0; i<array.length; i++) {
        let tempArr =
        {
            value: array[i].IDproduct,
            label: array[i].name
        }
        arr.push(tempArr)
    }

    return arr
}

