export default function calculateRankings(players) {
  // Sắp xếp người chơi dựa trên score (cao đến thấp) và isAFK (false trước)
  players.sort((a, b) => {
    if (a.isAFK && !b.isAFK) return 1;
    if (!a.isAFK && b.isAFK) return -1;
    return b.score - a.score;
  });

  // Gán phần thưởng cho từng người chơi dựa trên thứ hạng
  const rankedPlayers = [];
  let currentRank = 1;
  for (let i = 0; i < players.length; i++) {
    const player = players[i];

    if (player.isAFK) {
      rankedPlayers.push({
        ...player,
        top: currentRank.toString(),
        isAFK: player.isAFK,
      });
    } else {
      rankedPlayers.push({
        ...player,
        top: currentRank.toString(),
        isAFK: player.isAFK,
      });
    }

    // Kiểm tra nếu điểm của người chơi tiếp theo bằng với người chơi hiện tại
    if (i < players.length - 1 && players[i].score !== players[i + 1].score) {
      currentRank++;
    }
  }

  return { listPlayer: rankedPlayers };
}

// Example input
// const players = [
//   {
//     id: 'fYqsewSImjcZWlGxAAAH',
//     playerId: 30,
//     name: 'Tien',
//     rank: {},
//     level: 0,
//     currentAvatar: 'https://res.cloudinary.com/dbfftqigf/image/upload/v1719194745/avatar-trang-2_byptft.jpg',
//     isReady: true,
//     score: 200,
//     isAFK: false
//   },
//   {
//     id: 'st1HVIzYQzXAwfBMAAAJ',
//     playerId: 29,
//     name: 'Toan',
//     rank: {},
//     level: 0,
//     currentAvatar: 'https://res.cloudinary.com/dbfftqigf/image/upload/v1719194745/avatar-trang-2_byptft.jpg',
//     isReady: true,
//     score: 0,
//     isAFK: true
//   },
//   {
//     id: 'st1mmmzYQzeewfBMAAAJ',
//     playerId: 50,
//     name: 'Tuan',
//     rank: {},
//     level: 0,
//     currentAvatar: 'https://res.cloudinary.com/dbfftqigf/image/upload/v1719194745/avatar-trang-2_byptft.jpg',
//     isReady: true,
//     score: 0,
//     isAFK: true
//   }
// ];

// // // Example output
// const output = calculateRankings(players);
// console.log(output);
