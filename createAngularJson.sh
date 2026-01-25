PROJECT_NAME=cric

cat <<EOL > angular.json
{
  "\$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "cli": {
    "packageManager": "npm",
    "analytics": false
  },
  "newProjectRoot": "projects",
  "projects": {
    "$PROJECT_NAME": {
      "projectType": "application",
      "schematics": {},
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "outputPath": "dist/$PROJECT_NAME",
            "index": "public/index.html",
            "browser": "src/main.ts",
            "tsConfig": "tsconfig.app.json",
            "assets": [
              {
                  "glob": "**/*",
                  "input": "public"
              }
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular/build:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "$PROJECT_NAME:build:production"
            },
            "development": {
              "buildTarget": "$PROJECT_NAME:build:development",
              "host": "0.0.0.0",
              "port": $PORT
            }
          },
          "defaultConfiguration": "development",
          "options": {
            "allowedHosts": ["${ALLOWED_HOSTS}"]
          }
        }
      }
    }
  }
}
EOL