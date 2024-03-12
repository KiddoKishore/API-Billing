const calculateRate = (count, apiName, api) => {
  const apiData = api[apiName];
  let numberOfCustomer = count;
  let totalPrice = 0;
  // Iterate through the apiData object for get the charge amount
  Object.keys(apiData).forEach((api) => {
    const NumberOfCount = parseInt(api); // Make this Object Key String into Number

    if (numberOfCustomer >= NumberOfCount) {
      totalPrice += NumberOfCount * apiData[api]; // Multiple
      numberOfCustomer -= NumberOfCount;
    } else {
      totalPrice += numberOfCustomer * apiData[api];
      numberOfCustomer -= numberOfCustomer;
    }
    // console.log(totalPrice)
  });
  return totalPrice;
};

export default calculateRate;
