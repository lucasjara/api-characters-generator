
 /**
     * String format 
     * Using codes in to screen {0}, {1} ...
     * @param str [] string value
     * @param params [] string parametrer
     */
    const stringFormat = (str, params) => {
      if(params){
          for (let i = 0; i < params.length; i++) {
               str = str.replace('{'+ (i) +'}', params[i]);
          }
      }

      return str;
  }


module.exports =  {
  stringFormat,
};