'use strict';

module.exports = {
  async trigger(ctx) {
    const { GITHUB_PAT, GITHUB_REPO } = process.env;

    if (!GITHUB_PAT || !GITHUB_REPO) {
      ctx.status = 500;
      ctx.body = { error: 'Missing GitHub config env vars' };
      return;
    }

    try {
      const workflow = 'deploy.yml';
      const ref = 'master';

      const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/actions/workflows/${workflow}/dispatches`, {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${GITHUB_PAT}`,
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ref }),
      });

      ctx.status = res.status;
      ctx.body = { ok: res.ok };
    } catch (err) {
      ctx.status = 500;
      ctx.body = { error: 'Failed to trigger GitHub Action', details: err.message };
    }
  },
};
