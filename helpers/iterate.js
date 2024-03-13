import calculateRate from "./calculate.js";

const IterateData = (apiUserCount,finalResult,api) => {
    // Iterate through the apiUserCount object for client Id
    Object.keys(apiUserCount).forEach((app) => {
        console.log("For Client ID", app);
        if (!finalResult.app) {
          finalResult[app] = {};
        }
        let grandTotal = 0;
        // Iterate through the Api Name object for api url
        Object.keys(apiUserCount[app]).forEach((apiName) => {
          console.log(
            `Total Number of Customers in ${apiName}:`,
            apiUserCount[app][apiName]
          );
          const count = apiUserCount[app][apiName];

          // if(!api['api'][apiName]){
          //   return `${apiName} is Not Found`
          // }
  
          // Call the calculateRate function to calculate the number of customers and charge amount
          const rate = calculateRate(count, apiName, api);
          finalResult[app][apiName] = {
            numberOfCustomers: apiUserCount[app][apiName],
            total: rate,
          };
          grandTotal += rate;
        });
        finalResult[app]["totalPrice"] = grandTotal;
        console.log("Total Charge Amount:", grandTotal);
      });
}

export default IterateData