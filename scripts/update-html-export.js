const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

// Construct the paths from the project root
const modulePath = path.join(process.cwd(), 'src', 'Html.js');
const indexPath = path.join(process.cwd(), 'src', 'index.js');

// Read the source module
const moduleContent = fs.readFileSync(modulePath, 'utf-8');

// Parse the module content into an AST
const ast = parser.parse(moduleContent, {
    sourceType: 'module',
    plugins: [
        // Add any necessary plugins for syntax that you are using (e.g., jsx, typescript)
    ],
});

// Placeholder for found named exports
let exportedNames = [];

// Traverse the AST to find named exports
traverse(ast, {
    ExportNamedDeclaration: ({node}) => {
        if (node.declaration) {
            // Handling function declarations
            if (node.declaration.type === 'FunctionDeclaration') {
                exportedNames.push(node.declaration.id.name);
            }
            // Handling variable declarations (if you had any)
            else if (node.declaration.declarations) {
                node.declaration.declarations.forEach((declaration) => {
                    exportedNames.push(declaration.id.name);
                });
            }
        }
    },

});

// Log found exports (for debugging)
console.log('Found exports:', exportedNames);

if (exportedNames.length === 0) {
    console.log('No named exports found. Exiting without updating the index file.');
    process.exit();
}

// Generate the export block for the index file
const exportBlock = `export {\n  ${exportedNames.join(',\n  ')}\n} from './Html';`;

// Read the current index file content
let indexContent = fs.readFileSync(indexPath, 'utf-8');

// Identify where to insert or replace the export statements in your index file
// For simplicity, assuming you append or have a marked section
indexContent += `\n\n// Auto-generated exports for Html\n${exportBlock}`;

// Write the updated content back to the index file
fs.writeFileSync(indexPath, indexContent);

console.log('Index file has been updated with named exports from Html.js');
