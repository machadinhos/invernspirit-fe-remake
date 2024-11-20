import { existsSync } from 'fs';
import { execSync } from 'child_process';

function prepareDevelopmentEnvironment() {
  if (existsSync('node_modules/husky')) {
    execSync('husky', { stdio: 'inherit' });
  }
}

prepareDevelopmentEnvironment();
