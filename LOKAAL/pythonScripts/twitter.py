from selenium import webdriver 
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import time
import re
import json

################
## Parameters ##
################
import sys



while True:
  try:
    options = Options()
    options.binary_location = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser'
    driver_path = '/Applications/chromedriver'
    driver = webdriver.Chrome(options = options, executable_path = driver_path)
    username = "María Fernández"
    username.replace(" ", "%20")
    driver.get("https://twitter.com/search?q="+ username +"&src=typed_query&f=user")
    time.sleep(1)
    try:
     driver.find_element_by_css_selector("div[aria-label=Close]").click()
    except:
      time.sleep(1)
    find = driver.find_element_by_tag_name("section").find_element_by_tag_name("a")
    find.click()    
    time.sleep(5)
    src = driver.page_source
    soup = BeautifulSoup(src, 'html.parser')
     = soup.find('section') 
    tweet = tweet.find("article")
    text = text_loc.get_text().strip() 
    print(text)
    time.sleep(65)
    break
  except:
    print("error: user not found")
    break
driver.quit()
