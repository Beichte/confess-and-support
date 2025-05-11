export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const scriptUrl = "https://script.google.com/macros/s/AKfycbw2wOjM6wPT9ezEhdDVIKkCgnocpF481Qzm_KrtRCpDCgVHzGNwDUvVvrKXnjTPPuOPNQ/exec";

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const contentType = response.headers.get("content-type");
    const debugBody = await response.text();

    try {
      const json = JSON.parse(debugBody);
      return res.status(200).json(json);
    } catch (parseError) {
      return res.status(200).json({ debug: debugBody, error: "Antwort war kein JSON" });
    }

  } catch (error) {
    return res.status(500).json({ error: "Proxy failed", details: error.message });
  }
}