import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "Caelum的云端",
	subtitle: "一个属于自己的云朵",
	lang: "zh_CN", // 语言：'en', 'zh_CN', 'zh_TW', 'ja', 'ko'
	themeColor: {
		hue: 265, // 主题色的默认色调值（0-360）。例如：红色:0, 蓝绿色:200, 青色:250, 粉色:345
		fixed: true, // 对访客隐藏主题色选择器
	},
	banner: {
		enable: true, // 是否启用横幅
		text: "本は草に、埋もれて静かに、時は過ぎゆく", //横幅标题
		subText: "书卷没青草、悄然无声时光逝、岁月自流淌", //横幅副标题
		src: "assets/images/IMG_3040.JPG", // 相对于/src目录的路径。若以'/'开头则相对于/public目录
		position: "center", // 相当于object-position，仅支持'top'、'center'、'bottom'，默认为'center'
		credit: {
			enable: true, // 是否显示横幅图片来源信息
			text: "空のむこうに続く道", // 显示的来源文本
			url: "https://www.pixiv.net/artworks/133015130", // （可选）原作品或艺术家页面的链接
		},
	},
	toc: {
		enable: true, // 是否在文章右侧显示目录
		depth: 3, // 目录显示的最大标题层级（1-3级）
	},
	favicon: [
		// 留空则使用默认网站图标
		{
			src: "/favicon/logo.PNG", // 网站图标路径（相对于/public目录）
			//   theme: 'light',              // （可选）'light'或'dark'，仅在为浅色/深色模式提供不同图标时设置
			//   sizes: '32x32',              // （可选）图标尺寸，仅在提供不同尺寸图标时设置
		},
	],
};

export const navBarConfig: NavBarConfig = {
	links: [LinkPreset.Home, LinkPreset.Archive, LinkPreset.About],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/head.PNG", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "Caelum",
	bio: "00后 学生 高血压患者 INTP-T 轻度二次元",
	links: [
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/caelum",
		},
		{
			name: "QQ",
			icon: "fa6-brands:qq",
			url: "https://qm.qq.com/q/123456789",
		},
		{
			name: "Email",
			icon: "fa6-solid:envelope",
			url: "mailto:caelum@example.com",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};
