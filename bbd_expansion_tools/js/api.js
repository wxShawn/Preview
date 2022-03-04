//登录
function login() {
  let account = document.getElementById('account').value;
  let password = document.getElementById('password').value;
  ajax({
    type: 'post',
    url: 'https://api.mhbbd.com/bibida/login/login',
    data: `{"account": "${account}", "passWord": "${password}"}`
  }, res => {
    let data = JSON.parse(res);
    let msgBox = document.getElementById('login-msg');
    if (data.success && data.success == true) {
      msgBox.innerText = `登录成功，当前用户：${data.result.userName}`;
    } else {
      msgBox.innerText = '登录失败，手机号或密码不正确';
    }
    cookie.set('token', data.result.token);
    cookie.set('loginMsg', `登录成功，当前用户：${data.result.userName}`);
  });
}

//商户列表
const merchantList = {
  //获取商户列表（已通过审核）
  getMerchantList: function(page, oldData) {
    ajax({
      type: 'post',
      url: 'https://api.mhbbd.com/bibida/web/merchant/mchList',
      data: `{
        "agentId": null,
        "begintime": null,
        "city": null,
        "county": null,
        "endtime": null,
        "merchanId": null,
        "merchanName": null,
        "merchantNo": null,
        "merchantPhone": null,
        "pageNo": ${page},
        "pageSize": 100,
        "province": null,
        "status": 99
      }`
    }, res => {
      let data = JSON.parse(res).result.list;

      if (!oldData) {
        oldData = [];
      }

      let newData = oldData.concat(data);
      
      if(page > 0) {
        this.getMerchantList(page-1, newData);
      } else {
        var csvData = 'id,商户名称,商户号,商户联系人,联系人手机号,省,市,区,门头照,代理商,进件专员,状态,商户状态,创建时间,更新时间';
        for (let i = 0; i < oldData.length; i++) {
          csvData += '\r\n';
          for (let item in oldData[i]) {
            csvData += `${oldData[i][item]},`;
          }
        }
        exportCsv('export.csv', csvData);
      }
    });
  },

  //获取商户列表页数
  getTotalPage: function(callBack) {
    ajax({
      type: 'post',
      url: 'https://api.mhbbd.com/bibida/web/merchant/mchList',
      data: `{
        "agentId": null,
        "begintime": null,
        "city": null,
        "county": null,
        "endtime": null,
        "merchanId": null,
        "merchanName": null,
        "merchantNo": null,
        "merchantPhone": null,
        "pageNo": 1,
        "pageSize": 100,
        "province": null,
        "status": 99
      }`    
    }, res => {
      let totalPage = JSON.parse(res).result.totalPage;
      callBack(totalPage);
    });
  },
}


//商户申请注册
const merchantRegister = {
  //获取申请注册列表
  getRegisterList: function(page, oldData) {
    ajax({
      type: 'post',
      url: 'https://api.mhbbd.com/bibida/web/regapply/list',
      data: `{
        "beginTime": null,
        "city": null,
        "county": null,
        "endTime": null,
        "mobile": null,
        "pageNo": ${page},
        "pageSize": 100,
        "province": null
      }`
    }, res => {
      let data = JSON.parse(res).result.list;

      if (!oldData) {
        oldData = [];
      }

      let newData = oldData.concat(data);
      
      if(page > 0) {
        this.getRegisterList(page-1, newData);
      } else {
        var csvData = 'id,姓名,手机号,店铺名称,省,市,区,详细地址,申请时间,更新时间,操作人,状态';
        for (let i = 0; i < oldData.length; i++) {
          csvData += '\r\n';
          for (let item in oldData[i]) {
            csvData += `${oldData[i][item]},`;
          }
        }
        exportCsv('export.csv', csvData);
      }
    });
  },
  //获取申请注册列表页数
  getTotalPage: function(callBack) {
    ajax({
      type: 'post',
      url: 'https://api.mhbbd.com/bibida/web/regapply/list',
      data: `{
        "beginTime": null,
        "city": null,
        "county": null,
        "endTime": null,
        "mobile": null,
        "pageNo": 1,
        "pageSize": 100,
        "province": null
      }`
    }, res => {
      let totalPage = JSON.parse(res).result.totalPage;
      callBack(totalPage);
    });
  },

  //处理商户注册(未完成)
  processRegister: function(id) {
    ajax({
      type: 'post',
      url: 'https://api.mhbbd.com/bibida/web/regapply/process',
      data: `{"id": ${id}}`
    }, res => {
      
    });
  },
}
