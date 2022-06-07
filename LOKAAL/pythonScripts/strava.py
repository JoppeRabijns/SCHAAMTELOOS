from selenium import webdriver 
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import time
import json
import sys

searchname = "joppe rabijns"

def selenium_latest_image(driver, searchname):
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

def bs4_latest_image(driver):
  src = driver.page_source
  soup = BeautifulSoup(src, 'html.parser')
  athlete_pictures = soup.find('ul', {'class': 'MediaThumbnailList--list--boXGW'})
  global picture
  picture = athlete_pictures.find("img")["src"]

def selenium_2(driver):
  driver.get(driver.current_url + "/follows?type=following")
  time.sleep(2)

def bs4_follower(driver):
  src = driver.page_source
  soup = BeautifulSoup(src, 'html.parser')
  followers_list = soup.find('ul', {'class': 'list-athletes'})
  follower_single = followers_list.find_all('div', {'class': 'text-callout'})[3]
  global follower
  follower =  follower_single.get_text().strip() 

while True:
  try:
    options = Options()
    options.binary_location = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser'
    driver_path = '/Applications/chromedriver'
    driver = webdriver.Chrome(options = options, executable_path = driver_path)
    selenium_latest_image(driver, searchname)
    bs4_latest_image(driver)
    selenium_2(driver)
    bs4_follower(driver)
    strava_data = {
    "latest_image": picture,
    "follower": follower,
    }
    print(json.dumps(strava_data))
    break
  except:
    print("error")
    break
driver.quit()
