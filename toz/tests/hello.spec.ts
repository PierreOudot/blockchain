
import {get_account, reset_experiment, set_mockup, set_mockup_now} from "@completium/experiment-ts";

import { hello } from './binding/hello'

import assert from 'assert';

/* Accounts ---------------------------------------------------------------- */

const alice = get_account('alice');

/* Initialisation ---------------------------------------------------------- */

describe('Initialisation', async () => {
  it('Reset experiment', async () => {
    await reset_experiment({
      account: 'alice',
      endpoint: 'mockup',
      quiet: true,
    });
  });
  it('set_mockup', async () => {
    set_mockup()
    // await mockup_init()
  });
  it('set_mockup_now', async () => {
    set_mockup_now(new Date(Date.now()))
  });
})

/* Scenario ---------------------------------------------------------------- */

describe('[HELLO] Contract deployment', async () => {
  it('Deploy test_binding', async () => {
    await hello.deploy({ as: alice })
  });
})

describe('[HELLO] Call entry', async () => {
  it("Call 'myentry'", async () => {
    const s_before = await hello.get_s()
    assert(s_before === "")
    await hello.exec("toto",{ as : alice  })
    const s_after = await hello.get_s()
    assert(s_after === "toto")
  })
})
