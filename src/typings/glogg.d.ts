declare module 'glogg' {
	interface GloggLogger {
		debug(msg: string): void;
		info(msg: string): void;
		warn(msg: string): void;
		error(msg: string): void;
		on(event: string | symbol, listener: (...args: any[]) => void): void;
	}
	function getLogger(namespace: string): GloggLogger;
	export = getLogger;
}
