import datetime
import os

import git
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By

def hello_http():
    if not os.path.exists("/tmp/mit2022"):
        git.Repo.clone_from("https://github.com/mmykhaylov/mit2022.git", "/tmp/mit2022")

    repo = git.Repo("/tmp/mit2022")
    repo.remote().fetch()
    repo.index.reset("origin/main", hard=True)
    print(repo.active_branch)

    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--headless")
    chrome_options.add_argument('--disable-dev-shm-usage')

    driver = webdriver.Chrome(options=chrome_options)
    driver.get("https://hackmit.org")
    print(driver.title)

    for elem in driver.find_elements(By.XPATH, "//script"):
        js = elem.get_attribute("src")
        if "min" in js or js == '':
            continue
        print(js)
        r = requests.get(js)
        file_path = f"/tmp/mit2022/www/{js.split('/')[-1].split('?')[0]}"
        open(file_path, "wb").write(r.content)

    driver.close()
    driver.quit()

    diffs = repo.git.diff(None, **{"name-only": True}).split("\n")

    date_string = datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    bot_message = f"{date_string}\n"

    if not diffs[0]:
        bot_message += "No changes detected"
    else:
        bot_message += f"{len(diffs)} file(s) changed:\n" + "\n".join(diffs)
        bot_token = os.getenv("BOT_TOKEN")
        channel_id = os.getenv("CHANNEL_ID")
        r = requests.post(
            f"https://api.telegram.org/bot{bot_token}/sendMessage",
            json={"chat_id": channel_id, "text": bot_message},
        ).json()
        if r['ok']:
            print("Message sent")

hello_http()