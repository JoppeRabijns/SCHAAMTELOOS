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

searchname = sys.argv[1]

while True:
  try:
    options = Options()
    options.binary_location = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser'
    driver_path = '/Applications/chromedriver'
    driver = webdriver.Chrome(options = options, executable_path = driver_path)
    driver.get("https://www.instagram.com/")
    time.sleep(4)
    driver.find_element_by_class_name("HoLwm").click()
    time.sleep(4)
    username = driver.find_elements_by_class_name("zyHYP")[0]
    username.send_keys("hello@adequaat.media")   
    pword = driver.find_elements_by_class_name("zyHYP")[1]
    pword.send_keys("@d3qu@@t")        
    driver.find_element_by_xpath("//button[@type='submit']").click()
    time.sleep(4)
    driver.find_element_by_class_name("XTCLo").click
    time.sleep(1)
    search = driver.find_element_by_class_name("XTCLo")
    search.send_keys(searchname)
    time.sleep(3)
    driver.find_elements_by_class_name("-qQT3")[0].click()
    time.sleep(3) 
    src = driver.page_source
    soup = BeautifulSoup(src, 'html.parser')
    image = soup.find('img', {'class': 'FFVAD'})  
    instagram_data = {
      "latest_image": image['src'],
    }
    print(json.dumps(instagram_data))
    time.sleep(3)
    break
  except:
    print("error")
    break
driver.quit()
