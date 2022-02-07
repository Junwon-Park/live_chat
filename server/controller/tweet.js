import * as tweetRepository from '../model/tweet.js';
// 데이터를 사용하기 위해 모듈에서 export한 모든 메서드를 tweetRepository라는 이름으로 가져온다.

//! 여기에서 model에 정의된 메서드는 모두 async 메서드이기 때문에 Promise를 반환한다.
//! 그렇기 때문에 해당 메서드를 사용하는 미들웨어에서는 해당 메서드를 then 체이닝 또는 async/await으로 처리해야 한다.

export async function getAll(req, res) {
  const userId = req.query.userId;
  const tweetDatas = await (userId
    ? tweetRepository.getByUserId(userId)
    : tweetRepository.getAll());
  // req.query.userId가 존재하면 filter 한 데이터 배열 tweetDatas에 할당
  // userId가 없으면 트윗 전체 목록 tweets 할당
  res.json(tweetDatas);
}

export async function getId(req, res) {
  const tweetId = req.params.id;
  const findTweet = await tweetRepository.getId(tweetId);

  if (findTweet) {
    res.json(findTweet);
  } else {
    res.status(404).json({ message: `Tweet id(${tweetId}) not found` });
  }
}

export async function create(req, res) {
  console.log(req.body);
  const { text, userName, userId } = req.body;
  const tweet = await tweetRepository.create(text, userName, userId);
  res.status(201).json(tweet);
}

export async function update(req, res) {
  const tweetId = req.params.id;
  const textData = req.body.text;

  const findTweet = await tweetRepository.update(tweetId, textData);

  if (findTweet) {
    res.json(findTweet);
  } else {
    res.status(404).json({ message: `Tweet id(${tweetId}) not found` });
  }
}

export async function remove(req, res) {
  const tweetId = req.params.id;
  await tweetRepository.remove(tweetId);
  res.sendStatus(204); // 삭제는 데이터를 삭제하는 것이기 때문에 삭제가 성공 했는 지 알맞은 상태 코드만 보낸다.
}