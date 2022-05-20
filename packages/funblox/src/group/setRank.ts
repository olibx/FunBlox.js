/* eslint-disable max-len */
import { groups } from '../api';
import getGroupRank from '../user/getUserRank';
import cookieJar from '../utils/jar';


/**
 * **setRank**
 * @param {number } groupid
 * @param { number } user
 * @param { number } newrank
 * @return {Promise<Object>}
 */
export default function setRank(groupid: number, user: number, newrank: number): Promise<Object> {
  return new Promise(async (resolve, reject) => {
    if (typeof groupid == 'number' && typeof user == 'number' && typeof newrank == 'number') {
      const userRank = await getGroupRank(groupid, user);
      const data = { roleId: newrank };

      await groups.patch(`v1/groups/${groupid}/users/${user}`, {
        cookieJar, json: data,
      }).then(function() {
        resolve({ oldRank: userRank, newRank: newrank });
      }).catch(function(err) {
        reject(err);
      });
    } else {
      reject(new TypeError('All the parameters in this function should be numeric, please check your parameters'));
    }
  });
}