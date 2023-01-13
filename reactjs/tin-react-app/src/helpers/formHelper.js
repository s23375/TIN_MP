const formMode = {
    NEW: "NEW",
    EDIT: "EDIT"
}

export const formValidationKeys = {
    notEmpty: "notEmpty",
    isInt: "isInt",
    isUniqueName: "isUniqueName",
    isAlpha: "isAlpha",
    len_2_60: "len_2_60",
    len_1_11: "len_1_11",
    isDecimal: "isDecimal",
    isPositive: "isPositive",
    isDate: "isDate",
    endDistributionDate: "endDistributionDate"
}

export function getValidationErrorKey(error) {
    if(error) {
        return `validation.messages.${error}`
    } else {
        return ""
    }
}

export default formMode