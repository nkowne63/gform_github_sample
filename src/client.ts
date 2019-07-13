import { getEnv } from "./env";

const { target } = getEnv();

const questions = [
  "テーマ",
  "やったこと",
  "達成度",
  "反省",
  "明日やることとテーマ"
];

global.main = () => {
  const res = UrlFetchApp.fetch(`${target}/isAlive`);
  const text = res.getContentText();
  Logger.log(text);
};

global.submit = (event: any) => {
  const itemResponses = event.response.getItemResponses() as Array<any>;
  const answer = itemResponses.reduce((p, itemResponse) => {
    const question = itemResponse.getItem().getTitle();
    const answer = itemResponse.getResponse();
    if (!questions.includes(question)) {
      return p;
    }
    return {
      ...p,
      [question]: answer
    };
  }, {}) as any;
  const year = new Date().getFullYear();
  const month = (m => (m < 10 ? "0" + m : "" + m))(new Date().getMonth() + 1);
  const day = new Date().getDate();
  const comment = `# 日報${year}${month}${day}
${questions
  .map(q => {
    return `## ${q}
${answer[q]}`;
  })
  .join("\n")}
`;
  Logger.log(comment);
  try {
    UrlFetchApp.fetch(`${target}/postComment`, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({
        comment
      })
    });
  } catch (error) {
    Logger.log(error);
  }
  Logger.log("finished!");
};
