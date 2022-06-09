from selenium import webdriver 
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import time
import json
import sys

searchname = sys.argv[1]

def selenium(driver, searchname):
  driver.get("https://linkedin.com/login")
  time.sleep(2)
  username = driver.find_element_by_id("username")
  username.send_keys("hello@adequaat.media")   
  pword = driver.find_element_by_id("password")
  pword.send_keys("!cpnexkQ6")        
  driver.find_element_by_xpath("//button[@type='submit']").click()
  time.sleep(2)
  driver.find_element_by_class_name("search-global-typeahead__input").click()
  time.sleep(2)
  driver.find_element_by_class_name("search-global-typeahead__input").click()
  time.sleep(1)
  search = driver.find_element_by_class_name("search-global-typeahead__input")
  search.send_keys(searchname)  
  search.send_keys(Keys.ENTER)
  time.sleep(3)
  result = driver.find_element_by_id('main')
  result.find_element_by_tag_name('img').click()

def bs4(driver):
  src = driver.page_source
  soup = BeautifulSoup(src, 'html.parser')
  intro = soup.find('div', {'class': 'pv-text-details__left-panel'})  
  name_loc = intro.find("h1") 
  name = name_loc.get_text().strip() 
  tagline_loc = intro.find("div", {'class': 'text-body-medium'})
  tagline = tagline_loc.get_text().strip() 

  """eductation"""
  education_loc = soup.find('div',id='education')
  education_sibling = education_loc.find_next_siblings("div")[1]
  education_enitity =  education_sibling.find("div", {'class': 'pvs-entity'})
  education_school_name = education_enitity.find("span",{'class': 'mr1'})
  education_school_name_first = education_school_name.find("span",{'class': 'visually-hidden'})
  education =  education_school_name_first.get_text().strip() 

  """experience"""
  global experience
  experience_loc = soup.find('div',id='experience')
  experience_sibling = experience_loc.find_next_siblings("div")[1]
  experience_enitity =  experience_sibling.find("div", {'class': 'pvs-entity'})

  while True:
    try:
     experience_name = experience_enitity.find_all('a',{"class":'optional-action-target-wrapper'})[1]
     experience_span = experience_name.find_all('span',{"class": 'mr1'})[0]
     experience = experience_span.get_text().strip()
     break
    except:
     experience_name1 = experience_enitity.find("span",{'class': 't-14'})
     experience_name_first1 = experience_name1.find("span",{'class': 'visually-hidden'})
     experience =  experience_name_first1.get_text().strip().split('\u00b7')[0] 
    break

  """image"""
  image = soup.find("img", {'class': 'pv-top-card-profile-picture__image'})["src"]

  """all data"""
  linkedIn_data = {
    "name": name,
    "tagline": tagline,
    "education": education,
    "experience": experience,
    "picture": image
  }

  print(json.dumps(linkedIn_data))  

while True:
  try:
    options = Options()
    options.binary_location = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser'
    driver_path = '/Applications/chromedriver'
    driver = webdriver.Chrome(options = options, executable_path = driver_path)
    selenium(driver, searchname)
    time.sleep(3)
    bs4(driver)
    break
  except:
    print("error")
    break
driver.quit()
