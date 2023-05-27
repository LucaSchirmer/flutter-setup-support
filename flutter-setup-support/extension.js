
const vscode = require('vscode');


/**
 * @param {vscode.ExtensionContext} context
 */
// Executed only once at the start
function activate(context) {


	let disposable = vscode.commands.registerCommand('flutter-setup-support.createAppNavigationHandler',  
		() => {

			vscode.window.showInformationMessage('Hello World from flutter setup support!');
		}
	);

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
