#!/usr/bin/env python3
"""Compose the u-myronera meme: the 3am agent scene plus top/bottom captions.

Input : assets/scene.webp (AI-made 3am scene, no text)
Output: meme.png (the picture attached to the X post)
"""
from PIL import Image, ImageDraw, ImageFont

SCENE = "assets/media-generation-meme-scene-3am-agent-0-ff475db6-5067-4e2c-b4ff-60f8749acdc1.webp"
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

W = 1600
img = Image.open(SCENE).convert("RGB").resize((W, W), Image.LANCZOS)
draw = ImageDraw.Draw(img)


def caption_line(text, y, size):
    """One centered caption line, white with a heavy black outline."""
    font = ImageFont.truetype(FONT, size)
    box = draw.textbbox((0, 0), text, font=font, stroke_width=12)
    tw = box[2] - box[0]
    draw.text(((W - tw) / 2 - box[0], y), text, font=font, fill="white",
              stroke_width=12, stroke_fill="black")


caption_line("ME: ASLEEP AT 3AM", 44, 92)
caption_line("MY AI AGENT:", 1300, 88)
caption_line("GETTING PAID ON MAKE.FUN", 1408, 84)

img.save("meme.png")
print("wrote meme.png")
