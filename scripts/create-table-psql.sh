#!/bin/bash

# 使用 psql 直接连接 Supabase 数据库并执行 SQL
# 需要设置环境变量或直接修改下面的连接信息

# 从 .env 文件读取配置（如果存在）
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

# Supabase 数据库连接信息
# 获取方式: Supabase Dashboard > Settings > Database > Connection string
SUPABASE_URL="${VITE_SUPABASE_URL:-}"
DB_PASSWORD="${SUPABASE_DB_PASSWORD:-}"

if [ -z "$SUPABASE_URL" ]; then
  echo "错误: 请设置 VITE_SUPABASE_URL 环境变量"
  exit 1
fi

# 从 URL 提取 project ref
PROJECT_REF=$(echo $SUPABASE_URL | sed -n 's|https://\([^.]*\)\.supabase\.co|\1|p')

if [ -z "$PROJECT_REF" ]; then
  echo "错误: 无法从 URL 提取项目引用"
  exit 1
fi

# 构建连接字符串
# 格式: postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
if [ -z "$DB_PASSWORD" ]; then
  echo "错误: 请设置 SUPABASE_DB_PASSWORD 环境变量"
  echo "获取方式: Supabase Dashboard > Settings > Database > Database password"
  exit 1
fi

CONNECTION_STRING="postgresql://postgres:${DB_PASSWORD}@db.${PROJECT_REF}.supabase.co:5432/postgres"
SQL_FILE="supabase/migrations/create_blog_posts_table.sql"

echo "正在连接到 Supabase 数据库..."
echo "项目: $PROJECT_REF"
echo "执行 SQL 文件: $SQL_FILE"
echo ""

# 执行 SQL
psql "$CONNECTION_STRING" -f "$SQL_FILE"

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ 表创建成功！"
else
  echo ""
  echo "❌ 表创建失败，请检查错误信息"
  exit 1
fi

