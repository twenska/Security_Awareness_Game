function xInArray(array, value){
    for (i = 0; i < array.length; i++) {
        const element = array[i];
        if (element == value) {
            return true;
        };
    };
    return false;
};

module.exports = {
    xInArray: xInArray,
  };