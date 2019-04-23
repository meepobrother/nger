import { CompileReflector, JitSummaryResolver } from '@angular/compiler'

export class NgModuleCompiler {
    constructor(private reflector: CompileReflector) { }
}

const summaryResolver = new JitSummaryResolver();
