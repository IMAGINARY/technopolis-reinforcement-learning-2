// eslint-disable-next-line import/prefer-default-export
export function installIdleHandler(callback, timeout) {

  let idleTimeout = null;
  const addIdleTimeout = () => {
    idleTimeout = setTimeout(callback, timeout * 1000);
  };

  $(document).on('pointerdown', () => {
    clearTimeout(idleTimeout);
    addIdleTimeout();
  });
  addIdleTimeout();
}
