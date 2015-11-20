module.exports = function queryString( url, params ){

    Object.keys(params).map(( key, index ) => {
        if( index === 0 )
            url += '?';
        else
            url += '&';
        return url += key + '=' + params[key] ;
    });
    return url;
};