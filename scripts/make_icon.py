from pathlib import Path
from PIL import Image, ImageDraw

SIZE = 256
BG = (24, 24, 27)         # #18181B
BORDER = (63, 63, 70)     # #3F3F46
ACCENT = (59, 130, 246)   # #3B82F6

img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
d = ImageDraw.Draw(img)

# Rounded dark square
radius = 44
d.rounded_rectangle([0, 0, SIZE - 1, SIZE - 1], radius=radius, fill=BG, outline=BORDER, width=3)

# Subtle grid lines for chart feel
grid_color = (39, 39, 42)
for y in (90, 134, 178):
    d.line([(40, y), (216, y)], fill=grid_color, width=2)

# Rising chart line
pts = [(48, 200), (104, 162), (156, 174), (208, 88)]
d.line(pts, fill=ACCENT, width=16, joint="curve")

# Arrow head at the end
arrow = [(208, 88), (240, 88), (208, 56)]
d.polygon(arrow, fill=ACCENT)

# Dots at data points
for p in pts[:-1]:
    d.ellipse([p[0] - 7, p[1] - 7, p[0] + 7, p[1] + 7], fill=ACCENT)

out = Path(__file__).resolve().parent.parent / "icon.ico"
img.save(out, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
print(f"saved: {out}")
