import handler from '../src';

(async () => {
  const callback = (_, result) => { console.log(result); };

  await handler(null, null, callback);
})();
