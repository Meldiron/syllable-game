// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ImageResponse } from "@vercel/og";

// Vercel OG setup
export const config = {
  runtime: "experimental-edge",
};

const font = fetch(
  new URL("../../public/Nunito-ExtraBold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

// Game setup
const syllableRegex =
  /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;

function syllabify(words) {
  return words.match(syllableRegex);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function getPositions() {
  let positions = [];

  for (let x = 60; x < 1100; x += 300) {
    for (let y = 220; y < 1100; y += 250) {
      positions.push({ x, y });
    }
  }

  positions.push({
    y: 20,
    x: 1000,
  });

  return shuffle(positions);
}

// Endpoint logic
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  const params = req.nextUrl.searchParams;

  const wordsStr = (params.get("words") ?? "hello world").split(" ").join(",");
  let topic = params.get("topic") ?? "Unknown Topic";
  let extra = params.get("extra") ?? undefined;

  const words = wordsStr.split(",");
  let syllables = [];

  for (const word of words) {
    syllables.push(...syllabify(word));
  }

  if (extra) {
    syllables.push(extra);
  }

  const fontData = await font;

  const positions = getPositions();

  if (syllables.length > positions.length) {
    topic = "Too many words";
    syllables = [];
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={req.nextUrl.origin + "/bg.svg"}
            alt="Background"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        <div
          style={{
            fontFamily: '"Nunito"',
            position: "absolute",
            left: 0,
            top: 0,
            background: "#3CA540",
            borderBottomRightRadius: "24px",
            color: "white",
            padding: "32px 32px",
            fontSize: "64px",
            display: "flex",
            textTransform: "uppercase",
          }}
        >
          <p
            style={{
              margin: 0,
              padding: 0,
            }}
          >
            {topic}
          </p>
        </div>

        {syllables.map((text, index) => {
          const pos = positions[index];

          const randomX = getRandomInt(-30, 30);
          const randomY = getRandomInt(-30, 30);

          pos.x += randomX;
          pos.y += randomY;

          const rotation = getRandomInt(-30, 30);

          return (
            <div
              key={index}
              style={{
                fontFamily: '"Nunito"',
                position: "absolute",
                background: "white",
                left: pos.x + "px",
                top: pos.y + "px",
                borderRadius: "12px",
                color: "black",
                padding: "32px 32px",
                fontSize: "64px",
                display: "flex",
                textTransform: "uppercase",
                transform: "rotate(" + rotation + "deg)",
                border: "2px solid #0F0F11",
              }}
            >
              <p
                style={{
                  margin: 0,
                  padding: 0,
                }}
              >
                {text}
              </p>
            </div>
          );
        })}
      </div>
    ),
    {
      width: 1200,
      height: 1200,
      fonts: [
        {
          name: "Nunito",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
