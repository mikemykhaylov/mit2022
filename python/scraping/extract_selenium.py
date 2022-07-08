import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from pathlib import Path

url = "https://hackmit.org"
driver = webdriver.Safari()
driver.get(url)

base_path = Path(__file__).parent

for elem in driver.find_elements(By.XPATH, "//script"):
    js = elem.get_attribute("src")
    if "min" in js or js == '':
        continue
    r = requests.get(js)
    file_path = (base_path / f"../../www/{js.split('/')[-1].split('?')[0]}").resolve()
    open(file_path, "wb").write(r.content)

driver.quit()
