# Deploying the static portfolio

This repository publishes static files only. It never stores server names, SSH users, paths, keys, passwords, or DNS credentials.

## Local verification

Run the full local verification before every release:

```bash
npm run test:run
npm run check
npm run build
npm run test:e2e
```

The generated site is in `dist/`. The deployment script deliberately refuses to run unless all three target values are supplied explicitly:

```bash
DEPLOY_HOST='host.example' \
DEPLOY_USER='deploy-user' \
DEPLOY_PATH='/absolute/web/root' \
DEPLOY_CONFIRM='dedicated-portfolio-root' \
bash scripts/deploy-static.sh
```

The upload uses `rsync --delete`; the target directory must be the dedicated document root for this portfolio. Do not point it at the primary Solución Digital site or any shared directory.

## Current hosting finding

The available SSH account was reviewed on 2026-10-10. It is a managed/shared hosting account with no `sudo` command and no user-visible Caddy or Nginx service. Therefore no reverse-proxy configuration or TLS change has been attempted.

Before the first deployment, create and confirm a dedicated document root for `work.soluciondigital.cr` in the hosting control panel, confirm that the DNS record resolves there, and provide the resulting values only in the shell command above. The existing `soluciondigital.cr` virtual host remains out of scope.

For this managed host, the built upload includes `.htaccess` with `ErrorDocument 404 /404.html`. Confirm that the subdomain’s web server honors it. If the control panel requires a custom error-page setting instead, map status `404` to the uploaded `404.html` for this subdomain only. Do not launch until a missing path returns HTTP `404` and displays the portfolio recovery page.

## Verification after upload

After DNS and TLS are configured, verify the deployed site without following an unknown error page as a success condition:

```bash
curl --fail --location --silent --show-error https://work.soluciondigital.cr/es/ > /dev/null
curl --fail --location --silent --show-error https://work.soluciondigital.cr/en/ > /dev/null
curl --fail --location --silent --show-error https://work.soluciondigital.cr/es/work/kajual-gastronomia/ > /dev/null
curl --silent --show-error --output /dev/null --write-out '%{http_code}\n' https://work.soluciondigital.cr/missing-path/
```

The first three commands must return successfully. The final command must print `404` and the response body must render the site’s localized recovery page.

## Privileged-server templates

Use one template only after identifying the active web server and validating it on that server. The templates in `docs/server/` assume a dedicated document root at `/var/www/work.soluciondigital.cr`; they are not for the current managed hosting account.
