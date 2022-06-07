
import axios from 'axios'

export function getLoginUser() {
  return new Promise(resolve => {
    axios
      .get(process.env.VUE_APP_SSO_URL+"/getUserInfo", {})
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        console.log(error);
      });
  });
}
/**
   * 获取当前登录用户权限
   * @param {*} user 用户loginName
   * @param {*} projectId 项目ID
   */
export function getUserPermission(loginName, projectId) {
  return new Promise(resolve => {
    axios
      .get(process.env.VUE_APP_SSO_URL+"/api-authority/sys/api/getUserPermissionInformation", {
        params: {
          loginName: loginName,
          projectId: projectId,
        }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  });
}
