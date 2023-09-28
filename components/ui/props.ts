export interface MessageProps {
	type?: 'error' | 'info' | 'success' | 'warning',
	intervalClose?: number,
	topOffset?: number
	selfClose?: boolean
}