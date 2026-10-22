# 芯知 · 半导体学习实验室

面向零基础学习者的中文半导体课程。免费开放，无需登录、API Key、后端服务或安装依赖。

**[在线学习](https://kyrenecheung.github.io/xinzhi-semiconductor/)** · **[下载完整源码 ZIP](https://github.com/kyrenecheung/xinzhi-semiconductor/archive/refs/heads/main.zip)**

32 节课程、64 个分步例题、83 组公式卡、285 道选择题（含 97 道多选），覆盖基础物理、材料与环境、制造工艺、测量、良率与可靠性。包含错题复习、综合测验、公式搜索和 6 个交互模型。

## 直接使用

1. 在 GitHub 仓库点击 **Code → Download ZIP**。
2. 将 ZIP **完整解压**，用 Chrome、Edge 或 Firefox 打开根目录的 **index.html**。
3. 开始学习。不需要注册、登录或联网；点击外部参考资料时才需要网络。

不要在压缩包预览中直接打开 HTML，也不要单独移动 `index.html`，它需要同目录的 JS/CSS 文件。

如果希望只分享一个文件，使用 **standalone.html**：它已嵌入全部课程、脚本与样式，可以单独复制、离线打开。两种入口功能相同。

手机建议使用下文的 GitHub Pages 网址。部分手机文件管理器只预览本地 HTML，不执行脚本；这种情况下请用浏览器打开部署后的网址。网站针对窄屏做了适配。

## 上传 GitHub，让其他人通过网址访问

1. 在自己的 GitHub 账号中新建一个 **Public** 仓库，例如 `xinzhi-semiconductor`。
2. 上传本目录内的文件与文件夹，确保 `index.html` 在仓库根目录，而不是再嵌套一层文件夹。通过 Git 上传会同时保留 `.nojekyll` 与 `.gitignore`。
3. 进入仓库 **Settings → Pages**。
4. 在 **Build and deployment → Source** 选择 **Deploy from a branch**，分支选实际默认分支（通常是 `main`），目录选 **/(root)**，然后 **Save**。
5. 等待部署成功，使用 Pages 页面给出的实际网址。典型形式为 `https://你的用户名.github.io/仓库名/`。

访问公开的 Pages 网页不需要 GitHub 或 ChatGPT 账号。创建仓库和设置部署需要你自己的 GitHub 账号。单纯上传代码不会自动开通 Pages，仓库的文件预览也不会直接运行网页。

官方步骤：[GitHub Pages 发布源设置](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

## 学习记录与隐私

- 答题、错题和完成状态保存在当前浏览器的 `localStorage`，没有账号系统、云端数据库或自动同步。
- 不包含分析追踪脚本。选择本地 PDF 时使用浏览器对象 URL，代码不会上传文件。
- 电脑、手机、不同浏览器、本地文件和不同网址的进度互不自动共享。`file://` 存储行为因浏览器而异，移动文件或清理浏览器数据也可能影响进度。
- 定期使用侧栏的 **导出学习记录**。换设备时用 **导入记录**；导入会替换该设备当前记录，请先导出备份。
- 与旧版学习记录兼容。旧版网站内的进度请先导出，再导入这里。未提交的综合测验只在当前页面会话保存。
- GitHub Pages 服务本身可能保留访问日志；本项目没有实现服务端个人学习记录存储。

## 原书与资料

课程可独立学习，原书用于可选拓展。本仓库不含教材 PDF、扫描页、题目截图或个人学习记录。

“双书阅读”保留《半导体制造技术》和《纳米集成电路制造工艺》的目录与页码索引。拥有相应版本的读者可自行选择本地 PDF；不同版本页码可能不同。来源、出版背景及许可边界见 [SOURCES.md](SOURCES.md)。课程映射两本书共 39 章的主题，不是逐页转写，也不承诺覆盖两书的全部细节。

题目是学习用原创模拟题，不代表任何企业的官方考试。公式与交互实验均有简化条件，理解与计算练习不等同制造经验。

## 修改与维护

本仓库中的 HTML、JS、CSS 就是可直接运行的源码，无压缩、无框架依赖。

| 文件 | 用途 |
| --- | --- |
| `index.html` | 网页入口 |
| `app.js` | 基础导航、题目、进度、PDF 关联 |
| `study-v2.js` | 深入课程、综合测验、公式索引、交互模型 |
| `diagrams.js` | 器件与接触结构 SVG 示意 |
| `style.css`、`study-v2.css` | 桌面与手机样式 |
| `content/lessons.json` | 可编辑课程与题目源数据 |
| `content/books.json` | 书籍目录元数据，不含本机文件路径 |
| `data.js` | 从 JSON 生成的浏览器数据，避免本地 fetch 限制 |
| `standalone.html` | 生成的单文件离线版本 |
| `tools/build.py` | 用 Python 标准库重新生成数据与单文件版 |
| `tools/check.mjs` | 用 Node.js 标准库检查数据和离线资源 |

修改课程请编辑 `content/lessons.json`；不要只修改生成的 `data.js` 或 `standalone.html`。维护时安装 Python 3.9+ 与 Node.js 18+，然后在仓库根目录运行：

```text
python tools/build.py
node tools/check.mjs
```

普通使用者不需要运行这些命令。提交时一并提交更新后的生成文件，这样其他人下载后仍能直接打开。课程 ID 与题目下标参与进度定位；维护已有课程时不要随意重排题目。贡献建议见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 许可

项目代码和原创课程材料使用 [MIT License](LICENSE)。允许使用、修改和分发，请保留版权及许可声明；MIT 也允许商业使用。引用资料、书名、目录索引及外部链接所指作品的权利仍属于各自权利人，不因本仓库而重新授权。此仓库不包含第三方教材全文。
