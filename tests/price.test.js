const price = require('../commands/price');

/*it("Get coins results from coinmarketcap", async () => {
    jest.setTimeout(5000);
    // expect.assertions(1);
    // const data = await getSearchResults("kartel");
    // expect(data.length).toBeGreaterThan(0);
    
})*/

price.execute(null, ["ds", "Bitcoin"]);