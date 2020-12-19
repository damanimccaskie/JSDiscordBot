async function getSearchResults(query) {
    const cheerio = require("cheerio");
    const phantom = require('phantom');

    const instance = await phantom.create();
    const page = await instance.createPage()

    await page.open("https://www.youtube.com/results?search_query=" + query);
    const content = await page.property('content');

    //parse page
    dom = cheerio.load(content);

    let regex = RegExp("/watch[?]v=.+");
    let links = dom("a"); //parse out results
    let urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href")).filter(link => regex.test(link) && !link.includes("list"));

    await instance.exit();
    return urls;
}

it("Get search results from youtube", async () => {
    expect.assertions(1);
    const data = await getSearchResults("kartel");
    expect(data.length).toBeGreaterThan(0);
})