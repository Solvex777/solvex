# Инструкция по сборке Android (APK/AAB) для SolvexAdmin

Ниже — проверенные шаги для сборки **APK** (внутреннее тестирование) и **AAB** (для Google Play) с помощью **EAS Build**.

## 1) Предусловия
- Node.js 18+
- `npm i -g eas-cli` или `pnpm dlx eas-cli`/`npx eas-cli`
- Войти в Expo: `eas login`
- (Опционально) Войти в Google Play Console для последующей публикации

## 2) Конфигурация проекта
- `app.json` уже содержит `android.package`=`store.mydb.solvex` и `versionCode=1`.
- `eas.json` добавлен с профилями:
  - `development` (APK, dev‑client)
  - `preview` (APK для внутреннего теста)
  - `production` (AAB для релиза)

Переменная окружения API (`EXPO_PUBLIC_API_URL`) пробрасывается в код во время сборки. По умолчанию задано:
```
https://solvex.mydb.store
```

## 3) Сборка APK (внутреннее тестирование)
```bash
eas build -p android --profile preview
```

После завершения команда выводит ссылку на скачивание APK.

## 4) Сборка AAB (для публикации в Google Play)
```bash
eas build -p android --profile production
```
Архив `.aab` можно отправить на проверку:
```bash
eas submit -p android --profile production
```

## 5) Проверка API
Ваши запросы отправляются на `EXPO_PUBLIC_API_URL`. В коде реализован приоритет:
1. `process.env.EXPO_PUBLIC_API_URL`
2. `expo.extra.apiUrl` из `app.json`
3. дефолт: `https://solvex.mydb.store`

Документация API: https://solvex.mydb.store/docs/

## 6) Частые проблемы
- **Ошибка парсинга `app.json`**: нельзя помещать `process.env...` в JSON. Для переменных используйте `EXPO_PUBLIC_*` в коде (уже сделано).
- **`android.package` отсутствует**: в `app.json` уже задан. При необходимости поменяйте на свой.
- **Невозможен классический `expo build:android`**: он устарел для SDK 49, используйте `eas build`.

---

_Последнее обновление: 2025-10-02_
