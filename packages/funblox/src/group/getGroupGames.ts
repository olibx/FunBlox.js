/* eslint-disable max-len */

import { games } from "../api"
import type { GroupGamesAPIResponse } from "../utils/APITypes";

type GroupGame = {
  id: number,
  name: string,

}

export default function getGroupGames(groupId: string | number): Promise<GroupGame[]> {
  return new Promise(async (resolve, reject) => {
    const finishedData = [];
    const gamesInGroupData = games.get(`v2/groups/${groupId}/games`)
    const gamesInGroup: GroupGamesAPIResponse = JSON.parse(JSON.stringify(gamesInGroupData))
    gamesInGroup.data.forEach(game => {
      finishedData.push({ id: game.id, name: game.name, description: game.description, placeVisits: game.placeVisits })
    });
    resolve(finishedData);
  })
}