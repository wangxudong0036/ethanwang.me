-- 创建博客文章表
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  date DATE NOT NULL,
  tags TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  read_time INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 创建触发器，自动更新 updated_at 字段
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);

-- 启用 Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 创建策略：允许所有人读取博客文章
CREATE POLICY "允许所有人读取博客文章"
  ON blog_posts
  FOR SELECT
  USING (true);

-- 创建策略：仅认证用户可以插入（如果需要）
CREATE POLICY "仅认证用户可以创建博客文章"
  ON blog_posts
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- 创建策略：仅认证用户可以更新（如果需要）
CREATE POLICY "仅认证用户可以更新博客文章"
  ON blog_posts
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- 创建策略：仅认证用户可以删除（如果需要）
CREATE POLICY "仅认证用户可以删除博客文章"
  ON blog_posts
  FOR DELETE
  USING (auth.role() = 'authenticated');

