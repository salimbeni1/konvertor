import requests

url = 'http://localhost:8000/printREQUEST'
files = {'file': open('test_file.txt', 'rb')}

r = requests.post(url, files=files)
print(r.text)