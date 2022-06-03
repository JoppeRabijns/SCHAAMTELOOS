from selenium import webdriver
from bs4 import BeautifulSoup
import time
import json
from selenium.webdriver.chrome.options import Options

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
    src = driver.page_source
    soup = BeautifulSoup(src, 'html.parser')
    athleteProfile = soup.find('div', {'id': 'athlete-profile'})
    name_loc = athleteProfile.find("h1")
    name = name_loc.get_text().strip()
    location_loc = athleteProfile.find("div", class_="location")
    location = location_loc.get_text().strip()
    strava_data = {
      "name": name,
      "location": location,
    }
    print(json.dumps(strava_data))
    break
  except:
    print("error")
    break
driver.quit()
