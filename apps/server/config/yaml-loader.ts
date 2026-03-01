import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { ConfigFactory } from '@nestjs/config';

// 核心：加载对应环境的 YAML 配置
export const yamlConfigLoader: ConfigFactory = () => {
  // 1. 获取环境（启动脚本传入的 NODE_ENV）
  const env = process.env.NODE_ENV || 'development';

  // 2. 拼接 YAML 文件路径（必须正确，否则加载失败）
  const yamlPath = path.resolve(process.cwd(), `config/${env}.yaml`);

  // 3. 检查文件是否存在（连接失败的常见原因：路径错误）
  if (!fs.existsSync(yamlPath)) {
    throw new Error(`YAML 配置文件不存在：${yamlPath}，请检查路径！`);
  }

  // 4. 读取并解析 YAML（处理特殊字符、嵌套结构）
  const yamlContent = fs.readFileSync(yamlPath, 'utf8');
  const config = yaml.load(yamlContent) as Record<string, any>;

  // 5. 替换生产环境的环境变量占位符（如 ${PROD_DB_PWD}）
  return replaceEnvPlaceholders(config);
};

// 辅助函数：替换 YAML 中的环境变量占位符
function replaceEnvPlaceholders(obj: any): any {
  if (typeof obj === 'string') {
    return obj.replace(/\$\{(\w+)\}/g, (_, envKey) => {
      const value = process.env[envKey];
      if (!value) {
        throw new Error(`生产环境变量 ${envKey} 未配置！（比如 PROD_DB_PWD）`);
      }
      return value;
    });
  }
  if (Array.isArray(obj)) return obj.map(replaceEnvPlaceholders);
  if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (acc, key) => {
        acc[key] = replaceEnvPlaceholders(obj[key]);
        return acc;
      },
      {} as Record<string, any>,
    );
  }
  return obj;
}
