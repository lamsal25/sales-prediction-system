from django.test import TestCase
from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time

class TestLogin(LiveServerTestCase):
    def testloginpage(self):
        driver = webdriver.Chrome()
        driver.maximize_window()
        driver.get('http://localhost:3000/login')
        driver.find_element(By.NAME,"username").send_keys('suman')
        driver.find_element(By.NAME,"password").send_keys('gautam')
        driver.find_element(By.XPATH,"//button[@type='submit']").click()
        time.sleep(5)

class TestRegister(LiveServerTestCase):
    def testregisterpage(self):
        driver = webdriver.Chrome()
        driver.maximize_window()
        driver.get('http://localhost:3000/register')
        driver.find_element(By.ID,"first_name").send_keys('suman')
        driver.find_element(By.ID,"last_name").send_keys('gautam')
        driver.find_element(By.ID,"email").send_keys('sumangautam@com')
        driver.find_element(By.ID,"username").send_keys('suman12345')
        driver.find_element(By.ID,"password").send_keys('P@ssword')
        driver.find_element(By.ID,"password1").send_keys('P@ssword')
        driver.find_element(By.XPATH,"//button[@type='submit']").click()
        time.sleep(5)



#input("Press Enter to close the browser...")
