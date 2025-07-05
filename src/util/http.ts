// utility which is always guarteed to return data
// or otherwise throw Error
// By default the browser's built in fetch() may
// not throw error and simply return 503, 404, etc
export async function get(url: string) {
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error('Failed to fetch data: ' + response.statusText);
    }
  
    // for now since generic function don't know what data type will be returned
    // better than any because any would allow all .foo .bar etc access
    const data = await response.json() as unknown; 
    return data;
  }