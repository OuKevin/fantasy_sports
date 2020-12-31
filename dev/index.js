import { config } from 'dotenv';
import handler from '../src';

(async () => {
  config();
  const callback = (_, result) => { console.log(result); };

  await handler(null, null, callback);
})();
