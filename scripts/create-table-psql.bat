@echo off
REM 使用 psql 直接连接 Supabase 数据库并执行 SQL (Windows 版本)

REM 从 .env 文件读取配置（如果存在）
if exist .env (
  for /f "tokens=*" %%a in (.env) do (
    set "%%a"
  )
)

REM Supabase 数据库连接信息
set SUPABASE_URL=%VITE_SUPABASE_URL%
set DB_PASSWORD=%SUPABASE_DB_PASSWORD%

if "%SUPABASE_URL%"=="" (
  echo 错误: 请设置 VITE_SUPABASE_URL 环境变量
  exit /b 1
)

REM 从 URL 提取 project ref (简单处理)
for /f "tokens=2 delims=." %%a in ("%SUPABASE_URL%") do set PROJECT_REF=%%a

if "%PROJECT_REF%"=="" (
  echo 错误: 无法从 URL 提取项目引用
  exit /b 1
)

if "%DB_PASSWORD%"=="" (
  echo 错误: 请设置 SUPABASE_DB_PASSWORD 环境变量
  echo 获取方式: Supabase Dashboard ^> Settings ^> Database ^> Database password
  exit /b 1
)

REM 构建连接字符串
set CONNECTION_STRING=postgresql://postgres:%DB_PASSWORD%@db.%PROJECT_REF%.supabase.co:5432/postgres
set SQL_FILE=supabase\migrations\create_blog_posts_table.sql

echo 正在连接到 Supabase 数据库...
echo 项目: %PROJECT_REF%
echo 执行 SQL 文件: %SQL_FILE%
echo.

REM 执行 SQL
psql "%CONNECTION_STRING%" -f "%SQL_FILE%"

if %ERRORLEVEL% EQU 0 (
  echo.
  echo ✅ 表创建成功！
) else (
  echo.
  echo ❌ 表创建失败，请检查错误信息
  exit /b 1
)

