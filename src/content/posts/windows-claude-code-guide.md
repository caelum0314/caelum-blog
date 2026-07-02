---
title: 'Windows 安装 Claude Code 完整教程'
published: 2026-07-02
description: '在 Windows 10/11 上安装 Claude Code CLI 的完整指南，涵盖代理/无代理两种方式、CC Switch 快速切换工具及常见问题排查'
image: ''
tags: ['Windows', 'Claude Code', 'AI', '教程', '终端']
category: '技术'
draft: false
lang: 'zh_CN'
---

本教程涵盖在 **Windows 10 / 11** 上安装 Claude Code CLI 的全部步骤，包括代理 / 无代理两种方式、常见问题排查、以及 CC Switch 快速切换工具。

---

## 1. 环境准备

> **前置条件**：在开始之前，请确认你的 Windows 系统已安装以下基础工具。

### 1.1 选择终端

推荐使用以下终端之一（任选其一）：

| 终端 | 说明 |
|------|------|
| **Windows Terminal**（推荐） | 微软官方现代终端，支持多标签、GPU 加速。在 Microsoft Store 搜索 "Windows Terminal" 安装 |
| **PowerShell 7+** | 跨平台 Shell，功能比旧版 PowerShell 5.1 更强大。`winget install Microsoft.PowerShell` |
| **Git Bash** | 随 Git for Windows 附带，提供类 Unix 终端体验 |

> **建议**：本教程中的命令默认在 **PowerShell** 中执行。如使用 CMD 或 Git Bash，部分命令需稍作调整，会特别注明。

### 1.2 安装 Node.js 与 npm

Claude Code 需要 Node.js 18+ 环境。Windows 下有多种安装方式：

#### 方式 A：nvm-windows（推荐，可管理多版本）

```powershell
# 1. 下载 nvm-windows 安装包
# 访问 https://github.com/coreybutler/nvm-windows/releases
# 下载 nvm-setup.exe，双击安装

# 2. 安装完成后，打开新的 PowerShell / CMD 窗口
nvm version                     # 验证安装

# 3. 安装 Node.js LTS
nvm install lts
nvm use lts

# 4. 验证
node -v                         # 应显示 v20.x 或 v22.x
npm -v
```

#### 方式 B：官方安装包（最简单）

访问 https://nodejs.org，下载 LTS 版本（.msi 安装包），双击安装即可。安装程序会自动将 Node.js 添加到系统 PATH。

#### 方式 C：winget（Windows 包管理器）

```powershell
winget install OpenJS.NodeJS.LTS

# 或安装特定版本
winget install OpenJS.NodeJS --version 22.12.0

# 验证
node -v
npm -v
```

#### 方式 D：Scoop（开发者推荐）

```powershell
# 先安装 Scoop（如未安装）
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex

# 安装 Node.js
scoop install nodejs-lts

# 验证
node -v
npm -v
```

### 1.3 安装 Git

```powershell
# 方式 A：winget
winget install Git.Git

# 方式 B：官方安装包
# 访问 https://git-scm.com/download/win 下载安装

# 方式 C：Scoop
scoop install git

# 验证
git --version
```

> **提示**：安装 Git 时建议勾选 "Git Bash Here" 和 "Add Git to PATH" 选项。如果需要在 Claude Code 中执行 git 操作，必须确保 Git 在 PATH 中可用。

### 1.4 系统更新

建议先确保 Windows 已更新到最新版本，避免兼容性问题。在「设置 → Windows 更新」中检查并安装更新。

---

## 2. 方式一：无代理安装（直连）

适用于服务器在海外、或本身网络可直接访问 `registry.npmjs.org` 的场景。

### 全局安装 Claude Code

```powershell
npm install -g @anthropic-ai/claude-code
```

安装完成后，`claude` 命令即可在终端全局使用。

### 如果 npm 下载速度慢

将 npm registry 设为国内镜像源：

```powershell
# 设置为淘宝镜像（npmmirror）
npm config set registry https://registry.npmmirror.com

# 验证
npm config get registry

# 再执行安装
npm install -g @anthropic-ai/claude-code
```

> **注意**：npm 镜像源有时同步滞后，如果 `@anthropic-ai/claude-code` 包找不到最新版，请临时切回官方源：
> ```powershell
> npm install -g @anthropic-ai/claude-code --registry=https://registry.npmjs.org
> ```

---

## 3. 方式二：代理安装

适用于国内网络环境，通过 HTTP/HTTPS 代理安装。

### 3.1 配置 npm 代理

#### CMD / PowerShell 设置

```powershell
# 假设代理地址为 http://127.0.0.1:7890（请替换为你的实际代理地址）
npm config set proxy http://127.0.0.1:7890
npm config set https-proxy http://127.0.0.1:7890

# 如果代理需要认证
npm config set proxy http://用户名:密码@127.0.0.1:7890
npm config set https-proxy http://用户名:密码@127.0.0.1:7890
```

#### 同时设置系统环境变量（Git 等工具也会用到）

```powershell
# PowerShell — 临时生效（当前会话）
$env:HTTP_PROXY = "http://127.0.0.1:7890"
$env:HTTPS_PROXY = "http://127.0.0.1:7890"

# PowerShell — 永久生效（写入用户级环境变量）
[Environment]::SetEnvironmentVariable("HTTP_PROXY", "http://127.0.0.1:7890", "User")
[Environment]::SetEnvironmentVariable("HTTPS_PROXY", "http://127.0.0.1:7890", "User")
```

```cmd
:: CMD — 临时生效
set HTTP_PROXY=http://127.0.0.1:7890
set HTTPS_PROXY=http://127.0.0.1:7890

:: CMD — 永久生效
setx HTTP_PROXY "http://127.0.0.1:7890"
setx HTTPS_PROXY "http://127.0.0.1:7890"
```

#### 执行安装

```powershell
npm install -g @anthropic-ai/claude-code
```

#### 安装后清除代理配置（如需恢复直连）

```powershell
npm config delete proxy
npm config delete https-proxy

# 清除环境变量（临时）
Remove-Item Env:HTTP_PROXY
Remove-Item Env:HTTPS_PROXY

# 清除环境变量（永久）
[Environment]::SetEnvironmentVariable("HTTP_PROXY", $null, "User")
[Environment]::SetEnvironmentVariable("HTTPS_PROXY", $null, "User")
```

### 3.2 配合 Clash Verge / Mihomo Party

Windows 下推荐使用以下代理客户端：

| 客户端 | 安装方式 |
|--------|----------|
| **Clash Verge Rev**（推荐） | `winget install ClashVergeRev.ClashVergeRev` 或从 [GitHub Releases](https://github.com/clash-verge-rev/clash-verge-rev/releases) 下载 .exe |
| **Mihomo Party** | 从 [GitHub Releases](https://github.com/mihomo-party-org/mihomo-party/releases) 下载 Windows 版本 |
| **v2rayN** | 从 [GitHub Releases](https://github.com/2dust/v2rayN/releases) 下载 |

```powershell
# 开启系统代理后（通常端口为 7890）
# 设置环境变量
$env:HTTP_PROXY = "http://127.0.0.1:7890"
$env:HTTPS_PROXY = "http://127.0.0.1:7890"

npm install -g @anthropic-ai/claude-code
```

> **提示**：部分代理客户端支持 **TUN 模式**（虚拟网卡），开启后无需手动设置环境变量，所有流量自动走代理，最为方便。

---

## 4. 安装后验证与配置

### 验证安装

```powershell
claude --version
```

预期输出类似 `@anthropic-ai/claude-code v2.x.x`。

### 首次登录

```powershell
claude login
```

浏览器会自动打开 Anthropic 登录页面，按照提示完成认证即可。

如果浏览器无法自动打开：终端会打印一个 URL，手动复制到浏览器打开，登录后将回调码粘贴回终端。

### 配置 API 端点（如使用代理 API）

```powershell
# PowerShell — 临时设置
$env:ANTHROPIC_BASE_URL = "https://your-api-proxy.com"
$env:ANTHROPIC_API_KEY = "sk-ant-xxxxxxxxxxxxx"

# PowerShell — 永久设置
[Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "https://your-api-proxy.com", "User")
[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "sk-ant-xxxxxxxxxxxxx", "User")
```

```cmd
:: CMD — 永久设置
setx ANTHROPIC_BASE_URL "https://your-api-proxy.com"
setx ANTHROPIC_API_KEY "sk-ant-xxxxxxxxxxxxx"
```

> **说明**：Claude Code 支持通过环境变量 `ANTHROPIC_BASE_URL` 和 `ANTHROPIC_API_KEY` 来自定义 API 端点，适用于使用第三方 API 代理/转发的场景。设置后需要**重新打开终端**才能生效。

---

## 5. CC Switch — 快速切换 API 端点

[CC Switch](https://github.com/sky2233/cc-switch) 是一款开源的 Claude Code API 端点快速切换工具。它会在 `%USERPROFILE%\.claude\` 目录下管理多套配置，让你在不同 API 提供商（官方 / OpenRouter / 自定义代理）之间一键切换。

### 核心功能

- 管理多组 API Key + Base URL 配置
- 一键切换，无需手动修改环境变量
- 支持备份与还原配置
- 交互式 TUI 界面

### 安装 CC Switch

```powershell
# 方法 A：直接下载二进制（推荐，无需编译）
# 访问 https://github.com/sky2233/cc-switch/releases
# 下载 Windows amd64 版本，例如：
# cc-switch-windows-amd64.exe
# 将其重命名并放入 PATH 中的目录，例如：
# C:\Users\你的用户名\AppData\Local\Programs\cc-switch\cc-switch.exe

# 方法 B：使用 npm 安装（全局）
npm install -g cc-switch

# 方法 C：从源码编译（需要 Go 环境）
git clone https://github.com/sky2233/cc-switch.git
cd cc-switch
go build -o cc-switch.exe .
# 将 cc-switch.exe 移动到 PATH 中的目录
```

> **下载说明**：前往 [Releases 页面](https://github.com/sky2233/cc-switch/releases)，找到文件名包含 `windows` 和 `amd64`（或 `x86_64`）的 .exe 文件下载。如果你的系统是 ARM 架构（如 Surface Pro X），请下载 `arm64` 版本。

### 使用 CC Switch

```powershell
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

```powershell
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

1. 先确认代理已正确设置。PowerShell 中运行 `$env:HTTP_PROXY` 查看当前值
2. 检查 `npm config list` 确认 proxy 配置生效
3. 换用国内镜像源后再试
4. 尝试通过代理客户端开启 TUN 模式

### Q2: claude 命令找不到 ('claude' is not recognized…)

> **原因**：npm 全局 bin 目录不在 PATH 中。

**解决：**

```powershell
# 查看 npm 全局 bin 路径
npm config get prefix

# 通常路径为：
# C:\Users\你的用户名\AppData\Roaming\npm

# 确认该路径在系统 PATH 中：
# 方式 1：GUI → 搜索"编辑系统环境变量" → 环境变量 → 双击 Path → 检查是否有上述路径
# 方式 2：PowerShell 查看
$env:PATH -split ';' | Select-String 'npm'

# 如果缺失，手动添加：
[Environment]::SetEnvironmentVariable(
    "Path",
    [Environment]::GetEnvironmentVariable("Path", "User") + ";C:\Users\$env:USERNAME\AppData\Roaming\npm",
    "User"
)

# 重新打开终端后再试
```

### Q3: Permission denied (EACCES) 安装报错

> **原因**：npm 全局目录权限不足。

**解决：**

```powershell
# 方案 A：修改 npm 全局目录到用户目录（推荐）
mkdir C:\Users\$env:USERNAME\.npm-global
npm config set prefix "C:\Users\$env:USERNAME\.npm-global"

# 将该目录加入 PATH（参考 Q2 的方法）
[Environment]::SetEnvironmentVariable(
    "Path",
    [Environment]::GetEnvironmentVariable("Path", "User") + ";C:\Users\$env:USERNAME\.npm-global",
    "User"
)

# 方案 B：以管理员身份运行 PowerShell / CMD
# 右键终端图标 → "以管理员身份运行"，然后执行安装
npm install -g @anthropic-ai/claude-code
```

### Q4: 代理设置后 npm 仍然不走代理

**排查步骤：**

1. 确认代理端口正确 — 查看代理客户端设置中的端口号
2. 测试代理连通性：`curl -v --proxy http://127.0.0.1:7890 https://www.google.com`
3. npm 有时不遵守环境变量中的代理设置，需显式设置 `npm config set proxy`
4. 确认 Windows 防火墙没有阻止代理客户端
5. 尝试开启代理客户端的 **TUN 模式**（推荐），避免逐个应用配置代理

### Q5: claude login 后浏览器不打开 / 认证失败

**解决：**

- 终端中会打印一个 URL，手动复制到浏览器中打开
- 如果浏览器也无法访问，换用 API Key 方式：跳过 `claude login`，直接设置 `ANTHROPIC_API_KEY` 环境变量（参考第 4 节）
- 确认系统默认浏览器设置正确：设置 → 应用 → 默认应用 → 浏览器

### Q6: npm 全局安装路径包含空格导致问题

> **表现**：部分工具因路径含空格（如 `C:\Program Files\...`）而无法正常运行。

**解决：**

```powershell
# 将 npm 全局目录改为不含空格的路径
npm config set prefix "C:\Users\$env:USERNAME\.npm-global"

# 加入 PATH（参考 Q2）
# 重新打开终端后重新安装 Claude Code
npm install -g @anthropic-ai/claude-code
```

### Q7: CC Switch 切换后 claude 仍用旧配置

> **原因**：环境变量覆盖了 CC Switch 的配置。

**解决：**

```powershell
# 检查当前激活的配置
cc-switch list

# 确认环境变量没有被覆盖
Get-ChildItem Env: | Where-Object { $_.Name -like '*ANTHROPIC*' }

# 环境变量会覆盖 CC Switch 配置，需要清除：
Remove-Item Env:ANTHROPIC_API_KEY -ErrorAction SilentlyContinue
Remove-Item Env:ANTHROPIC_BASE_URL -ErrorAction SilentlyContinue

# 永久删除：
[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", $null, "User")
[Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", $null, "User")

# 重新打开终端后再试
```

### Q8: 安装过程中 npm 报证书错误 (UNABLE_TO_VERIFY_LEAF_SIGNATURE)

> **常见场景**：企业网络环境中使用自签名证书的代理。

**解决：**

```powershell
# 临时绕过证书检查（不推荐，但在某些企业代理环境必须使用）
npm config set strict-ssl false

# 安装完成后恢复
npm config set strict-ssl true
```

### Q9: PowerShell 执行策略阻止脚本运行

> **表现**：`无法加载文件，因为在此系统上禁止运行脚本`。

**解决：**

```powershell
# 查看当前执行策略
Get-ExecutionPolicy

# 设置为允许本地脚本（推荐）
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

# 如果上述命令需要管理员权限，以管理员身份运行 PowerShell 再试
```

---

## 7. 卸载 Claude Code

```powershell
# 卸载 npm 包
npm uninstall -g @anthropic-ai/claude-code

# 清理配置目录（可选，会删除所有配置和对话历史）
# 注意：Windows 下的配置目录为：
Remove-Item -Recurse -Force "$env:USERPROFILE\.claude"

# 清理 npm 缓存
npm cache clean --force

# 如果安装了 CC Switch
npm uninstall -g cc-switch
# 或手动删除二进制文件（如果你下载的是 .exe）
```

---

## 8. 小结

Windows 下安装 Claude Code 与 Linux 类似，核心都是通过 npm 安装。主要区别在于：

- 使用 **nvm-windows**（而不是 nvm-sh）管理 Node.js 版本
- 使用 **PowerShell** 或 **CMD** 语法设置环境变量（而不是 `export`）
- 环境变量的永久设置需要通过 `setx` 或 `[Environment]::SetEnvironmentVariable`
- CC Switch 需下载 **windows-amd64** 版本
- npm 全局 bin 路径默认为 `%APPDATA%\npm`

如果遇到本文未覆盖的问题，建议查阅 [Claude Code 官方文档](https://code.claude.com/docs) 或在相关社区搜索。

---

*Windows Claude Code Installation Guide — 最后更新 2026-07-02*