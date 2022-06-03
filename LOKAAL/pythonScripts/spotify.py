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

##############
## Selenium ##
##############
while True:
  try:
    options = Options()
    options.binary_location = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser'
    driver_path = '/Applications/chromedriver'
    driver = webdriver.Chrome(options = options, executable_path = driver_path)
    driver.get("https://open.spotify.com/search")
    time.sleep(2)
    driver.find_element_by_id("onetrust-accept-btn-handler").click()
    time.sleep(2)
    search = driver.find_element_by_tag_name("input")
    search.send_keys(searchname)  
    time.sleep(2)
    driver.find_element_by_css_selector("section[aria-label=Profiles]").find_element_by_class_name("E1N1ByPFWo4AJLHovIBQ").find_element_by_tag_name('a').click()
    time.sleep(2)
    driver.find_element_by_class_name("iKwGKEfAfW7Rkx2_Ba4E").find_element_by_class_name("LunqxlFIupJw_Dkx6mNx").find_element_by_tag_name('a').click()
    time.sleep(2)
    src = driver.page_source
    soup = BeautifulSoup(src, 'html.parser')
    intro = soup.find('main', {'class': 'main-view-container'})  
    name_loc = intro.find("h1")
    name = name_loc.get_text().strip() 
    song_loc = intro.find("div", {'class': 't_yrXoUO3qGsJS4Y6iXX'})
    song = song_loc.get_text().strip() 
    spotify_data = {
      "playlist_name": name,
      "first_song": song
    }
    print(json.dumps(spotify_data))
    break
  except:
    print("error")
    break
driver.quit()




