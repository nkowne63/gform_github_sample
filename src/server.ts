import { getCommentClient } from "./github/index";
import { getEnv } from "./env";
import { setHandler, initServer } from "./express/index";

const { token, issueNumber, owner, repoName } = getEnv();

const postComment = getCommentClient(token, issueNumber, {
  owner,
  name: repoName
});

const startServer = () => {
  setHandler("get", "/isAlive", (_, res) => {
    res.json({
      message: "this server is alive"
    });
    return;
  });
  setHandler("post", "/postComment", async (req, res) => {
    const comment = req.body.comment as string | undefined;
    if (!comment) {
      res.status(400).json({
        message: "must contain 'comment' property"
      });
      return;
    }
    try {
      await postComment(comment);
    } catch (error) {
      res.status(500).json({
        message: "something went wrong commenting"
      });
      return;
    }
    res.json({
      message: "succeed"
    });
    return;
  });
  initServer();
};

startServer();
