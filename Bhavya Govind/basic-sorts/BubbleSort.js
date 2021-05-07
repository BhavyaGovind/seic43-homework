function bubbleSort(array) {
  let needToIterate = true;

  let end = array.length - 1;
  while(needToIterate === true){
    needToIterate = false;
    for(let i = 0; i < end; i++){
      if(array[i] > array [i+ 1]){
        //swapping the values fancy syntax
        [array[i], array[i+1]] = [array[i+1], array[i]];
        needToIterate = true;
      }
    }
  }
    return array;
}

module.exports = bubbleSort;
