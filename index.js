export default {
  async fetch(request) {
    const url = 'https://developers.cloudflare.com/workers/examples/fetch-html/';
    // Initialize a variable for the response
    //let request = await fetch(url);
    let res;
    //request.cf.botManagement.score = 0;
    // If it is a bot then return a json indicating that it is a blocked request
    if (request.cf.botManagement.score <= 40) {
      // Define JSON result
      let jsonRes = JSON.stringify({
        result: {
          reason: "bad bot!",
          botScore: request.cf.botManagement.score,
        },
      });
      // Define the INIT object
      let init = {
        status: 403,
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      };
      // Create a response object that has a JSON indicating the request is being blocked and why
      res = new Response(jsonRes, init);
    } else {
      /*
      Make a subrequest and return its result;
      Make sure to utilize the "resolveOverride" cf property
      capture it's response object in a variable  */
      res = await fetch(
        new Request("https://http.cat/401", {
          cf: { resolveOverride: "cat" },
        })
      );
    }
    return res;
  },
};