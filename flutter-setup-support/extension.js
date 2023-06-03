
const vscode = require('vscode');
const fs = require('fs');

/**
 * @param {vscode.ExtensionContext} context
 */
// Executed only once at the start
function activate(context) {

	
	let disposable = vscode.commands.registerCommand('flutter-setup-support.createAppNavigationHandler',  
		async () => {
			const files = await vscode.workspace.findFiles(`appNavigationHandler.dart`);
			let fileContent;
			console.log(files);
			try {
				fileContent = `
/* import here all your files you're using like so: 
*  import 'folder/file.dart'
*/
						
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class ControlWidget extends StatelessWidget{
	const ControlWidget({super.key});

	@override
	Widget build(BuildContext context) {
		return  MaterialApp(
			title: 'Title',
			debugShowCheckedModeBanner: false, 
			home: Scaffold(body: 
				Text("Lorem Ipsum"),
			)
		);
	}
}

class AppHandler extends ControlWidget {
  AppHandler(widgetPath, context, info, {super.key}) {
    navigateToWidget(widgetPath, context, info);
  }


	// var pathMap = {};

	// addToNavigationMap(name, path){

	// }


	navigateToWidget(widgetPath, context, info){
		
		
	}
}`;
				if(files.length == 0){
					// creating files
					fs.writeFile(`${vscode.workspace.workspaceFolders[0].uri.fsPath}/appNavigationHandler.dart`, fileContent.toString(),
						(err)=>{
							if(err){
								console.error(err);
							}console.log("exe0");
						}
					);
				}else{
					const check = await vscode.window.showInputBox({
						placeHolder: "Do you want to overwrite the file?", 
						prompt: "type confirm to overwrite", 
						value: ""}
					);
					

					console.log(check)
					if(check == "confirm" || check == "Confirm"){
						fs.writeFile(`${vscode.workspace.workspaceFolders[0].uri.fsPath}/appNavigationHandler.dart`, fileContent.toString(),
							(err)=>{
								if(err){
									console.error(err);
								}console.log("exe1");
							}
						);
					}
				}
			} catch (error) { 
				console.error(error);
			}
			
			vscode.window.showInformationMessage('finished set up!')
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
 
