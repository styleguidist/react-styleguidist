import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/addon/mode/multiplex';

// TODO: Real JSX syntax highlighting
// https://github.com/codemirror/CodeMirror/issues/3122

CodeMirror.defineMode('jsx', (config) => {
	return CodeMirror.multiplexingMode(CodeMirror.getMode(config, 'htmlmixed'), {
		open: '{',
		close: '}',
		delimStyle: 'delimit',
		mode: CodeMirror.getMode(config, 'javascript')
	});
});
