from pathlib import Path
from PIL import Image, ImageDraw
import math

final_image = Image.new("L", (120, 61))
final_image_drawer = ImageDraw.Draw(final_image)

base_path = Path(__file__).parent

art = open((base_path / "art.txt").resolve(), "r")
Lines = art.readlines()

colors = {}

characters = "@%&#*/(,. "

for i in range(len(characters)):
    color_value = math.floor(255 * i / len(characters))
    colors[characters[i]] = color_value

for i in range(len(Lines)):
    line = Lines[i]
    for j in range(len(line) - 1):
        char = line[j]
        final_image_drawer.point([j, i], colors[char])

# final_image.show()

final_image.save((base_path / "image.png").resolve())
