import re

def main():
    file_path = '/Users/yunifputrapradeka/ngoding/exaque-revamp/exaque/client/src/pages/ManagedServices.jsx'
    with open(file_path, 'r', encoding='utf-8') as f:
        jsx = f.read()

    # Replace BASE64_IMG_1 and 2
    jsx = jsx.replace('src="BASE64_IMG_1"', 'src={LogoRed}')
    jsx = jsx.replace('src="BASE64_IMG_2"', 'src={LogoRed}')
    
    # Replace data:image/... base64 strings with {LogoRed}
    # Be careful to handle the JSX syntax
    jsx = re.sub(r'src="data:image/[^"]+"', 'src={LogoRed}', jsx)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(jsx)
        
    print("Replaced image sources with {LogoRed}")

if __name__ == '__main__':
    main()
