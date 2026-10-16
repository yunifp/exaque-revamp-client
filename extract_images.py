import re
import base64
import os

def main():
    with open('/Users/yunifputrapradeka/ngoding/exaque-revamp/exaque/client/Exaque_Managed_Branch_Performance_Mockup v.3-07102026.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Extract all data:image base64 src attributes
    matches = re.findall(r'src="(data:image/([a-z]+);base64,([^"]+))"', html)
    
    unique_b64s = []
    for m in matches:
        if m not in unique_b64s:
            unique_b64s.append(m)

    # Let's save them as files in src/assets
    # unique_b64s[0] is probably Exaque (since it's first)
    # unique_b64s[1] is AntrePintar (since it's second)
    # unique_b64s[2] is AntrePintar larger maybe? Or the same?
    
    for i, (full_src, ext, b64_data) in enumerate(unique_b64s):
        file_path = f'/Users/yunifputrapradeka/ngoding/exaque-revamp/exaque/client/src/assets/extracted_logo_{i}.{ext}'
        with open(file_path, 'wb') as img_file:
            img_file.write(base64.b64decode(b64_data))
        print(f"Saved {file_path}")

if __name__ == '__main__':
    main()
