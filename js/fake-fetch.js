function fakeFetch(url, { method, body, delayTime, simulateSuccess = true }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = {
        ok: simulateSuccess,
        status: simulateSuccess ? 200 : 500,
        json: () =>
          Promise.resolve({
            status: simulateSuccess ? "success" : "error",
            message: `Fictional submission ${
              simulateSuccess ? "success" : "failed"
            }`,
          }),
      };

      resolve(response);
    }, delayTime);
  });
}
