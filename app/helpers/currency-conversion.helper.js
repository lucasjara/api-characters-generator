let _currencyFactoryCLP;
class CurrencyConversionHelper{

    constructor(){
        this._getFactorTodayUSD();
    }

    conversionClpToUsd(amount){
        var result = amount / _currencyFactoryCLP;
        return result.toFixed(2);
    }

    getCurrencyFactor(){
        // TODO: On return currency considerate initial country currency  
        return _currencyFactoryCLP;
    }

    _getFactorTodayUSD(){
        //TODO: Connection db for get factor on conversion

        _currencyFactoryCLP = 779.10;
        console.log("💰  currency factor CLP is: " + _currencyFactoryCLP);
    }

}

module.exports = CurrencyConversionHelper;
  
  