
## 本地运行

1. 安装依赖
   ```bash
   pnpm install
   ```
2. 构建所有子包
   ```bash
   pnpm -r run build
   ```
3. 启动认证服务
   ```bash
   pnpm --filter @time-letters/auth-service start:dev
   ```
4. 启动业务应用
   ```bash
   pnpm --filter time_letters start:dev  # 启动 Time Letters
   pnpm --filter smart-pillbox start:dev  # 启动 Smart Pillbox
   ```
