import config from "../config";

const MakeDeckApiRequest = <T>(slug: string) => fetch(`${config.deckApiBaseUrl}/${slug}`)
  .then(res => res.json())
  .then(res => {
    if (!res.success) {
      return null;
    }
    return res as T;
  })
  .catch(_ => null);

export default MakeDeckApiRequest;