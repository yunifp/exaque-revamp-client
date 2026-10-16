import re

def main():
    with open('/Users/yunifputrapradeka/ngoding/exaque-revamp/exaque/client/Exaque_Managed_Branch_Performance_Mockup v.3-07102026.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Extract all data:image base64 src attributes
    matches = re.findall(r'src="(data:image/png;base64,[^"]+)"', html)

    # In the mockup there are exactly 3 unique base64 images.
    # match 0 is the small exaque logo (Laporan)
    # match 1 is the small brand logo (Data diolah oleh)
    # match 2 is the 'Powered by' logo (Antrepintar)
    # Wait, let's look at the html exactly.
    # Line 118: <img src="data:image/png;base64,... 
    # Line 200: <img src="data:image/png;base64,...
    # Line 193: <img src="data:image/png;base64,...
    
    unique_b64s = []
    for m in matches:
        if m not in unique_b64s:
            unique_b64s.append(m)

    with open('/Users/yunifputrapradeka/ngoding/exaque-revamp/exaque/client/src/pages/ManagedServices.jsx', 'r', encoding='utf-8') as f:
        jsx = f.read()

    if len(unique_b64s) >= 3:
        jsx = jsx.replace('BASE64_IMG_1', unique_b64s[0])
        jsx = jsx.replace('BASE64_IMG_2', unique_b64s[1])
        jsx = jsx.replace('BASE64_IMG_3', unique_b64s[2])

    with open('/Users/yunifputrapradeka/ngoding/exaque-revamp/exaque/client/src/pages/ManagedServices.jsx', 'w', encoding='utf-8') as f:
        f.write(jsx)
        
    print(f"Replaced {len(unique_b64s)} images")

if __name__ == '__main__':
    main()
