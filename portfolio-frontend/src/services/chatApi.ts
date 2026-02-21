export async function sendMessage(message: string): Promise<string> {
  const res = await fetch("http://127.0.0.1:8000/api/chat/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();
  return data.response;
}