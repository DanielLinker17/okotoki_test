export async function getCoins(): Promise<string[]> {
  return fetch("https://api-eu.okotoki.com/coins").then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch coins");
    }
    return response.json();
  });
}
