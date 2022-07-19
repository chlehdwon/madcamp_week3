#-*- coding: utf-8 -*-

import time
from selenium import webdriver as wd
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from datetime import datetime
import random
import os

login_id = "ho9938@naver.com"
login_pw = "hongLa@0592"
title_text = "How can I use add_experimentail_option in javascript?" # 15
body_text = """
I wanted to use selenium in javascript,
but I there are some error codes when I ran the code.
In python, I avoid this errors by this code:

```
options = wd.ChromeOptions()
options.add_experimental_option("excludeSwitches", ["enable-logging"])
```
Is there any way to solve this problem in javascript?
This is our error code:
```
[33448:11152:0715/135211.483:ERROR:device_event_log_impl.cc(214)] [13:52:11.483] USB: usb_device_handle_win.cc:1048 Failed to read descriptor from node connection:
```
"""# 30
tag_text = "linux" # 30

def error_msg(driver):
    ret_str = ''

    elements = driver.find_elements(By.CLASS_NAME, "js-stacks-validation-message")
    for i in range(len(elements)):
        ret_str += elements[i].text
        ret_str += '\n'

    elements = driver.find_elements(By.CLASS_NAME, "validation-error")
    for i in range(len(elements)):
        ret_str += elements[i].text
        ret_str += '\n'
    
    return ret_str


def login_main(driver, login_id, login_pw):
    print('---------------login_main---------------')

    login_url = driver.current_url
    user_id = driver.find_element(By.XPATH, '//*[@id="email"]')
    for i in login_id:
        time.sleep(random.random()*0.05)
        user_id.send_keys(i)
        
    password = driver.find_element(By.XPATH, '//*[@id="password"]')
    
    for i in login_pw:
        time.sleep(random.random()*0.05)
        password.send_keys(i)
        
    driver.find_element(By.ID, 'submit-button').click()

    time.sleep(2)
    if("nocaptcha" in driver.current_url):
        time.sleep(2)
        return {
            'status': False, 
            'message': "Failed to login due to captcha... Please relogin to verify that you are a human"
            }
    
    if(driver.current_url == login_url):
        time.sleep(2)
        return {
            'status': False, 
            'message': "Failed to login... Please check your ID, PWD and initial login setting"
            }
    
    # else
    return {
        'status': True,
        'message': 'Login success!!!'
    }


def login_sub(driver, login_id, login_pw):
    print('---------------login_sub---------------')

    login_url = driver.current_url
    try: 
        user_id = driver.find_element(By.XPATH, '//*[@id="email"]')
    except:
       return {
            'status': True,
            'message': 'Auto login success!!!'
        }

    user_id.click()
    for i in login_id:
        time.sleep(random.random()*0.05)
        user_id.send_keys(i)
        
    password = driver.find_element(By.XPATH, '//*[@id="password"]')
    
    for i in login_pw:
        time.sleep(random.random()*0.05)
        password.send_keys(i)
        
    driver.find_element(By.ID, 'submit-button').click()

    time.sleep(10)
    
    if(driver.current_url == login_url):
            driver.find_element(By.XPATH, '//*[@id="confirm-submit"]').click()
    
    time.sleep(2)
    if("nocaptcha" in driver.current_url):
        time.sleep(2)
        return {
            'status': False, 
            'message': "Failed to login due to captcha... Please relogin to verify that you are a human"
            }
    
    if(driver.current_url == login_url):
        time.sleep(2)
        return {
            'status': False, 
            'message': "Failed to login... Please check your ID, PWD and initial login setting"
            }
    
    # else
    return {
        'status': True,
        'message': 'Login success!!!'
    }

def post_main(driver, title_text, body_text, tag_text):
    print('-------------------post_main----------------------')
    
    post_url = driver.current_url
    title = driver.find_element(By.XPATH, '//*[@id="title"]')
    title.send_keys(Keys.CONTROL + 'A' + Keys.BACKSPACE)
    for i in title_text:
        time.sleep(random.random()*0.05)
        title.send_keys(i)
        
    body = driver.find_element(By.XPATH, '//*[@id="wmd-input"]')
    
    body.send_keys(Keys.CONTROL + 'A')
    body.send_keys(Keys.BACKSPACE)
    time.sleep(0.05)
    body.send_keys(body_text)
        
    tag = driver.find_element(By.XPATH, '//*[@id="tageditor-replacing-tagnames--input"]')
    tag.send_keys(Keys.CONTROL + 'A' + Keys.BACKSPACE)
    for i in tag_text:
        time.sleep(random.random()*0.05)
        tag.send_keys(i)

    driver.find_element(By.XPATH, '//*[@id="post-form"]/div[2]/div/button[1]').click()
    time.sleep(2)
    driver.find_element(By.XPATH, '/html/body/div[3]/div[2]/div[3]/div/form/div[3]/div[2]/div/button[1]').click()
    time.sleep(0.5)
    if(driver.current_url == post_url):
        return {
            'status': False,
            'message': error_msg(driver)
        }
    
    return {
        'status': True,
        'message': 'Post success!!!'
    }


def post_sub(driver, title_text, body_text, tag_text):
    print('-------------------post_sub----------------------')

    post_url = driver.current_url
    try: 
        if driver.find_element(By.XPATH, '/html/body/aside/div/div[2]/button[1]'):
            driver.find_element(By.XPATH, '/html/body/aside/div/div[2]/button[1]').click()
    except:
        pass
    
    title = driver.find_element(By.XPATH, '//*[@id="title"]')
    title.send_keys(Keys.CONTROL + 'A' + Keys.BACKSPACE)
    for i in title_text:
        time.sleep(random.random()*0.05)
        title.send_keys(i)
        
    body = driver.find_element(By.XPATH, '//*[@id="wmd-input"]')
    
    body.send_keys(Keys.CONTROL + 'A')
    body.send_keys(Keys.BACKSPACE)
    time.sleep(0.05)
    body.send_keys(body_text)
    
    tag = driver.find_element(By.XPATH, '//*[@id="tageditor-replacing-tagnames--input"]')
    tag.send_keys(Keys.CONTROL + 'A' + Keys.BACKSPACE)
    for i in tag_text:
        time.sleep(random.random()*0.05)
        tag.send_keys(i)

    driver.find_element(By.XPATH, '/html/body/div[3]/div[2]/div[3]/div/form/div[2]/div/button[1]').click()
    time.sleep(2)
    driver.find_element(By.XPATH, '/html/body/div[3]/div[2]/div[3]/div/form/div[3]/div[2]/div/button[1]').click()
    time.sleep(0.5)
    if(driver.current_url == post_url):
        return {
            'status': False,
            'message': error_msg(driver)
        }
    
    return {
        'status': True,
        'message': 'Post success!!!'
    }

site_names = ['stackoverflow', 'serverfault', 'superuser', 'askubuntu', 'askdifferent']

start_urls = {
    'stackoverflow': "https://stackoverflow.com/users/login?ssrc=anon_ask&returnurl=https%3a%2f%2fstackoverflow.com%2fquestions%2fask",
    'serverfault': "https://serverfault.com/users/login?ssrc=anon_ask&returnurl=https%3a%2f%2fserverfault.com%2fquestions%2fask",
    'superuser': "https://superuser.com/users/login?ssrc=head&returnurl=https%3a%2f%2fsuperuser.com%2fquestions%2fask",
    'askubuntu': "https://askubuntu.com/users/login?ssrc=anon_ask&returnurl=https%3a%2f%2faskubuntu.com%2fquestions%2fask",
    'askdifferent': "https://apple.stackexchange.com/users/login?ssrc=anon_ask&returnurl=https%3a%2f%2fapple.stackexchange.com%2fquestions%2fask"
}

ask_urls = {
    'stackoverflow': "https://stackoverflow.com/questions/ask",
    'serverfault': "https://serverfault.com/questions/ask",
    'superuser': "https://superuser.com/questions/ask",
    'askubuntu': "https://askubuntu.com/questions/ask",
    'askdifferent': "https://askdifferent.com/questions/ask"
}

def uni_poster(login_id, login_pw, title_text, body_text, tag_text, driver, site):
    driver.get(start_urls[site])

    with open("./log.html", "w") as f:
        f.write(driver.page_source)

    if site=='stackoverflow':
        result = login_main(driver, login_id, login_pw)
    else:
        result = login_sub(driver, login_id, login_pw)

    print(result)
    if result['status']==False:
        return result

    time.sleep(1)
    # post_url = driver.current_url
    
    with open("./log.html", "w") as f:
        f.write(driver.page_source)

    driver.get(ask_urls[site])

    if site=='stackoverflow':
        result = post_main(driver, title_text, body_text, tag_text)
    else:
        result = post_sub(driver, title_text, body_text, tag_text)

    with open("./log.html", "w") as f:
        f.write(driver.page_source)

    print(result)
    if result['status']==False:
        return result
    
    time.sleep(1)
    final_url = driver.current_url
    
    return {
        'status': True,
        'message': final_url
    }

def multi_poster(board_data):

    login_id = board_data['user_id']
    login_pw = board_data['user_pwd']
    title_text = board_data['qtitle']
    body_text = board_data['qcontent']
    tag_text = board_data['qtag']
    sites = board_data['sites']

    options = wd.ChromeOptions()
    options.add_experimental_option("excludeSwitches", ["enable-logging"])
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('window-size=1920x1080')
    options.add_argument("disable-gpu")

    driver = wd.Chrome('/root/week3/BoardApp/chromedriver', options=options)
    result = {}

    for i in range(len(sites)):
        if (sites[i]==True): 
            site = site_names[i]
            result[site] = uni_poster(login_id, login_pw, title_text, body_text, tag_text, driver, site)

    return result
    
# print(multi_poster(login_id, login_pw, title_text, body_text, tag_text, [True, False, False, False, False]))