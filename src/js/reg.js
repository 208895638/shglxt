var reg = {
    trim(s){
        return s.replace(/(^s*)|(s*$)/g, "");
    },
    testAccount: function (val) {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        return myreg.test(val);
    },
    testPassword: function (val) {
        var myreg = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/;
        return myreg.test(val);
    },
    testIdCard: function (val) {
        var myreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return myreg.test(val);
    },
    testQQ: function (val) {
        var myreg = /^[1-9][0-9]{3,10}$/;
        return myreg.test(val);
    },
    testZFBAccount:function(val){
        var myreg = /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+|\d{9,11}$/;
        return myreg.test(val);
    },
    testName:function(val){
        var myreg = /^[\u4E00-\u9FA5]{2,4}$/;
        return myreg.test(val);
    },
    testNumber(val){
        var myreg = /\D|^0/g;
        return myreg.test(val);
    }
}
export default reg