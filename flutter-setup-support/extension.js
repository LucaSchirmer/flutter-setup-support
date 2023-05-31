
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
			
			console.log(files);
			vscode.window.showInformationMessage('creating pages');
			try {
					if(files.length == 0){

						// creating files
						fs.writeFile(`${vscode.workspace.workspaceFolders[0].uri.fsPath}/appNavigationHandler.dart`, 
						
						`
						/* import here all your files you're using like so: 
						*  import 'folder/´file.dart'
						*/
						
						class ControlWidget extends StatessWidget{
							const controlWidget({super.key})

							@Widget build(BuildContext context) {
								return MaterialApp(
									title: 'Title',
									debugShowCheckedModeBanner: false, 
									home: const Scaffold(body: Container (
										child: Text(text: "Lorem Ipsum")
									));
								);
							}
						}

						class AppHandler extends controlWidget{
							AppHandler(widgetPath, context, info){
								navigateToWidget(widgetPath, context, info);
							}


							const pathMap = new Map();

							addToNavigationMap(name, path){

							}


							navigateToWidget(widgetPath, context, info){
								
								
							}
						}

						`
						, 

							(err)=>{
								if(err){
									console.error(err);
								}console.log("exe");
							}
						);
					}
			} catch (error) { 
				console.error(error);
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
 
