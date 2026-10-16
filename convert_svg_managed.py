import re

# 1. Read HOE.html and extract SVG
with open('HOE.html', 'r', encoding='utf-8') as f:
    content = f.read()

svg_match = re.search(r'<svg class="hexviz".*?</svg>', content, re.DOTALL)
if not svg_match:
    print("SVG not found in HOE.html")
    exit(1)

svg_str = svg_match.group(0)

# 2. Convert to JSX
jsx_svg = svg_str
jsx_svg = jsx_svg.replace('class="', 'className="')

# Attributes to camelCase
attrs = [
    'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-dasharray',
    'stroke-opacity', 'stop-color', 'stop-opacity', 'fill-opacity',
    'font-family', 'font-style', 'font-weight', 'font-size', 'paint-order',
    'text-anchor', 'clip-path'
]
for attr in attrs:
    camel_attr = attr.split('-')[0] + attr.split('-')[1].capitalize()
    jsx_svg = jsx_svg.replace(attr + '=', camel_attr + '=')

def style_repl(match):
    style_content = match.group(1)
    parts = style_content.split(';')
    style_dict = {}
    for part in parts:
        part = part.strip()
        if not part: continue
        key, val = part.split(':', 1)
        key = key.strip()
        val = val.strip()
        if '-' in key:
            key_parts = key.split('-')
            key = key_parts[0] + ''.join(k.capitalize() for k in key_parts[1:])
        style_dict[key] = val
    
    style_str = ', '.join(f'"{k}":"{v}"' for k, v in style_dict.items())
    return f'style={{{{ {style_str} }}}}'

jsx_svg = re.sub(r'style="([^"]*)"', style_repl, jsx_svg)
jsx_svg = jsx_svg.replace('xmlns:xlink=', 'xmlnsXlink=')
jsx_svg = jsx_svg.replace('xml:space=', 'xmlSpace=')

indented_svg = '\n'.join('            ' + line if line.strip() else line for line in jsx_svg.split('\n'))
indented_svg = indented_svg.strip()

# 3. Read ManagedServices.jsx and replace its SVG
with open('src/pages/ManagedServices.jsx', 'r', encoding='utf-8') as f:
    jsx_content = f.read()

jsx_svg_match = re.search(r'<svg className="hexviz".*?</svg>', jsx_content, re.DOTALL)
if not jsx_svg_match:
    print("SVG not found in JSX file")
    exit(1)

new_jsx_content = jsx_content[:jsx_svg_match.start()] + indented_svg + jsx_content[jsx_svg_match.end():]

with open('src/pages/ManagedServices.jsx', 'w', encoding='utf-8') as f:
    f.write(new_jsx_content)

print("Successfully replaced SVG in ManagedServices.jsx")
