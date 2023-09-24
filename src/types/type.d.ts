
declare interface Meta {
	title: string,
	description: string
	layout: string
}

declare interface LayoutProps {
	children: string | JSX.Element | string[] | JSX.Element[],
	meta: Meta
}