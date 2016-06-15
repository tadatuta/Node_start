function myPow(base,exponent){
    
    var resault=0;

    if(!(isNumeric(base)&&isNumeric(exponent))) return NaN;

    if (base == 0){
        if (exponent < 0){
            return Infinity
        }

        if (exponent == 0){
            return 1;
        }

        return 0;
    }

    if (exponent==0){
        return 1;
    }

    var resault = Math.exp(exponent*Math.log(Math.abs(base))).toFixed(14);
    if (base<0 && exponent%2 != 0){
        resault *= -1;
    }

    return resault;
    
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = myPow;