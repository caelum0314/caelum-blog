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
	lang: "zh_CN",
	themeColor: {
		hue: 265,
		fixed: true,
	},
	banner: {
		enable: true,
		src: "assets/images/IMG_3040.JPG",
		text: "本は草に、埋もれて静かに、時は過ぎゆく",
		subText: "书卷没青草、悄然无声时光逝、岁月自流淌",
		position: "center",
		credit: {
			enable: true,
			text: "空のむこうに続く道",
			url: "https://www.pixiv.net/artworks/133015130",
		},
	},
	toc: {
		enable: true,
		depth: 3,
	},
	favicon: [
		{
			src: "/favicon/logo.PNG",
		},
	],
};

export const navBarConfig: NavBarConfig = {
	links: [LinkPreset.Home, LinkPreset.Archive, LinkPreset.About],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/head.PNG",
	name: "Caelum",
	bio: "00后 学生  INFP 轻度二次元",
	links: [
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/",
		},
		{
			name: "QQ",
			icon: "fa6-brands:qq",
			url: "https://qm.qq.com/q/",
		},
		{
			name: "Email",
			icon: "fa6-solid:envelope",
			url: "mailto:",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	theme: "github-dark",
};