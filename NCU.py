
# -*- coding: utf-8 -*-
# Author: Liu

import requests
import re

def get_middle_str(content, left, right):
    pat = re.compile(left + '(.*?)' + right, re.S)
    result = pat.findall(content)
    return result


def print_obj(obj):
    print('\n'.join(['%s:%s' % item for item in obj.__dict__.items()]))


URL_DETECT = "http://aaa.ncu.edu.cn/ac_detect.php"
URL_AUTH = "http://aaa.ncu.edu.cn:803/include/auth_action.php"
URL_STATUS = "http://aaa.ncu.edu.cn:804/srun_portal_pc_succeed.php"

NCU_USER = "8001716134"
NCU_PASS = "150034"

HEADERS = {

}


def ncu_status():
    r = requests.get(URL_STATUS)
    r_text = r._content.decode("UTF-8")
    # print(r_text)
    keys = ['用户名：', 'IP地址：', '已用流量：', '已用时长：', '帐户余额：']
    values = get_middle_str(r_text, 'style="font-size:18px;color:#fd7100;">', "</span>")

    for k, v in enumerate(keys):
        print(keys[k], values[k])


def ncu_login():
    data = {
        "action": "login",
        "username": NCU_USER,
        "password": NCU_PASS,
        "ac_id": "1",
        "user_ip": "",
        "nas_ip": "",
        "user_mac": "",
        "save_me": "1",
        "ajax": "1"
    }
    try:
        r = requests.post(URL_AUTH, data=data, headers=HEADERS)
        # print_obj(r)
        r_text = r._content.decode("UTF-8")

        print("HTTP响应:" + r_text)

        if r.text.find("login_ok") > -1:
            print("登录success")
        else:
            print("登录fail,原因" + r_text)

    except Exception as e:
        print("异常", e)


def is_online_baidu():
    try:
        r = requests.get("http://baidu.com", timeout=0.5)
        print("请求百度success\n", r.text)
        return r.text.index("http://www.baidu.com/") >= 0
    except Exception as e:
        print("连接百度失败,", e)
        return False


def is_online():
    # <input type="hidden" name="ip" id="ip" value="10.252.176.132">

    r = requests.get(URL_DETECT)

    left = 'id="ip" value="'
    right = '">'

    ip_list = get_middle_str(r.text, left, right)
    print("ip_list", ip_list)
    return len(ip_list) > 0


if __name__ == '__main__':
    isOnline = is_online_baidu()
    print("网络状态(百度):", isOnline)
    if isOnline:
        ncu_status()
    else:
        ncu_login()
