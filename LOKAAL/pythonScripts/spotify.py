from selenium import webdriver 
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import time
import json
import sys

searchname = "stefan tilburgs"

def selenium(driver, searchname):
  driver.get("https://open.spotify.com/search")
  time.sleep(2)
  driver.find_element_by_id("onetrust-accept-btn-handler").click()
  time.sleep(2)
  search = driver.find_element_by_tag_name("input")
  search.send_keys(searchname)  
  time.sleep(2)
  driver.find_element_by_css_selector("section[aria-label=Profiles]").find_element_by_class_name("E1N1ByPFWo4AJLHovIBQ").find_element_by_tag_name('a').click()
  time.sleep(2)

def bs4(driver):
    src = driver.page_source
    soup = BeautifulSoup(src, 'html.parser')
    
    followers = soup.find_all('section')[2]  
    followers_div = followers.find('div',{'class': 'XiVwj5uoqqSFpS4cYOC6'})
    followers_a = followers_div.find('a')
    follower = followers_a.get_text().strip() 

    playlists = soup.find_all('section')[1]
    playlists_div = playlists.find('div',{'class': 'XiVwj5uoqqSFpS4cYOC6'})
    playlists_a = playlists_div.find('a')
    playlist = playlists_a.get_text().strip()

    spotify_data = {
      "follower": follower,
      "playlist": playlist
    }
    print(json.dumps(spotify_data))

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
driver.quit()
