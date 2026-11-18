// GitHub Actions provides these values to the production release build.
export const isUmamiProductionBuild =
  process.env.GITHUB_ACTIONS === 'true' &&
  process.env.GITHUB_EVENT_NAME === 'workflow_dispatch' &&
  process.env.GITHUB_WORKFLOW_REF === 'povedica/mi-cv/.github/workflows/deploy.yml@refs/heads/production';
