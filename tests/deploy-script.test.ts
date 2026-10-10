import { spawnSync } from 'node:child_process';
import { chmodSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { expect, test } from 'vitest';

test('deployment script rejects the filesystem root before invoking rsync', () => {
  const binDirectory = mkdtempSync(join(tmpdir(), 'portfolio-deploy-test-'));
  const rsyncStub = join(binDirectory, 'rsync');
  writeFileSync(rsyncStub, '#!/usr/bin/env bash\necho rsync-was-invoked >&2\nexit 99\n');
  chmodSync(rsyncStub, 0o755);

  try {
    const result = spawnSync('bash', ['scripts/deploy-static.sh'], {
      cwd: process.cwd(),
      encoding: 'utf8',
      env: {
        ...process.env,
        PATH: `${binDirectory}:${process.env.PATH}`,
        DEPLOY_HOST: 'example.invalid',
        DEPLOY_USER: 'portfolio',
        DEPLOY_PATH: '/',
      },
    });

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('DEPLOY_PATH must not be /');
    expect(result.stderr).not.toContain('rsync-was-invoked');
  } finally {
    rmSync(binDirectory, { recursive: true, force: true });
  }
});
