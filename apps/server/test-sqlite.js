// test-sqlite.js
try {
  const _sqlite3 = require('sqlite3');
  console.log('✅ sqlite3 驱动加载成功');
} catch (err) {
  console.error('❌ 驱动加载失败:', err);
}
