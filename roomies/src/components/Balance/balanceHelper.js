/* get balance value for user with Id */
export function getMyBalance(balanceList, userId) {
  const balanceObj = balanceList
    ? balanceList.filter((blItem) => blItem._id === userId)
    : undefined;
  const myBalance =
    balanceObj && balanceObj.length > 0 ? balanceObj[0].totalBalance : 0;
  return myBalance;
}
