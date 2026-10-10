import { expect, test } from 'vitest';
import { getLiveLink } from '../src/lib/projects';

test('does not produce an external link for an unavailable live site', () => {
  expect(getLiveLink({ liveUrl: null } as never)).toBeNull();
});
