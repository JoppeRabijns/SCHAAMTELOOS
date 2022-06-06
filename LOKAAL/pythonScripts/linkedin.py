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
    driver.get("https://linkedin.com/login")
    time.sleep(1)
    username = driver.find_element_by_id("username")
    username.send_keys("joppe@rabijns.be")   
    pword = driver.find_element_by_id("password")
    pword.send_keys("!cpnexkQ6")        
    driver.find_element_by_xpath("//button[@type='submit']").click()
    time.sleep(2)
    driver.find_element_by_class_name("search-global-typeahead__input").click()
    time.sleep(1)
    driver.find_element_by_class_name("search-global-typeahead__input").click()
    time.sleep(0.5)
    search = driver.find_element_by_class_name("search-global-typeahead__input")
    search.send_keys(searchname)  
    search.send_keys(Keys.ENTER)
    time.sleep(1)
    result = driver.find_element_by_id('main')
    result.find_element_by_tag_name('img').click()
    time.sleep(1)
    src = driver.page_source
    soup = BeautifulSoup(src, 'html.parser')
    intro = soup.find('div', {'class': 'pv-text-details__left-panel'})  
    name_loc = intro.find("h1") 
    name = name_loc.get_text().strip() 
    tagline_loc = intro.find("div", {'class': 'text-body-medium'})
    tagline = tagline_loc.get_text().strip() 
    education_loc = soup.find('div',id='education')
    education_sibling = education_loc.find_next_siblings("div")[1]
    education_enitity =  education_sibling.find("div", {'class': 'pvs-entity'})
    education_school_name = education_enitity.find("span",{'class': 'mr1'})
    education_school_name_first = education_school_name.find("span",{'class': 'visually-hidden'})
    education =  education_school_name_first.get_text().strip() 
    experience_loc = soup.find('div',id='experience')
    experience_sibling = experience_loc.find_next_siblings("div")[1]
    experience_enitity =  experience_sibling.find("div", {'class': 'pvs-entity'})
    experience =  experience_enitity.get_text().strip() 
    linkedIn_data = {
      "name": name,
      "tagline": tagline,
      "education": education,
      "experience": experience
    }
    print(json.dumps(linkedIn_data))
    break
  except:
    print("error")
    break
driver.quit()
