const util = {
    setlocal: (key, value) => {
      localStorage[key] = value;
    },
    getlocal: key => localStorage[key]
  };
  export default util;