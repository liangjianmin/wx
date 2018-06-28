import { base64encode, des, utf16to8, utf8to16, base64decode, hexToString, Handle } from 'des.js';

export const Util= {
  /**
    * 随机的16为字符串 X-Dola-Code
    * @returns {string}
    */
  getRrandomStr: function () {
    var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var result = "";
    for (var i = 0; i < 16; i++) {
      var r = Math.floor(Math.random() * 62);
      result += data[r];
    }
    return result;
  },
  /**
   * 毫秒时间戳.随机数
   */
  getRrandomTime: function () {
    var d = new Date().getTime();
    var num = "";
    for (var i = 0; i < 5; i++) {
      num += Math.floor(Math.random() * 10);
    }
    return d + '.' + num;
  },
  /**
   * 获取时间戳
   * @returns {number}
   */
  getSeconds: function () {
    return new Date().getTime();
  },
  /**
   * 生成36位的uuid
   * @returns {string}
   */
  getGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
  /**
   *
   * @param Codekey 加密的key
   * @param str  加密的str
   * @param name
   * @returns {*}
   */
  encryption(Codekey, str, name) {
    if (Codekey) {
      return base64encode(des(Codekey, utf16to8(str), 1, 0, hexToString(name), 1))
    }
  },
  /**
   *
   * @param key 解密的key
   * @param str 解密的str
   * @param name
   * @returns {*}
   */
  decrypt(key, str, name) {
    if (key) {
      return Handle(utf8to16(des(key, base64decode(String(str)), 0, 0, hexToString(name), 0)))
    }
  },
  /**
   *
   * @param platform 平台标志
   * @param token 身份验证
   * @returns {*}
   */
  getParams(platforms, token, params) {
    var params = {
      platform: 'wechat',
      proglang: 'javascript',
      sn: this.getRrandomTime(),
      params: params,
      token: token
    }
    return JSON.stringify(params);
  },
  /**
   * 格式化数据 4位
   * @param timeStamp
   */
  formateDate(val) {
    var number = new Number(val);
    var str = number.toString();
    var newstr = str.replace(/\d{1,4}(?=(\d{4})+$)/g, function (s) {
      return s + ','
    })
    return newstr;
  },
  /**
   * 判断终端
   * @param
   */
  isUerAgent() {
    var u = navigator.userAgent;
    var platform = '';
    if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
      platform = 'android'
    } else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      platform = 'ios'
    } else {
      platform = ''
    }
    return platform;
  }
}
