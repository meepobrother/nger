import { Project, StructureKind } from 'ts-morph';
const project = new Project();
const root = `addon/nger-demo/src/`
project.addExistingSourceFiles(`${root}**/*.ts`);
const myClassFile = project.createSourceFile(`${root}MyClass.ts`, "export class MyClass {}");
const myEnumFile = project.createSourceFile(`${root}MyEnum.ts`, {
    statements: [{
        kind: StructureKind.Enum,
        name: "MyEnum",
        isExported: true,
        members: [{ name: "member" }]
    }]
});
const myClass = myClassFile.getClassOrThrow("MyClass");
myClass.getName();          // returns: "MyClass"
myClass.hasExportKeyword(); // returns: true
myClass.isDefaultExport();  // returns: false
// manipulate
const myInterface = myClassFile.addInterface({
    name: "IMyInterface",
    isExported: true,
    properties: [{
        name: "myProp",
        type: "number"
    }]
});

myClass.rename("NewName");
myClass.addImplements(myInterface.getName());
myClass.addProperty({
    name: "myProp",
    initializer: "5"
});

myClass.addMethod({
    isStatic: false,
    name: ''
});


// project.getSourceFileOrThrow(`${root}ExistingFile.ts`).delete();
// asynchronously save all the changes above
project.save();
// get underlying compiler node from the typescript AST from any node
const compilerNode = myClassFile.compilerNode;
