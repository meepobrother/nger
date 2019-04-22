import { createLanguageService } from 'typescript'
import { createLanguageService as ngCreateLanguageService } from '@angular/language-service'
createLanguageService();
ngCreateLanguageService()

import { createConnection } from 'typeorm'