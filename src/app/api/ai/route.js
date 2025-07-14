const BI0S_INFO = `
Main Induction: July 17th–18th
Get an introduction to the club — what we do, how we work, and what you can expect.

Second Induction: Tentatively July 28th
Dive deeper into the inner workings of each category within the club. Learn how we operate and contribute.

Venue: Either Amriteshwari or Acharya Hall – to be announced soon.



CTF Phase:
The recruitment process begins with a Capture The Flag (CTF) event. Solve challenges, earn points, and climb the leaderboard. Shortlisting will be based on your performance. Resources:
CTF Guide: https://joinctf.bi0s.in/
bi0s Wiki: https://wiki.bi0s.in

Main Communication Channel:
Stay updated on announcements and important info via our WhatsApp group:https://chat.whatsapp.com/GEE2JXLYvuYFHZ7zFvhbZI
`;

export async function POST(req) {
  const { prompt } = await req.json();

  const moderationCheck = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content: `You are an AI, the official assistant for bi0s. You ONLY answer questions related to bi0s Recruitment/bi0s and politely refuse everything else.

This is the only information you can use:
${BI0S_INFO}

If the user asks anything unrelated to the event, respond with:
"I'm here only to help with bi0s recruitment-related questions. Please ask me something about the recruitment!"`
        },
        {
          role: "user",
          content: prompt
        }
      ]
    })
  });

  if (!moderationCheck.ok) {
    const err = await moderationCheck.text();
    return new Response(JSON.stringify({ error: err }), { status: 500 });
  }

  const data = await moderationCheck.json();
  const reply = data.choices?.[0]?.message?.content || "No response";

  return Response.json({ reply });
}
