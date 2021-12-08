const debug = require('debug')('semantic-release:commit-analyzer');

const BB_PR_PREFIX = 'Pull request ';

/**
 * Checks if the commit contains a BB Pull Request prefix and removes it.
 *
 * @param {Commit} commit a parsed commit.
 * @return {Commit} checked and verified commit.
 */
module.exports = (commit, logger) => {
  const messageIsPR = commit.message.startsWith(BB_PR_PREFIX);
  const subjectIsPR = commit.subject.startsWith(BB_PR_PREFIX);
  const isPullRequest = messageIsPR || subjectIsPR;

  if (isPullRequest) {
    logger?.log(
      'Found a pull request commit - "%s".\n Removing "Pull request #... " prefix from subject and message.',
      commit.subject
    );

    subjectIsPR && (commit.subject = commit.subject.substring(commit.subject.indexOf(':') + 2));
    messageIsPR && (commit.message = commit.message.substring(commit.message.indexOf(':') + 2));
    commit.isPullRequest = true;
  } else {
    commit.isPullRequest = false;
  }

  return commit;
};
