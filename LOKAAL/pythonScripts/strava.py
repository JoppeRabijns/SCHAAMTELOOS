from glob import glob
from selenium import webdriver 
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import os
import time
import json
import sys


load_dotenv()

searchname = sys.argv[1]

STRAVA_PASSWORD = os.getenv('STRAVA_PASSWORD')

def selenium_latest_image(driver, searchname):
  driver.get("https://www.strava.com/login")
  time.sleep(1)
  username = driver.find_element_by_id("email")
  username.send_keys("joppe.rabijns@gmail.com")  
  pword = driver.find_element_by_id("password")
  pword.send_keys(STRAVA_PASSWORD)        
  driver.find_element_by_id("login-button").click()
  time.sleep(1)
  driver.find_element_by_id("open-global-search-button").click()
  time.sleep(1)
  search = driver.find_element_by_id("global-search-field")
  search.send_keys(searchname)  
  time.sleep(1)
  driver.find_element_by_id("global-search-button").click()
  time.sleep(1)
  driver.find_element_by_class_name("text-headline").click()
  time.sleep(1)
  driver.find_element_by_class_name("athlete-search").find_element_by_tag_name('a').click()
  time.sleep(1)

def bs4_latest_image(driver):
  src = driver.page_source
  soup = BeautifulSoup(src, 'html.parser')
  athlete_pictures = soup.find('ul', {'class': 'MediaThumbnailList--list--boXGW'})
  global picture
  picture = athlete_pictures.find("img")["src"]
  club_name = soup.find('ul', {'class': 'clubs'})
  global club
  club = club_name.find("img")["alt"]
  while True:
    try:
      activities = soup.find('div', {'class': 'Feed--entry-container--ntrEd'})
      activity = activities.find_all("time")[0]
      global latest_activity
      latest_activity = activity.get_text().strip() 
      break
    except:
      latest_activity = "Niet gevonden"
      break

def selenium_2(driver):
  driver.get(driver.current_url + "/follows?type=following")
  time.sleep(1)

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
    "club": club,
    "follower": follower,
    "latest_activity":latest_activity
    }
    print(json.dumps(strava_data))
    break
  except:
    print("error")
    break
driver.quit()
