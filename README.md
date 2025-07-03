# Versões usadas

- jdk 17.0.12
- Node v22.12.0

# ENV

Ao rodar o projeto ou fazer algum build, se foi alterado alguma env, rode o comando `expo:clean` (caso de querer rodar o projeto) ou `android:clean` (caso de querer fazer um build) para limpar o cache do expo.

# Release

Para fazer um build. Editar versionCode e versionName no arquivo `android\app\build.gradle`. Executar o `android:clean` para limpar algum cache de env. Executar `android:build:staging` para criar o aab. Ele será gerado em `android\app\build\outputs\bundle\release\app-release.aab`.
