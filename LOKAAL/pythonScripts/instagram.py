from selenium import webdriver 
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
import time
import json
import sys

searchname = sys.argv[1]

def selenium(driver, searchname):
  driver.get("https://www.instagram.com/")
  time.sleep(3)
  username = driver.find_elements_by_class_name("zyHYP")[0]
  username.send_keys("hello@adequaat.media")   
  pword = driver.find_elements_by_class_name("zyHYP")[1]
  pword.send_keys("@d3qu@@t")        
  driver.find_element_by_xpath("//button[@type='submit']").click()
  time.sleep(4)
  driver.find_element_by_class_name("XTCLo").click
  time.sleep(2)
  search = driver.find_element_by_class_name("XTCLo")
  search.send_keys(searchname)
  time.sleep(2)
  driver.find_elements_by_class_name("-qQT3")[0].click()
  time.sleep(4) 
  images=[]
  for image in driver.find_elements_by_class_name('_aagv'):
    images.append(image.find_element_by_tag_name('img').get_attribute('src'))

  instagram_data = {
    "images": images,
  }

  print(json.dumps(instagram_data))

while True:
  try:
    options = Options()
    options.binary_location = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser'
    driver_path = '/Applications/chromedriver'
    driver = webdriver.Chrome(options = options, executable_path = driver_path)
    selenium(driver, searchname)
    break
  except:
    print("error")
    break
driver.quit()
