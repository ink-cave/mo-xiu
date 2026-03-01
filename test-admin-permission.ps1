$json = @"
{
  "username": "admin",
  "password": "admin123"
}
"@

# 登录获取 token
$response = Invoke-RestMethod -Uri "http://localhost:9999/api/user/login" -Method POST -Headers @{"Content-Type"="application/json"} -Body $json
$token = $response.data.token

# 请求权限接口
$permissionResponse = Invoke-RestMethod -Uri "http://localhost:9999/api/permission/user" -Method GET -Headers @{"Content-Type"="application/json"; "Authorization"="Bearer $token"}

# 输出响应
$permissionResponse

# 输出权限数量
Write-Host "\n=== 权限数量 ==="
Write-Host "菜单权限数量: $($permissionResponse.data.menus.Count)"
Write-Host "按钮权限数量: $($permissionResponse.data.buttons.Count)"

# 输出所有按钮权限
Write-Host "\n=== 所有按钮权限 ==="
$permissionResponse.data.buttons | ForEach-Object { Write-Host "- $_" }