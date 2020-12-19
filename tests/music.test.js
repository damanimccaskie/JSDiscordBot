async function getSearchResults(query) {
    const ytsr = require('ytsr');

    const searchResults = (await ytsr(query)).items;
    let regex = RegExp("/watch[?]v=.+");
    let urls = Array.from(searchResults.map(v => v.url));
    urls = urls.filter(v => regex.test(v) && !v.includes("list"));
    return urls;
}

it("Get search results from youtube", async () => {
    jest.setTimeout(10000);
    expect.assertions(1);
    const data = await getSearchResults("kartel");
    expect(data.length).toBeGreaterThan(0);
})