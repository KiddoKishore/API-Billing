const processData = (data, client, removeDuplicate, apiUserCount) => {
  const appId = data.appid;
  const transaction_id = data.transaction_id;
  const api = data.originalurl;

  // Charging 200 and 422 response only
  if (data.statuscode == 200 || data.statuscode == 422) {
    // Check if the appId exists in the client object
    if (!client[appId]) {
      client[appId] = []; // Initialize array if not exists
    }
    // Create a unique key using appId, transaction_id, and api
    const uniqueKey = `${appId}-${transaction_id}-${api}`;

    // Remove the Duplicate values using transition_id, api Url and App id
    if (!removeDuplicate.has(uniqueKey)) {
      removeDuplicate.add(uniqueKey);
      client[appId].push(data); // Push data to array

      if (!apiUserCount[appId]) {
        apiUserCount[appId] = {};
      }

      if (!apiUserCount[appId][api]) {
        apiUserCount[appId][api] = 1;
      } else {
        apiUserCount[appId][api]++;
      }
    }
  }
};

export default processData;