---
title: 'Arch Linux 安装 Claude Code 完整教程'
published: 2026-06-09
description: '在 Arch Linux 上安装 Claude Code CLI 的完整指南，涵盖代理 / 无代理两种方式、CC Switch 快速切换工具及常见问题排查'
image: ''
tags: ['Arch Linux', 'Claude Code', 'AI', '教程', '终端']
category: '技术'
draft: false
lang: 'zh_CN'
---

本教程涵盖在 Arch Linux 上安装 Claude Code CLI 的全部步骤，包括代理 / 无代理两种方式、常见问题排查、以及 CC Switch 快速切换工具。

---

## 1. 环境准备

> **前置条件**：在开始之前，请确认你的 Arch Linux 系统已安装以下基础工具。

### 安装 Node.js 与 npm

Claude Code 需要 Node.js 18+ 环境。推荐使用 `nvm` 管理版本：

```bash
# 安装 nvm（Node Version Manager）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# 重新加载 shell 配置
source ~/.bashrc   # 或 source ~/.zshrc

# 安装 Node.js LTS
nvm install --lts
nvm use --lts

# 验证
node -v   # 应显示 v20.x 或 v22.x
npm -v
```

或者直接用 pacman 安装（版本可能偏旧）：

```bash
sudo pacman -S nodejs npm
```

### 安装 Git（如未安装）

```bash
sudo pacman -S git
```

### 安装 unzip（CC Switch 需要）

```bash
sudo pacman -S unzip
```

> **建议**：先运行一次 `sudo pacman -Syu` 更新系统，避免依赖冲突。

---

## 2. 方式一：无代理安装（直连）

适用于服务器在海外、或本身网络可直接访问 `registry.npmjs.org` 的场景。

### 全局安装 Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

安装完成后，`claude` 命令即可在终端全局使用。

### 如果 npm 下载速度慢

将 npm registry 设为国内镜像源：

```bash
# 设置为淘宝镜像（npmmirror）
npm config set registry https://registry.npmmirror.com

# 验证
npm config get registry

# 再执行安装
npm install -g @anthropic-ai/claude-code
```

> **注意**：npm 镜像源有时同步滞后，如果 `@anthropic-ai/claude-code` 包找不到最新版，请临时切回官方源：
> ```bash
> npm install -g @anthropic-ai/claude-code --registry=https://registry.npmjs.org
> ```

---

## 3. 方式二：代理安装

适用于国内网络环境，通过 HTTP/HTTPS 代理或 SOCKS5 代理安装。

### HTTP 代理

**配置 npm 代理：**

```bash
# 假设代理地址为 http://127.0.0.1:7890（请替换为你的实际代理地址）
npm config set proxy http://127.0.0.1:7890
npm config set https-proxy http://127.0.0.1:7890

# 如果代理需要认证
npm config set proxy http://用户名:密码@127.0.0.1:7890
npm config set https-proxy http://用户名:密码@127.0.0.1:7890
```

**同时设置终端代理（git 等工具也会用到）：**

```bash
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890

# 写入 shell 配置以便持久化
echo 'export http_proxy=http://127.0.0.1:7890' >> ~/.bashrc
echo 'export https_proxy=http://127.0.0.1:7890' >> ~/.bashrc
source ~/.bashrc
```

**执行安装：**

```bash
npm install -g @anthropic-ai/claude-code
```

**安装后清除代理配置（如需恢复直连）：**

```bash
npm config delete proxy
npm config delete https-proxy
unset http_proxy https_proxy
```

### SOCKS5 代理

**通过 proxychains-ng 代理 npm：**

```bash
# 安装 proxychains-ng
sudo pacman -S proxychains-ng

# 编辑配置
sudo nano /etc/proxychains.conf
# 在文件末尾修改为你的 SOCKS5 代理地址，例如：
# socks5 127.0.0.1 1080

# 通过 proxychains 运行 npm
proxychains npm install -g @anthropic-ai/claude-code
```

**或者使用 tsocks：**

```bash
# yay 安装 tsocks
yay -S tsocks

# 配置 /etc/tsocks.conf
# server = 127.0.0.1
# server_port = 1080
# server_type = 5

# 使用 tsocks
tsocks npm install -g @anthropic-ai/claude-code
```

### 配合 Clash Verge / Mihomo Party

**安装 Mihomo Party（推荐）：**

```bash
# 通过 AUR 安装
yay -S mihomo-party-bin

# 或直接从 GitHub Releases 下载 AppImage
# https://github.com/mihomo-party-org/mihomo-party/releases
```

**开启系统代理后直接安装：**

```bash
# Mihomo 开启 TUN 模式或系统代理后
# 终端设置环境变量
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890

npm install -g @anthropic-ai/claude-code
```

---

## 4. 安装后验证与配置

### 验证安装

```bash
claude --version
```

预期输出类似 `@anthropic-ai/claude-code v2.x.x`。

### 首次登录

```bash
claude login
```

浏览器会自动打开 Anthropic 登录页面，按照提示完成认证即可。

如果浏览器无法自动打开：

```bash
# 终端会打印一个 URL，手动复制到浏览器打开
# 登录后将回调码粘贴回终端
```

### 配置 API 端点（如使用代理 API）

```bash
# 设置自定义 API Base URL（例如使用转发服务）
export ANTHROPIC_BASE_URL=https://your-api-proxy.com

# 设置 API Key（如果不用 login 方式）
export ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx

# 写入 shell 配置
echo 'export ANTHROPIC_BASE_URL=https://your-api-proxy.com' >> ~/.bashrc
echo 'export ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx' >> ~/.bashrc
source ~/.bashrc
```

> **说明**：Claude Code 支持通过环境变量 `ANTHROPIC_BASE_URL` 和 `ANTHROPIC_API_KEY` 来自定义 API 端点，适用于使用第三方 API 代理/转发的场景。

---

## 5. CC Switch — 快速切换 API 端点

[CC Switch](https://github.com/sky2233/cc-switch) 是一款开源的 Claude Code API 端点快速切换工具。它会在 `~/.claude/` 目录下管理多套配置，让你在不同 API 提供商（官方 / OpenRouter / 自定义代理）之间一键切换。

### 核心功能

- 管理多组 API Key + Base URL 配置
- 一键切换，无需手动修改环境变量
- 支持备份与还原配置
- 交互式 TUI 界面

### 安装 CC Switch

```bash
# 方法 A：直接下载二进制（推荐，无需编译）
# 访问 https://github.com/sky2233/cc-switch/releases
# 下载 Linux x86_64 版本，例如：
wget https://github.com/sky2233/cc-switch/releases/latest/download/cc-switch-linux-amd64 -O cc-switch
chmod +x cc-switch
sudo mv cc-switch /usr/local/bin/

# 方法 B：使用 npm 安装
npm install -g cc-switch

# 方法 C：从源码编译（需要 Go 环境）
git clone https://github.com/sky2233/cc-switch.git
cd cc-switch
go build -o cc-switch .
sudo mv cc-switch /usr/local/bin/
```

### 使用 CC Switch

```bash
# 启动交互界面
cc-switch

# 命令行添加配置
cc-switch add official
# 交互式输入：Name → API Key → Base URL → Default Model

# 命令行切换配置
cc-switch use official

# 列出所有配置
cc-switch list

# 备份当前配置
cc-switch backup

# 查看帮助
cc-switch --help
```

### 典型配置示例

```bash
# 添加官方 Anthropic API
cc-switch add official
#   API Key: sk-ant-api03-xxxxxxxxxxxxx
#   Base URL: https://api.anthropic.com
#   Model: claude-sonnet-4-6

# 添加 OpenRouter
cc-switch add openrouter
#   API Key: sk-or-v1-xxxxxxxxxxxxx
#   Base URL: https://openrouter.ai/api
#   Model: anthropic/claude-sonnet-4-6

# 添加自定义代理
cc-switch add my-proxy
#   API Key: sk-xxxxxxxxxxxxx
#   Base URL: https://my-proxy.example.com
#   Model: claude-sonnet-4-6
```

> **提示**：切换配置后，直接运行 `claude` 即可使用新的 API 端点，无需重新登录。

---

## 6. 常见问题与解决方案

### Q1: npm install 报 ECONNREFUSED / ETIMEDOUT

> **原因**：网络无法连接 `registry.npmjs.org`。

**解决：**

1. 先确认代理已正确设置：`curl -x http://127.0.0.1:7890 https://registry.npmjs.org`
2. 检查 `npm config list` 确认 proxy 配置生效
3. 用 proxychains 包装：`proxychains npm install -g @anthropic-ai/claude-code`
4. 换用国内镜像源后再试

### Q2: claude 命令找不到 (command not found)

> **原因**：npm 全局 bin 目录不在 PATH 中。

**解决：**

```bash
# 查看 npm 全局 bin 路径
npm config get prefix

# 确保该路径在 PATH 中（通常是 /usr/local/bin 或 ~/.local/bin）
# 添加到 shell 配置：
echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# 如果用 nvm，确认 nvm 初始化在 .bashrc/.zshrc 中：
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

### Q3: Permission denied (EACCES) 安装报错

**解决：**

```bash
# 方案 A：修改 npm 全局目录到用户目录
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# 方案 B：使用 sudo（不推荐但最快）
sudo npm install -g @anthropic-ai/claude-code
```

### Q4: 代理设置后 npm 仍然不走代理

**解决：**

1. 确认代理端口正确：`netstat -tlnp | grep 7890`（替换为你的端口）
2. 测试代理连通性：`curl -v --proxy http://127.0.0.1:7890 https://www.google.com`
3. npm 有时不遵守 `http_proxy` 环境变量，需显式设置 `npm config set proxy`
4. 如果用的是 SOCKS5，npm 不支持 SOCKS5 代理，必须用 `proxychains` 或转为 HTTP 代理

### Q5: claude login 后浏览器不打开 / 认证失败

**解决：**

- 终端中会打印一个 URL，手动复制到浏览器中打开
- 如果浏览器也无法访问，换用 API Key 方式：跳过 `claude login`，直接设置 `ANTHROPIC_API_KEY` 环境变量
- 确认系统已安装 `xdg-utils`：`sudo pacman -S xdg-utils`

### Q6: GLIBC 版本不兼容（使用二进制时）

> **表现**：`claude: /lib/x86_64-linux-gnu/libc.so.6: version 'GLIBC_2.xx' not found`

**解决：**

```bash
# Arch Linux 通常不会有此问题，但如果出现，检查系统更新
sudo pacman -Syu

# 查看当前 GLIBC 版本
pacman -Q glibc

# 如果仍不兼容，改用 npm 方式安装而非下载二进制
```

### Q7: CC Switch 切换后 claude 仍用旧配置

**解决：**

```bash
# 检查当前激活的配置
cc-switch list

# 确认环境变量没有被覆盖
env | grep ANTHROPIC

# Shell 中的环境变量会覆盖 CC Switch 配置
# 清除冲突的环境变量：
unset ANTHROPIC_API_KEY
unset ANTHROPIC_BASE_URL

# 从 shell 配置文件中移除旧的 export 语句，或注释掉
```

### Q8: 安装过程中 npm 报证书错误 (UNABLE_TO_VERIFY_LEAF_SIGNATURE)

**解决：**

```bash
# 临时绕过证书检查（不推荐，但在某些企业代理环境必须使用）
npm config set strict-ssl false

# 安装完成后恢复
npm config set strict-ssl true
```

---

## 7. 卸载 Claude Code

```bash
# 卸载 npm 包
npm uninstall -g @anthropic-ai/claude-code

# 清理配置目录（可选，会删除所有配置和对话历史）
rm -rf ~/.claude

# 清理 npm 缓存
npm cache clean --force

# 如果安装了 CC Switch
npm uninstall -g cc-switch
# 或删除二进制文件
sudo rm /usr/local/bin/cc-switch
```

---

*Arch Linux Claude Code Installation Guide — 最后更新 2026-05-22*