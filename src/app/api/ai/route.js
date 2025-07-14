const BI0S_INFO = `
MRecruitment Process – Team bi0s

CTF-Based Entry
- Your journey into Team bi0s begins with a Capture The Flag (CTF) competition.
- Duration: ~5 weeks
- Format: Solve cybersecurity challenges, earn points, and rise on the leaderboard.
- Shortlisting is based on performance.

More Info: https://joinctf.bi0s.in

Who Can Participate?
- Everyone is welcome!
- Whether you're a complete beginner or have prior experience, you can take part.
- What matters most is:
  - Curiosity
  - Problem-solving
  - Willingness to learn

Security Domains
Team bi0s explores many domains of cybersecurity:
- Web Exploitation
- Binary Exploitation (Pwn)
- Reverse Engineering
- Cryptography
- Forensics
- Malware Analysis
- Hardware Security
- Red Teaming

Each domain has a dedicated sub-team to help you learn and compete.

Inductions

Main Induction:
July 17–18
Get introduced to the team, how we function, and what you can expect.

Second Induction (Tentative):
July 28
A deeper dive into each category and how you can get involved.

Venue: Amriteshwari / Acharya Hall (to be announced)

CTF Phase
- Start solving challenges, earning points, and get shortlisted.
- Shortlisting is based on CTF leaderboard performance.

Resources:
- CTF Guide: https://joinctf.bi0s.in
- bi0s Wiki: https://wiki.bi0s.in

Stay Updated
Join our WhatsApp group for all announcements and queries:
https://chat.whatsapp.com/GEE2JXLYvuYFHZ7zFvhbZI

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
