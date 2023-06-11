
const vscode = require('vscode');
const fs = require('fs');

/**
 * @param {vscode.ExtensionContext} context
 */
// Executed only once at the start
function activate(context) {

	
	let disposable = vscode.commands.registerCommand('flutter-setup-support.createAppNavigationHandler',  
		async () => {
			const files = await vscode.workspace.findFiles(`app_navigation_handler.dart`);

			// check wheter or not the app files are inside the lib folder
			var libBool = false
			try{
				if(fs.existsSync(`${vscode.workspace.workspaceFolders[0].uri.fsPath}/lib`)){
					libBool = true
				};
			}catch(e){
				console.log(e)
			}
			let fileContent;
			var app_navigation_handlerUrl; 
			console.log(files);
			try {
				fileContent = `
/* import here all your files you're using like so: 
*  import 'folder/file.dart'
*/

import 'package:flutter/material.dart';

class ControlWidget extends StatelessWidget {
  const ControlWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Title',
      debugShowCheckedModeBanner: false,
      home: Scaffold(
		body: Text("Lorem Ipsum"),
      ),
    );
  }
}

class AppHandler extends ControlWidget {
  AppHandler(widgetPath, context, info, {super.key}) {
    if (widgetPath) {
      try {
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (context) => widgetPath(title: "AppTitle"),
          ),
        );
      } catch (e) {
        print(e);
      }
    }
  }

  // var pathMap = {};

  // addToNavigationMap(name, path){

  // }
}`;	
				app_navigation_handlerUrl = `${vscode.workspace.workspaceFolders[0].uri.fsPath}/app_navigation_handler.dart`;

				if(libBool){
					app_navigation_handlerUrl = `${vscode.workspace.workspaceFolders[0].uri.fsPath}/lib/app_navigation_handler.dart`;
				}
				if(files.length == 0){
					// creating files
					fs.writeFile(app_navigation_handlerUrl, fileContent.toString(),
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
						value: ""
						}
					);
					

					console.log(check)
					if(check == "confirm" || check == "Confirm"){
						fs.writeFile(app_navigation_handlerUrl, fileContent.toString(),
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

	let disposableNavSetUp = vscode.commands.registerCommand('flutter-setup-support.createNavigationSetUp', async() =>{

	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposableNavSetUp);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
 
