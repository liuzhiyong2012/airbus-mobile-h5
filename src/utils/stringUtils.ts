const randomStringData = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
export default {
  randomStr(length: number) {
    length = length || 32;
    let str = '';

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * randomStringData.length);
      str += randomStringData.charAt(index);
    }

    return str;
  }
}
