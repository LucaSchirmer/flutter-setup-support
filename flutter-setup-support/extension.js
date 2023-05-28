
const vscode = require('vscode');
const fs = require('fs')
const fileUrl = vscode.Uri.file('text.txt');

/**
 * @param {vscode.ExtensionContext} context
 */
// Executed only once at the start
function activate(context) {

	
	let disposable = vscode.commands.registerCommand('flutter-setup-support.createAppNavigationHandler',  
		() => {
			vscode.window.showInformationMessage('fs');
			try {
				fs.writeFile(fileUrl, "based");
			} catch (error) { 
				console.error(error)
			}
			
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
