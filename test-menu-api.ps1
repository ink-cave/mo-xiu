$json = @"
{
  "username": "admin",
  "password": "admin123"
}
"@

# 登录获取 token
$response = Invoke-RestMethod -Uri "http://localhost:9999/api/user/login" -Method POST -Headers @{"Content-Type"="application/json"} -Body $json
$token = $response.data.token

# 请求菜单树接口
Write-Host "=== 请求菜单树接口 ==="
$menuTreeResponse = Invoke-RestMethod -Uri "http://localhost:9999/api/menu/tree" -Method GET -Headers @{"Content-Type"="application/json"; "Authorization"="Bearer $token"}
$menuTreeResponse

# 请求菜单列表接口
Write-Host "\n=== 请求菜单列表接口 ==="
$menuListResponse = Invoke-RestMethod -Uri "http://localhost:9999/api/menu" -Method GET -Headers @{"Content-Type"="application/json"; "Authorization"="Bearer $token"}
$menuListResponse

# 输出菜单数量
Write-Host "\n=== 菜单数量 ==="
Write-Host "菜单树数量: $($menuTreeResponse.data.Count)"
Write-Host "菜单列表数量: $($menuListResponse.data.Count)"