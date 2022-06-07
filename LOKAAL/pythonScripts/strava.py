from selenium import webdriver 
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import time
import json
import sys

searchname = sys.argv[1]

def selenium(driver, searchname):
  driver.get("https://www.strava.com/login")
  time.sleep(2)
  username = driver.find_element_by_id("email")
  username.send_keys("joppe.rabijns@gmail.com")  
  pword = driver.find_element_by_id("password")
  pword.send_keys("E-vBi*St,-S2?dE")        
  driver.find_element_by_id("login-button").click()
  time.sleep(2)
  driver.find_element_by_id("open-global-search-button").click()
  time.sleep(1)
  search = driver.find_element_by_id("global-search-field")
  search.send_keys(searchname)  
  time.sleep(1)
  driver.find_element_by_id("global-search-button").click()
  time.sleep(2)
  driver.find_element_by_class_name("text-headline").click()
  time.sleep(2)
  driver.find_element_by_class_name("athlete-search").find_element_by_tag_name('a').click()
  time.sleep(2)

def bs4(driver):
  src = driver.page_source
  soup = BeautifulSoup(src, 'html.parser')
  athlete_pictures = soup.find('ul', {'class': 'MediaThumbnailList--list--boXGW'})
  athlete_first_picture = athlete_pictures.find("img")
  strava_data = {
    "latest_image": athlete_first_picture["src"],
  }
  print(json.dumps(strava_data))

while True:
  try:
    options = Options()
    options.binary_location = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser'
    driver_path = '/Applications/chromedriver'
    driver = webdriver.Chrome(options = options, executable_path = driver_path)
    selenium(driver, searchname)
    bs4(driver)
    break
  except:
    print("error")
    break
