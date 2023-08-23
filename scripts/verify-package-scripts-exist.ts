#!/usr/bin/env tsx
import { resolve } from 'path';
import { findWorkspacePackages, Project } from '@pnpm/workspace.find-packages';

const workspaceRoot = resolve(__dirname, '..');
const fieldsToLookFor = ['dev', 'test', 'lint'];

const getMissingScripts = (project: Project) => {
  if (!project.manifest.scripts) {
    return fieldsToLookFor;
  }
  const scripts = Object.keys(project.manifest.scripts);
  return fieldsToLookFor.filter((field) => field in scripts);
};

export const verifyPackageScriptsExist = async () => {
  const projects = await findWorkspacePackages(workspaceRoot);
  for (const project of projects) {
    const missingScripts = getMissingScripts(project);
    console.log(`${project.dir}: ${missingScripts}`);
  }
};

if (require.main === module) {
  verifyPackageScriptsExist();
}
