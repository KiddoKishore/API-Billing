const processData = (data, client, removeDuplicate, apiUserCount,api) => {
  const appId = data.appid;
  const transaction_id = data.transaction_id;
  const apiUrl = data.originalurl;

  // Charge the bill using status code
  if (api.statusCode.includes(parseInt(data.statuscode))) {
    // Check if the appId exists in the client object
    if (!client[appId]) {
      client[appId] = []; // Initialize array if not exists
    }
    // Create a unique key using appId, transaction_id, and api
    const uniqueKey = `${appId}-${transaction_id}-${apiUrl}`;

    // Remove the Duplicate values using transition_id, api Url and App id
    if (!removeDuplicate.has(uniqueKey)) {
      removeDuplicate.add(uniqueKey);
      client[appId].push(data); // Push data to array

      if (!apiUserCount[appId]) {
        apiUserCount[appId] = {};
      }

      if (!apiUserCount[appId][apiUrl]) {
        apiUserCount[appId][apiUrl] = 1;
      } else {
        apiUserCount[appId][apiUrl]++;
      }
    }
  }
};

export default processData;