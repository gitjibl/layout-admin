const getters = {
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  permission_routes: state => state.permission.routes,
  userInfo: state => state.user.userInfo,
  userPermissions: state => state.user.userPermissions
}
export default getters
