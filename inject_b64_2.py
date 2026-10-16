import re

def main():
    with open('/Users/yunifputrapradeka/ngoding/exaque-revamp/exaque/client/Exaque_Managed_Branch_Performance_Mockup v.3-07102026.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Extract all data:image base64 src attributes
    matches = re.findall(r'src="(data:image/[a-z]+;base64,[^"]+)"', html)
    
    unique_b64s = []
    for m in matches:
        if m not in unique_b64s:
            unique_b64s.append(m)

    with open('/Users/yunifputrapradeka/ngoding/exaque-revamp/exaque/client/src/pages/ManagedServices.jsx', 'r', encoding='utf-8') as f:
        jsx = f.read()

    # Check which ones are still BASE64_IMG_x
    print(f"Total unique base64 images found in mockup: {len(unique_b64s)}")
    
    # Let's replace BASE64_IMG_3 with the 3rd image
    if len(unique_b64s) >= 3:
        jsx = jsx.replace('BASE64_IMG_3', unique_b64s[2])

    with open('/Users/yunifputrapradeka/ngoding/exaque-revamp/exaque/client/src/pages/ManagedServices.jsx', 'w', encoding='utf-8') as f:
        f.write(jsx)
        
    print(f"Done.")

if __name__ == '__main__':
    main()
