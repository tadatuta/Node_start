function myPow(base,exponent){
    var resault=0;

    if(isNumeric(base)&&isNumeric(exponent)){
        if (base == 0){
            if (exponent < 0){
                return Infinity
            } else if (exponent == 0){
                return 1;
            } else return 0
        }else if (exponent==0){
            return 1;
        }else{
            resault = Math.exp(exponent*Math.log(Math.abs(base))).toFixed(14);
            if (base<0){
                if(exponent%2 != 0){
                    resault *= -1;
                }
            }
            return resault;
        }
    }else return "NaN"
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = myPow;