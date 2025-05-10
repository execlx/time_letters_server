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

## 生产部署（阿里云 + PM2）

1. 安装 Node.js、pnpm 和 pm2
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
   apt install -y nodejs
   npm install -g pnpm pm2
   ```
2. 克隆仓库并安装依赖
   ```bash
   git clone <你的仓库地址>
   cd time_letters_server
   pnpm install --prod
   ```
3. 构建项目
   ```bash
   pnpm -r run build
   ```
4. 使用 PM2 启动服务
   ```bash
   pm2 start packages/auth-service/dist/main.js --name auth-service --env production
   pm2 start packages/time_letters/dist/main.js --name time_letters --env production
   pm2 start packages/smart-pillbox/dist/main.js --name smart-pillbox --env production
   ```
5. 管理与查看日志
   ```bash
   pm2 ls
   pm2 logs auth-service
   ```
