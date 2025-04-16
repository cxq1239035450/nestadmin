# 使用官方的 Node.js 镜像，建议使用 alpine 版本以减小镜像体积
FROM node:20.17.0-alpine

# 创建应用目录
WORKDIR /usr/src/app

# 复制 package.json 和 pnpm-lock.yaml（因为项目使用 pnpm）
COPY package*.json pnpm-lock.yaml ./

# 全局安装 pnpm
RUN npm install -g pnpm

# 使用 pnpm 安装依赖
RUN pnpm install

# 复制项目文件
COPY . .

# 构建项目
RUN pnpm build

# 暴露应用运行的端口
EXPOSE 3000

# 启动应用（修正 npm 命令）
CMD ["pnpm","start:prod"]
# docker build -t nestserve .
