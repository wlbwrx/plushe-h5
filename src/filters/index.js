let pricesFilter = (value)=>(value/100).toFixed(2).replace(/\d{1,3}(?=(\d{3})+\b)/g, '$&,')

export default { 
    pricesFilter
 }