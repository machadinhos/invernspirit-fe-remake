import { execSync } from 'child_process';
import { existsSync } from 'fs';

function prepareDevelopmentEnvironment() {
  if (existsSync('node_modules/husky')) {
    execSync('husky', { stdio: 'inherit' });
  }
}

prepareDevelopmentEnvironment();
