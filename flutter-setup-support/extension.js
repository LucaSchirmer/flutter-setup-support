"use strict"
const vscode = require('vscode');
const fs = require('fs');

/**
 * @param {vscode.ExtensionContext} context
 */
// Executed only once at the start
function activate(context) {
	var libBool = false
	try{
		if(fs.existsSync(`${vscode.workspace.workspaceFolders[0].uri.fsPath}/lib`)){
			libBool = true
		};
	}catch(e){
		console.log(e)
	}
	
	let disposable = vscode.commands.registerCommand('flutter-setup-support.createAppNavigationHandler',  
		async () => {
			

			// check wheter or not the app files are inside the lib folder
			
			let fileContent;
			var app_navigation_handlerUrl; 
			// console.log(files);
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

				if(
					!fs.existsSync(`${vscode.workspace.workspaceFolders[0].uri.fsPath}/lib/app_navigation_handler.dart`)
					&& 
					!fs.existsSync(`${vscode.workspace.workspaceFolders[0].uri.fsPath}/app_navigation_handler.dart`)
				)
				{
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

		var app_navigation_barsUrl; 

		let fileContent = `
import 'package:flutter/material.dart';

AppBar mainAppBar(BuildContext context, title) {
  return AppBar(
    automaticallyImplyLeading: false,
    title: Row(
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        IconButton(
          icon: const Icon(Icons.arrow_back,
              color: Color.fromARGB(155, 255, 255, 255)),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        const Padding(
          padding: EdgeInsets.symmetric(horizontal: 10),
        ),
        Expanded(
          child: Container(
            margin: const EdgeInsets.only(left: 2),
            child: Text(
              title,
              style: const TextStyle(
                color: Color.fromARGB(255, 255, 255, 255),
              ),
            ),
          ),
        ),
      ],
    ),
    backgroundColor: const Color.fromARGB(255, 18, 18, 18),
  );
}

`;

		

		if(libBool){
			try{
				app_navigation_barsUrl = `${vscode.workspace.workspaceFolders[0].uri.fsPath}/lib/main_app_bar.dart`;


				if(!fs.existsSync(`${vscode.workspace.workspaceFolders[0].uri.fsPath}/lib/app_navigation_bars`)){
					fs.mkdir(`${vscode.workspace.workspaceFolders[0].uri.fsPath}/lib/app_navigation_bars`,
					(err)=>{
						if(err){
							console.error(err);
						}console.log("dir0");
					});
				}
				app_navigation_barsUrl = `${vscode.workspace.workspaceFolders[0].uri.fsPath}/lib/app_navigation_bars/main_app_bar.dart`;

				if(!fs.existsSync(`${vscode.workspace.workspaceFolders[0].uri.fsPath}/lib/app_navigation_bars/main_app_bar.dart`)){
					fs.writeFile(app_navigation_barsUrl, fileContent.toString(),
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
						fs.writeFile(app_navigation_barsUrl, fileContent.toString(),
							(err)=>{
								if(err){
									console.error(err);
								}console.log("exe2");
							}
						);
					}
				}
			} catch (error) { 
				console.error(error);
			}
		}else{
			try{
				app_navigation_barsUrl = `${vscode.workspace.workspaceFolders[0].uri.fsPath}/main_app_bar.dart`;


				if(!fs.existsSync(`${vscode.workspace.workspaceFolders[0].uri.fsPath}/app_navigation_bars`)){
					fs.mkdir(`${vscode.workspace.workspaceFolders[0].uri.fsPath}/app_navigation_bars`,
					(err)=>{
						if(err){
							console.error(err);
						}console.log("dir1");
					});
				}
				app_navigation_barsUrl = `${vscode.workspace.workspaceFolders[0].uri.fsPath}/app_navigation_bars/main_app_bar.dart`;
				if(!fs.existsSync(`${vscode.workspace.workspaceFolders[0].uri.fsPath}/app_navigation_bars/main_app_bar.dart`)){
					fs.writeFile(app_navigation_barsUrl, fileContent.toString(),
						(err)=>{
							if(err){
								console.error(err);
							}console.log("exe1");
						}
					);
				}else{
					const check1 = await vscode.window.showInputBox({
						placeHolder: "Do you want to overwrite the file?", 
						prompt: "type confirm to overwrite", 
						value: ""
						}
					);

					console.log(check1)
					if(check1 == "confirm" || check1 == "Confirm"){
						fs.writeFile(app_navigation_barsUrl, fileContent.toString(),
							(err)=>{
								if(err){
									console.error(err);
								}console.log("exe2");
							}
						);
					}
				}
			} catch (error) { 
				console.error(error);
			}
		}

		vscode.window.showInformationMessage('finished set up!')
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
 
