export const filterRules = ({values,value,name,type}) => {
    let types = {
        string: values.filter(v => v[name]).filter( v=> v[name].toLowerCase().indexOf(value.toLowerCase()) !== -1),
        text: values.filter(v => v[name]).filter( v=> v[name].toLowerCase().indexOf(value.toLowerCase()) !== -1)
    }[type]
    types = types || values
    return types
}