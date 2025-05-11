export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const scriptUrl = "https://script.google.com/macros/s/AKfycbzPw3V-dEMTw9uXGVU20DJKTOxdrpHRunVHMiRA1mSRcZWyayef5CovjqJikyZerMUPWQ/exec";

  const type = req.body.type;

  try {
    if (type === "get") {
      const { code, pin } = req.body;
      const url = `${scriptUrl}?code=${encodeURIComponent(code)}&pin=${encodeURIComponent(pin)}`;
      const response = await fetch(url);
      const data = await response.json();
      return res.status(200).json(data);
    } else {
      // For "confess" and "reply"
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body)
      });
      const text = await response.text();
      return res.status(200).json({ message: text });
    }
  } catch (error) {
    return res.status(500).json({ error: "Proxy failed", details: error.message });
  }
}